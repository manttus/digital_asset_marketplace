import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Result {
  accessToken: string;
  refreshToken: string;
}
interface Body {
  email: string;
  pass: string;
  username?: string;
}

export const marketApi = createApi({
  reducerPath: "marketApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: Body) => ({
        url: "/user/signin",
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
  }),
});

export const { useLoginMutation, useRegisterMutation } = marketApi;
