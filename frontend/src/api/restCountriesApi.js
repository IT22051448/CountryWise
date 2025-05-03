import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const restCountriesApi = createApi({
  reducerPath: 'restCountriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v3.1' }),
  endpoints: (builder) => ({
    getAllCountries: builder.query({
      query: () => '/all',
    }),
    getCountriesByName: builder.query({
      query: (name) => `/name/${encodeURIComponent(name)}`,
    }),
    getCountriesByExactName: builder.query({
      query: (name) => `/name/${encodeURIComponent(name)}?fullText=true`,
    }),
    getCountriesByRegion: builder.query({
      query: (region) => `/region/${encodeURIComponent(region)}`,
    }),
    getCountriesByLanguage: builder.query({
      query: (lang) => `/lang/${encodeURIComponent(lang)}`,
    }),
  }),
});

export const {
  useGetAllCountriesQuery,
  useGetCountriesByNameQuery,
  useGetCountriesByExactNameQuery,
  useGetCountriesByRegionQuery,
  useGetCountriesByLanguageQuery,
  useLazyGetCountriesByNameQuery,
  useLazyGetCountriesByExactNameQuery,
  useLazyGetCountriesByRegionQuery,
  useLazyGetCountriesByLanguageQuery,
} = restCountriesApi;
