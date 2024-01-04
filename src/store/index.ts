import { configureStore } from '@reduxjs/toolkit'
import chats from './slices/chat.slice'
import auth from './slices/user.slice'
import { Store } from 'redux'
// ...
// @ts-ignore
export const store: Store = configureStore({
  reducer: {
    chats,
    auth
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
