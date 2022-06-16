import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const todoApi = createApi({
    reducerPath: 'todoApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3002/',
    }),

    endpoints: (builder) => ({
        getTodoById: builder.mutation({
            query: (id) => {
                console.log("ID:", id)
                return {
                    url: `todos/${id}`,
                    method: 'GET'
                }
            }
        }),
        deleteTodo: builder.mutation({
            query: (tid) => {
                console.log("Delete ID:", tid)
                return {
                    url: `todos/${tid}`,
                    method: 'DELETE'
                }
            }
        }),
        createTodo: builder.mutation({
            query: (newData) => {
                const { content, times } = newData;
                let date = new Date(times);
                date.toLocaleString();
                const newsdata = { content, times }
                console.log(newsdata);
                return {
                    url: 'todo',
                    method: 'POST',
                    body: newsdata,
                }
            }
        }),

        updateTodo: builder.mutation({
            query: (updatePostData) => {
                console.log("Update Post: ", updatePostData)
                const { id, content, times } = updatePostData;
                const actualUpdateData = { content, times };
                return {
                    url: `todos/${id}`,
                    method: 'PUT',
                    body: actualUpdateData,
                }
            }
        }),
    }),

})

export const {  useDeleteTodoMutation, useCreateTodoMutation, useUpdateTodoMutation, useGetTodoByIdMutation } = todoApi