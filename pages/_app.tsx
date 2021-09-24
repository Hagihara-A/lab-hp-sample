import { useState, useCallback } from "react";
import "../styles/globals.scss";
import hd from "../styles/header.module.scss";
import ft from "../styles/footer.module.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuStateChange = useCallback((s) => setIsMenuOpen(s.isOpen), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const MenuLink = ({ path }: { path: `/${string}` }) => (
    <Link href={path}>
      <a onClick={closeMenu} className={hd.menu}>
        {path.slice(1)}
      </a>
    </Link>
  );

  return (
    <>
      <Head>
        <title>aTeal - 伊藤研究室 | 東京工業大学 科学技術創成研究院</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={hd.header}>
        <div className={hd.logo}>
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
        <Menu right isOpen={isMenuOpen} onStateChange={onMenuStateChange}>
          <MenuLink path="/about" />
          <MenuLink path="/news" />
          <MenuLink path="/members" />
          <MenuLink path="/research" />
          <MenuLink path="/publications" />
          <MenuLink path="/location" />
        </Menu>
      </header>
      <Component {...pageProps} />

      <footer className={ft.footer}>
        ©2021 aTeal 伊藤研究室 All rights reserved.
      </footer>
    </>
  );
}
