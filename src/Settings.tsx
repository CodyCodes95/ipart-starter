import { useEffect, useState } from "react";
import { bindIqa } from "./utils/noTypes";
import ConfigInput from "./components/settings/ConfigInput";
import { Toaster } from "react-hot-toast";
import icon from "./assets/icon.svg";
import { SettingsType } from "./types/Settings";
import Loader from "./components/Loader";

const Settings = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [iPartSettings, setIpartSettings] = useState<SettingsType>({
    exampleValue: "",
    sampleIqaPath: "",
  });

  const getSettings = () => {
    if (document.querySelector<any>("#JsonSettings").value) {
      const settings = JSON.parse(
        document.querySelector<any>("#JsonSettings").value
      ) as SettingsType;
      console.log(settings);
      // Set all state vars with values from settings
      setIpartSettings(settings);
      setIsLoading(false);
    } else {
      console.log("No settings found");
      setIsLoading(false);
    }
  };

  const saveSettings = (newSettings: SettingsType) => {
    document.querySelector<any>("#JsonSettings").value =
      JSON.stringify(newSettings);
  };

  useEffect(() => {
    // Runs on intial iPart load
    document.querySelector<any>("[id$=_SaveButton]").disabled = true;
    getSettings();
  }, []);

  useEffect(() => {
    if (!iPartSettings) return;
    if (iPartSettings.exampleValue && iPartSettings.sampleIqaPath) {
      saveSettings(iPartSettings);
      document.querySelector<any>("[id$=_SaveButton]").disabled = false;
    } else {
      document.querySelector<any>("[id$=_SaveButton]").disabled = true;
    }
  }, [iPartSettings]);

  if (isLoading) {
    return (
      <div className="flex min-h-[30rem] w-full items-center justify-center">
        <div className="flex w-full items-center">
          <img
            src={icon}
            className="h-[10rem] w-[10rem]"
            alt="Smart Suite Icon"
          />
          <h1 className="ml-6 text-7xl">Causeis Smart Suite</h1>
        </div>
        <Loader className="h-[15rem] w-[15rem] stroke-[#e41e2e]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[30rem] w-full flex-col items-center justify-center">
      <div className="flex w-full items-center">
        <img
          src={icon}
          className="h-[10rem] w-[10rem]"
          alt="Smart Suite Icon"
        />
        <h1 className="ml-6 text-7xl">Causeis Smart Suite</h1>
      </div>
      <Toaster />
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
