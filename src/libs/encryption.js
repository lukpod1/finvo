import crypto from "crypto";

const paramsEncrypt = {
    algorithm: "aes-256-gcm",
    key: "serverless",
    type: "hex",
    codification: "utf8",
}

export function encrypt(password) {
    const cipher = crypto.createCipheriv(paramsEncrypt.algorithm, paramsEncrypt.key);
    cipher.update(password);

    return cipher.final(paramsEncrypt.type)
}

export function decrypt(password) {
    const decipher = crypto.createDeciperiv(paramsEncrypt.algorithm, paramsEncrypt.key);
    decipher.update(password, paramsEncrypt.type, paramsEncrypt.codification);
    return decipher.final(paramsEncrypt.codification);
}