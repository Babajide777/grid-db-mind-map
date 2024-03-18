import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const adminAdapter = createEntityAdapter({});

const initialState = adminAdapter.getInitialState();

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: () => ({
        url: "admin/admin/all",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedAdmins = responseData.data.map((admin) => {
          admin.id = admin._id;
          return admin;
        });
        return adminAdapter.setAll(initialState, loadedAdmins);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "admins", id: "LIST" },
            ...result.ids.map((id) => ({ type: "admins", id })),
          ];
        } else return [{ type: "admins", id: "LIST" }];
      },
    }),
    addAdmin: builder.mutation({
      query: (credentials) => ({
        url: "admin/auth/signup",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: [{ type: "admins", id: "LIST" }],
    }),
  }),
});

export const { useGetAllAdminsQuery, useAddAdminMutation } = adminApiSlice;

export const selectAdminsResult = adminApiSlice.endpoints.getAllAdmins.select();

const selectAdminsData = createSelector(
  selectAdminsResult,
  (adminsResult) => adminsResult.data
);

export const {
  selectAll: selectAllAdmins,
  selectById: selectAdminById,
  selectIds: selectAdminsIds,
} = adminAdapter.getSelectors(
  (state) => selectAdminsData(state) ?? initialState
);
