import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/login',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['profile']
    }),
    signUp: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/user-sign-up',
          method: 'POST',
          body: data
        }
      }
    }),
    sendOtp: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/send-otp',
          method: 'POST',
          body: data
        }
      }
    }),
    verifyOtp: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/verify-otp',
          method: 'POST',
          body: data
        }
      }
    }),
    setForgottenPassword: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/reset-forgotten-password',
          method: 'POST',
          body: data
        }
      }
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/change-password',
          method: 'POST',
          body: data
        }
      }
    }),
    googleLogin: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/google-login',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['profile']
    }),
  })
})

export const { useSignInMutation, useSignUpMutation, useVerifyOtpMutation, useSendOtpMutation, useSetForgottenPasswordMutation, useChangePasswordMutation , useGoogleLoginMutation} = authApi;