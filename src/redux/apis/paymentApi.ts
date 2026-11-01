import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentSession: builder.mutation({
      query: (body) => ({
        url: "/payments/create-payment-session",
        method: "POST",
        body,
      }),
      invalidatesTags: ["cart"]
    }),
    handlePaymentSuccess: builder.query({
      query: (data) => ({
        url: "/payments/handle-payment-success",
        method: "GET",
        params: data
      }),
    })
  }),
});

export const { useCreatePaymentSessionMutation, useHandlePaymentSuccessQuery } = paymentApi;