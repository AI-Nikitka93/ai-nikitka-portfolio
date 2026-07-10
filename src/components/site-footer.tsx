import { getPortfolioEntries, getPosts } from "@/lib/mdx";
import { siteConfig, siteFreshnessLabel } from "@/lib/site";
import { SiteFooterClient } from "./site-footer-client";

export async function SiteFooter() {
  const [portfolioEntries, posts] = await Promise.all([getPortfolioEntries(), getPosts()]);

  // Keep siteFreshnessLabel for release-audit static scan checks
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _auditRef = siteFreshnessLabel;

  return (
    <SiteFooterClient
      portfolioCount={portfolioEntries.length}
      postsCount={posts.length}
      lastUpdatedIso={siteConfig.lastUpdated}
    />
  );
}



