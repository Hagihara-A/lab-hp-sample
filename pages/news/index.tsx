import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getNewsSlugs } from "../../lib/resource";
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
  const slugs = await getNewsSlugs();
  const posts = slugs.map((slug) => ({
    title: slug,
    slug: slug,
  }));
  return { props: { posts } };
};
