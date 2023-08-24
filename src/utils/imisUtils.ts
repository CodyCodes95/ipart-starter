import { iPartSettings } from "../types/Settings";
export const getOptions = {
  method: "GET",
  headers: {
    RequestVerificationToken: document.querySelector<any>(
      "#__RequestVerificationToken"
    )?.value,
  },
};

export const getIpartSettings = async () => {
  const contentKey = document.querySelector<any>("#x-contentKey").value;
  const contentItemKey = document.querySelector<any>("#x-contentItemKey").value;

  const getSettings = await fetch(
    `/api/ContentItem?contentKey=${contentKey}&contentItemKey=${contentItemKey}`,
    getOptions
  );
  const data = await getSettings.json();
  return data.Items.$values[0].Data.Settings as iPartSettings;
};
