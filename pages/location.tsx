import { GetStaticProps } from "next";
import { getLocationHTML } from "../lib/resource";
type Props = { __html: string };
export default function Location({ __html }: Props) {
  return (
    <main>
      <h1>Location</h1>
      <div dangerouslySetInnerHTML={{ __html }} />
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const __html = await getLocationHTML();
  return { props: { __html } };
};
