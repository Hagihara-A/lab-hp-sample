import { InferGetStaticPropsType } from "next";
import { getMembers } from "../../lib/resource";
import Image from "next/image";
import Link from "next/link";
import { roles, roles_en } from "../../lib/roles";

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
            <div>
              <h2>
                {role} {roles[role]}
              </h2>
              {people.map((person) => {
                return (
                  <div>
                    <Link href={`/members/${person.slug}`}>
                      <a>
                        <div
                          style={{
                            position: "relative",
                            width: "120px",
                            height: "120px",
                          }}
                        >
                          <Image
                            src={person.photoURL}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        <p>
                          {person.name?.ja}, {person.name?.en}
                        </p>
                      </a>
                    </Link>
                    <p>
                      {person.position?.ja}, {person.position?.en}
                    </p>
                    <p>{person.email?.replace("@", "[at]")}</p>
                  </div>
                );
              })}
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
