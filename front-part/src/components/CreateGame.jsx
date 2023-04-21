import { useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import { getAddress, getContract } from "../slices/contractSlice";

export const CreateGame = () => {
  const [value, setValue] = useState();
  const [error, setError] = useState(false);
  const contract = useSelector(getContract);
  const address = useSelector(getAddress);
  console.log(contract);

  const newGame = async () => {
    if (value > 0) {
      contract.methods.newGame().send({
        value: Web3.utils.toWei(value),
        from: address,
      });

      setError(false);
    } else {
      setError(true);
    }
  };

  

  const getAmount = async () => {
    const data = await contract.methods.amount().call();
    const player1 = await contract.methods.player1().call();
    const player2 = await contract.methods.player2().call();
    console.log(data, player1, player2);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      {error && <p>Enter amount value</p>}
      <button onClick={() => newGame()}>New game</button>
      <button onClick={() => getAmount()}>get amount</button>
    </div>
  );
};
