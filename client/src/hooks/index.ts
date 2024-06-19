import axios from "axios";
import {
  requestOptionsWithoutAuth,
  requestOptionsWithAuth,
  url,
  useGetState,
} from "../utils/utils";

import {
  useAppStore,
  useAppDispatch,
  type AuthState,
  type TagType,
  getTags,
  PostType,
  getPosts,
} from "../redux";
import { useEffect, useState } from "react";

export interface UserType {
  firstName: string;
  lastName: string;
  fullName: string | null;
  email: string;
  username: string;
  imgUrl: string | null;
  _id: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface SignInUserType {
  token: string;
  user: UserType;
}

export interface ApiResponse<T extends keyof AllRequestResponse> {
  data: AllRequestResponse[T];
  message: string;
  status: string;
}

export interface AllRequestResponse {
  tags: { tags: TagType[] };
  auth: { auth: AuthState };
  posts: { posts: PostType[]; totalPost: number };
}
export type AllRequestResponseKeys = keyof AllRequestResponse;

type MethodTypes = "GET" | "POST" | "PUT" | "DELETE";

export function useGetToken(): string | null {
  return useAppStore().getState().auth.current_user?.token ?? null;
}

export async function axiosCall<K extends AllRequestResponseKeys>(
  method: MethodTypes,
  url: string,
  re: K,
  token: string | null = null
) {
  let option;
  try {
    if (!token) {
      option = requestOptionsWithoutAuth(url);
    } else {
      option = requestOptionsWithAuth(method, url, token);
    }
    return (await axios(option)) as ApiResponse<K>;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function useBlogPostTags() {
  const token = useGetToken();
  const dispatch = useAppDispatch();
  const tags = useGetState("tags");

  async function refetchBlogTags() {
    const endpoint = url("/blog-post/tags");

    const getBlogPostTags = async () => {
      try {
        const res = await axiosCall("GET", endpoint, "tags", token);
        dispatch(getTags(res?.data.tags ?? []));
      } catch (error) {
        console.log(error);
      }
    };
    getBlogPostTags();
  }

  useEffect(() => {
    if (tags.tags.length > 0) return;
    let stale = false;

    const endpoint = url("/blog-post/tags");

    const getBlogPostTags = async () => {
      try {
        const res = await axiosCall("GET", endpoint, "tags", token);
        if (!stale) {
          console.log(res?.data ?? []);
          dispatch(getTags(res?.data.tags ?? []));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBlogPostTags();
    return () => {
      stale = true;
    };
  }, [dispatch, token, tags.tags]);

  return refetchBlogTags;
}

export function useFetchBlogPosts() {
  const token = useGetToken();
  const dispatch = useAppDispatch();
  const posts = useGetState("posts");
  const [loading, setLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 6;

  async function refetchBlogPost(page: number) {
    setIsRefetching(true);
    const endpoint = url(`/blog-post?page=${page}&limit=${limit}`);
    const getBlogPosts = async () => {
      try {
        const res = await axiosCall("GET", endpoint, "posts", token);
        dispatch(
          getPosts({
            posts: [...posts.posts.concat(res?.data.posts ?? [])],
            totalPost: res?.data.totalPost ?? 0,
          })
        );
        setPage((p) => p + 1);
        setIsRefetching(false);
      } catch (error) {
        console.log(error);
        setIsRefetching(false);
      }
    };
    getBlogPosts();
  }

  useEffect(() => {
    let stale = false;
    if (page > 1) return;

    setLoading(true);

    const endpoint = url(`/blog-post?page=${page}&limit=${limit}`);
    const getBlogPosts = async () => {
      try {
        const res = await axiosCall("GET", endpoint, "posts", token);
        if (!stale) {
          dispatch(
            getPosts({
              posts: res?.data.posts ?? [],
              totalPost: res?.data.totalPost ?? 0,
            })
          );
          setPage((p) => p + 1);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getBlogPosts();
    return () => {
      stale = true;
    };
  }, [token, dispatch, page]);
  return [loading, isRefetching, page, refetchBlogPost] as const;
}
