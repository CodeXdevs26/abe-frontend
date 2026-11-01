import { baseApi } from "./baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => "/settings",
    }),
  }),
});

export const { useGetSettingsQuery } = settingsApi;