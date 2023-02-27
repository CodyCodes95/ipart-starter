import { useEffect, useState } from "react";
import { getIpartSettings } from "./utils/imisFetchOptions";
import toast, { Toaster } from "react-hot-toast";
import { showError, showSuccess } from "./utils/toast";

const App = () => {

  const [exampleValue, setExampleValue] = useState<string>("");
  const [sampleIqaPath, setSampleIqaPath] = useState<string>("");


  const setSettings = async () => {
    const {exampleValue, sampleIqaPath} = await getIpartSettings()
    setExampleValue(exampleValue);
    setSampleIqaPath(sampleIqaPath);
  };

  useEffect(() => {
    // Runs on intial iPart load
    setSettings();
  }, []);

  return (
      <Toaster
        position="top-center"
        containerStyle={{
          zIndex: 10000000,
          top: 250,
        }}
      />
  );
};

export default App;
