import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getContract, getAddress } from "../slices/contractSlice";
import Web3 from "web3";

interface GameProps {
  player: string;
  amount: string;
  id: string;
}

export const ListOfGames = () => {
  const [games, setGames] = useState<GameProps[]>();
  const contract = useSelector(getContract);
  const address = useSelector(getAddress);

  useEffect(() => {
    const getGames = async () => {
      // const { address, status } = await getCurrentWalletConnected();
      // console.log(address.length, status);
      // const web3 = new Web3(window.ethereum);
      // const contractAddress = "0x54510D92184350bEf51da2e5aE4e829b84b829f9";
      // const myContract = new web3.eth.Contract(
      //   contractJson.abi,
      //   process.env.REACT_APP_CONTRACT_ADDRESS
      // );
      const data = await contract.methods.getAllGames().call();
      setGames(data);
      const player1 = await contract.methods.player1().call();
      const player2 = await contract.methods.player2().call();
      console.log(data, player1, player2);
    };

    if (contract && contract.methods) {
      getGames();
    }
  }, [contract?.methods]);

  const playGame = async (amount: string, id: string) => {
    contract.methods.play(id).send({
      value: amount,
      from: address,
    });
  };

  const deleteGame = (id: string) => {
    contract.methods.deleteGame(id).call();
  };

  return games?.map((item) => (
    <div
      key={item.player}
      style={{ border: "1px solid #fff", width: "300px", overflow: "hidden" }}
    >
      <div className="">Amount: {Web3.utils.fromWei(item.amount)}ETH</div>

      <div className="">Player: {item.player}</div>

      <div className="">Id: {item.id}</div>
      {address.toLowerCase() !== item.player.toLowerCase() && (
        <button onClick={() => playGame(item.amount, item.id)}>
          Play game
        </button>
      )}

      {address.toLowerCase() === item.player.toLowerCase() && (
        <button onClick={() => deleteGame(item.id)}>Delete</button>
      )}
    </div>
  ));
};
