import {GetServerSideProps, NextPage} from 'next';
import React from 'react';
import {getDatabaseConnection} from "../lib/getDatabaseConnection";
import {Post} from "../src/entity/Post";
import Link from "next/link";

type Props = {
      posts:Post[]
}
const index: NextPage<Props> = (props) => {
  const {posts} = props;
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(post =>
          <Link key={post.id} href={`/posts/${post.id}`}>
            <a>
              {post.title}
            </a>
          </Link>
      )}
    </div>
  );
};
export default index;

export const getServerSideProps: GetServerSideProps = async () => {
  const connection = await getDatabaseConnection();// 第一次链接能不能用 get
  const posts = await connection.manager.find(Post);


  return {
    props: {
      posts:JSON.parse(JSON.stringify(posts))
    }
  };
};
