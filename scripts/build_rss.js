import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { blogs } from '../data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = "https://www.kraftenambalaj.com";
const RSS_PATH = path.join(__dirname, '..', 'rss.xml');

function generateRss() {
    const itemsXml = blogs.map(article => {
        const title = article.titleTr || article.titleEn || '';
        const desc = article.summaryTr || article.summaryEn || '';
        const link = `${SITE_URL}/blog.html?article=${article.id}`;
        const date = new Date().toUTCString();

        return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${desc}]]></description>
      <pubDate>${date}</pubDate>
    </item>`;
    }).join('\n');

    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kraften Ambalaj - Sektörel Haberler ve Makaleler</title>
    <link>${SITE_URL}/blog.html</link>
    <description>Toptan kraft salata kasesi, gıda ambalajı ve sürdürülebilirlik makaleleri.</description>
    <language>tr</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;

    fs.writeFileSync(RSS_PATH, rssXml, 'utf-8');
    console.log(`[OK] RSS Feed generated with ${blogs.length} articles at: ${RSS_PATH}`);
}

generateRss();
