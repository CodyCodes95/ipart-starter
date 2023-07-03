import { FC, useEffect } from "react";
import ConfigInput from "./ConfigInput";
import { useFileExplorer } from "../../hooks/useFileExplorer";
import FileExplorer from "./FileExplorer/FileExplorer";
import { Dialog } from "@headlessui/react";
import { FileTypes } from "../../types/imisTypes";

type DocumentSelectorProps = {
  setPath: (fileId: string) => void;
  fileTypes: FileTypes[];
  root: string;
  value: string | undefined;
};

const DocumentSelector: FC<DocumentSelectorProps> = ({
  setPath,
  fileTypes,
  root,
  value,
}) => {
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
          <Dialog.Panel className={"max-h-[40rem] w-full overflow-scroll"}>
            <FileExplorer
              fileTypes={[...fileTypes, "FOL"]}
              callback={handleFileSelect}
              root={root}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
      <input type="text" value={value} />
      <a className="TextButton cursor-pointer" onClick={openFileExplorer}>
        Search
      </a>
    </>
  );
};

export default DocumentSelector;
