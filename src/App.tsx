import { useEffect, useState } from "react";
import { getIpartSettings } from "./utils/imisUtils";
import toast, { Toaster } from "react-hot-toast";
import loader from "./assets/loader.svg";
import { api } from "./api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SettingsType } from "./types/Settings";

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
    getSettings();
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
        <img className="h-[15rem] w-[15rem]" src={loader} />
      </div>
    );
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
      <h1>Test</h1>
    </div>
  );
};

export default App;
