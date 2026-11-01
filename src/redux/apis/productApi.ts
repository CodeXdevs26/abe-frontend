import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => {
        return {
          url: "/products",
          method: "GET",
          params
        };
      },
      providesTags: ["product"],
    }),
    getSingleProduct: builder.query({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "GET"
        };
      },
      providesTags: ["product"],
    }),
    getCategories: builder.query({
      query: () => {
        return {
          url: `/categories`,
          method: "GET"
        };
      },
      providesTags: ["category"],
    }),
  }),
})


export const { useGetProductsQuery, useGetSingleProductQuery, useGetCategoriesQuery } = productApi;