import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { getMembers, MemberProfile } from "../../../lib/resource";
import Image from "next/image";

type Props = {
  member: MemberProfile;
};
export default function News({
  member,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <div style={{ width: "400px", height: "400px", position: "relative" }}>
        <Image
          src={member.photoURL}
          layout="fill"
          objectFit="contain"
          alt="portrait"
        />
      </div>
      <h1>
        {member.name.ja} {member.name.en}
      </h1>
      <p>
        {member.position.ja} {member.position.en}
      </p>
      <address>{member.email?.replace("@", "[at]") ?? "N/A"}</address>
      <div dangerouslySetInnerHTML={{ __html: member.detail }} />
    </main>
  );
}

type Param = { role: string; name: string };
export const getStaticProps: GetStaticProps<Props, Param> = async ({
  params,
}) => {
  const name = params!.name;
  const role = params!.role;
  const { members } = await getMembers();
  const member = members.find((mem) => mem.slug === name && mem.role === role)!;
  return { props: { member } };
};

export const getStaticPaths: GetStaticPaths<Param> = async () => {
  const { members, roles } = await getMembers();
  const paths = roles.flatMap((role) =>
    members
      .filter((mem) => mem.role === role)
      .map((mem) => ({
        params: {
          name: mem.slug,
          role,
        },
      }))
  );

  return {
    fallback: false,
    paths,
  };
};
