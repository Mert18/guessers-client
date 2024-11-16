import Cryptr from "cryptr";

export function encrypt(text: string) {
  const secretKey: string | undefined = process.env.NEXTAUTH_SECRET;

  if (secretKey !== undefined) {
    const cryptr = new Cryptr(secretKey);

    const encryptedString = cryptr.encrypt(text);
    return encryptedString;
  } else {
    throw new Error("NEXTAUTH_SECRET is not set.");
  }
}

export function decrypt(encryptedString: string) {
  const secretKey = process.env.NEXTAUTH_SECRET;
  if (secretKey !== undefined) {
    const cryptr = new Cryptr(secretKey);

    const text = cryptr.decrypt(encryptedString);
    return text;
  } else {
    throw new Error("NEXTAUTH_SECRET is not set.");
  }
}
