import { apiSlice } from './apiSlice';

// Reemplaza la URL correcta de tus servicios de valores de tipo

const TYPE_VALUES_URL = 'http://localhost:10000/api/type-value';
//const TYPE_VALUES_URL = 'https://mern-b1-vrcl.vercel.app/api/type-value';

export const typeValuesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // addTypeValue: builder.mutation({
    //   query: (data, token) => ({
    //     url: `${TYPE_VALUES_URL}/add-type-value`,
    //     method: 'POST',
    //     body: data,
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }),
    // }),
    
    addTypeValue: builder.mutation({
      query: (data) => ({
        url: `${TYPE_VALUES_URL}/add-type-value`,
        method: 'POST',
        body: data,
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTBkMzJmOTYzODZkYjBiNzBkMDk0NWUiLCJpYXQiOjE2OTYxMzUzMDEsImV4cCI6MTY5ODcyNzMwMX0.VzpwJiQAvRmc0G3WZzlpTMzSeYWYmhVhWKkVuxN_sKQ`,
          },
      }),
    }),

    // updateTypeValue: builder.mutation({
    //   query: (id, data ) => ({
    //     url: `${TYPE_VALUES_URL}/update-type-value/${id}`,
    //     method: 'PUT',
    //     body: data,
    //     headers: {
    //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTBkMzJmOTYzODZkYjBiNzBkMDk0NWUiLCJpYXQiOjE2OTYxMzUzMDEsImV4cCI6MTY5ODcyNzMwMX0.VzpwJiQAvRmc0G3WZzlpTMzSeYWYmhVhWKkVuxN_sKQ`,
    //     },
    //   }),
    // }),

    // updateTypeValue: builder.mutation({
    //     query: ({ id, data }) => ({
    //       url: `${TYPE_VALUES_URL}/update-type-value/${id}`,
    //       method: 'PUT',
    //       body: data,
    //       headers: {
    //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTBkMzJmOTYzODZkYjBiNzBkMDk0NWUiLCJpYXQiOjE2OTYxMzUzMDEsImV4cCI6MTY5ODcyNzMwMX0.VzpwJiQAvRmc0G3WZzlpTMzSeYWYmhVhWKkVuxN_sKQ`,
    //       },
    //     }),
    //   }),


      updateTypeValue: builder.mutation({
        query: ({ id, data }) => ({
          url: `${TYPE_VALUES_URL}/update-type-value/${id}`,
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', // Agregar encabezado Content-Type
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTBkMzJmOTYzODZkYjBiNzBkMDk0NWUiLCJpYXQiOjE2OTYxMzUzMDEsImV4cCI6MTY5ODcyNzMwMX0.VzpwJiQAvRmc0G3WZzlpTMzSeYWYmhVhWKkVuxN_sKQ`,
          },
          body: JSON.stringify(data), // Asegurarse de convertir el objeto data a JSON
        }),
      }),
      
      

    deleteTypeValue: builder.mutation({
      query: (id) => ({
        url: `${TYPE_VALUES_URL}/delete-type-value/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTBkMzJmOTYzODZkYjBiNzBkMDk0NWUiLCJpYXQiOjE2OTYxMzUzMDEsImV4cCI6MTY5ODcyNzMwMX0.VzpwJiQAvRmc0G3WZzlpTMzSeYWYmhVhWKkVuxN_sKQ`,
        },
      }),
    }),
    
    getTypeValue: builder.query({
      query: (id, token) => ({
        url: `${TYPE_VALUES_URL}/get-type-value/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    // getTypeValuesByUserId: builder.query({
    //   query: (idUsuario, token) => ({
    //     url: `${TYPE_VALUES_URL}/get-type-values/650d32f96386db0b70d0945e`,
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    //   }),
    // }),


    getTypeValuesByUserId: builder.query({
        query: (idUsuario) => ({
          url: `${TYPE_VALUES_URL}/get-type-values/${idUsuario}`,
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTBkMzJmOTYzODZkYjBiNzBkMDk0NWUiLCJpYXQiOjE2OTYxMzUzMDEsImV4cCI6MTY5ODcyNzMwMX0.VzpwJiQAvRmc0G3WZzlpTMzSeYWYmhVhWKkVuxN_sKQ`,
          },
        }),
      }),
      
  }),
});

export const {
  useAddTypeValueMutation,
  useUpdateTypeValueMutation,
  useDeleteTypeValueMutation,
  useGetTypeValueQuery,
  useGetTypeValuesByUserIdQuery,
} = typeValuesApiSlice;
