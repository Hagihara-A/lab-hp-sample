import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { getNews } from "../../lib/resource";

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
  const slug = params!.slug;
  const news = await getNews();
  const __html = news.find((ent) => ent.slug === slug)!.content;
  return { props: { __html } };
};

type Param = { slug: string };
export const getStaticPaths: GetStaticPaths<Param> = async () => {
  const news = await getNews();
  const paths = news.map((entry) => ({ params: { slug: entry.slug } }));
  return {
    fallback: false,
    paths,
  };
};
