import bcrypt from "bcrypt";

export async function hash(password) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
}

export async function verify(password, hashPassword) {
    return bcrypt.compare(password, hashPassword);
}