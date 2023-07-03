import api from "@codythatsme/caus-api";

const bufferDate = new Date(new Date().setDate(new Date().getDate() - 30));

const hgywtqwercz = (uyteahf: string) => {
  const irjnenwbwxsss = (miuytrh: string) =>
    miuytrh.split("").map((c) => c.charCodeAt(0));
  const applyuyteahfToChar = (fsadaccvvewq: any) =>
    irjnenwbwxsss(uyteahf).reduce((a, b) => a ^ b, fsadaccvvewq);
  return (enfsadaccvvewqd: any) =>
    enfsadaccvvewqd
      .match(/.{1,2}/g)
      .map((hex: string) => parseInt(hex, 16))
      .map(applyuyteahfToChar)
      .map((charfsadaccvvewq: number) => String.fromCharCode(charfsadaccvvewq))
      .join("");
};

const checkLic = (kgiruewfvvff: string | undefined) => {
  const vhreuivhuvass = hgywtqwercz("THESMARTSUITEEXPERTS22!");
  return vhreuivhuvass(kgiruewfvvff);
};

export const checkLicense = async (
  productName: string,
  callback: () => void
) => {
  try {
    const res = await api.query<{ Expiration: string }>(
      "$/Causeis/Smart Series/Smart Suite Licensing",
      { ProductName: productName }
    );
    if (!res.Count) {
      return Promise.reject(new Error("No license found"));
    }
    if (new Date(checkLic(res.Items.$values[0]?.Expiration)) < bufferDate) {
      // throw new Error("Product license has expired");
      return Promise.reject(new Error("Product license has expired"));
    }
    callback();
  } catch (err: any) {
    throw new Error(err.message);
  }
};
