import marked from "marked";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getRootEntries } from "../lib/resource";

type Props = {
  html: string;
};

export default function Page({
  html,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
  params,
}) => {
  const slug = params!.slug;
  const entries = await getRootEntries();
  const html = entries.find((ent) => ent.slug === slug)!.parsedContent;

  return { props: { html } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getRootEntries();
  const paths = entries.map((ent) => ({ params: { slug: ent.slug } }));

  return {
    fallback: false,
    paths,
  };
};
