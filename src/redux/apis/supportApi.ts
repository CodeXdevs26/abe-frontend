import { baseApi } from "./baseApi";

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (body) => ({
        url: "/supports",
        method: "POST",
        body
      }),
    }),
  }),
});

export const { useSendMessageMutation } = supportApi;