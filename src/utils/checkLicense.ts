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

const fixCookies = () => {
  const removeCookie = (name: string | undefined) => {
    if (!name) return;
    console.log(`Deleting cookie ${name}`);
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };
  const badCookies = document.cookie
    .split(";")
    .filter((cookie) => cookie.includes("/Reserved.Report"));
  badCookies.forEach((cookie) => removeCookie(cookie.split("=")[0]));
};

export const checkLicense = async (
  productName: string,
  setLicensed: React.Dispatch<React.SetStateAction<boolean | undefined>>
) => {
  fixCookies();
  try {
    const res = await api.query<{ Expiration: string }>(
      "$/Causeis/Smart Series/Smart Suite Licensing",
      {
        ProductName: productName,
      }
    );
    if (!res.Count) {
      setLicensed(false);
    }
    if (new Date(checkLic(res.Items.$values[0]?.Expiration)) < bufferDate) {
      // throw new Error("Product license has expired");
      setLicensed(false);
    }
    setLicensed(true);
  } catch (err: any) {
    throw new Error(err.message);
  }
};
