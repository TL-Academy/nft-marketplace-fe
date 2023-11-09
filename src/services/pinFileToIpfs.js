const baseUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const jwtToken = import.meta.env.VITE_PINATA_JWT;

async function pinFileToIpfs(file) {
    const pinataFormData = new FormData();
    pinataFormData.append('file', file);
    pinataFormData.append('pinataOptions', JSON.stringify({ cidVersion: 0 }));

    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            body: pinataFormData,
            maxBodyLength: 'Infinity',
        });
        const data = await response.json();
        if (response.status === 200) {
            return data.IpfsHash;
        }
    } catch (error) {
        console.error('Error pinning file to IPFS:', error);
    }
}

export default pinFileToIpfs;
