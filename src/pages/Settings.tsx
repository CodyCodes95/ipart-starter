import { useEffect, useState } from "react";
import { bindIqa } from "../utils/noTypes";
import icon from "./assets/icon.svg";
import { IPartSettings } from "../types/SettingsTypes";
import { ConfigInput, Loader } from "@codythatsme/smart-suite-components";

export const Header = () => {
  return (
    <div className="flex w-full items-center">
      <img src={icon} className="h-[10rem] w-[10rem]" alt="Smart Suite Icon" />
      <h1 className="ml-6 text-7xl">Causeis Smart Suite</h1>
    </div>
  );
};

const Settings = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [iPartSettings, setIpartSettings] = useState<IPartSettings>({
    exampleValue: "",
    sampleIqaPath: "",
  });

  useEffect(() => {
    // Runs on intial iPart load
    document.querySelector<any>("[id$=_SaveButton]").disabled = true;
    getSettings();
  }, []);

  useEffect(() => {
    if (!iPartSettings) return;
    if (validateSettings()) {
      saveSettings(iPartSettings);
      document.querySelector<any>("[id$=_SaveButton]").disabled = false;
    } else {
      document.querySelector<any>("[id$=_SaveButton]").disabled = true;
    }
  }, [iPartSettings]);

  const getSettings = () => {
    if (document.querySelector<any>("#JsonSettings").value) {
      const settings = JSON.parse(
        document.querySelector<any>("#JsonSettings").value
      ) as IPartSettings;
      console.log(settings);
      // Set all state vars with values from settings
      setIpartSettings(settings);
      setIsLoading(false);
    } else {
      console.log("No settings found");
      setIsLoading(false);
    }
  };

  const validateSettings = () => {
    // Validate settings
    return true;
  };

  const saveSettings = (newSettings: IPartSettings) => {
    document.querySelector<any>("#JsonSettings").value =
      JSON.stringify(newSettings);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[30rem] w-full items-center justify-center">
        <Header />
        <Loader className="h-[15rem] w-[15rem] stroke-[#e41e2e]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[30rem] w-full flex-col items-center justify-center">
      <Header />
      <ConfigInput label="Example Value">
        <input
          type="text"
          placeholder="API Key"
          value={iPartSettings?.exampleValue}
          onChange={(e) =>
            setIpartSettings({
              ...iPartSettings,
              exampleValue: e.target.value,
            })
          }
        />
      </ConfigInput>
      <ConfigInput label="Example IQA Select">
        <input
          type="text"
          placeholder="Select an IQA"
          value={iPartSettings?.sampleIqaPath}
        />
        <a
          className="TextButton cursor-pointer"
          onClick={() =>
            bindIqa((iqa) =>
              setIpartSettings({ ...iPartSettings, sampleIqaPath: iqa })
            )
          }
        >
          Search
        </a>
      </ConfigInput>
    </div>
  );
};

export default Settings;
