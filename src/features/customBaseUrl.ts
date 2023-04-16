import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
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
      return headers;
    },
  };
  let result = await baseQuery(argsWithHeader, api, extraOptions);
  return result;
};

export default customBaseQuery;
