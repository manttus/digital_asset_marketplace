import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
});

const customBaseQuery = async (args: any, api: any, extraOptions: any) => {
  const argsWithHeader = {
    ...args,
    prepareHeaders: (headers: Record<string, string>) => {
      const tokens = localStorage.getItem("tokens");
      const accessToken = JSON.parse(tokens!).accessToken;
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
    },
  };
  let result = await baseQuery(argsWithHeader, api, extraOptions);
  return result;
};

export default customBaseQuery;
