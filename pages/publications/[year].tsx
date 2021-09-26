import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getPublications, Publication } from "../../lib/resource";

export default function PublicationPage({
  publication: { year, contents },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <h1>{year}</h1>
      {Object.entries(contents).map(([kind, pubs]) => {
        return (
          <div key={kind}>
            <h2>{kind}</h2>
            {pubs ? (
              <ol>
                {pubs.map((pub) => (
                  <li key={pub}>{pub}</li>
                ))}
              </ol>
            ) : (
              <p>N/A</p>
            )}
          </div>
        );
      })}
    </main>
  );
}

export const getStaticPaths: GetStaticPaths<{ year: string }> = async () => {
  const pubs = await getPublications();
  const paths = pubs.map((pub) => ({ params: { year: pub.year } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  { publication: Publication },
  { year: string }
> = async ({ params }) => {
  const year = params!.year;
  const pubs = await getPublications();
  const publication = pubs.find((pub) => pub.year === year)!;
  return { props: { publication } };
};

