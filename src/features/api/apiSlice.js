import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3500'
    }),
    tagTypes: ['Todos', 'Users'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
            transformResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ['Todos']
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']
        }),
        getUsers: builder.query({
            query: () => '/users',
            providesTags: ['Users']
        }),
        addUser: builder.mutation({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Users']
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: 'PATCH',
                body: user
            }),
            invalidatesTags: ['Users']
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
    useGetUsersQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = apiSlice