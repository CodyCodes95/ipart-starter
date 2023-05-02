import { useEffect, useState } from "react";
import { getIpartSettings } from "./utils/imisUtils";
import toast, { Toaster } from "react-hot-toast";
import loader from "./assets/loader.svg";
import { api } from "./api/api";

const App = () => {
  const [exampleValue, setExampleValue] = useState<string>("");
  const [sampleIqaPath, setSampleIqaPath] = useState<string>("");
  const [settingsRetrieved, setSettingsRetrieved] = useState<boolean>(false);

  const setSettings = async () => {
    const { exampleValue, sampleIqaPath } = await getIpartSettings();
    setExampleValue(exampleValue);
    setSampleIqaPath(sampleIqaPath);
    setSettingsRetrieved(true);
  };

  useEffect(() => {
    // Runs on intial iPart load
    setSettings();
  }, []);

  if (!settingsRetrieved) {
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <img className="h-[15rem] w-[15rem]" src={loader} />
    </div>;
  }

  return (
    <div className="flex w-full flex-col">
    <Toaster
      position="bottom-right"
      containerStyle={{
        zIndex: 10000000,
        top: 250,
      }}
    />
    </div>
  );
};

export default App;
