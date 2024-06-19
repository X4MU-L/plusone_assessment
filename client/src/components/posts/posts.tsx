/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* ts-nocheck */
// @ts-nocheck

import { Typography, Tabs } from "@material-tailwind/react";

import BlogPostCard from "./blog-post-card";
import BlogPostTags from "./blog-post-tag";
import { useFetchBlogPosts } from "../../hooks";
import { selectPost, useAppSelector } from "../../redux";
import ViewMoreButton from "./view-more-button";

export function Posts() {
  const [loading, isFetching, page, refetch] = useFetchBlogPosts();
  const posts = useAppSelector(selectPost);

  return (
    <section className="grid min-h-screen place-items-center p-8">
      <Tabs value="trends" className="mx-auto max-w-7xl w-full mb-16 ">
        <div className="w-full flex mb-8 flex-col items-center">
          <BlogPostTags />
        </div>
      </Tabs>
      <Typography variant="h6" className="mb-2 text-white">
        Latest Blog Posts
      </Typography>
      <Typography variant="h1" className="mb-2 text-gray-200">
        Trends News
      </Typography>
      <Typography
        variant="lead"
        color="gray"
        className="max-w-3xl mb-36 text-center text-white"
      >
        Check out what&apos;s new in the web development and tech worls! Do not
        forget to subscribe to our blog and we will notify you with the latest
        news.
      </Typography>
      <div className="container my-auto grid grid-cols-1 gap-x-8 gap-y-16  lg:grid-cols-3">
        {posts.posts.map(
          ({ content, title, author, createdAt, imgUrl, tags }, i) => (
            <BlogPostCard
              key={`${title}-${i}`}
              imgUrl={imgUrl}
              tags={tags}
              title={title}
              content={content}
              date={createdAt}
              author={{
                imgUrl: author.imgUrl,
                name: author.firstName + " " + author.lastName,
              }}
            />
          )
        )}
      </div>
      <ViewMoreButton
        page={page}
        refetch={refetch}
        isFetching={isFetching}
        isDisabled={posts.posts.length === posts.totalPost}
      />
    </section>
  );
}

export default Posts;
