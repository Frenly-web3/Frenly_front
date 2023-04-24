import { IPost } from "@entities/post";
import { contentApi } from "@shared/api";
import { Meta } from "@shared/ui";
import { Layout } from "@widgets/layout";
import { PostCard } from "@widgets/post";
import { useRouter } from "next/router";
import * as React from "react";

export default function PostPage() {
  const { query } = useRouter();

  const { id } = query;
  const { data: post } = contentApi.useGetPostByIdQuery(
    { id: id as string },
    { skip: !id }
  );

  return (
    <Layout title="">
      <Meta title={`post on frenly`} description={`post on frenly`} />
      <div className="md:mt-14 md:pt-1">
        {post && (
          <PostCard {...(post as unknown as IPost)} key={post.id}>
            <PostCard.Author />
            <PostCard.Content />
            <PostCard.Image />
            <PostCard.Reactions />
          </PostCard>
        )}
      </div>
    </Layout>
  );
}
