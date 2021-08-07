import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Datetime from "../components/datetime";
import { GetStaticProps } from "next";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    id: string;
  }[];
}) {
  const [session, loading] = useSession();

  const today = new Date();
  today.setFullYear(today.getFullYear() - 1);
  const lastYearToday = today.toISOString();
  const lastYearTodayString = lastYearToday.substring(
    0,
    lastYearToday.indexOf("T")
  );

  const ngArticle = [
    "2019-03-02",
    "2019-05-10",
    "2019-06-02",
    "2019-07-13",
    "2019-07-17",
    "2019-08-22",
    "2019-09-04",
    "2019-09-14",
    "2019-09-16",
    "2019-09-28",
    "2019-11-08",
    "2019-12-22",
    "2020-01-04",
    "2020-02-07",
    "2020-02-12",
    "2020-02-17",
    "2020-12-12",
    "2020-12-26",
  ];
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul
          className={utilStyles.list}
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {allPostsData.map(({ id }) => {
            if (id > lastYearTodayString && !session) {
              return null;
            }
            if (ngArticle.includes(id) && !session) {
              return null;
            }
            return (
              <li
                className={`${utilStyles.listItem} ${utilStyles.headingMd}`}
                key={id}
                style={{ width: "50%", textAlign: "center" }}
              >
                <Link href={`/posts/${id}`}>
                  <a>
                    {Number(id.substr(0, 4))}年{Number(id.substr(5, 2))}月
                    {Number(id.substr(8, 2))}日
                  </a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Datetime dateString={id} />
                </small>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
