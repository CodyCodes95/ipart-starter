import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ProductSettings,
  StaffSettings,
  IPartSettings,
} from "../types/SettingsTypes";
import { useQuery } from "@tanstack/react-query";
import api from "@codythatsme/caus-api";
import { checkLicense } from "../utils/checkLicense";

// All staff settings lines should be commented out if not using staff settings

type SettingsContextType = {
  Ordinal: number;
  productSettings: ProductSettings;
  // staffSettings: StaffSettings;
  refetchSettings: () => void;
  iPartSettings: IPartSettings;
};

const productName = "PRODUCT NAME";

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

const SettingsProvider = ({ children }: PropsWithChildren) => {
  const [licensed, setLicensed] = useState<boolean>(false);
  const [productSettings, setProductSettings] = useState<ProductSettings>();
  // const [staffSettings, setStaffSettings] = useState<StaffSettings>();

  useEffect(() => {
    checkLicense("PRODUCTNAME", () => setLicensed(true));
  }, []);

  const getProductSettings = async (productName: string) => {
    const res = await api.query<{ Settings: string; Ordinal: number }>(
      "$/Causeis/Smart Series/Smart Suite Product Settings",
      { ProductName: productName }
    );
    if (!res.Count) return null;
    const productSettings = JSON.parse(res.Items.$values[0]?.Settings || "");
    return {
      settings: productSettings as ProductSettings,
      ordinal: res.Items.$values[0]?.Ordinal as number,
    };
  };

  // const getStaffSettings = async (productName: string) => {
  //   const res = await api.query<{
  //     StaffSettings: string;
  //     Ordinal: number;
  //     Settings: string;
  //   }>("$/Causeis/Smart Series/Smart Suite Staff Product Settings", {
  //     ProductName: productName,
  //   });
  //   const staffSettings: StaffSettings = JSON.parse(
  //     res.Items.$values[0]?.StaffSettings || ""
  //   );
  //   const settings: ProductSettings = JSON.parse(
  //     res.Items.$values[0]?.Settings || ""
  //   );
  //   return {
  //     staffSettings,
  //     settings,
  //     ordinal: res.Items.$values[0]?.Ordinal as number,
  //   };
  // };

  const getIpartSettings = async () => {
    const contentKey = document.querySelector<any>("#x-contentKey").value;
    const contentItemKey =
      document.querySelector<any>("#x-contentItemKey").value;
    const settings = await api.contentItem.get<IPartSettings>(
      contentKey,
      contentItemKey
    );
    return settings;
  };

  const settingsResponse = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const res = await getProductSettings(productName);
      const iPartSettings = await getIpartSettings();
      if (!res) {
        const defaultSettings: ProductSettings = {
          exampleValue: "",
          sampleIqaPath: "",
        };
        // const defaultStaffSettings: StaffSettings = {
        //   staffOnlyValue: "",
        // };
        await api.post.standalone("smart_suite_settings", {
          ProductName: productName,
          Settings: JSON.stringify(defaultSettings),
          // StaffSettings: JSON.stringify(defaultStaffSettings),
        });
        const data = await getProductSettings(productName);
        if (!data) throw new Error("Error getting settings");
        return {
          ...data,
          iPartSettings,
        };
      }
      return {
        settings: res.settings!,
        // staffSettings: res.staffSettings!,
        iPartSettings,
        ordinal: res.ordinal!,
      };
    },
    onSuccess: (data) => {
      setProductSettings(data.settings);
      // setStaffSettings(data.staffSettings);
    },
    retry: false,
    enabled: licensed,
  });

  if (!settingsResponse.data || !productSettings) return null;
  // if (!settingsResponse.data || !productSettings || !staffSettings) return null;

  return (
    <SettingsContext.Provider
      value={{
        Ordinal: settingsResponse.data.ordinal,
        productSettings: productSettings,
        iPartSettings: settingsResponse.data.iPartSettings,
        refetchSettings: settingsResponse.refetch,
        // staffSettings: staffSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
