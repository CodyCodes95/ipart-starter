import { FC, useEffect } from "react";
import ConfigInput from "./ConfigInput";
import { useFileExplorer } from "../../hooks/useFileExplorer";
import FileExplorer from "./FileExplorer/FileExplorer";
import { Dialog } from "@headlessui/react";
import { FileTypes } from "../../types/imisTypes";

type DocumentSelectorProps = {
  label: string;
  setPath: (fileId: string) => void;
  fileTypes: FileTypes[];
};

const DocumentSelector: FC<DocumentSelectorProps> = ({ label, setPath }) => {
  const { selectedFile, isExplorerOpen, handleFileSelect, openFileExplorer } =
    useFileExplorer();

  useEffect(() => {
    if (selectedFile) {
      setPath(selectedFile.Path);
    }
  }, [selectedFile]);

  return (
    <>
      <Dialog
        open={isExplorerOpen}
        onClose={() => console.log("close")}
        className="relative z-[100000000]"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className={"w-full max-h-[40rem] overflow-scroll"}>
            <FileExplorer fileTypes={["IQD"]} callback={handleFileSelect} />
          </Dialog.Panel>
        </div>
      </Dialog>
      <ConfigInput label={label}>
        <input type="text" value={selectedFile?.Path} />
        <a className="TextButton cursor-pointer" onClick={openFileExplorer}>
          Search
        </a>
      </ConfigInput>
    </>
  );
};

export default DocumentSelector;
