import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMembers, MemberProfile } from "../../../lib/resource";
import { Roles, roles, roles_en } from "../../../lib/roles";
import s from "../../../styles/members.module.scss";

export default function Member({
  members,
  role,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <h1>
        {role} {roles[role]}
      </h1>
      <div className={s.members}>
        {members.map((member) => {
          return (
            <Link href={`/members/${role}/${member.slug}`} key={member.slug}>
              <a>
                <div className={s.member}>
                  <div className={s.portrait}>
                    <Image
                      src={member.photoURL}
                      layout="fill"
                      objectFit="contain"
                      alt="portrait"
                    />
                  </div>
                  <p>
                    {member.name?.ja}, {member.name?.en}
                  </p>

                  <p>
                    {member.position?.ja}, {member.position?.en}
                  </p>
                  <p>{member.email?.replace("@", "[at]")}</p>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

type Props = {
  role: Roles;
  members: MemberProfile[];
};
type Params = {
  role: Roles;
};
export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const role = params?.role;
  if (typeof role == "undefined") {
    throw new Error("role is undefined");
  }
  const members = (await getMembers()).filter((m) => m.role == role);

  return { props: { members, role } };
};
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = roles_en.map((role) => ({ params: { role } }));
  return { paths, fallback: false };
};
