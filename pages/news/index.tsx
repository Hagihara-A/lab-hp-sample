import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getNews } from "../../lib/resource";
import s from "../../styles/news.module.scss";
type Props = {
  posts: { title: string; slug: string }[];
};
export default function News({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <h1>News</h1>
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
  const news = await getNews();
  const posts = news.map((ent) => ({
    title: ent.slug,
    slug: ent.slug,
  }));
  return { props: { posts } };
};
