import dayjs from "dayjs";

import {
  TagState,
  useAppStore,
  type AuthState,
  type PostState,
} from "../redux";

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

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

export interface SignInUserType {
  token: string;
  user: UserType;
}

export const url = (endpoint: string) =>
  `${import.meta.env.VITE_BASEURL!}${endpoint}`;

type MethodTypes = "GET" | "POST" | "PUT" | "DELETE";
type StateTypes = {
  auth: AuthState;
  tags: TagState;
  posts: PostState;
};
type GetStateProps = keyof StateTypes;
// custom options for get request

export function useGetState<K extends GetStateProps>(
  stateName: K
): StateTypes[K] {
  return useAppStore().getState()[stateName];
}
export const requestOptionsWithoutAuth = (url: string) => ({
  method: "GET",
  url,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const requestOptionsWithAuth = (
  method: MethodTypes,
  url: string,
  token: string
) => ({
  method: method,
  url,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Api-Key": token,
  },
});

export const formatDate = (date: string, format = "D MMM, YYYY hh:mm a") => {
  return dayjs(date).format(format);
};
