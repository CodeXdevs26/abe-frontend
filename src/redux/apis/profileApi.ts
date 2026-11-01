import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => {
        return {
          url: "/users/profile",
          method: "GET",
        }
      },
      providesTags: ["profile"]
    }),
    getMyBillingAddress: builder.query({
      query: () => {
        return {
          url: "/billing-address",
          method: "GET",
        }
      }
    }),
    updateBillingAddress: builder.mutation({
      query: (data) => {
        return {
          url: `/billing-address`,
          method: "PUT",
          body: data
        }
      },
      invalidatesTags: ["billing"],
    }),
    updateProfile: builder.mutation({
      query: (data) => {
        return {
          url: "/users",
          method: "PUT",
          body: data
        }
      },
      invalidatesTags: ["profile"]
    }),
  }),
})

export const { useGetMeQuery, useGetMyBillingAddressQuery, useUpdateProfileMutation, useUpdateBillingAddressMutation } = profileApi;