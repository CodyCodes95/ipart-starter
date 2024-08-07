import { useEffect, useState } from "react";
import icon from "../assets/icon.svg";
import type { IPartSettings } from "./SettingsTypes";
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
    document.querySelector<HTMLInputElement>("[id$=_SaveButton]")!.disabled =
      true;
    getSettings();
  }, []);

  useEffect(() => {
    if (!iPartSettings) return;
    if (validateSettings()) {
      saveSettings(iPartSettings);
      document.querySelector<HTMLInputElement>("[id$=_SaveButton]")!.disabled =
        false;
    } else {
      document.querySelector<HTMLInputElement>("[id$=_SaveButton]")!.disabled =
        true;
    }
  }, [iPartSettings]);

  const getSettings = () => {
    if (document.querySelector<HTMLInputElement>("#JsonSettings")!.value) {
      const settings = JSON.parse(
        document.querySelector<HTMLInputElement>("#JsonSettings")!.value,
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
    document.querySelector<HTMLInputElement>("#JsonSettings")!.value =
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
      {/* <ConfigInput label="Example IQA Select">
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
      </ConfigInput> */}
    </div>
  );
};

export default Settings;
