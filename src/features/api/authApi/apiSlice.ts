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
} = marketApi;
