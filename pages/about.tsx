import { GetStaticProps, InferGetStaticPropsType } from "next";
import * as path from "path";
import * as fs from "fs/promises";

type Props = {
  content: string;
};
export default function About({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <h1>About aTeal</h1>
      <div>{content}</div>
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const filePath = path.join(process.cwd(), "/contents/about.md");
  const content = await fs.readFile(filePath, "utf-8");
  return { props: { content } };
};
