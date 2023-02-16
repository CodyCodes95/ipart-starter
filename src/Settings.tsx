import React, { useState } from "react";
import loader from "./assets/loader.svg";
import { bindIqa } from "./utils/settingsFunctions";
import ConfigInput from "./components/settings/ConfigInput";
import { Toaster } from "react-hot-toast";
import { showError, showSuccess } from "./utils/toast";
import icon from "./assets/icon.svg";

type Settings = {
  // Settings type here
};

const Settings = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [exampleValue, setExampleValue] = useState<string>("");
  const [sampleIqaPath, setSampleIqaPath] = useState<string>("");

  const getSettings = () => {
    if (document.querySelector<any>("#JsonSettings").value) {
      const settings = JSON.parse(
        document.querySelector<any>("#JsonSettings").value
      );
      console.log(settings);
      // Set all state vars with values from settings
      setExampleValue(settings.exampleValue);
      setSampleIqaPath(settings.sampleIqaPath);
      setIsLoading(false);
    } else {
      console.log("No settings found");
      setIsLoading(false);
    }
  };

  const saveSettings = (newSettings: Settings) => {
    document.querySelector<any>("#JsonSettings").value =
      JSON.stringify(newSettings);
  };

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
        <img
          src={loader}
          alt="Loading spinner"
          className="h-[10rem] w-[10rem] stroke-purple-700 "
        />
      </div>
    );
  }

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
      <Toaster />
      <ConfigInput label="Example Value">
        <input
          type="text"
          placeholder="API Key"
          value={exampleValue}
          onChange={(e) => setExampleValue(e.target.value)}
        />
      </ConfigInput>
      <ConfigInput label="Example IQA Select">
        <input type="text" placeholder="Select an IQA" value={sampleIqaPath} />
        <a
          className="TextButton cursor-pointer"
          onClick={() => bindIqa(setSampleIqaPath)}
        >
          Search
        </a>
      </ConfigInput>
    </div>
  );
};

export default Settings;
