const handleWalletAddress = (wallet) => {
    const walletAddress = wallet.accounts[0].address;
    const shortWalletAddress = `${walletAddress.substring(0, 6)}...${walletAddress.slice(-4)}`;
    return shortWalletAddress;
};

export default handleWalletAddress;
