import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import * as path from "path";
import * as fs from "fs/promises";

type Props = {
  content: string;
};
export default function News({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <div>{content}</div>
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props, Param> = async ({
  params,
}) => {
  if (!params?.slug) {
    throw new Error("params.slug must not be falsy");
  }
  const { slug } = params;
  const filePath = path.join(process.cwd(), "contents", "news", slug + ".md");
  const content = await fs.readFile(filePath, "utf-8");
  return { props: { content } };
};

type Param = { slug: string };
export const getStaticPaths: GetStaticPaths<Param> = async () => {
  const newsdir = path.join(process.cwd(), "contents", "news");
  const slugs = (await fs.readdir(newsdir, { encoding: "utf-8" })).map(
    (fname) => path.basename(fname, path.extname(fname))
  );
  return {
    fallback: false,
    paths: slugs.map((slug) => ({ params: { slug } })),
  };
};
