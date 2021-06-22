import * as path from "path";
import * as fs from "fs/promises";
import matter from "gray-matter";
import marked from "marked";
import { Roles, roles_en } from "./roles";

const contentsDir = path.join(process.cwd(), "/contents");
const newsDir = path.join(contentsDir, "news");
const membersDir = path.join(contentsDir, "members");
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

export interface MemberProfile {
  name: { ja: string; en: string };
  photoURL: `/portrait/${string}`;
  email?: string;
  position?: { ja?: string; en?: string };
  role: Roles;
  detail: string;
  slug: string;
}
export async function getMembers(): Promise<MemberProfile[]> {
  const memberProfiles = await Promise.all(
    roles_en.map(async (role) => {
      const roleDir = path.join(membersDir, role);
      const persons = await fs.readdir(roleDir);

      const profiles = await Promise.all(
        persons.map(async (person): Promise<MemberProfile> => {
          const personFile = path.join(roleDir, person);
          const personContent = await fs.readFile(personFile);
          const { data, content } = matter(personContent);
          if (typeof data.name_ja != "string") {
            throw new Error(`${personFile} doesn't contain name_ja.`);
          }
          if (typeof data.name_en != "string") {
            throw new Error(`${personFile} doesn't contain name_en.`);
          }
          const detail = marked(content);

          return {
            name: { ja: data.name_ja, en: data.name_en },
            position: {
              ja: data.position_ja ?? null,
              en: data.position_en ?? null,
            },
            photoURL: data.photoURL
              ? `/portrait/${data.photoURL}`
              : `/portrait/nopic.jpg`,
            email: data.email ?? null,
            detail,
            role,
            slug: `${path.basename(person, path.extname(person))}`,
          };
        })
      );
      return profiles;
    })
  );
  return memberProfiles.flat();
}
