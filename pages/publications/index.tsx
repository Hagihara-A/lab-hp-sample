import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getPublications, Publication } from "../../lib/resource";
import Link from "next/link";
export default function Publications(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <main>
      <h1>Publications</h1>
      {props.publications.map((pub) => (
        <h2 key={pub.year}>
          <Link href={`publications/${pub.year}`}>
            <a>{pub.year}</a>
          </Link>
        </h2>
      ))}
    </main>
  );
}

export const getStaticProps: GetStaticProps<{ publications: Publication[] }> =
  async () => {
    const pubs = await getPublications();
    return { props: { publications: pubs } };
  };
