// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { API_URL } from '../../http';

// export const usersApi = createApi({
//   reducerPath: 'usersApi',
//   baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
//   endpoints: (build) => ({
//     getUsers: build.query({
//       query: () => ({
//         url: '/users/allUsers',
//         headers: {
//           authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       }),
//     }),
//   }),
// });

// export const { useGetUsersQuery } = usersApi;
