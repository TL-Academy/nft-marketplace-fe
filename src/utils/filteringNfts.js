function filterNfts(mintedNfts, listedNfts) {
    for (const mintedList in mintedNfts) {
        if (listedNfts[mintedList]) {
            for (const mintedNft of mintedNfts[mintedList]) {
                const isListed = listedNfts[mintedList].some(
                    (listedNft) => listedNft.tokenId === mintedNft.tokenId,
                );
                mintedNft.listed = isListed;
            }
        }
    }

    return mintedNfts;
}

export default filterNfts;
