import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../customBaseUrl";

interface Result {
  accessToken: String;
  refreshToken: String;
}
interface Body {
  user: String;
  pass?: String;
  username?: String;
  type: String;
}

export const marketApi = createApi({
  reducerPath: "marketApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: Body) => ({
        url: "/user/signin",
        token: "include",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials: Body) => ({
        url: "/user/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    verify: builder.mutation({
      query: (credentials: { email: string; otp: string }) => ({
        url: "/otp/verifyOTP",
        method: "POST",
        body: credentials,
      }),
    }),
    send: builder.mutation({
      query: (credentials: { user: string }) => ({
        url: "/otp/sendOTP",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useSendMutation,
} = marketApi;
