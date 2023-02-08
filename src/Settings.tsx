import React, { useState } from "react";
import loader from "./assets/loader.svg";
import { bindIqa } from "./utils/settingsFunctions";
import ConfigInput from "./components/settings/ConfigInput";
import { Toaster } from 'react-hot-toast';
import { showError, showSuccess } from "./utils/toast";

type Settings = {
  // Settings type here
};

const Settings = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exampleValue, setExampleValue] = useState<string>("");
  const [sampleIqaPath, setSampleIqaPath] = useState<string>("");

  const getSettings = () => {
    if (document.querySelector<any>("#JsonSettings").value) {
      const settings = JSON.parse(
        document.querySelector<any>("#JsonSettings").value
      );
      console.log(settings);
      // Set all state vars with values from settings
      setIsLoading(true);
    } else {
      console.log("No settings found");
      setIsLoading(true);
    }
  };

  const saveSettings = (newSettings: Settings) => {
    document.querySelector<any>("#JsonSettings").value = JSON.stringify(
      newSettings
    ) as Settings;
  };

  if (!isLoading) {
    return (
      <div className="flex min-h-[30rem] w-full items-center justify-center">
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
            <a className="cursor-pointer TextButton" onClick={() => bindIqa(setSampleIqaPath)}>
              Search
            </a>
          </ConfigInput>
    </div>
  );
};

export default Settings;
