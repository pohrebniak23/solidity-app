export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        message: "Wallet is connected successful",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        message: err.message,
      };
    }
  }
};
