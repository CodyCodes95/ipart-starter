import { useEffect, useState } from "react";
import { getIpartSettings } from "./utils/imisFetchOptions";
import { Toaster } from "react-hot-toast";
import { showError, showSuccess } from "./utils/toast";
import { Settings } from "./types/Settings";

const App = () => {

  const [exampleValue, setExampleValue] = useState<string>("");
  const [sampleIqaPath, setSampleIqaPath] = useState<string>("");


  const setSettings = async () => {
    const settings = await getIpartSettings() as Settings;
    setExampleValue(settings.exampleValue);
    setSampleIqaPath(settings.sampleIqaPath);
  };

  useEffect(() => {
    // Runs on intial iPart load
    setSettings();
  }, []);

  return (
    <div>
      <Toaster />
      <p className="text-5xl">my iPart</p>
    </div>
  );
};

export default App;
