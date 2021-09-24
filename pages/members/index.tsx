import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMembers } from "../../lib/resource";
import { ROLE_TRANSLATE } from "../../lib/roles";
import s from "../../styles/members.module.scss";

export default function Member({
  members,
  roles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <h1>Members</h1>
      <div>
        {roles.map((role) => {
          const membersInRole = members.filter((m) => m.role === role);
          return (
            <div key={role}>
              <h2>
                {role} {ROLE_TRANSLATE[role] ?? null}
              </h2>
              <div className={s.members}>
                {membersInRole.map((member) => {
                  return (
                    <Link
                      href={`/members/${role}/${member.slug}`}
                      key={member.slug}
                    >
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
                            {member.name?.ja ?? null}, {member.name?.en ?? null}
                          </p>

                          <p>
                            {member.position?.ja ?? null},{" "}
                            {member.position?.en ?? null}
                          </p>
                          <p>{member.email?.replace("@", "[at]") ?? null}</p>
                        </div>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
export const getStaticProps = async () => {
  const { roles, members } = await getMembers();
  return { props: { roles, members } };
};
