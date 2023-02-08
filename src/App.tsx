import { useEffect } from "react";
import { getIpartSettings } from "./utils/imisFetchOptions";
import { Toaster } from "react-hot-toast";
import { showError, showSuccess } from "./utils/toast";

const App = () => {
  const setSettings = async () => {
    const settings = await getIpartSettings();
    // Set state with each setting returned
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
