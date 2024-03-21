import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { apiSlice } from "../../api/apiSlice"

const mapItemAdapter = createEntityAdapter({})

const initialState = mapItemAdapter.getInitialState()

export const mapItemApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllMapItems: builder.query({
      query: () => ({
        url: "all-map-items",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        }
      }),
      transformResponse: responseData => {
        return mapItemAdapter.setAll(initialState, responseData.data)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "mapItems", id: "LIST" },
            ...result.ids.map(id => ({ type: "mapItems", id }))
          ]
        } else return [{ type: "mapItems", id: "LIST" }]
      }
    }),
    addMapItem: builder.mutation({
      query: credentials => ({
        url: "add-map-item",
        method: "POST",
        body: { ...credentials },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        }
      }),
      invalidatesTags: [{ type: "mapItems", id: "LIST" }]
    })
  })
})

export const { useGetAllMapItemsQuery, useAddMapItemMutation } = mapItemApiSlice

export const selectMapItemsResult =
  mapItemApiSlice.endpoints.getAllMapItems.select()

const selectMapItemsData = createSelector(
  selectMapItemsResult,
  MapItemsResult => MapItemsResult.data
)

export const {
  selectAll: selectAllMapItemss,
  selectById: selectMapItemById,
  selectIds: selecttMapItemIds
} = mapItemAdapter.getSelectors(
  state => selectMapItemsData(state) ?? initialState
)
