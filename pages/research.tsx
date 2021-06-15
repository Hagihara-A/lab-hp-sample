import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getResearchHTML } from "../lib/resource";
export default function Research({
  __html,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div dangerouslySetInnerHTML={{ __html }} />;
}
type Props = {
  __html: string;
};
export const getStaticProps: GetStaticProps<Props> = async () => {
  const __html = await getResearchHTML();
  return { props: { __html } };
};
