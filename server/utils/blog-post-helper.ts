import { Post, PostArgegateDataType } from "../models";

const fetchPaginatedPosts = async (
  page: number,
  limit: number
): Promise<PostArgegateDataType | undefined> => {
  try {
    const posts = await Post.aggregate<PostArgegateDataType>([
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [{ $skip: limit * page - limit }, { $limit: limit }],
        },
      },

      {
        $project: {
          total: { $arrayElemAt: ["$total.count", 0] },
          data: 1,
        },
      },
    ]);

    return posts[0];
  } catch (error) {
    console.log(error);
  }
};

export { fetchPaginatedPosts };
