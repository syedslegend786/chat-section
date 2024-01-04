import { faker } from '@faker-js/faker'
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
export const CURRENT_USERNAME = 'salleh'
interface ChatState {
  user: {
    userId: string
    profileImage: string
    username: string
  }
}

// Define the initial state using that type
const initialState: ChatState = {
  user: {
    profileImage: faker.image.avatar(),
    userId: uuid(),
    username: CURRENT_USERNAME
  }
}

export const chatSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
})

export const {} = chatSlice.actions

export default chatSlice.reducer
