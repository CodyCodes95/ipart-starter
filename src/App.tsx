import { useEffect, useState } from "react";
import { getIpartSettings } from "./utils/imisUtils";
import toast from "react-hot-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { SettingsType } from "./types/Settings";
import Loader from "./components/Loader";
import api from "@codythatsme/caus-api";
import { checkLicense } from "./utils/checkLicense";

const App = () => {
  const [settings, setSettings] = useState<SettingsType>();

  const getSettings = async () => {
    const iPartSettings = await getIpartSettings();
    if (!iPartSettings) {
      toast.error("Error retrieving settings");
      return;
    }
    setSettings(() => {
      return {
        ...iPartSettings,
      };
    });
  };

  useEffect(() => {
    // Runs on intial iPart load
    checkLicense("ipartName", getSettings);
  }, []);

  const getData = async () => {
    const res = await api.get.many<{ id: string }>("party");
    return res;
  };

  const party = useQuery({ queryKey: ["party"], queryFn: getData });

  useEffect(() => {
    console.log(party);
  }, [party]);

  if (!settings) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <Loader className="h-60 w-60" />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <h1>Test</h1>
    </div>
  );
};

export default App;
