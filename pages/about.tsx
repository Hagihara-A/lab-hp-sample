import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getAboutHTML } from "../lib/resource";

type Props = {
  content: string;
};
export default function About({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <h1>About aTeal</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { content } = await getAboutHTML();
  return { props: { content } };
};
