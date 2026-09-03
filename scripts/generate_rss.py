import os
import re
import json
import xml.etree.ElementTree as ET
from xml.dom import minidom
import datetime

SITE_URL = "https://www.kraftenambalaj.com"
DATA_JS_PATH = os.path.join(os.path.dirname(__file__), "..", "data.js")
RSS_PATH = os.path.join(os.path.dirname(__file__), "..", "rss.xml")

def parse_blogs_from_data_js():
    with open(DATA_JS_PATH, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Extract export const blogs = [ ... ];
    match = re.search(r'export const blogs = (\[.*?\]);', content, re.DOTALL)
    if match:
        blogs_raw = match.group(1)
        # Fix javascript trailing commas or unquoted keys if any
        blogs_raw = re.sub(r',\s*]', ']', blogs_raw)
        return json.loads(blogs_raw)
    return []

def generate_rss_xml():
    blogs = parse_blogs_from_data_js()
    rss = ET.Element("rss", version="2.0", attrib={"xmlns:atom": "http://www.w3.org/2005/Atom"})
    channel = ET.SubElement(rss, "channel")

    ET.SubElement(channel, "title").text = "Kraften Ambalaj - Sektörel Haberler ve Makaleler"
    ET.SubElement(channel, "link").text = f"{SITE_URL}/blog.html"
    ET.SubElement(channel, "description").text = "Toptan kraft salata kasesi, gıda ambalajı ve sürdürülebilirlik makaleleri."
    ET.SubElement(channel, "language").text = "tr"
    
    ET.SubElement(channel, "atom:link", attrib={
        "href": f"{SITE_URL}/rss.xml",
        "rel": "self",
        "type": "application/rss+xml"
    })

    for article in blogs:
        item = ET.SubElement(channel, "item")
        title = article.get("titleTr", article.get("titleEn", ""))
        desc = article.get("summaryTr", article.get("summaryEn", ""))
        article_id = article.get("id", "")
        link = f"{SITE_URL}/blog.html?article={article_id}"
        
        ET.SubElement(item, "title").text = title
        ET.SubElement(item, "link").text = link
        ET.SubElement(item, "guid", isPermaLink="true").text = link
        ET.SubElement(item, "description").text = desc
        ET.SubElement(item, "pubDate").text = datetime.datetime.now().strftime("%a, %d %b %Y %H:%M:%S +0300")

    xml_str = minidom.parseString(ET.tostring(rss)).toprettyxml(indent="  ")
    with open(RSS_PATH, "w", encoding="utf-8") as f:
        f.write(xml_str)
    print(f"[OK] RSS Feed successfully generated with {len(blogs)} articles at: {RSS_PATH}")

if __name__ == "__main__":
    generate_rss_xml()
