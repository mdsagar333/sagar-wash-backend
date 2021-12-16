import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "../assets/ServiceData/ServiceData";
const initialState = {
  name: "sagar",
  value: 5,
  isLoading: true,
  services: [...data],
};

export const loadUserData = createAsyncThunk(
  "post/getPost",
  async (thunkApi) => {
    console.log(thunkApi, "thunkAPIs");
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => console.log(data));

    return res;
  }
);

export const globalStateSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    incrementValue: (state) => {
      state.value = state.value++;
    },
    setLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    changeName: (state) => {
      state.name = "somon";
    },
    setServices: (state) => {},
  },
  extraReducers: {
    [loadUserData.pending]: () => {
      console.log("pending");
    },
    [loadUserData.fulfilled]: (state, payload) => {
      console.log("Api called successful", state, payload);
    },
  },
});

export const { incrementValue, setLoading, changeName } =
  globalStateSlice.actions;

export default globalStateSlice.reducer;
