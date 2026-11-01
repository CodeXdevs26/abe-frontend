import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (data) => {
        return {
          url: "/reviews",
          method: "POST",
          body: data,
        };
      },
    }),
    getReviewStats: builder.query({
      query: (id) => {
        return {
          url: `/reviews/stats/${id}`,
          method: "GET",
        };
      },
    }),
    getProductsReview: builder.query({
      query: (id) => {
        return {
          url: `/reviews/${id}`,
          method: "GET",
        };
      },
    }),
  }),
})


export const { useCreateReviewMutation, useGetReviewStatsQuery, useGetProductsReviewQuery } = reviewApi;