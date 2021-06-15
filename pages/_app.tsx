import "../styles/globals.css";
import hd from "../styles/header.module.scss";
import ft from "../styles/footer.module.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>aTeal - 伊藤研究室 | 東京工業大学 科学技術創成研究院</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={hd.header}>
        <div>
          <Link href="/">
            <a>
              <Image
                src="/LogoTypo.svg"
                layout="fill"
                objectFit="contain"
                alt="ateal"
              />
            </a>
          </Link>
        </div>
        <nav>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/news">
            <a>News</a>
          </Link>
          <Link href="/research">
            <a>Research</a>
          </Link>
          <Link href="/members">
            <a>Members</a>
          </Link>
          <Link href="/publications">
            <a>Publications</a>
          </Link>
          <Link href="/location">
            <a>Location</a>
          </Link>
        </nav>
      </header>
      <Component {...pageProps} />

      <footer className={ft.footer}>
        ©2021 aTeal 伊藤研究室 All rights reserved.
      </footer>
    </>
  );
}
