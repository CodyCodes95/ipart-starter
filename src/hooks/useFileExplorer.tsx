import { useState, useCallback } from "react";
import { DocumentData } from "../types/imisTypes";

export const useFileExplorer = () => {
  const [selectedFile, setSelectedFile] = useState<DocumentData>();
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);

  const handleFileSelect = useCallback((file:DocumentData) => {
    setSelectedFile(file);
    setIsExplorerOpen(false); // Close the explorer once a file is selected
  }, []);

  const openFileExplorer = useCallback(() => {
    setIsExplorerOpen(true);
  }, []);

  return { selectedFile, isExplorerOpen, handleFileSelect, openFileExplorer };
};
