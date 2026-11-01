import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: "/orders",
          method: "POST",
          body: data
        }
      },
      invalidatesTags: ["order", "cart"],
    }),
    getMyOrders: builder.query({
      query: () => {
        return {
          url: "/orders/user?fields=total createdAt status payment_status  order_id",
          method: "GET",
        }
      },
      providesTags: ["order"],
    }),
    getSingleOrder: builder.query({
      query: (id: string) => {
        return {
          url: `/orders/${id}`,
          method: "GET",
        }
      },
      providesTags: ["order"],
    }),
  }),
})

export const { useGetMyOrdersQuery, useGetSingleOrderQuery, useCreateOrderMutation } = orderApi;