import * as path from "path";
import * as fs from "fs/promises";
import matter from "gray-matter";
import marked from "marked";

const contentsDir = path.join(process.cwd(), "/contents");
const newsDir = path.join(contentsDir, "news");
export async function getAboutHTML() {
  const fpath = path.join(contentsDir, "about.md");
  const md = await fs.readFile(fpath);
  const gray = matter(md);
  const html = marked(gray.content);
  return { content: html };
}
export async function getNewsFnames() {
  const fnames = await fs.readdir(newsDir, "utf-8");
  return fnames;
}
export async function getNewsSlugs() {
  const fnames = await getNewsFnames();
  const slugs = fnames.map((fname) =>
    path.basename(fname, path.extname(fname))
  );
  return slugs;
}
export async function getNewsHTMLFromSlug(slug: string) {
  const filePath = path.join(newsDir, slug + ".md");
  const content = await fs.readFile(filePath, "utf-8");
  const html = marked(content);
  return html;
}
export async function getResearchHTML() {
  const filePath = path.join(contentsDir, "research.md");
  const content = await fs.readFile(filePath, "utf-8");
  const html = marked(content);
  return html;
}
export async function getLocationHTML() {
  const filePath = path.join(contentsDir, "location.md");
  const content = await fs.readFile(filePath, "utf-8");
  const html = marked(content);
  return html;
}
