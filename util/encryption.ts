import Cryptr from "cryptr";

export function encrypt(text: string) {
  if(text === undefined || text === null) {
    throw new Error("Text is undefined.");
  }
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
  if(encryptedString === undefined || encryptedString === null) {
    throw new Error("Encrypted string is undefined.");
  }
  const secretKey = process.env.NEXTAUTH_SECRET;
  if (secretKey !== undefined) {
    const cryptr = new Cryptr(secretKey);

    const text = cryptr.decrypt(encryptedString);
    return text;
  } else {
    throw new Error("NEXTAUTH_SECRET is not set.");
  }
}
