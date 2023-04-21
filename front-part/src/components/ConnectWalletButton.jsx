import React, { useEffect, useState } from "react";
import { getCurrentWalletConnected } from "../extra/getCurrentWalletConnected";
import { connectWallet } from "../extra/connectWallet";
import { useAppDispatch } from "../hooks/hooks";
import { getAddress, setAddress, setContract } from "../slices/contractSlice";
import contractJson from "../contract/contract.json";
import Web3 from "web3";
import { useSelector } from "react-redux";

export const ConnectWalletButton = () => {
  const dispatch = useAppDispatch();
  const address = useSelector(getAddress);

  const connectWalletHandler = async () => {
    const connectedData = await connectWallet();

    dispatch(setAddress(connectedData?.address));
  };

  useEffect(() => {
    async function checkIsConnected() {
      const { address, status } = await getCurrentWalletConnected();

      const web3 = new Web3(window.ethereum);
      const myContract = new web3.eth.Contract(
        contractJson.abi,
        process.env.REACT_APP_CONTRACT_ADDRESS
      );

      dispatch(setContract(myContract));
      dispatch(setAddress(address))
      setAddress(address);
    }

    checkIsConnected();
  }, []);

  return address.length > 0 ? (
    <button>Wallet {address}</button>
  ) : (
    <button onClick={() => connectWalletHandler()}>Connect wallet</button>
  );
};
