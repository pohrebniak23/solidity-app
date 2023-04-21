import "./App.css";
import { ConnectWalletButton } from "./components/ConnectWalletButton";
import { CreateGame } from "./components/CreateGame";
import { ListOfGames } from "./components/ListOfGames";

function App() {
  // const web3 = new Web3(
  //   "https://sepolia.infura.io/v3/3794e9e696aa41ccaa489a6e91c4333c"
  // );
  // const contractAddress = "0x54510D92184350bEf51da2e5aE4e829b84b829f9";
  // const myContract = new web3.eth.Contract(contractJson.abi, process.env.REACT_APP_CONTRACT_ADDRESS);

  async function getValue() {
    // const result = await myContract.methods;
    // console.log(result); // output the result to the console
  }
  // console.log(window.ethereum);

  // function handleAccountsChanged(accounts) {
  //   console.log("Calling HandleChanged");

  //   if (accounts.length === 0) {
  //     console.log("Please connect to MetaMask.");
  //     // $("#enableMetamask").html("Connect with Metamask");
  //   } else if (accounts[0] !== currentAccount) {
  //     currentAccount = accounts[0];
  //     $("#enableMetamask").html(currentAccount);
  //     $("#status").html("");

  //     if (currentAccount != null) {
  //       // Set the button label
  //       console.log('true');
  //     }
  //   }
  //   console.log("WalletAddress in HandleAccountChanged =" + walletAddress);
  // }
  // function connect() {
  //   console.log("Calling connect()");
  //   ethereum
  //     .request({ method: "eth_requestAccounts" })
  //     .then(handleAccountsChanged)
  //     .catch((err) => {
  //       if (err.code === 4001) {
  //         // EIP-1193 userRejectedRequest error
  //         // If this happens, the user rejected the connection request.
  //         console.log("Please connect to MetaMask.");
  //         console.log("You refused to connect Metamask")
  //       } else {
  //         console.error(err);
  //       }
  //     });
  // }

  // useEffect(() => {
  //   const provider = web3.providers;
  //   // const provider1 = new web3.providers.Web3Provider(window.ethereum, 'any');
  //   console.log(provider);
  //   // console.log(provider1)
  // }, []);

  return (
    <div className="App">
      <ConnectWalletButton />

      <CreateGame />

      <ListOfGames />
    </div>
  );
}

export default App;
