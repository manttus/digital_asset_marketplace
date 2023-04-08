import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../../customBaseUrl";

interface Result {
  accessToken: String;
  refreshToken: String;
}
interface Signup {
  user?: String;
  username?: String;
  pass?: String;
  postal?: String;
  address?: String;
  contact?: String;
  state?: String;
}

interface Signin {
  user: String;
  pass?: String;
  type: String;
  otp?: String;
}

type FormData = {
  username: string;
  phone: string;
  email: string;
  country: string;
  address: string;
  postal: string;
  id: string;
  backgroundImage: Buffer;
  profileImage: Buffer;
  followers: string[];
  following: string[];
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
      query: (credentials: { user: string; otp: string }) => ({
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
    update: builder.mutation({
      query: (data: FormData) => ({
        url: "/user/update",
        method: "POST",
        body: data,
      }),
    }),
    user: builder.mutation({
      query: (id: string) => ({
        url: `/user/get/${id}`,
        method: "GET",
      }),
    }),
    addCategory: builder.mutation({
      query: (data: {
        name: string;
        id: string;
        banner: string;
        wallet: string;
      }) => ({
        url: "user/addCategory",
        method: "POST",
        body: data,
      }),
    }),
    uploadImageUser: builder.mutation({
      query: (data: { id: string; type: string; image: any }) => ({
        url: "user/uploadImage",
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
  useUploadImageUserMutation,
} = marketApi;
