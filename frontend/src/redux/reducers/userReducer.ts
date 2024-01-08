import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  firstName: string,
  lastName: string,
  email: string,
} 
interface UserState {
  user: User | null
}

const initialState: UserState = {
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    deleteUser: (state) => {
      state.user = null
    }
  }
})

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;