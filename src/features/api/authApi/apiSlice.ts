import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../customBaseUrl";

type Signup = {
  email: String;
  address: String;
  username: String;
};

interface Signin {
  address: String;
}

type FormData = {
  id: string;
  coverImage?: string;
  profileImage?: string;
  username?: string;
  twitter?: string;
  instagram?: string;
};

export const marketApi = createApi({
  reducerPath: "marketApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: Signin) => ({
        url: "/user/signin",
        token: "include",
        method: "POST",
        body: credentials,
      }),
    }),
    adminLogin: builder.mutation({
      query: (credentials: { username: string; password: string }) => ({
        url: "/user/admin/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials: Signup) => ({
        url: "/user/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    verify: builder.mutation({
      query: (credentials: { email: string; otp: string }) => ({
        url: "/otp/verify",
        method: "POST",
        body: credentials,
      }),
    }),
    send: builder.mutation({
      query: (credentials: { email: string; address: string }) => ({
        url: "/otp/send",
        method: "POST",
        body: credentials,
      }),
    }),
    update: builder.mutation({
      query: (data: FormData) => ({
        url: "/user/update",
        method: "PATCH",
        body: data,
      }),
    }),
    user: builder.mutation({
      query: (id: string) => ({
        url: `/user/get/${id}`,
        method: "GET",
      }),
    }),
    minters: builder.mutation({
      query: (address: string) => ({
        url: `/user/get/${address}`,
        method: "GET",
      }),
    }),
    addCategory: builder.mutation({
      query: (data: {
        name: string;
        id: string;
        banner: string;
        avatar: string;
        type: string;
      }) => ({
        url: "user/addCategory",
        method: "POST",
        body: data,
      }),
    }),
    follow: builder.mutation({
      query: (data: {
        id: string | null;
        followId: string;
        status: string;
      }) => ({
        url: "user/follow",
        method: "PATCH",
        body: data,
      }),
    }),
    messages: builder.mutation({
      query: (data: { senderId: string; receiverId: string }) => ({
        url: "user/messages",
        method: "POST",
        body: data,
      }),
    }),
    getMessageUser: builder.mutation({
      query: (id: string) => ({
        url: `user/getMessageUser/${id}`,
        method: "GET",
      }),
    }),
    postFeed: builder.mutation({
      query: (data: {
        id: string;
        token_id: string;
        token_name: string;
        token_url: string;
      }) => ({
        url: "user/post",
        method: "POST",
        body: data,
      }),
    }),
    getPosts: builder.mutation<any, void>({
      query: () => ({
        url: "user/getPosts",
        method: "GET",
      }),
    }),
    postLike: builder.mutation<
      any,
      {
        id: string;
        postId: string;
        indi: string;
        owner: string;
      }
    >({
      query: (data: {
        id: string;
        postId: string;
        indi: string;
        owner: string;
      }) => ({
        url: "user/like",
        method: "PATCH",
        body: data,
      }),
    }),
    getUsers: builder.mutation<any, void>({
      query: () => ({
        url: "/admin/getUsers",
        method: "GET",
      }),
    }),
    disableUser: builder.mutation<any, { id: string }>({
      query: (data: { id: string }) => ({
        url: `/admin/disableUser/${data.id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useSendMutation,
  useUpdateMutation,
  useUserMutation,
  useAddCategoryMutation,
  useMintersMutation,
  useFollowMutation,
  useMessagesMutation,
  useGetMessageUserMutation,
  usePostFeedMutation,
  useGetPostsMutation,
  usePostLikeMutation,
  useGetUsersMutation,
  useDisableUserMutation,
} = marketApi;
