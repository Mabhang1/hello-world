const crypto = require("crypto");
// The generatekeyPairSync method accepts two arguments:
// 1. The type ok keys we want, which in this case is "rsa"
// 2. An object with the properties of the key
const { publickey, privatekey } = crypto.generateKeyPairSync("rsa", {
// The standard secure default length for RSA keys is 2048 bits
modulusLength: 2048,
});
// use the public and private keys
//This is the data we want to encrypt
const data = "my secret data";
const encryptedData = crypto.publicEncrypt(
{
key: publickey,
padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
oaepHash: "sha256",
},
Buffer.from(data)
);
// The encrypted data is in the form of bytes, so we print it in base64 format
// so that it's displayed in a more readable form
console.log("Encrypted Data: ", encryptedData.toString("base64"));
const decryptedData = crypto.privateDecrypt(
{
key: privateKey,
padding: crypto.constants.RSA_PKCS1_0AEP_PADDING,
oaepHash: "sha256",
},
encryptedData
);
console.log("Decrypted Data: ", decryptedData.toString());
const verifiableData = "This Needs To Be Verified";
// The signature method takes the data we want to sign, the
//hashing algorithm, and the padding scheme, and generates
// signature in the form of bytes
const signature = crypto.sign("sha256", Buffer.from(verifiableData), {
key: privateKey,
padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
});
//BLOCKCHAIN &CRYPTOCURRENCY
console.log(signature.toString("base64"));
//To verify the data, we provide the same hashing algorithm and
// padding scheme we provided to generate the signature, along
// with the signature itself, the data that we want to
// verify against the signature, and the public key
const isVerified = crypto.verify(
"sha256",
Buffer.from(verifiableData),
{
//signature
key: publickey,
padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
},
signature
);
// 1sVerified should be true if the signature is valid
console.log("Signature Verified: ", isVerified);
