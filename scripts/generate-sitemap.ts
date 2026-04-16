import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { lists } from '../src/data/lists'
import { blogPosts } from '../src/data/blogPosts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE_URL = 'https://www.biteory.com'
const TODAY = new Date().toISOString().slice(0, 10)

function parseDate(display: string): string {
  const d = new Date(display)
  return isNaN(d.getTime()) ? TODAY : d.toISOString().slice(0, 10)
}

function url(
  loc: string,
  opts: { lastmod?: string; changefreq: string; priority: string },
): string {
  const lastmod = opts.lastmod ? `\n    <lastmod>${opts.lastmod}</lastmod>` : ''
  return `  <url>
    <loc>${BASE_URL}${loc}</loc>${lastmod}
    <changefreq>${opts.changefreq}</changefreq>
    <priority>${opts.priority}</priority>
  </url>`
}

const entries: string[] = [
  // Static pages
  url('/', { changefreq: 'weekly', priority: '1.0' }),
  url('/about', { changefreq: 'monthly', priority: '0.5' }),
  url('/blog', { changefreq: 'weekly', priority: '0.8' }),

  // Blog posts — derived from blogPosts data
  ...blogPosts.map((post) =>
    url(`/blog/${post.slug}`, {
      lastmod: parseDate(post.date),
      changefreq: 'monthly',
      priority: '0.9',
    }),
  ),

  // Ranked lists — derived from lists data
  ...lists.map((list) =>
    url(`/list/${list.slug}`, {
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: '0.8',
    }),
  ),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${entries.join('\n\n')}

</urlset>
`

const outPath = resolve(__dirname, '../public/sitemap.xml')
writeFileSync(outPath, xml, 'utf-8')
console.log(`sitemap: wrote ${entries.length} URLs → public/sitemap.xml`)
