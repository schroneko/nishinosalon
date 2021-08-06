import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";

export default function Post({
  postData,
}: {
  postData: {
    // title: string;
    // date: string;
    id: string;
    contentHtml: string;
  };
}) {
  return (
    <Layout>
      <Head>
        {/* <title>{postData.title}</title> */}
        <title>{postData.id}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>
          {Number(postData.id.substr(0, 4))}年{Number(postData.id.substr(5, 2))}
          月{Number(postData.id.substr(8, 2))}日の記事
        </h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.id} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
