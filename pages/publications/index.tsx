import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getPublications, Publication } from "../../lib/resource";
import Link from "next/link";
import s from "../../styles/publications.module.scss";

export default function Publications(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <main>
      <h1>Publications</h1>
      {props.publications.map((pub) => (
        <Link href={`publications/${pub.year}`} key={pub.year}>
          <a>
            <div key={pub.year} className={s.publication}>
              <h2>{pub.year}</h2>
              <PublicationDetail contents={pub.contents} />
            </div>
          </a>
        </Link>
      ))}
    </main>
  );
}

export const getStaticProps: GetStaticProps<{ publications: Publication[] }> =
  async () => {
    const pubs = await getPublications();
    return { props: { publications: pubs } };
  };

const PublicationDetail = ({
  contents,
}: {
  contents: Publication["contents"];
}) => (
  <ul>
    {Object.entries(contents).map(([kind, pubs]) => (
      <li key={kind}>
        {pubs?.length ?? 0} {kind}
      </li>
    ))}
  </ul>
);
