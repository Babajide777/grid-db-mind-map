import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../Features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().reducer.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery("refresh", api, extraOptions);

    if (refreshResult?.data) {
      let data = refreshResult?.data;

      // store the new token
      api.dispatch(
        setCredentials({
          user: data.data.user,
          token: data.data.accessToken,
        })
      );

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired.";
        api.dispatch(logOut());
        dispatch(apiSlice.util.resetApiState());
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["mapItems"],
  endpoints: (builder) => ({}),
});
