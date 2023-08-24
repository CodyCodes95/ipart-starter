import { useQuery } from "@tanstack/react-query";
import Modal from "../Modal";
import ConfigInput from "./ConfigInput";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { toast } from "react-hot-toast";
import { ProductSettings } from "../../types/Settings";
import api from "@codythatsme/caus-api";
import { bindIqa } from "../../utils/noTypes";

const productName = "Smart Product";
const productEndpoint = "smart_product_settings";

type SettingsModalProps = {
  showSettings: boolean;
  setShowSettings: (showSettings: boolean) => void;
};

const SettingsModal = ({
  setShowSettings,
  showSettings,
}: SettingsModalProps) => {
  const [settings, setSettings] = useState<ProductSettings>();

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    const res = await api.query<ProductSettings>(
      `$/Causeis/Smart Series/${productName}/Settings`
    );
    setSettings(res.Items.$values[0]);
  };

  const saveSettings = async () => {
    await toast.promise(
      api.put.properties(productEndpoint, settings!.Ordinal, settings!),
      {
        loading: "Saving Settings",
        success: "Settings Saved",
        error: "Error Saving Settings",
      }
    );
    setShowSettings(false);
  };
  return (
    <Modal
      className="h-2/3 w-1/3"
      isOpen={!!showSettings}
      onClose={() => setShowSettings(false)}
      title="Settings"
    >
      {settings ? (
        <div className="flex w-full flex-col gap-2 p-4">
          <ConfigInput label="Example Value">
            <input
              type="text"
              placeholder="API Key"
              value={settings?.exampleValue}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  exampleValue: e.target.value,
                })
              }
            />
          </ConfigInput>
          <ConfigInput label="Example IQA Select">
            <input
              type="text"
              placeholder="Select an IQA"
              value={settings?.sampleIqaPath}
            />
            <a
              className="TextButton cursor-pointer"
              onClick={() =>
                bindIqa((iqa) =>
                  setSettings({ ...settings, sampleIqaPath: iqa })
                )
              }
            >
              Search
            </a>
          </ConfigInput>
          <div className="flex w-full justify-end gap-2">
            <a className="TextButton" onClick={() => setShowSettings(false)}>
              Cancel
            </a>
            <a className="TextButton" onClick={saveSettings}>
              Save
            </a>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Loader className="stroke-[#e41e2e]" />
        </div>
      )}
    </Modal>
  );
};

export default SettingsModal;
