import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import * as path from "path";
import * as fs from "fs/promises";
import Link from "next/link";
type Props = {
  posts: { title: string; slug: string }[];
};
export default function News({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <h1>ニュース一覧</h1>
      <div>
        {posts.map(({ title, slug }) => (
          <Link href={`/news/${slug}`}>
            <a>
              <article>{title}</article>
            </a>
          </Link>
        ))}
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const newsDirPath = path.join(process.cwd(), "contents", "news");
  const fnames = await fs.readdir(newsDirPath, "utf-8");
  const posts = fnames.map((fname) => ({
    title: path.basename(fname, path.extname(fname)),
    slug: path.basename(fname, path.extname(fname)),
  }));
  return { props: { posts } };
};
