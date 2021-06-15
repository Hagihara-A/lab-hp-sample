import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { getNewsHTMLFromSlug, getNewsSlugs } from "../../lib/resource";

type Props = {
  __html: string;
};
export default function News({
  __html,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html }} />
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
  const __html = await getNewsHTMLFromSlug(slug);
  return { props: { __html } };
};

type Param = { slug: string };
export const getStaticPaths: GetStaticPaths<Param> = async () => {
  const slugs = await getNewsSlugs();
  return {
    fallback: false,
    paths: slugs.map((slug) => ({ params: { slug } })),
  };
};
