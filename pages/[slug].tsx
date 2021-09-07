import marked from "marked";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getContent, getTopContentNames } from "../lib/resource";

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
  const slug = params?.slug;
  if (typeof slug === "undefined") {
    throw new Error("slug if undefined");
  }
  const content = await getContent(slug + ".md");
  const html = marked(content);

  return { props: { html } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getTopContentNames();
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    fallback: false,
    paths,
  };
};
