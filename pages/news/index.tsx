import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getNewsSlugs } from "../../lib/resource";
import s from "../../styles/news.module.scss";
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
          <article className={s.article} key={slug}>
            <Link href={`/news/${slug}`}>
              <a>{title}</a>
            </Link>
          </article>
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
