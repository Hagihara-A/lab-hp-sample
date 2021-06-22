import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { getMembers, MemberProfile } from "../../../lib/resource";

import Image from "next/image";
import { Roles } from "../../../lib/roles";
type Props = {
  profile: MemberProfile;
};
export default function News({
  profile,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <div style={{ width: "400px", height: "400px", position: "relative" }}>
        <Image
          src={profile.photoURL}
          layout="fill"
          objectFit="contain"
          alt="portrait"
        />
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

type Param = { role: Roles; name: string };
export const getStaticProps: GetStaticProps<Props, Param> = async ({
  params,
}) => {
  if (!params?.name || !params.role) {
    throw new Error("params must not be falsy");
  }
  const { name, role } = params;
  const members = await getMembers();
  const member = members.find((mem) => mem.slug == name && mem.role == role);
  if (typeof member == "undefined") {
    throw new Error("invalid slug");
  }

  return { props: { profile: member } };
};

export const getStaticPaths: GetStaticPaths<Param> = async () => {
  const members = await getMembers();
  const paths = members.map((member) => ({
    params: { name: member.slug, role: member.role },
  }));

  return {
    fallback: false,
    paths,
  };
};
