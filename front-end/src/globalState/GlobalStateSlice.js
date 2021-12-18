import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase/firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { data } from "../assets/ServiceData/ServiceData";
// initializing firebase
const app = initializeApp(firebaseConfig);

// checking user sign in or not
export const checkUserSignInOrNot = createAsyncThunk(
  "global/getUser",
  async (thunkApi) => {
    const auth = getAuth();
    // const res = await onAuthStateChanged(auth, (user) => user);
    const res2 = await new Promise((resolved, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolved(user);
        }
      });
    });

    console.log(res2);
    return res2;
  }
);

// signing out user
export const googleSignOut = createAsyncThunk(
  "global/googleSignOut",
  async (thunkApi) => {
    const auth = getAuth();
    signOut(auth).then(() => {});
  }
);

// signing in user using goolge
export const googleSignIn = createAsyncThunk(
  "global/googleSingin",
  async (thunkApi) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider)
      .then((result) => {
        return result.user;
      })
      .catch((err) => console.log(err));

    return res;
  }
);

export const loadServiceData = createAsyncThunk(
  "global/getServices",
  async () => {
    const res = await fetch("http://127.0.0.1:4000/api/v1/services").then(
      (result) => result.json()
    );

    return res.services;
  }
);

// load single service

export const loadSingleService = createAsyncThunk(
  "global/getSingleService",
  async (id, thunkApi) => {
    const url = `http://127.0.0.1:4000/api/v1/services/${id}`;
    console.log(url);
    const service = await fetch(url).then((result) => result.json());

    return service.service;
  }
);

// creating order
export const createOrder = createAsyncThunk(
  "global/createOrder",
  async (info) => {
    const order = await fetch("http://127.0.0.1:4000/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    return order;
  }
);

export const getMyOrders = createAsyncThunk(
  "global/getMyOrders",
  async (userId) => {
    const url = `http://127.0.0.1:4000/api/v1/orders/${userId}`;
    const { orders } = await fetch(url).then((res) => res.json());
    console.log(orders);
    return orders;
  }
);

// initail state
const initialState = {
  services: [],
  user: null,
  isUserLoading: true,
  isDataLoading: true,
  isSingleServiceLoading: true,
  singleService: null,
  isOrderDataLoading: true,
  myOrders: [],
};

// creating slice
export const globalStateSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setServices: (state) => {},

    setOrderService: (state, { payload }) => {
      console.log(payload);
      state.orderService = { ...state.orderService, ...payload };
    },
  },
  extraReducers: {
    [googleSignIn.pending]: (state) => {
      console.log("Signin google");
      state.isUserLoading = true;
    },
    [googleSignIn.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isUserLoading = false;
    },
    [googleSignOut.pending]: () => {
      console.log("singout pending");
    },
    [googleSignOut.fulfilled]: (state, action) => {
      state.user = null;
    },
    [checkUserSignInOrNot.pending]: (state) => {
      console.log("on auth change pending");
      state.isUserLoading = true;
    },
    [checkUserSignInOrNot.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isUserLoading = false;
    },
    [loadServiceData.pending]: () => {
      console.log("Load data is pending");
    },
    [loadServiceData.fulfilled]: (state, { payload }) => {
      console.log("load data is fetched");
      state.services = [...payload];
      state.isDataLoading = false;
    },
    [loadServiceData.rejected]: () => {
      console.log("Load data is rejected");
    },
    [createOrder.pending]: () => {
      console.log("Order creation pending");
    },
    [createOrder.fulfilled]: () => {
      console.log("Order created");
    },
    [createOrder.rejected]: (err) => {
      console.log(err);
    },
    [loadSingleService.pending]: (state) => {
      state.isSingleServiceLoading = true;
    },
    [loadSingleService.fulfilled]: (state, { payload }) => {
      state.isSingleServiceLoading = false;
      state.singleService = payload;
    },
    [getMyOrders.pending]: (state) => {
      state.isOrderDataLoading = true;
    },
    [getMyOrders.fulfilled]: (state, { payload }) => {
      state.myOrders = payload;
      state.isOrderDataLoading = false;
    },
  },
});

export const { setServices, setOrderService } = globalStateSlice.actions;

export default globalStateSlice.reducer;
