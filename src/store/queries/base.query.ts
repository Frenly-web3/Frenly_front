import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://jsonplaceholder.typicode.com/',
  mode: 'cors',
})
