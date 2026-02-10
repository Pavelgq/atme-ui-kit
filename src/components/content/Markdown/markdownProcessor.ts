import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeShiki, {
    themes: { light: 'github-light', dark: 'github-dark' },
  })
  .use(rehypeStringify);

const CACHE_MAX = 50;
const resultCache = new Map<string, string>();

function getCached(key: string): string | undefined {
  return resultCache.get(key);
}

function setCached(key: string, value: string): void {
  if (resultCache.size >= CACHE_MAX) {
    const firstKey = resultCache.keys().next().value;
    if (firstKey !== undefined) resultCache.delete(firstKey);
  }
  resultCache.set(key, value);
}

export function getCachedHtml(md: string): string | undefined {
  return getCached(md.trim()) ?? undefined;
}

export { markdownProcessor };

export async function processMarkdown(md: string): Promise<string> {
  const trimmed = md.trim();
  if (!trimmed) return '';
  const cached = getCached(trimmed);
  if (cached !== undefined) return cached;
  const file = await markdownProcessor.process(trimmed);
  const result = String(file);
  setCached(trimmed, result);
  return result;
}
