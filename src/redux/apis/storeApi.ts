import { baseApi } from "./baseApi";

const storeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query({
      query: (params) => {
        return {
          url: "/stores",
          method: "GET",
          params
        };
      },
      providesTags: ["store"],
    }),
    getSingleStores: builder.query({
      query: (id) => {
        return {
          url: `/stores/${id}`,
          method: "GET",
        };
      },
      providesTags: ["store"],
    })
  }),
})


export const { useGetStoresQuery, useGetSingleStoresQuery } = storeApi;