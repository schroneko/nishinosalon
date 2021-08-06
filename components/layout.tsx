import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import React from "react";

const name = "西野亮廣エンタメ研究所";
export const siteTitle = "西野さんの過去記事";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  const [session, loading] = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Nishino Akihiro's Online Salon Archives"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.headingLg}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      {!session && (
        <React.Fragment>
          <div style={{ textAlign: "center" }}>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </div>
        </React.Fragment>
      )}
      {session && (
        <React.Fragment>
          <div style={{ textAlign: "center" }}>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </div>
          <main style={{ whiteSpace: "pre-wrap" }}>{children}</main>
        </React.Fragment>
      )}
      {!home && (
        <div className={styles.backToHome}>
          <Link href="https://salon.jp/nishino">
            <a className={utilStyles.headingLg} style={{ textAlign: "center" }}>
              サロンの入会はこちらから
            </a>
          </Link>
          <br />
          <br />
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
