/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* ts-nocheck */
// @ts-nocheck

import _ from "lodash";
import axios, { AxiosError, CancelToken, CancelTokenSource } from "axios";
import {
  requestOptionsWithoutAuth,
  requestOptionsWithAuth,
  url,
  useGetState,
  requestPostOptionsWithAuth,
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
import { useCallback, useEffect, useState } from "react";

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

type ErrorResponseType = {
  response: {
    status: number;
  };
};
export interface AllRequestResponse {
  tags: { tags: TagType[] };
  auth: { auth: AuthState };
  posts: { posts: PostType[]; totalPost: number };
  verify: ErrorResponseType;
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
  cancelToken: CancelToken | null = null,
  token: string | null = null
) {
  let option;
  if (!token) {
    option = requestOptionsWithoutAuth(url, cancelToken);
  } else {
    option = requestOptionsWithAuth(method, url, token, cancelToken);
  }
  return (await axios(option)) as ApiResponse<K>;
}

export async function axiosCallWithBody<K extends AllRequestResponseKeys>(
  method: MethodTypes,
  url: string,
  data: unknown,
  re: K,
  token: string | null = null,
  cancelToken: CancelToken | null = null
) {
  let option;
  if (!token) {
    option = requestPostOptionsWithAuth("POST", url, cancelToken, data);
  } else {
    option = requestOptionsWithAuth(method, url, token, cancelToken, data);
  }
  return (await axios(option)) as ApiResponse<K>;
}

export function useBlogPostTags() {
  const token = useGetToken();
  const dispatch = useAppDispatch();
  const tags = useGetState("tags");

  async function refetchBlogTags() {
    const endpoint = url("/blog-post/tags");

    const getBlogPostTags = async () => {
      try {
        const res = await axiosCall("GET", endpoint, "tags", null, token);
        dispatch(getTags(res?.data.tags ?? []));
      } catch (error) {
        console.log(error);
      }
    };
    getBlogPostTags();
  }

  useEffect(() => {
    let stale = false;
    const source = axios.CancelToken.source();

    const endpoint = url("/blog-post/tags");

    const getBlogPostTags = async () => {
      try {
        const res = await axiosCall("GET", endpoint, "tags", null, token);
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
      source.cancel("Request canceled by cleanup");
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
        const res = await axiosCall("GET", endpoint, "posts", null, token);
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
    const source = axios.CancelToken.source();
    setLoading(true);

    const endpoint = url(`/blog-post?page=${page}&limit=${limit}`);
    const getBlogPosts = async () => {
      try {
        const res = await axiosCall(
          "GET",
          endpoint,
          "posts",
          source.token,
          token
        );
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
      source.cancel("Request canceled by cleanup");
    };
  }, [token, dispatch, page]);
  return [loading, isRefetching, page, refetchBlogPost] as const;
}

type ObjectUpdateType = {
  type: string;
  value: string;
};

export const useHandleverify = (): [
  boolean,
  boolean,
  string,
  (O: ObjectUpdateType) => void
] => {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState<ObjectUpdateType>({ value: "", type: "" });

  function handleUpatetext(obj: ObjectUpdateType) {
    setValue(obj);
  }

  const handleVerifyEmail = async function (
    queryParams: string,
    type: string,
    source: CancelTokenSource,
    stale: boolean
  ) {
    setLoading(true);
    const endpoint = url(`/auth/verify?${type}=${queryParams}`);
    try {
      const data = await axiosCall(
        "GET",
        endpoint,
        "verify",
        source.token,
        null
      );
      if (!stale) {
        if (data) {
          setLoading(false);
          setConfirmed(true);
          setError("");
        }
      }
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      if (!stale) {
        setLoading(false);
        setConfirmed(false);
        setError(err.response?.data.message ?? "Error");
      }
    }
  };

  const debouncedFunc = _.debounce(handleVerifyEmail, 300);
  const checkValueTyped = useCallback(
    (s: string, k: string, t: CancelTokenSource, b: boolean) =>
      debouncedFunc(s, k, t, b),
    []
  );

  useEffect(() => {
    if (!value.value) return;

    const source = axios.CancelToken.source();
    let stale = false;
    checkValueTyped(value.value, value.type, source, stale);
    return () => {
      stale = true;
      source.cancel("Request canceled by cleanup");
    };
  }, [value, checkValueTyped]);

  return [loading, confirmed, error, handleUpatetext];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useSignUpuser = (): [boolean, (data: unknown) => Promise<any>] => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data: unknown) => {
    setLoading(true);
    const endpoint = url("/auth/signup");
    try {
      const res = await axiosCallWithBody(
        "POST",
        endpoint,
        data,
        "auth",
        null,
        null
      );
      console.log(res);
      setLoading(false);
      return res;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return [loading, handleRegister];
};
