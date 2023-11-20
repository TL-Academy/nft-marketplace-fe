const baseUrl = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
const jwtToken = import.meta.env.VITE_PINATA_JWT;

async function pinJsonToIpfs(name, description, IpfsHash) {
    try {
        const data = JSON.stringify({
            pinataContent: {
                name,
                description,
                image: `ipfs://${IpfsHash}`,
            },
            pinataMetadata: {
                name,
            },
        });
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
            body: data,
        });
        return response;
        // const resData = await response.json();
    } catch (err) {
        console.log(err);
    }
}

export default pinJsonToIpfs;
