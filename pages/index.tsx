import Image from "next/image";
import s from "../styles/index.module.scss";
export default function Home() {
  return (
    <main className={s.main}>
      <div className={s.logo}>
        <Image
          src="/logo-white.svg"
          layout="fill"
          objectFit="contain"
          alt="logo"
        />
      </div>

      <h2>Analog Technology and Application Lab.</h2>
      <h3>Ito Laboratory, Nano Sensing Unit, Tokyo Tech</h3>
    </main>
  );
}
