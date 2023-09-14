import api from "@codythatsme/caus-api";
import { ProductSettings, iPartSettings } from "../types/Settings";

export const getIpartSettings = async () => {
  const contentKey = document.querySelector<any>("#x-contentKey").value;
  const contentItemKey = document.querySelector<any>("#x-contentItemKey").value;
  const settings = await api.contentItem.get<iPartSettings>(
    contentKey,
    contentItemKey
  );
  return settings;
};

export const getProductSettings = async (productName: string) => {
  const res = await api.query<{ Settings: string }>(
    "$/Causeis/Smart Series/Smart Suite Product Settings",
    { ProductName: productName }
  );
  const productSettings = JSON.parse(res.Items.$values[0]?.Settings || "");
  return productSettings as ProductSettings;
};
