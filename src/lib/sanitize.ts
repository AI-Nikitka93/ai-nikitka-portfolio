/**
 * Lightweight HTML sanitizer for client & server rendering of parsed markdown.
 * Strips executable scripts, event handlers, javascript: protocols, and unsafe tags.
 */

const DANGEROUS_TAGS_REGEX = /<\s*(script|iframe|object|embed|style|svg|math|meta|link|base|form|input|button)\b[^>]*>([\s\S]*?<\s*\/\s*\1\s*>)?/gi;
const DANGEROUS_SELF_CLOSING_TAGS_REGEX = /<\s*(script|iframe|object|embed|style|svg|math|meta|link|base|form|input|button)\b[^>]*\/?\s*>/gi;
const EVENT_HANDLER_ATTR_REGEX = /\s+on[a-z0-9_-]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const JAVASCRIPT_HREF_REGEX = /\s+(href|src|action)\s*=\s*(?:"\s*javascript:[^"]*"|'\s*javascript:[^']*'|\s*javascript:[^\s>]+)/gi;
const DATA_HREF_REGEX = /\s+(href|src|action)\s*=\s*(?:"\s*data:(?!image\/)[^"]*"|'\s*data:(?!image\/)[^']*'|\s*data:(?!image\/)[^\s>]+)/gi;

export function sanitizeHtml(dirtyHtml: string): string {
  if (!dirtyHtml || typeof dirtyHtml !== "string") {
    return "";
  }

  let clean = dirtyHtml
    .replace(DANGEROUS_TAGS_REGEX, "")
    .replace(DANGEROUS_SELF_CLOSING_TAGS_REGEX, "")
    .replace(EVENT_HANDLER_ATTR_REGEX, "")
    .replace(JAVASCRIPT_HREF_REGEX, "")
    .replace(DATA_HREF_REGEX, "");

  // Extra pass to ensure nested attack vectors are neutralized
  if (clean.includes("<script") || clean.includes("javascript:") || clean.includes("onload=")) {
    clean = clean
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/javascript:/gi, "blocked-scheme:")
      .replace(/\bon[a-z]+\s*=/gi, "blocked-handler=");
  }

  return clean;
}
