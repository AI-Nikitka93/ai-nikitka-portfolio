import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
import matter from "gray-matter";
import yaml from "js-yaml";

const root = process.cwd();
const args = new Map(
  process.argv
    .slice(2)
    .filter((item) => item.startsWith("--"))
    .map((item) => {
      const [key, ...valueParts] = item.slice(2).split("=");
      return [key, valueParts.join("=") || "true"];
    }),
);

const liveBase = args.get("base")?.replace(/\/+$/, "");
const outPath = args.get("out");
const expectedStaticRoutes = [
  "/",
  "/career-path",
  "/portfolio",
  "/lab",
  "/about",
  "/blog",
  "/services-calculator",
  "/ai-assistant",
  "/links",
  "/awards-credentials",
  "/en",
  "/privacy",
];
const forbiddenPublicCopy = [
  "осталось наполнить",
  "Здесь будут",
  "пустая заглушка",
  "Field Notes",
  "Field Note",
  "Surface Status",
  "Route Shell",
  "route-specific",
  "route shell",
];
const requiredSecurityHeaders = [
  {
    header: "content-security-policy",
    pattern: /frame-ancestors 'self'/i,
    description: "CSP with frame-ancestors",
  },
  {
    header: "x-content-type-options",
    pattern: /^nosniff$/i,
    description: "MIME sniffing protection",
  },
  {
    header: "referrer-policy",
    pattern: /^strict-origin-when-cross-origin$/i,
    description: "referrer policy",
  },
  {
    header: "permissions-policy",
    pattern: /camera=\(\).*microphone=\(\).*geolocation=\(\)/i,
    description: "sensitive browser feature policy",
  },
  {
    header: "strict-transport-security",
    pattern: /max-age=\d+/i,
    description: "HSTS",
  },
];
const performanceBudgets = {
  maxHtmlBytes: 280_000,
  maxRouteStaticAssetBytes: 1_100_000,
  maxRouteStaticAssetGzipBytes: 270_000,
  maxRouteJsGzipBytes: 225_000,
  maxRouteCssGzipBytes: 45_000,
  maxRouteStaticAssets: 16,
};
const minimumFreshnessDate = "2026-06-05";
const errors = [];
const warnings = [];
const matterOptions = {
  engines: {
    yaml: (source) => yaml.load(source) ?? {},
  },
};

function addError(message) {
  errors.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function publicPath(filePath) {
  return path.join(root, "public", filePath.replace(/^\/+/, ""));
}

async function readContentCollection(directory) {
  const target = path.join(root, "content", directory);
  const entries = await readdir(target, { withFileTypes: true });

  return Promise.all(
    entries
      .filter((entry) => entry.isFile())
      .filter((entry) => /\.(md|mdx)$/i.test(entry.name))
      .map(async (entry) => {
        const absolutePath = path.join(target, entry.name);
        const file = await readFile(absolutePath, "utf8");
        const parsed = matter(file, matterOptions);
        const slug = entry.name.replace(/\.(md|mdx)$/i, "");
        return {
          absolutePath,
          slug,
          frontmatter: parsed.data,
          content: parsed.content,
        };
      }),
  );
}

function isPublished(entry) {
  return entry.frontmatter.published !== false;
}

function requireString(entry, key) {
  if (typeof entry.frontmatter[key] !== "string" || !entry.frontmatter[key].trim()) {
    addError(`${entry.slug}: missing required string frontmatter '${key}'`);
  }
}

async function auditContent() {
  const [posts, portfolioEntries] = await Promise.all([
    readContentCollection("blog"),
    readContentCollection("portfolio"),
  ]);
  const publishedPosts = posts.filter(isPublished);
  const publishedPortfolio = portfolioEntries.filter(isPublished);

  if (publishedPosts.length < 2) {
    addError(`blog: expected at least 2 published posts, found ${publishedPosts.length}`);
  }

  if (publishedPortfolio.length !== 8) {
    addError(`portfolio: expected exactly 8 published dossiers, found ${publishedPortfolio.length}`);
  }

  for (const post of publishedPosts) {
    for (const key of ["title", "description", "date", "excerpt", "category"]) {
      requireString(post, key);
    }
  }

  for (const entry of publishedPortfolio) {
    for (const key of [
      "title",
      "description",
      "date",
      "dossierId",
      "dossierType",
      "issuer",
      "evidenceStatus",
      "archiveNote",
      "variant",
      "role",
      "client",
      "year",
    ]) {
      requireString(entry, key);
    }
    if (!Array.isArray(entry.frontmatter.tools) || entry.frontmatter.tools.length < 1) {
      addError(`${entry.slug}: missing case-study tools array`);
    }

    if (!["image", "text"].includes(entry.frontmatter.variant)) {
      addError(`${entry.slug}: variant must be 'image' or 'text'`);
    }

    if (entry.frontmatter.variant === "image") {
      if (typeof entry.frontmatter.image !== "string" || !entry.frontmatter.image.trim()) {
        addError(`${entry.slug}: image-backed dossier missing image path`);
      } else if (!existsSync(publicPath(entry.frontmatter.image))) {
        addError(`${entry.slug}: image file does not exist: ${entry.frontmatter.image}`);
      }
    }

    if (entry.frontmatter.evidenceStatus === "text-backed only") {
      if (entry.frontmatter.publicEvidenceLevel !== "source-traced") {
        addError(`${entry.slug}: text-backed dossier must be publicEvidenceLevel=source-traced`);
      }
      requireString(entry, "publicEvidenceNote");
      if (!Array.isArray(entry.frontmatter.externalContext) || entry.frontmatter.externalContext.length < 1) {
        addWarning(`${entry.slug}: source-traced dossier has no externalContext links`);
      }
    }
  }

  return {
    publishedPosts: publishedPosts.length,
    publishedPortfolio: publishedPortfolio.length,
    postRoutes: publishedPosts.map((post) => `/blog/${post.slug}`),
    portfolioRoutes: publishedPortfolio.map((entry) => `/portfolio/${entry.slug}`),
  };
}

async function auditSourceCopy() {
  const sourceRoots = ["src", "content", "README.md"];
  const checkedFiles = [];

  async function walk(targetPath) {
    const absolutePath = path.join(root, targetPath);
    const info = await stat(absolutePath);

    if (info.isDirectory()) {
      const entries = await readdir(absolutePath, { withFileTypes: true });
      await Promise.all(
        entries
          .filter((entry) => !["node_modules", ".next"].includes(entry.name))
          .map((entry) => walk(path.join(targetPath, entry.name))),
      );
      return;
    }

    if (!/\.(tsx|ts|mdx|md|json)$/i.test(targetPath)) {
      return;
    }

    checkedFiles.push(targetPath);
    const file = await readFile(absolutePath, "utf8");
    for (const forbidden of forbiddenPublicCopy) {
      if (file.includes(forbidden)) {
        addError(`${targetPath}: forbidden public copy found: '${forbidden}'`);
      }
    }
    if (file.includes("framer-motion")) {
      addError(`${targetPath}: production UI should use CSS/server components instead of framer-motion`);
    }
  }

  for (const sourceRoot of sourceRoots) {
    if (existsSync(path.join(root, sourceRoot))) {
      await walk(sourceRoot);
    }
  }

  return { checkedFiles: checkedFiles.length };
}

function formatRussianDate(isoDate) {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day || !months[month - 1]) {
    return "";
  }

  return `${day} ${months[month - 1]} ${year}`;
}

async function auditFreshnessTruth() {
  const siteSourcePath = path.join(root, "src", "lib", "site.ts");
  const footerSourcePath = path.join(root, "src", "components", "site-footer.tsx");
  const readmePath = path.join(root, "README.md");
  const [siteSource, footerSource, readmeSource] = await Promise.all([
    readFile(siteSourcePath, "utf8"),
    readFile(footerSourcePath, "utf8"),
    readFile(readmePath, "utf8"),
  ]);
  const lastUpdated = siteSource.match(/lastUpdated:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1] || "";
  const lastUpdatedLabel = lastUpdated ? formatRussianDate(lastUpdated) : "";

  if (!lastUpdated) {
    addError("src/lib/site.ts: siteConfig.lastUpdated must be an ISO date");
  }

  if (lastUpdated && lastUpdated < minimumFreshnessDate) {
    addError(
      `src/lib/site.ts: siteConfig.lastUpdated ${lastUpdated} is older than release minimum ${minimumFreshnessDate}`,
    );
  }

  if (/lastUpdatedLabel\s*:/.test(siteSource)) {
    addError("src/lib/site.ts: derive the freshness label from lastUpdated instead of storing lastUpdatedLabel");
  }

  if (!footerSource.includes("siteFreshnessLabel")) {
    addError("src/components/site-footer.tsx: footer must render the derived siteFreshnessLabel");
  }

  if (lastUpdatedLabel && !readmeSource.includes(`Обновлено: ${lastUpdatedLabel}`)) {
    addError(`README.md: must reference the current public freshness label '${lastUpdatedLabel}'`);
  }
  const readmeFreshnessLabels = [...readmeSource.matchAll(/Обновлено:\s*([^`.,\n]+)/g)]
    .map((match) => match[1]?.trim())
    .filter(Boolean);
  for (const label of readmeFreshnessLabels) {
    if (lastUpdatedLabel && label !== lastUpdatedLabel) {
      addError(`README.md: stale freshness label still references ${label}`);
    }
  }

  return {
    lastUpdated,
    lastUpdatedLabel,
    minimumFreshnessDate,
  };
}

async function auditDeploymentReadiness() {
  const requiredFiles = [
    "src/app/error.tsx",
    "src/app/global-error.tsx",
    "vercel.json",
  ];

  for (const filePath of requiredFiles) {
    if (!existsSync(path.join(root, filePath))) {
      addError(`deployment: missing required release-readiness file ${filePath}`);
    }
  }

  const releaseAuditSource = await readFile(new URL(import.meta.url), "utf8");
  const internalLinkAuditMarker = ["function", "auditLiveInternalLinks"].join(" ");
  if (!releaseAuditSource.includes(internalLinkAuditMarker)) {
    addError("scripts/release-audit.mjs: live audit must include internal link integrity summary");
  }
  const performanceBudgetMarker = ["function", "auditLivePerformanceBudget"].join(" ");
  if (!releaseAuditSource.includes(performanceBudgetMarker)) {
    addError("scripts/release-audit.mjs: live audit must include payload performance budgets");
  }
  const socialImageAuditMarker = ["function", "auditLiveSocialImages"].join(" ");
  if (!releaseAuditSource.includes(socialImageAuditMarker)) {
    addError("scripts/release-audit.mjs: live audit must include social image integrity checks");
  }
  const structuredDataAuditMarker = ["function", "auditLiveStructuredData"].join(" ");
  if (!releaseAuditSource.includes(structuredDataAuditMarker)) {
    addError("scripts/release-audit.mjs: live audit must parse and validate JSON-LD structured data");
  }
  const languageAlternateAuditMarker = ["function", "auditLiveLanguageAlternates"].join(" ");
  if (!releaseAuditSource.includes(languageAlternateAuditMarker)) {
    addError("scripts/release-audit.mjs: live audit must validate canonical and language alternates");
  }
  const freshnessTruthAuditMarker = ["function", "auditFreshnessTruth"].join(" ");
  if (!releaseAuditSource.includes(freshnessTruthAuditMarker)) {
    addError("scripts/release-audit.mjs: release audit must validate freshness date truth");
  }

  const packageJsonPath = path.join(root, "package.json");
  let packageJson = {};
  if (existsSync(packageJsonPath)) {
    try {
      packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
    } catch (error) {
      addError(`package.json: invalid JSON (${error.message})`);
    }

    if (packageJson.scripts?.["audit:deps"] !== "npm audit --audit-level=moderate") {
      addError("package.json: missing dependency audit release gate script");
    }
    if (!packageJson.scripts?.verify?.includes("npm run audit:deps")) {
      addError("package.json: verify must include dependency audit gate");
    }
    if (packageJson.dependencies?.["framer-motion"] || packageJson.devDependencies?.["framer-motion"]) {
      addError("package.json: release UI must not ship framer-motion for basic navigation/card motion");
    }
  } else {
    addError("deployment: missing package.json");
  }

  const layoutPath = path.join(root, "src/app/layout.tsx");
  if (existsSync(layoutPath)) {
    const layoutSource = await readFile(layoutPath, "utf8");
    if (!layoutSource.includes('metadataBase: new URL(absoluteUrl("/"))')) {
      addError("src/app/layout.tsx: metadataBase must use env-aware absoluteUrl('/')");
    }
    if (layoutSource.includes("metadataBase: new URL(siteConfig.url)")) {
      addError("src/app/layout.tsx: metadataBase must not be hard-coded to siteConfig.url");
    }
  }

  const globalsCssPath = path.join(root, "src/app/globals.css");
  if (existsSync(globalsCssPath)) {
    const globalsCss = await readFile(globalsCssPath, "utf8");
    if (!globalsCss.includes("@media (prefers-reduced-motion: reduce)")) {
      addError("src/app/globals.css: missing global prefers-reduced-motion safety gate");
    }
    if (!/scroll-behavior:\s*auto\s*!important/i.test(globalsCss)) {
      addError("src/app/globals.css: reduced-motion gate must disable smooth scrolling");
    }
    if (!/transition-duration:\s*0\.01ms\s*!important/i.test(globalsCss)) {
      addError("src/app/globals.css: reduced-motion gate must neutralize transition duration");
    }
    if (!/animation-duration:\s*0\.01ms\s*!important/i.test(globalsCss)) {
      addError("src/app/globals.css: reduced-motion gate must neutralize animation duration");
    }
  } else {
    addError("deployment: missing src/app/globals.css");
  }

  const siteHeaderPath = path.join(root, "src/components/site-header.tsx");
  if (existsSync(siteHeaderPath)) {
    const siteHeaderSource = await readFile(siteHeaderPath, "utf8");
    if (!siteHeaderSource.includes('aria-current={isActive ? "page" : undefined}')) {
      addError("src/components/site-header.tsx: active navigation links must expose aria-current=\"page\"");
    }
    if (!siteHeaderSource.includes('aria-current={pathname === "/en" ? "page" : undefined}')) {
      addError("src/components/site-header.tsx: standalone English links must expose aria-current=\"page\" on /en");
    }
  } else {
    addError("deployment: missing src/components/site-header.tsx");
  }

  const siteFooterPath = path.join(root, "src/components/site-footer.tsx");
  if (existsSync(siteFooterPath)) {
    const siteFooterSource = await readFile(siteFooterPath, "utf8");
    if (siteFooterSource.includes("7 досье / 2 заметки")) {
      addError("src/components/site-footer.tsx: public content counts must be derived from content collections");
    }
    if (
      !siteFooterSource.includes("getPortfolioEntries") ||
      !siteFooterSource.includes("getPosts") ||
      !siteFooterSource.includes("portfolioEntries.length") ||
      !siteFooterSource.includes("posts.length")
    ) {
      addError("src/components/site-footer.tsx: footer content counts must use current published collection lengths");
    }
  } else {
    addError("deployment: missing src/components/site-footer.tsx");
  }

  const scrollRevealPath = path.join(root, "src/components/scroll-reveal.tsx");
  if (existsSync(scrollRevealPath)) {
    const scrollRevealSource = await readFile(scrollRevealPath, "utf8");
    if (/initial=\{\{\s*opacity:\s*0/i.test(scrollRevealSource)) {
      addError("src/components/scroll-reveal.tsx: critical route content must not be hidden with initial opacity 0");
    }
  } else {
    addError("deployment: missing src/components/scroll-reveal.tsx");
  }

  const homepagePath = path.join(root, "src/app/page.tsx");
  if (existsSync(homepagePath)) {
    const homepageSource = await readFile(homepagePath, "utf8");
    const proofAssetReferences = homepageSource.match(/\/proof-assets\//g) || [];
    if (!homepageSource.includes("data-proof-hero")) {
      addError("src/app/page.tsx: homepage hero must expose a proof-media layer with data-proof-hero");
    }
    if (proofAssetReferences.length < 3) {
      addError("src/app/page.tsx: homepage first viewport should include at least three visible proof asset references");
    }
    if (!homepageSource.includes("MarketOpportunityNavigator")) {
      addError("src/app/page.tsx: homepage must include the market-backed interactive opportunity navigator");
    }
    if (!homepageSource.includes("ProofScanner")) {
      addError("src/app/page.tsx: homepage must include the signature proof scanner");
    }
  } else {
    addError("deployment: missing src/app/page.tsx");
  }

  const careerPathPagePath = path.join(root, "src/app/career-path/page.tsx");
  const careerPathScenePath = path.join(root, "src/components/career-path-scene.tsx");
  if (existsSync(careerPathPagePath) && existsSync(careerPathScenePath)) {
    const careerPathPageSource = await readFile(careerPathPagePath, "utf8");
    const careerPathSceneSource = await readFile(careerPathScenePath, "utf8");
    for (const marker of [
      "CareerPathScene",
      "От электрики и Минскводоканала к AI_Nikitka93",
    ]) {
      if (!careerPathPageSource.includes(marker)) {
        addError(`src/app/career-path/page.tsx: missing career path marker '${marker}'`);
      }
    }
    for (const marker of [
      "data-career-path-scene",
      "careerPathSteps",
      "Путь Никиты по этапам",
      "data-career-node",
    ]) {
      if (!careerPathSceneSource.includes(marker)) {
        addError(`src/components/career-path-scene.tsx: missing interactive path marker '${marker}'`);
      }
    }
  } else {
    addError("deployment: missing career path route or scene component");
  }

  const proofScannerPath = path.join(root, "src/components/proof-scanner.tsx");
  if (existsSync(proofScannerPath)) {
    const proofScannerSource = await readFile(proofScannerPath, "utf8");
    const requiredProofScannerMarkers = [
      "data-proof-scanner",
      "scannerActiveId",
      "document check motion",
      "what was done / tools / result",
      "Откройте эти работы первыми",
      "Документ или ссылка",
    ];

    for (const marker of requiredProofScannerMarkers) {
      if (!proofScannerSource.includes(marker)) {
        addError(`src/components/proof-scanner.tsx: missing proof scanner marker '${marker}'`);
      }
    }
  } else {
    addError("deployment: missing src/components/proof-scanner.tsx");
  }

  const proofLabDataPath = path.join(root, "src/lib/proof-lab.ts");
  if (existsSync(proofLabDataPath)) {
    const proofLabDataSource = await readFile(proofLabDataPath, "utf8");
    for (const marker of [
      "flagshipProofCases",
      "supportingProofHighlights",
      "labExperimentTracks",
      "assistantSourceCards",
    ]) {
      if (!proofLabDataSource.includes(marker)) {
        addError(`src/lib/proof-lab.ts: missing shared proof-lab export '${marker}'`);
      }
    }

    const proofLabImagePaths = [
      ...proofLabDataSource.matchAll(/image:\s*"([^"]+)"/g),
    ].map((match) => match[1]);
    for (const imagePath of proofLabImagePaths) {
      if (imagePath.startsWith("/proof-assets/") && !existsSync(publicPath(imagePath))) {
        addError(`src/lib/proof-lab.ts: proof-lab image file does not exist: ${imagePath}`);
      }
    }

    if (/id:\s*"vk-recsys"[\s\S]*image:\s*"\/proof-assets\/sig-03-helix-tech\.png"/.test(proofLabDataSource)) {
      addError("src/lib/proof-lab.ts: VK RecSys must not use the Helix diploma as a proof image");
    }
  } else {
    addError("deployment: missing src/lib/proof-lab.ts");
  }

  const awardsCredentialsPath = path.join(root, "src/app/awards-credentials/page.tsx");
  if (existsSync(awardsCredentialsPath)) {
    const awardsCredentialsSource = await readFile(awardsCredentialsPath, "utf8");
    for (const marker of [
      "data-supporting-proof-shelf",
      "supportingProofHighlights",
      "Свежие документы",
    ]) {
      if (!awardsCredentialsSource.includes(marker)) {
        addError(`src/app/awards-credentials/page.tsx: missing supporting proof shelf marker '${marker}'`);
      }
    }
  } else {
    addError("deployment: missing src/app/awards-credentials/page.tsx");
  }

  const labRoutePath = path.join(root, "src/app/lab/page.tsx");
  if (existsSync(labRoutePath)) {
    const labRouteSource = await readFile(labRoutePath, "utf8");
    const requiredLabMarkers = [
      "data-proof-lab",
      "checked / confirmations / materials to add later",
      "Что проверено",
      "Что добавить позже",
      "labExperimentTracks",
    ];

    for (const marker of requiredLabMarkers) {
      if (!labRouteSource.includes(marker)) {
        addError(`src/app/lab/page.tsx: missing lab route marker '${marker}'`);
      }
    }
  } else {
    addError("deployment: missing src/app/lab/page.tsx");
  }

  const caseStudySpinePath = path.join(root, "src/components/case-study-spine.tsx");
  if (existsSync(caseStudySpinePath)) {
    const caseStudySpineSource = await readFile(caseStudySpinePath, "utf8");
    const requiredCaseStudyMarkers = [
      "data-case-study-spine",
      "what was done / tools / result / confirmation",
      "Что сделал, с чем работал",
      "caseStudySpineRows",
    ];

    for (const marker of requiredCaseStudyMarkers) {
      if (!caseStudySpineSource.includes(marker)) {
        addError(`src/components/case-study-spine.tsx: missing case-study spine marker '${marker}'`);
      }
    }
  } else {
    addError("deployment: missing src/components/case-study-spine.tsx");
  }

  const portfolioDetailPath = path.join(root, "src/app/portfolio/[slug]/page.tsx");
  if (existsSync(portfolioDetailPath)) {
    const portfolioDetailSource = await readFile(portfolioDetailPath, "utf8");
    if (!portfolioDetailSource.includes("CaseStudySpine")) {
      addError("src/app/portfolio/[slug]/page.tsx: portfolio detail pages must render the case-study spine");
    }
  } else {
    addError("deployment: missing src/app/portfolio/[slug]/page.tsx");
  }

  const marketNavigatorPath = path.join(root, "src/components/market-opportunity-navigator.tsx");
  if (existsSync(marketNavigatorPath)) {
    const marketNavigatorSource = await readFile(marketNavigatorPath, "utf8");
    const requiredMarketNavigatorMarkers = [
      "data-market-opportunity",
      "marketRecommendationId",
      "Конкретные работы",
      "Помощник по сайту",
      "Ориентир бюджета",
    ];

    for (const marker of requiredMarketNavigatorMarkers) {
      if (!marketNavigatorSource.includes(marker)) {
        addError(`src/components/market-opportunity-navigator.tsx: missing market navigator marker '${marker}'`);
      }
    }
  } else {
    addError("deployment: missing src/components/market-opportunity-navigator.tsx");
  }

  let vercelConfig = {};
  const vercelConfigPath = path.join(root, "vercel.json");
  if (existsSync(vercelConfigPath)) {
    try {
      vercelConfig = JSON.parse(await readFile(vercelConfigPath, "utf8"));
    } catch (error) {
      addError(`vercel.json: invalid JSON (${error.message})`);
    }

    if (vercelConfig.framework !== "nextjs") {
      addError("vercel.json: framework must be 'nextjs'");
    }
    if (vercelConfig.installCommand !== "npm ci") {
      addError("vercel.json: installCommand must be 'npm ci' for lockfile-safe installs");
    }
    if (vercelConfig.buildCommand !== "npm run verify") {
      addError("vercel.json: buildCommand must run the full local verify gate");
    }
  }

  return {
    errorBoundary: existsSync(path.join(root, "src/app/error.tsx")),
    globalErrorBoundary: existsSync(path.join(root, "src/app/global-error.tsx")),
    vercelConfig: existsSync(vercelConfigPath),
    dependencyAuditGate: packageJson.scripts?.verify?.includes("npm run audit:deps") || false,
    envAwareMetadataBase: existsSync(layoutPath),
    reducedMotionGate: existsSync(globalsCssPath),
    activeNavigationCurrent: existsSync(siteHeaderPath),
    dynamicFooterCounts: existsSync(siteFooterPath),
  };
}

async function auditPricingCurrencyReadiness() {
  const requiredFiles = [
    "src/app/api/exchange-rates/route.ts",
    "src/lib/exchange-rates.ts",
    "src/lib/service-pricing.ts",
  ];

  for (const filePath of requiredFiles) {
    if (!existsSync(path.join(root, filePath))) {
      addError(`pricing: missing required BYN-first currency file ${filePath}`);
    }
  }

  const estimatorPath = path.join(root, "src/components/project-scope-estimator.tsx");
  if (existsSync(estimatorPath)) {
    const estimatorSource = await readFile(estimatorPath, "utf8");
    const requiredEstimatorMarkers = [
      { marker: 'fetch("/api/exchange-rates")', label: "same-origin exchange-rate fetch" },
      { marker: "basePriceByn", label: "BYN base service pricing" },
      { marker: "priceRangeByn", label: "visible BYN price range" },
      { marker: "formatCurrency", label: "localized currency formatting" },
      { marker: "rateStatus", label: "live/fallback exchange-rate state" },
    ];

    for (const { marker, label } of requiredEstimatorMarkers) {
      if (!estimatorSource.includes(marker)) {
        addError(`src/components/project-scope-estimator.tsx: missing ${label} marker`);
      }
    }

    if (estimatorSource.includes("без выдуманного прайса")) {
      addError("src/components/project-scope-estimator.tsx: stale no-pricing calculator copy is still present");
    }
  } else {
    addError("pricing: missing project scope estimator component");
  }

  const exchangeRoutePath = path.join(root, "src/app/api/exchange-rates/route.ts");
  const exchangeLibPath = path.join(root, "src/lib/exchange-rates.ts");
  if (existsSync(exchangeRoutePath) && existsSync(exchangeLibPath)) {
    const exchangeRouteSource = await readFile(exchangeRoutePath, "utf8");
    const exchangeLibSource = await readFile(exchangeLibPath, "utf8");
    const exchangeSource = `${exchangeRouteSource}\n${exchangeLibSource}`;
    const requiredRouteMarkers = [
      "api.nbrb.by/exrates/rates",
      "Cur_Scale",
      "Cur_OfficialRate",
      "fallbackRates",
    ];

    for (const marker of requiredRouteMarkers) {
      if (!exchangeSource.includes(marker)) {
        addError(`src/app/api/exchange-rates/route.ts + src/lib/exchange-rates.ts: missing exchange-rate marker ${marker}`);
      }
    }
  }

  const servicesPagePath = path.join(root, "src/app/services-calculator/page.tsx");
  if (existsSync(servicesPagePath)) {
    const servicesPageSource = await readFile(servicesPagePath, "utf8");
    if (!servicesPageSource.includes("BYN")) {
      addError("src/app/services-calculator/page.tsx: calculator page must explain BYN as the base currency");
    }
    if (!servicesPageSource.includes("НБ РБ")) {
      addError("src/app/services-calculator/page.tsx: calculator page must disclose the NBRB exchange-rate source");
    }
    if (servicesPageSource.includes("честный класс сложности")) {
      addError("src/app/services-calculator/page.tsx: stale complexity-only positioning is still present");
    }
  }

  return {
    requiredFiles,
    baseCurrency: "BYN",
    exchangeSource: "https://api.nbrb.by/exrates/rates?periodicity=0",
  };
}

async function auditAssistantReadiness() {
  const assistantPanelPath = path.join(root, "src/components/site-assistant-panel.tsx");
  const assistantPagePath = path.join(root, "src/app/ai-assistant/page.tsx");

  if (!existsSync(assistantPanelPath)) {
    addError("assistant: missing site assistant panel component");
  }
  if (!existsSync(assistantPagePath)) {
    addError("assistant: missing /ai-assistant page");
  }

  if (existsSync(assistantPanelPath)) {
    const panelSource = await readFile(assistantPanelPath, "utf8");
    const requiredPanelMarkers = [
      { marker: "matrixAnswerText", label: "matrix-style answer stream state" },
      { marker: 'aria-live="polite"', label: "polite answer live region" },
      { marker: "contactActions", label: "clear contact action list" },
      { marker: "https://t.me/digital_ai_art", label: "Telegram contact route" },
      { marker: "mailto:nikitka9318@gmail.com", label: "email contact route" },
      { marker: "sourceCards", label: "assistant source card data" },
      { marker: "data-assistant-source-card", label: "visible assistant source cards" },
      { marker: "Откуда взят ответ", label: "human source explanation marker" },
    ];

    for (const { marker, label } of requiredPanelMarkers) {
      if (!panelSource.includes(marker)) {
        addError(`src/components/site-assistant-panel.tsx: missing ${label} marker`);
      }
    }

    if (panelSource.includes("Это клиентская логика без внешней модели")) {
      addError("src/components/site-assistant-panel.tsx: stale implementation-detail copy is still visible");
    }
  }

  if (existsSync(assistantPagePath)) {
    const pageSource = await readFile(assistantPagePath, "utf8");
    if (!pageSource.includes("куда писать")) {
      addError("src/app/ai-assistant/page.tsx: assistant page must clearly explain where to write");
    }
    if (!pageSource.includes("помощь по сайту")) {
      addError("src/app/ai-assistant/page.tsx: assistant page must keep a route-specific site-help marker");
    }
  }

  return {
    route: "/ai-assistant",
    requiredBehavior: [
      "bounded local answers",
      "matrix-style response motion",
      "clear contact routes",
      "accessible live region",
    ],
  };
}

async function fetchText(url) {
  const response = await fetch(url, { redirect: "manual" });
  const text = await response.text();
  return {
    status: response.status,
    contentType: response.headers.get("content-type") || "",
    headers: response.headers,
    text,
  };
}

function countMatches(text, pattern) {
  return (text.match(pattern) || []).length;
}

function formatRussianCount(count, forms) {
  const absoluteCount = Math.abs(count);
  const lastTwoDigits = absoluteCount % 100;
  const lastDigit = absoluteCount % 10;
  const form =
    lastTwoDigits >= 11 && lastTwoDigits <= 14
      ? forms[2]
      : lastDigit === 1
        ? forms[0]
        : lastDigit >= 2 && lastDigit <= 4
          ? forms[1]
          : forms[2];

  return `${count} ${form}`;
}

function extractTag(html, pattern) {
  return pattern.test(html);
}

function matchTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) || [];
}

function hasAttribute(tag, attribute) {
  return new RegExp(`\\s${attribute}(?:\\s*=|\\s|>)`, "i").test(tag);
}

function getAttribute(tag, attribute) {
  const quoted = tag.match(new RegExp(`\\s${attribute}\\s*=\\s*(['"])(.*?)\\1`, "i"));
  if (quoted) {
    return decodeHtmlAttribute(quoted[2]);
  }

  const unquoted = tag.match(new RegExp(`\\s${attribute}\\s*=\\s*([^\\s>]+)`, "i"));
  return unquoted?.[1] ? decodeHtmlAttribute(unquoted[1]) : "";
}

function decodeHtmlAttribute(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function safeDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function idExists(html, id) {
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\sid\\s*=\\s*(['"])${escapedId}\\1`, "i").test(html);
}

function normalizeInternalHref(href, currentRoute) {
  if (!href) {
    return null;
  }

  const trimmedHref = href.trim();
  const lowerHref = trimmedHref.toLowerCase();
  if (
    lowerHref.startsWith("mailto:") ||
    lowerHref.startsWith("tel:") ||
    lowerHref.startsWith("sms:")
  ) {
    return null;
  }

  if (lowerHref.startsWith("javascript:")) {
    return { type: "unsafe", href: trimmedHref };
  }

  if (trimmedHref.startsWith("#")) {
    return {
      type: "same-page-anchor",
      href: trimmedHref,
      path: currentRoute,
      hash: trimmedHref.slice(1),
    };
  }

  const baseUrl = new URL(liveBase);
  const currentUrl = new URL(currentRoute, baseUrl);
  const targetUrl = new URL(trimmedHref, currentUrl);
  if (targetUrl.origin !== baseUrl.origin) {
    return null;
  }

  return {
    type: "internal",
    href: trimmedHref,
    path: targetUrl.pathname || "/",
    hash: targetUrl.hash ? targetUrl.hash.slice(1) : "",
  };
}

async function auditLiveInternalLinks(routeHtmlByPath) {
  const checkedTargets = new Map();
  let checkedAnchors = 0;
  let checkedInternalLinks = 0;

  async function getTarget(pathname) {
    if (!checkedTargets.has(pathname)) {
      checkedTargets.set(pathname, fetchText(`${liveBase}${pathname}`));
    }
    return checkedTargets.get(pathname);
  }

  for (const [route, html] of routeHtmlByPath.entries()) {
    for (const anchorTag of matchTags(html, "a")) {
      const href = getAttribute(anchorTag, "href");
      const internalHref = normalizeInternalHref(href, route);
      if (!internalHref) {
        continue;
      }

      if (internalHref.type === "unsafe") {
        addError(`${route}: unsafe javascript href found: ${href}`);
        continue;
      }

      checkedInternalLinks += 1;

      if (internalHref.hash) {
        checkedAnchors += 1;
      }

      if (internalHref.type === "same-page-anchor") {
        const targetId = safeDecodeURIComponent(internalHref.hash);
        if (!targetId || !idExists(html, targetId)) {
          addError(`${route}: anchor '${href}' does not target an existing id`);
        }
        continue;
      }

      const target = await getTarget(internalHref.path);
      if (![200, 301, 302, 307, 308].includes(target.status)) {
        addError(
          `${route}: internal link '${href}' resolved to ${internalHref.path} with HTTP ${target.status}`,
        );
        continue;
      }

      if (internalHref.hash) {
        const targetId = safeDecodeURIComponent(internalHref.hash);
        if (!targetId || !idExists(target.text, targetId)) {
          addError(
            `${route}: internal link '${href}' resolved to ${internalHref.path} but missing target id`,
          );
        }
      }
    }
  }

  return {
    checkedInternalLinks,
    uniqueInternalTargets: checkedTargets.size,
    checkedAnchors,
  };
}

function normalizeStaticAssetHref(href, currentRoute) {
  if (!href) {
    return null;
  }

  const baseUrl = new URL(liveBase);
  const currentUrl = new URL(currentRoute, baseUrl);
  const targetUrl = new URL(href.trim(), currentUrl);
  if (targetUrl.origin !== baseUrl.origin) {
    return null;
  }

  const pathname = targetUrl.pathname || "/";
  if (!pathname.startsWith("/_next/static/")) {
    return null;
  }

  return `${pathname}${targetUrl.search}`;
}

function getRouteStaticAssets(route, html) {
  const assets = new Set();

  for (const scriptTag of matchTags(html, "script")) {
    const src = normalizeStaticAssetHref(getAttribute(scriptTag, "src"), route);
    if (src) {
      assets.add(src);
    }
  }

  for (const linkTag of matchTags(html, "link")) {
    if (getAttribute(linkTag, "rel").toLowerCase() !== "stylesheet") {
      continue;
    }

    const href = normalizeStaticAssetHref(getAttribute(linkTag, "href"), route);
    if (href) {
      assets.add(href);
    }
  }

  return [...assets];
}

async function auditLivePerformanceBudget(routeHtmlByPath) {
  const checkedAssets = new Map();
  const routes = [];
  const worst = {
    htmlBytes: { route: "", bytes: 0 },
    staticAssetBytes: { route: "", bytes: 0 },
    staticAssetGzipBytes: { route: "", bytes: 0 },
    jsGzipBytes: { route: "", bytes: 0 },
    cssGzipBytes: { route: "", bytes: 0 },
    staticAssetCount: { route: "", count: 0 },
  };

  async function getAsset(pathname) {
    if (!checkedAssets.has(pathname)) {
      checkedAssets.set(
        pathname,
        (async () => {
          const response = await fetch(`${liveBase}${pathname}`, { redirect: "manual" });
          const bytes = Buffer.from(await response.arrayBuffer());
          return {
            path: pathname,
            status: response.status,
            contentType: response.headers.get("content-type") || "",
            bytes: bytes.length,
            gzipBytes: gzipSync(bytes).length,
          };
        })(),
      );
    }

    return checkedAssets.get(pathname);
  }

  for (const [route, html] of routeHtmlByPath.entries()) {
    const htmlBytes = Buffer.byteLength(html, "utf8");
    const assetPaths = getRouteStaticAssets(route, html);
    const assets = await Promise.all(assetPaths.map(getAsset));
    const staticAssetBytes = assets.reduce((sum, asset) => sum + asset.bytes, 0);
    const staticAssetGzipBytes = assets.reduce((sum, asset) => sum + asset.gzipBytes, 0);
    const jsGzipBytes = assets
      .filter((asset) => asset.path.endsWith(".js"))
      .reduce((sum, asset) => sum + asset.gzipBytes, 0);
    const cssGzipBytes = assets
      .filter((asset) => asset.path.endsWith(".css"))
      .reduce((sum, asset) => sum + asset.gzipBytes, 0);

    if (htmlBytes > performanceBudgets.maxHtmlBytes) {
      addError(
        `${route}: HTML payload ${htmlBytes} bytes exceeds budget ${performanceBudgets.maxHtmlBytes}`,
      );
    }
    if (assetPaths.length > performanceBudgets.maxRouteStaticAssets) {
      addError(
        `${route}: ${assetPaths.length} static JS/CSS assets exceeds budget ${performanceBudgets.maxRouteStaticAssets}`,
      );
    }
    if (staticAssetBytes > performanceBudgets.maxRouteStaticAssetBytes) {
      addError(
        `${route}: static JS/CSS payload ${staticAssetBytes} bytes exceeds budget ${performanceBudgets.maxRouteStaticAssetBytes}`,
      );
    }
    if (staticAssetGzipBytes > performanceBudgets.maxRouteStaticAssetGzipBytes) {
      addError(
        `${route}: gzipped static JS/CSS payload ${staticAssetGzipBytes} bytes exceeds budget ${performanceBudgets.maxRouteStaticAssetGzipBytes}`,
      );
    }
    if (jsGzipBytes > performanceBudgets.maxRouteJsGzipBytes) {
      addError(
        `${route}: gzipped JS payload ${jsGzipBytes} bytes exceeds budget ${performanceBudgets.maxRouteJsGzipBytes}`,
      );
    }
    if (cssGzipBytes > performanceBudgets.maxRouteCssGzipBytes) {
      addError(
        `${route}: gzipped CSS payload ${cssGzipBytes} bytes exceeds budget ${performanceBudgets.maxRouteCssGzipBytes}`,
      );
    }

    for (const asset of assets) {
      if (asset.status !== 200) {
        addError(`${route}: static asset ${asset.path} returned HTTP ${asset.status}`);
      }
    }

    worst.htmlBytes =
      htmlBytes > worst.htmlBytes.bytes ? { route, bytes: htmlBytes } : worst.htmlBytes;
    worst.staticAssetBytes =
      staticAssetBytes > worst.staticAssetBytes.bytes
        ? { route, bytes: staticAssetBytes }
        : worst.staticAssetBytes;
    worst.staticAssetGzipBytes =
      staticAssetGzipBytes > worst.staticAssetGzipBytes.bytes
        ? { route, bytes: staticAssetGzipBytes }
        : worst.staticAssetGzipBytes;
    worst.jsGzipBytes =
      jsGzipBytes > worst.jsGzipBytes.bytes ? { route, bytes: jsGzipBytes } : worst.jsGzipBytes;
    worst.cssGzipBytes =
      cssGzipBytes > worst.cssGzipBytes.bytes ? { route, bytes: cssGzipBytes } : worst.cssGzipBytes;
    worst.staticAssetCount =
      assetPaths.length > worst.staticAssetCount.count
        ? { route, count: assetPaths.length }
        : worst.staticAssetCount;

    routes.push({
      route,
      htmlBytes,
      staticAssetCount: assetPaths.length,
      staticAssetBytes,
      staticAssetGzipBytes,
      jsGzipBytes,
      cssGzipBytes,
    });
  }

  return {
    budgets: performanceBudgets,
    checkedRoutes: routes.length,
    uniqueStaticAssets: checkedAssets.size,
    worst,
  };
}

function getMetaContent(html, selectorAttribute, selectorValue) {
  const normalizedSelectorValue = selectorValue.toLowerCase();
  for (const metaTag of matchTags(html, "meta")) {
    if (getAttribute(metaTag, selectorAttribute).toLowerCase() !== normalizedSelectorValue) {
      continue;
    }

    return getAttribute(metaTag, "content");
  }

  return "";
}

async function auditLiveSocialImages(routeHtmlByPath) {
  const checkedImages = new Map();
  let checkedMetaImages = 0;

  async function getImage(imageUrl) {
    const parsedUrl = new URL(imageUrl, liveBase);
    const localUrl = new URL(parsedUrl.pathname + parsedUrl.search, liveBase);
    const key = localUrl.toString();
    if (!checkedImages.has(key)) {
      checkedImages.set(
        key,
        (async () => {
          const response = await fetch(key, { redirect: "manual" });
          return {
            url: key,
            status: response.status,
            contentType: response.headers.get("content-type") || "",
          };
        })(),
      );
    }

    return checkedImages.get(key);
  }

  for (const [route, html] of routeHtmlByPath.entries()) {
    const ogImage = getMetaContent(html, "property", "og:image");
    const twitterImage = getMetaContent(html, "name", "twitter:image");

    if (!ogImage) {
      addError(`${route}: missing og:image content URL`);
      continue;
    }
    if (!twitterImage) {
      addError(`${route}: missing twitter:image content URL`);
      continue;
    }
    if (ogImage !== twitterImage) {
      addError(`${route}: og:image and twitter:image should point to the same release image URL`);
    }

    for (const [label, imageUrl] of [
      ["og:image", ogImage],
      ["twitter:image", twitterImage],
    ]) {
      checkedMetaImages += 1;

      let parsedUrl;
      try {
        parsedUrl = new URL(imageUrl);
      } catch {
        addError(`${route}: ${label} must be an absolute URL, got '${imageUrl}'`);
        continue;
      }

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        addError(`${route}: ${label} must use http(s), got '${imageUrl}'`);
        continue;
      }

      const image = await getImage(imageUrl);
      if (image.status !== 200 || !image.contentType.startsWith("image/")) {
        addError(
          `${route}: ${label} local path ${parsedUrl.pathname} expected image 200, got ${image.status} ${image.contentType}`,
        );
      }
    }
  }

  return {
    checkedMetaImages,
    uniqueLocalImagePaths: checkedImages.size,
  };
}

function extractJsonLdScripts(html) {
  const scripts = [];
  const pattern =
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = pattern.exec(html))) {
    scripts.push(decodeHtmlAttribute(match[1].trim()));
  }

  return scripts;
}

function normalizeSchemaTypes(value) {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string" && item.trim());
  }

  return typeof value === "string" && value.trim() ? [value] : [];
}

function flattenJsonLdNodes(value, inheritedContext = "") {
  if (Array.isArray(value)) {
    return value.flatMap((item) => flattenJsonLdNodes(item, inheritedContext));
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  const context =
    typeof value["@context"] === "string" && value["@context"].trim()
      ? value["@context"]
      : inheritedContext;
  const graph = Array.isArray(value["@graph"]) ? value["@graph"] : null;

  if (graph) {
    return graph.flatMap((item) => flattenJsonLdNodes(item, context));
  }

  return [
    {
      data: value,
      context,
      types: normalizeSchemaTypes(value["@type"]),
    },
  ];
}

function requiredStructuredDataTypes(route) {
  if (route === "/") {
    return ["Person", "WebSite"];
  }
  if (route === "/portfolio") {
    return ["CollectionPage"];
  }
  if (route === "/blog") {
    return ["Blog"];
  }
  if (route.startsWith("/portfolio/")) {
    return ["CreativeWork"];
  }
  if (route.startsWith("/blog/")) {
    return ["BlogPosting", "BreadcrumbList"];
  }

  return [];
}

function collectStructuredDataUrls(value, pathParts = []) {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectStructuredDataUrls(item, [...pathParts, String(index)]),
    );
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  const urlKeys = new Set(["@id", "url", "mainEntityOfPage", "sameAs", "image", "item"]);
  const urls = [];
  for (const [key, child] of Object.entries(value)) {
    const childPath = [...pathParts, key];
    if (urlKeys.has(key) && typeof child === "string" && child.trim()) {
      urls.push({ path: childPath.join("."), value: child });
      continue;
    }

    urls.push(...collectStructuredDataUrls(child, childPath));
  }

  return urls;
}

function auditLiveStructuredData(routeHtmlByPath) {
  const routeSummaries = [];
  const typeCounts = {};
  let checkedRoutes = 0;
  let scriptCount = 0;
  let nodeCount = 0;

  for (const [route, html] of routeHtmlByPath.entries()) {
    const requiredTypes = requiredStructuredDataTypes(route);
    if (requiredTypes.length === 0) {
      continue;
    }

    checkedRoutes += 1;
    const scripts = extractJsonLdScripts(html);
    scriptCount += scripts.length;

    if (scripts.length === 0) {
      addError(`${route}: missing required JSON-LD structured data`);
      routeSummaries.push({ route, scripts: 0, nodes: 0, types: [] });
      continue;
    }

    const routeTypes = new Set();
    let routeNodeCount = 0;

    scripts.forEach((script, scriptIndex) => {
      let parsed;
      try {
        parsed = JSON.parse(script);
      } catch (error) {
        addError(`${route}: JSON-LD script ${scriptIndex + 1} is invalid JSON (${error.message})`);
        return;
      }

      const nodes = flattenJsonLdNodes(parsed);
      if (nodes.length === 0) {
        addError(`${route}: JSON-LD script ${scriptIndex + 1} contains no schema nodes`);
      }

      for (const node of nodes) {
        routeNodeCount += 1;
        nodeCount += 1;

        if (node.context !== "https://schema.org") {
          addError(`${route}: JSON-LD node must use https://schema.org context`);
        }

        if (node.types.length === 0) {
          addError(`${route}: JSON-LD node is missing @type`);
        }

        for (const type of node.types) {
          routeTypes.add(type);
          typeCounts[type] = (typeCounts[type] || 0) + 1;
        }

        for (const { path: urlPath, value } of collectStructuredDataUrls(node.data)) {
          let parsedUrl;
          try {
            parsedUrl = new URL(value);
          } catch {
            addError(`${route}: JSON-LD URL field ${urlPath} must be absolute, got '${value}'`);
            continue;
          }

          if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            addError(`${route}: JSON-LD URL field ${urlPath} must use http(s), got '${value}'`);
          }
        }
      }
    });

    for (const requiredType of requiredTypes) {
      if (!routeTypes.has(requiredType)) {
        addError(`${route}: JSON-LD missing required schema type ${requiredType}`);
      }
    }

    routeSummaries.push({
      route,
      scripts: scripts.length,
      nodes: routeNodeCount,
      types: [...routeTypes].sort(),
      requiredTypes,
    });
  }

  return {
    checkedRoutes,
    scriptCount,
    nodeCount,
    typeCounts,
    routes: routeSummaries,
  };
}

function getLinkTagsByRel(html, expectedRel) {
  return matchTags(html, "link").filter((linkTag) => {
    const relValues = getAttribute(linkTag, "rel").toLowerCase().split(/\s+/);
    return relValues.includes(expectedRel);
  });
}

function expectedCanonicalPath(route) {
  return route === "/" ? "/" : route;
}

function validateAbsoluteHttpUrl(route, label, value) {
  try {
    const parsedUrl = new URL(value);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      addError(`${route}: ${label} must use http(s), got '${value}'`);
    }
    return parsedUrl;
  } catch {
    addError(`${route}: ${label} must be an absolute URL, got '${value}'`);
    return null;
  }
}

function auditLiveLanguageAlternates(routeHtmlByPath) {
  const languageRoutes = new Set(["/", "/en"]);
  const languageRouteSummaries = [];
  let canonicalRoutesChecked = 0;
  let alternateLinksChecked = 0;

  for (const [route, html] of routeHtmlByPath.entries()) {
    const canonicalLinks = getLinkTagsByRel(html, "canonical");
    canonicalRoutesChecked += 1;

    if (canonicalLinks.length !== 1) {
      addError(`${route}: expected exactly one canonical link, found ${canonicalLinks.length}`);
    }

    const canonicalHref = canonicalLinks[0] ? getAttribute(canonicalLinks[0], "href") : "";
    const canonicalUrl = canonicalHref
      ? validateAbsoluteHttpUrl(route, "canonical href", canonicalHref)
      : null;
    if (canonicalUrl) {
      const actualPath = canonicalUrl.pathname || "/";
      if (actualPath !== expectedCanonicalPath(route)) {
        addError(
          `${route}: canonical pathname must be '${expectedCanonicalPath(route)}', got '${actualPath}'`,
        );
      }
    }

    const expectedOgLocale = route === "/en" ? "en_US" : "ru_BY";
    const ogLocale = getMetaContent(html, "property", "og:locale");
    if (ogLocale !== expectedOgLocale) {
      addError(`${route}: og:locale must be '${expectedOgLocale}', got '${ogLocale || "missing"}'`);
    }

    const alternateLinks = getLinkTagsByRel(html, "alternate").filter((linkTag) =>
      Boolean(getAttribute(linkTag, "hreflang")),
    );

    if (!languageRoutes.has(route)) {
      if (alternateLinks.length > 0) {
        addError(`${route}: language alternates are only allowed for the root /en summary pair`);
      }
      continue;
    }

    const expectedAlternates = {
      ru: "/",
      "ru-BY": "/",
      en: "/en",
      "x-default": "/",
    };
    const foundAlternates = {};

    for (const linkTag of alternateLinks) {
      alternateLinksChecked += 1;
      const hreflang = getAttribute(linkTag, "hreflang");
      const href = getAttribute(linkTag, "href");
      const alternateUrl = validateAbsoluteHttpUrl(route, `alternate ${hreflang} href`, href);

      if (foundAlternates[hreflang]) {
        addError(`${route}: duplicate hreflang '${hreflang}' alternate`);
      }
      foundAlternates[hreflang] = href;

      if (!Object.hasOwn(expectedAlternates, hreflang)) {
        addError(`${route}: unexpected hreflang '${hreflang}'`);
        continue;
      }

      if (alternateUrl) {
        const actualPath = alternateUrl.pathname || "/";
        const expectedPath = expectedAlternates[hreflang];
        if (actualPath !== expectedPath) {
          addError(
            `${route}: hreflang '${hreflang}' must point to '${expectedPath}', got '${actualPath}'`,
          );
        }
        if (canonicalUrl && alternateUrl.origin !== canonicalUrl.origin) {
          addError(`${route}: hreflang '${hreflang}' origin must match canonical origin`);
        }
      }
    }

    for (const [hreflang, expectedPath] of Object.entries(expectedAlternates)) {
      if (!foundAlternates[hreflang]) {
        addError(`${route}: missing hreflang '${hreflang}' alternate to '${expectedPath}'`);
      }
    }

    languageRouteSummaries.push({
      route,
      alternates: foundAlternates,
    });
  }

  return {
    canonicalRoutesChecked,
    languageRoutesChecked: languageRouteSummaries.length,
    alternateLinksChecked,
    languageRoutes: languageRouteSummaries,
  };
}

function auditLiveMarkup(route, html, contentStats, freshness) {
  const htmlTag = matchTags(html, "html")[0] || "";
  const mainTag = matchTags(html, "main")[0] || "";
  const expectedFooterCount = `${formatRussianCount(contentStats.publishedPortfolio, [
    "работа",
    "работы",
    "работ",
  ])} / ${formatRussianCount(contentStats.publishedPosts, ["заметка", "заметки", "заметок"])}`;

  if (getAttribute(htmlTag, "lang") !== "ru") {
    addError(`${route}: root html must declare lang="ru"`);
  }

  if (!extractTag(html, /<a[^>]+href=["']#main-content["']/i)) {
    addError(`${route}: missing skip-to-content link`);
  }

  if (getAttribute(mainTag, "id") !== "main-content") {
    addError(`${route}: main content landmark must expose id="main-content"`);
  }

  if (getAttribute(mainTag, "tabindex") !== "-1") {
    addError(`${route}: main content landmark must be programmatically focusable with tabindex="-1"`);
  }

  if (route === "/en" && getAttribute(mainTag, "lang") !== "en") {
    addError(`${route}: English route must declare main lang="en"`);
  }

  for (const imageTag of matchTags(html, "img")) {
    if (!hasAttribute(imageTag, "alt")) {
      addError(`${route}: img tag is missing alt text`);
    }
  }

  for (const anchorTag of matchTags(html, "a")) {
    if (getAttribute(anchorTag, "target").toLowerCase() !== "_blank") {
      continue;
    }

    const relValues = getAttribute(anchorTag, "rel").toLowerCase().split(/\s+/);
    if (!relValues.includes("noreferrer") || !relValues.includes("noopener")) {
      addError(`${route}: target="_blank" link must include rel="noreferrer noopener"`);
    }
  }

  const requiresStructuredData =
    route === "/" ||
    route === "/portfolio" ||
    route === "/blog" ||
    route.startsWith("/portfolio/") ||
    route.startsWith("/blog/");
  if (
    requiresStructuredData &&
    !extractTag(html, /<script[^>]+type=["']application\/ld\+json["']/i)
  ) {
    addError(`${route}: missing required JSON-LD structured data`);
  }

  if (!html.includes("Обновлено:") || !html.includes(freshness.lastUpdatedLabel)) {
    addError(`${route}: missing visible freshness signal for '${freshness.lastUpdatedLabel}'`);
  }

  if (!html.includes(expectedFooterCount)) {
    addError(`${route}: missing current footer content count '${expectedFooterCount}'`);
  }

  if (
    route === "/privacy" &&
    (!html.includes("Собственные cookies") ||
      !html.includes("не используются") ||
      !html.includes("не хранятся сайтом"))
  ) {
    addError(`${route}: missing expected privacy/no-tracking copy`);
  }
}

function auditLiveSecurityHeaders(route, headers) {
  for (const { header, pattern, description } of requiredSecurityHeaders) {
    const value = headers.get(header) || "";
    if (!pattern.test(value)) {
      addError(`${route}: missing or invalid ${description} header (${header})`);
    }
  }

  if (headers.has("x-powered-by")) {
    addError(`${route}: x-powered-by header must be disabled`);
  }
}

async function auditLiveRoutes(routes, freshness) {
  if (!liveBase) {
    return { skipped: "no --base provided" };
  }

  const liveRoutes = [...expectedStaticRoutes, ...routes.postRoutes, ...routes.portfolioRoutes];
  const routeHtmlByPath = new Map();

  for (const route of liveRoutes) {
    const result = await fetchText(`${liveBase}${route}`);
    if (result.status !== 200) {
      addError(`${route}: expected HTTP 200, got ${result.status}`);
      continue;
    }

    routeHtmlByPath.set(route, result.text);

    if (countMatches(result.text, /<h1[\s>]/g) !== 1) {
      addError(`${route}: expected exactly one h1`);
    }
    if (!extractTag(result.text, /<meta[^>]+name=["']description["']/i)) {
      addError(`${route}: missing meta description`);
    }
    if (!extractTag(result.text, /<link[^>]+rel=["']canonical["']/i)) {
      addError(`${route}: missing canonical link`);
    }
    if (!extractTag(result.text, /<meta[^>]+property=["']og:image["']/i)) {
      addError(`${route}: missing og:image`);
    }
    auditLiveMarkup(route, result.text, routes, freshness);
    auditLiveSecurityHeaders(route, result.headers);

    for (const forbidden of forbiddenPublicCopy) {
      if (result.text.includes(forbidden)) {
        addError(`${route}: forbidden public copy found in live HTML: '${forbidden}'`);
      }
    }
  }

  const internalLinkIntegrity = await auditLiveInternalLinks(routeHtmlByPath);
  const performanceBudget = await auditLivePerformanceBudget(routeHtmlByPath);
  const socialImageIntegrity = await auditLiveSocialImages(routeHtmlByPath);
  const structuredDataIntegrity = auditLiveStructuredData(routeHtmlByPath);
  const languageAlternateIntegrity = auditLiveLanguageAlternates(routeHtmlByPath);

  const notFound = await fetchText(`${liveBase}/not-existing-release-audit`);
  if (notFound.status !== 404) {
    addError(`/not-existing-release-audit: expected HTTP 404, got ${notFound.status}`);
  }
  if (!/noindex/i.test(notFound.text)) {
    addError("/not-existing-release-audit: missing noindex signal");
  }

  const robots = await fetchText(`${liveBase}/robots.txt`);
  if (robots.status !== 200 || !/Sitemap:/i.test(robots.text) || !/Host:/i.test(robots.text)) {
    addError("/robots.txt: missing expected Host/Sitemap output");
  }

  const sitemap = await fetchText(`${liveBase}/sitemap.xml`);
  if (sitemap.status !== 200 || !sitemap.text.includes("<urlset")) {
    addError("/sitemap.xml: missing urlset output");
  }
  for (const route of liveRoutes) {
    if (!sitemap.text.includes(route === "/" ? "<loc>" : route)) {
      addError(`/sitemap.xml: missing route ${route}`);
    }
  }

  for (const route of [
    "/opengraph-image",
    "/portfolio/opengraph-image",
    "/portfolio/sig-06-vk-recsys-top-9-percent/opengraph-image",
  ]) {
    const response = await fetch(`${liveBase}${route}`, { redirect: "manual" });
    const contentType = response.headers.get("content-type") || "";
    if (response.status !== 200 || !contentType.includes("image/png")) {
      addError(`${route}: expected image/png 200, got ${response.status} ${contentType}`);
    }
  }

  const favicon = await fetch(`${liveBase}/favicon.ico`, { redirect: "manual" });
  const faviconContentType = favicon.headers.get("content-type") || "";
  if (favicon.status !== 200 || !faviconContentType.includes("image/")) {
    addError(`/favicon.ico: expected image response 200, got ${favicon.status} ${faviconContentType}`);
  }

  const manifest = await fetchText(`${liveBase}/manifest.webmanifest`);
  if (manifest.status !== 200 || !manifest.contentType.includes("application/manifest+json")) {
    addError(`/manifest.webmanifest: expected application/manifest+json 200, got ${manifest.status} ${manifest.contentType}`);
  } else {
    try {
      const manifestJson = JSON.parse(manifest.text);
      for (const key of ["name", "short_name", "start_url", "display", "theme_color", "background_color", "icons"]) {
        if (!manifestJson[key]) {
          addError(`/manifest.webmanifest: missing required key '${key}'`);
        }
      }
      if (!Array.isArray(manifestJson.icons) || manifestJson.icons.length < 1) {
        addError("/manifest.webmanifest: expected at least one icon");
      }
    } catch (error) {
      addError(`/manifest.webmanifest: invalid JSON (${error.message})`);
    }
  }

  return {
    checkedRoutes: liveRoutes.length + 7,
    internalLinkIntegrity,
    performanceBudget,
    socialImageIntegrity,
    structuredDataIntegrity,
    languageAlternateIntegrity,
  };
}

async function main() {
  const content = await auditContent();
  const sourceCopy = await auditSourceCopy();
  const freshness = await auditFreshnessTruth();
  const deployment = await auditDeploymentReadiness();
  const pricingCurrency = await auditPricingCurrencyReadiness();
  const assistant = await auditAssistantReadiness();
  const live = await auditLiveRoutes(content, freshness);

  const summary = {
    ok: errors.length === 0,
    checkedAt: new Date().toISOString(),
    content,
    sourceCopy,
    freshness,
    deployment,
    pricingCurrency,
    assistant,
    live,
    warnings,
    errors,
  };

  console.log(JSON.stringify(summary, null, 2));

  if (outPath) {
    const absoluteOutPath = path.isAbsolute(outPath) ? outPath : path.join(root, outPath);
    await mkdir(path.dirname(absoluteOutPath), { recursive: true });
    await writeFile(absoluteOutPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
  }

  if (errors.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
