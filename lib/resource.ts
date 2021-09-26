import * as path from "path";
import * as fs from "fs/promises";
import matter from "gray-matter";
import marked from "marked";
import { ROLE_ORDERS } from "./roles";
import * as yaml from "js-yaml";

const contentsDir = path.join(process.cwd(), "contents");
const newsDir = path.join(contentsDir, "news");
const membersDir = path.join(contentsDir, "members");
const pubsDir = path.join(contentsDir, "publications");

const getStem = (fileName: string) =>
  path.basename(fileName, path.extname(fileName));

export const getNews = async () => {
  const newsFileNames = (await fs.readdir(newsDir, { withFileTypes: true }))
    .filter((file) => file.isFile())
    .map((file) => file.name);
  const newsHtmlPromises = newsFileNames.map(async (name) => {
    const slug = getStem(name);
    const p = path.join(newsDir, name);
    const rawContent = await fs.readFile(p, "utf-8");
    return { slug, content: marked(rawContent) };
  });
  return Promise.all(newsHtmlPromises);
};

export const getRootEntries = async () => {
  const entryPromises = (await fs.readdir(contentsDir, { withFileTypes: true }))
    .filter((ent) => ent.isFile())
    .map(async (fileEnt) => {
      const slug = path.basename(fileEnt.name, path.extname(fileEnt.name));
      const raw = await fs.readFile(
        path.join(contentsDir, fileEnt.name),
        "utf8"
      );
      return {
        slug,
        parsedContent: marked(raw),
      };
    });

  return Promise.all(entryPromises);
};

export type MemberProfile = {
  name: { ja: string | null; en: string | null };
  photoURL: `/portrait/${string}`;
  email: string | null;
  position: { ja: string | null; en: string | null };
  detail: string;
  slug: string;
  role: string;
};

export async function getMembers(): Promise<{
  members: MemberProfile[];
  roles: string[];
}> {
  const roles = (await fs.readdir(membersDir, { withFileTypes: true }))
    .filter((ent) => ent.isDirectory())
    .map((dir) => dir.name)
    .sort((a, b) => {
      const a_order = ROLE_ORDERS[a] ?? Infinity;
      const b_order = ROLE_ORDERS[b] ?? Infinity;
      return a_order > b_order ? 1 : a_order === b_order ? 0 : -1;
    });
  const fullPathsPromises = roles.map(async (role) => {
    const memberFiles = (
      await fs.readdir(path.join(membersDir, role), { withFileTypes: true })
    )
      .filter((ent) => ent.isFile())
      .map((file) => path.join(membersDir, role, file.name));
    return memberFiles;
  });
  const fullPaths = (await Promise.all(fullPathsPromises)).flat();
  const memberPromises = fullPaths.flatMap(async (fullPath) => {
    const raw = await fs.readFile(fullPath, "utf8");
    return parseRawMemberContent(raw, fullPath);
  });
  return { roles, members: await Promise.all(memberPromises) };
}

const parseRawMemberContent = (
  raw: string,
  fullPath: string
): MemberProfile => {
  const { data, content } = matter(raw);
  const detail = marked(content);
  return {
    name: { ja: data?.name_ja ?? null, en: data?.name_en ?? null },
    position: {
      ja: data?.position_ja ?? null,
      en: data?.position_en ?? null,
    },
    detail,
    photoURL: data?.photoURL
      ? `/portrait/${data.photoURL}`
      : `/portrait/nopic.jpg`,
    slug: getStem(fullPath),
    role: path.basename(path.dirname(fullPath)),
    email: data?.email ?? null,
  };
};

export type Publication = {
  year: string;
  contents: {
    [classification: string]: string[] | null;
  };
};
export const getPublications = async (): Promise<Publication[]> => {
  const publications = (await fs.readdir(pubsDir, { withFileTypes: true }))
    .filter((ent) => ent.isFile())
    .map(async (file) => {
      const pubPath = path.join(pubsDir, file.name);
      const rawContent = await fs.readFile(pubPath, "utf8");
      const year = getStem(file.name);
      const contents = yaml.load(rawContent) as {
        [K: string]: string[] | null;
      };
      return {
        year,
        contents,
      };
    });
  return Promise.all(publications);
};
