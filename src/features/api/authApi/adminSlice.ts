import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../customBaseUrl";
export const adminApi = createApi({
  reducerPath: "admin",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { username: string; password: string }) => ({
        url: "/admin/signin",
        token: "include",
        method: "POST",
        body: credentials,
      }),
    }),
    users: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
    }),

    transaction : builder.query({
        query: () => ({
            url: "/admin/transactions",
            method: "GET",
  }),
});
export const { useLoginMutation, useUsersQuery } = adminApi;
