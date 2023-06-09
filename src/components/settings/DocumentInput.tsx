import { FC } from "react";
import ConfigInput from "./ConfigInput";
import { useFileExplorer } from "../../hooks/useFileExplorer";
import FileExplorer from "../FileExplorer/FileExplorer";

type DocumentSelectorProps = {
  label: string;
  setFileId: (fileId: string) => void;
};

const DocumentSelector: FC<DocumentSelectorProps> = ({ label, setFileId }) => {
  
  const { selectedFile, isExplorerOpen, handleFileSelect, openFileExplorer } = useFileExplorer()

  return (
    <>
      <FileExplorer
        isOpen={isExplorerOpen}
        
      />
      <ConfigInput label={label}>
        <input type="text" value={selectedFile?.Name} />
        <a
          className="TextButton cursor-pointer"
          onClick={() => bindIqa(setSampleIqaPath)}
        >
          Search
        </a>
      </ConfigInput>
    </>
  );
}

export default DocumentSelector