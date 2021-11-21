import {GetServerSideProps, NextPage} from 'next';
import React,from 'react';
import {getDatabaseConnection} from "../lib/getDatabaseConnection";
import {Post} from "../src/entity/Post";

type Props = {
      posts:Post[]
}
const index: NextPage<Props> = (props) => {
  const {posts} = props;
  return (
    <div>

      {posts.map(post=>{
        return <div>{post.id} {post.title}</div>
      })}
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
