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
        <Menu
          right
          isOpen={isMenuOpen}
          onStateChange={onMenuStateChange}
          noTransition
        >
          <MenuLink href="/about" displayTxt="About" closeMenu={closeMenu} />
          <MenuLink href="/news" displayTxt="News" closeMenu={closeMenu} />
          <MenuLink
            href="/members"
            displayTxt="Members"
            closeMenu={closeMenu}
          />
          <MenuLink
            href="/research"
            displayTxt="Research"
            closeMenu={closeMenu}
          />
          <MenuLink
            href="/publications"
            displayTxt="Publications"
            closeMenu={closeMenu}
          />
          <MenuLink
            href="/location"
            displayTxt="Location"
            closeMenu={closeMenu}
          />
        </Menu>
      </header>
      <Component {...pageProps} />

      <footer className={ft.footer}>
        ©2021 aTeal 伊藤研究室 All rights reserved.
      </footer>
    </>
  );
}

function MenuLink({
  href,
  displayTxt,
  closeMenu,
}: {
  href: `/${string}`;
  displayTxt: string;
  closeMenu: () => void;
}) {
  return (
    <Link href={href}>
      <a onClick={closeMenu}>{displayTxt}</a>
    </Link>
  );
}
