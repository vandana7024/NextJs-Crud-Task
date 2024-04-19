// redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, newData } = action.payload;
      const index = state.users.findIndex((user) => user.id === id);
      console.log("index", index, id, newData);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...newData };
      }
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
    },
    // No need to modify setUser and selectUser
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

export const selectUsers = (state) => state.user.users;

export default userSlice.reducer;
