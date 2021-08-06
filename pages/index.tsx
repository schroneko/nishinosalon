import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    id: string;
  }[];
}) {
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
          {allPostsData.map(({ id }) => (
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
                <Date dateString={id} />
              </small>
            </li>
          ))}
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
