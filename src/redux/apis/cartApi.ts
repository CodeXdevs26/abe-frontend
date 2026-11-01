import { baseApi } from "./baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCarts: build.query({
      query: (params) => ({
        url: "/carts",
        method: "GET",
        params
      }),
      providesTags: ["cart"],
    }),
    addToCart: build.mutation({
      query: (body) => {
        return {
          url: "/carts",
          method: "POST",
          body,
        }
      },
      invalidatesTags: ["cart"]
    }),
    increaseCartQuantity: build.mutation({
      query: (id) => {
        return {
          url: `/carts/increase/${id}`,
          method: "PATCH",
        }
      },
      invalidatesTags: ["cart"]
    }),
    decreaseCartQuantity: build.mutation({
      query: (id) => {
        return {
          url: `/carts/decrease/${id}`,
          method: "PATCH",
        }
      },
      invalidatesTags: ["cart"]
    }),
    deleteCart: build.mutation({
      query: (id) => {
        return {
          url: `/carts/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ["cart"]
    }),
  }),
})

export const { useGetCartsQuery, useAddToCartMutation, useIncreaseCartQuantityMutation, useDecreaseCartQuantityMutation, useDeleteCartMutation } = cartApi;