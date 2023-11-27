export default async function getSignature(msg) {
    const bigInt = getBigInt();
    const encoder = new TextEncoder();
    const data = encoder.encode(`${bigInt}${Date.now()}${msg}`);
    const buffer = await window.crypto.subtle.digest('SHA-256', data);
    const arr = Array.from(new Uint8Array(buffer));
    const signature = arr.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return [signature, msg]
}

function getBigInt() {
    const array = new Uint32Array(4);
    window.crypto.getRandomValues(array);
    const hexString = Array.from(array, (byte) => byte.toString(16).padStart(8, '0')).join('');
    return BigInt(`0x${hexString}`);
}