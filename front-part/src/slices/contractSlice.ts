import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface ContractSlice {
  contract: any;
  address: string;
}

const initialState: ContractSlice = {
  contract: null,
  address: "",
};

export const contractSlice = createSlice({
  name: "contractSlice",
  initialState,
  reducers: {
    setContract: (state, action: PayloadAction<any>) => {
      state.contract = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
});

export const { setContract, setAddress } = contractSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getContract = (state: RootState) => state.contract.contract;
export const getAddress = (state: RootState) => state.contract.address;

export default contractSlice.reducer;
