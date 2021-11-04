import crypto from "crypto";

const paramsEncrypt = {
    algorithm: "aes-256-gcm",
    key: "pppppppppppppppppppppppppppppppp"
}

export function encrypt(password) {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv(paramsEncrypt.algorithm, Buffer.from(paramsEncrypt.key), iv);

    const encryptedPassword = Buffer.concat([
        cipher.update(password),
        cipher.final(),
    ]);

    return {
        iv: iv.toString("hex"),
        password: encryptedPassword.toString("hex"),
    };
}

export function decrypt(encryption) {
    const decipher = crypto.createDecipheriv(paramsEncrypt.algorithm, Buffer.from(paramsEncrypt.key), Buffer.from(encryption.iv, "hex"));

    const decryptedPassword = Buffer.concat([
        decipher.update(Buffer.from(encryption.password, "hex")),
        decipher.final(),
    ]);

    return decryptedPassword.toString();
}