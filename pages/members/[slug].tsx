import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { getMembers, MemberProfile } from "../../lib/resource";
import Image from "next/image";
type Props = {
  profile: MemberProfile;
};
export default function News({
  profile,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <div style={{ width: "400px", height: "400px", position: "relative" }}>
        <Image src={profile.photoURL} layout="fill" objectFit="contain" />
      </div>
      <h1>
        {profile.name.ja} {profile.name.en}
      </h1>
      <p>
        {profile.position?.ja} {profile.position?.en}
      </p>
      <address>{profile.email?.replace("@", "[at]") ?? "N/A"}</address>
      <div dangerouslySetInnerHTML={{ __html: profile.detail }} />
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props, Param> = async ({
  params,
}) => {
  if (!params?.slug) {
    throw new Error("params.slug must not be falsy");
  }
  const { slug } = params;
  const members = await getMembers();
  const member = members.find((mem) => mem.slug == slug);
  if (typeof member == "undefined") {
    throw new Error("invalid slug");
  }

  return { props: { profile: member } };
};

type Param = { slug: MemberProfile["slug"] };
export const getStaticPaths: GetStaticPaths<Param> = async () => {
  const members = await getMembers();
  const paths = members.map((member) => ({ params: { slug: member.slug } }));

  return {
    fallback: false,
    paths,
  };
};
