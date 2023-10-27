const crypto=require("crypto");

const{publicKey,privateKey}=crypto.generateKeyPairSync("rsa",{modulusLength:2048, });

const data="very sensitive data";

const encryptedData=crypto.publicEncrypt(
    {
        key:publicKey,
        padding:crypto.constants.RSA_PKSC1_QAEP_PADDING,
        qaephash:"sha256",
    },
    Buffer.from(data)
);
console.log("*****Public Key Crypto System*****");
console.log("Encrypted Data:",encryptedData.toString("base64"));

const decryptedData=crypto.privateDecrypt(
    {
        key:privateKey,
        padding:crypto.constants.RSA_PKSC1_QAEP_PADDING,
        qaephash:"sha256",
    },
    encryptedData
);

console.log("\nDecrypted Data:",decryptedData.toString());

const verifiableData="This Needs To Be Verified!";

const signature=crypto.sign("sha256",Buffer.from(verifiableData),{
    key:privateKey,
    padding:crypto.constants.RSA_PKSC1_QAEP_PADDING,
});

console.log(signature.toString("base64"));

const isVerified=crypto.verify(
    "sha256",
    Buffer.from(verifiableData),
    {
        key:publicKey,
        padding:crypto.constants.RSA_PKSC1_QAEP_PADDING,
    },
    signature
);

console.log("Signature Verified:",isVerified)
console.log("~By 4701 Abhang Mane");
