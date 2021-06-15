import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMembers } from "../../lib/resource";
import { roles, roles_en } from "../../lib/roles";
import s from "../../styles/members.module.scss";

export default function Member({
  members,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <h1>メンバー一覧</h1>
      <div>
        {roles_en.map((role) => {
          const people = members.filter((member) => member.role == role);
          return (
            <div key={role}>
              <h2>
                {role} {roles[role]}
              </h2>
              <div className={s.members}>
                {people.map((person) => {
                  return (
                    <div className={s.member} key={person.slug}>
                      <Link href={`/members/${person.slug}`}>
                        <a>
                          <div className={s.portrait}>
                            <Image
                              src={person.photoURL}
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                          <p>
                            {person.name?.ja}, {person.name?.en}
                          </p>

                          <p>
                            {person.position?.ja}, {person.position?.en}
                          </p>
                          <p>{person.email?.replace("@", "[at]")}</p>
                        </a>
                      </Link>
                    </div>
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
  const members = await getMembers();

  return { props: { members } };
};
