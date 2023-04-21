export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          message: "Wallet is connected successful",
        };
      } else {
        return {
          address: "",
          message: "Wallet is not connected",
        };
      }
    } catch (err) {
      return {
        address: "",
        message: err.message,
      };
    }
  } else {
    return {
      address: "",
      message: "",
    };
  }
};