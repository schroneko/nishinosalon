import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import styles from "./header.module.css";

export default function Header() {
  const [session, loading] = useSession();

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
        // className={`nojs-show ${
        //   !session && loading ? styles.loading : styles.loaded
        // }`}
        >
          {!session && (
            <>
              {/* <span className={styles.notSignedInText}>
                You are not signed in
              </span> */}
              <a
                href={`/api/auth/signin`}
                // className={styles.buttonInverse}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  signIn("google");
                }}
              >
                .
              </a>
            </>
          )}
          {session && (
            <>
              {/* {session.user.image && (
                <span
                  style={{ backgroundImage: `url(${session.user.image})` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </span> */}
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
    </header>
  );
}
