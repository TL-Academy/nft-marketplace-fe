const baseUrl = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
const jwtToken = import.meta.env.VITE_PINATA_JWT;

async function pinJsonToIpfs({ name, description, IpfsHash }) {
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
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
            body: data,
        });
        // const resData = await response.json();
    } catch (err) {
        console.log(err);
    }
}

export default pinJsonToIpfs;
