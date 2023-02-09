import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../customBaseUrl";

interface Result {
  accessToken: String;
  refreshToken: String;
}
interface Body {
  email: String;
  pass: String;
  username?: String;
}

export const marketApi = createApi({
  reducerPath: "marketApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: Body) => ({
        url: "/user/signin",
        Headers: {
          authorization: "Heloo",
        },
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
        url: "/user/verifyOTP",
        method: "POST",
        body: credentials,
      }),
    }),
    resend: builder.mutation({
      query: (credentials: { email: string }) => ({
        url: "/user/resendOTP",
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
  useResendMutation,
} = marketApi;
