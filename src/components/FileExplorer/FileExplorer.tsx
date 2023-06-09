import { useState, useEffect, FC } from "react";
import {
  getDecendantFiles,
  getDocumentByVersionId,
  getFolderByPath,
} from "../../utils/fileExplorer";
import {
  FaFolder,
  FaImage,
  FaSearch,
  FaFolderOpen,
  FaLink,
} from "react-icons/fa";
import { HiOutlineDocument } from "react-icons/hi";
import { DocumentData, FileTypes } from "../../types/imisTypes";
import NavBar from "./NavBar";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/api";
import { toast } from "react-hot-toast";
import { Dialog } from "@headlessui/react";

const fileTypeIcons = {
  FOL: <FaFolder className="text-yellow-500" />,
  CFL: <FaFolder className="text-yellow-500" />,
  PNG: <FaImage className="text-blue-500" />,
  JPG: <FaImage className="text-blue-500" />,
  IQD: <FaSearch />,
  CON: <HiOutlineDocument />,
};

type FileExplorerProps = {
  rootFolder: DocumentData;
  callback: (file: DocumentData) => void;
  fileTypes: FileTypes[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FileExplorer: FC<FileExplorerProps> = ({
 callback,
  rootFolder,
  fileTypes,
  isOpen,
  setIsOpen,
}) => {
  const [files, setFiles] = useState<DocumentData[]>([]);
  const [navStack, setNavStack] = useState<DocumentData[]>([]);
  const [currentFolder, setCurrentFolder] = useState<DocumentData>(
    sessionStorage.getItem("currentFolder")
      ? JSON.parse(sessionStorage.getItem("currentFolder")!)
      : rootFolder
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [pathQuery, setPathQuery] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<DocumentData | null>(null);
  const [documentSearch, setDocumentSearch] = useState<string>("");


  useEffect(() => {
    if (sessionStorage.getItem("currentFolder")) {
      setCurrentFolder(JSON.parse(sessionStorage.getItem("currentFolder")!));
    }
  }, []);

  useEffect(() => {
    fetchItems();
    sessionStorage.setItem("currentFolder", JSON.stringify(currentFolder));
  }, [currentFolder]);

  const searchResults = useQuery({
    queryKey: ["search", documentSearch],
    queryFn: async () => {
      const results = await api.query<DocumentData>(
        "$/Causeis/WIP/Document Search",
        { Name: documentSearch }
      );
      return results.Items.$values;
    },
    enabled: documentSearch.length > 500,
  });

  const fetchItems = async () => {
    setLoading(true);
    const files = await getDecendantFiles(currentFolder.DocumentId, fileTypes);
    setLoading(false);
    setPathQuery(currentFolder.Path);
    setFiles(
      files.Result.$values.sort((file) =>
        file.DocumentTypeId === "FOL" || file.DocumentTypeId === "CFL" ? -1 : 1
      )
    );
  };

  const enterFolder = (folder: DocumentData) => {
    setNavStack([...navStack, currentFolder]);
    setCurrentFolder(folder);
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  const navigateToFolder = async (path: string) => {
    setLoading(true);
    const folder = await getFolderByPath(path);
    if (folder) {
      setCurrentFolder(folder);
    } else {
      toast.error("Folder not found");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-[100000000]"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel>
          <div className="rounded-lg bg-white shadow">
            <NavBar
              navStack={navStack}
              setNavStack={setNavStack}
              setCurrentFolder={setCurrentFolder}
              pathQuery={pathQuery}
              setPathQuery={setPathQuery}
              loading={loading}
              setDocumentSearch={setDocumentSearch}
              setLoading={setLoading}
              documentSearch={documentSearch}
            />
            <div>
              {searchResults.data ? (
                <>
                  {searchResults.data.map((file) => (
                    <div
                      key={file.DocumentVersionId}
                      className={`flex cursor-pointer items-center justify-between border-b border-gray-200 py-2 px-4 hover:bg-gray-100 ${
                        selectedFile?.DocumentId === file.DocumentId &&
                        "bg-blue-100"
                      }`}
                      onClick={() => setSelectedFile(file)}
                      onDoubleClick={() => {
                        if (file.DocumentTypeId === "FOL") enterFolder(file);
                        else {
                          callback(file);
                        }
                      }}
                    >
                      <div className="flex items-center">
                        {fileTypeIcons[file.DocumentTypeId]}
                        <div className="flex flex-col">
                          <span className="ml-4">{file.Name}</span>
                          <span className="ml-4 text-xs">
                            {file.Path.split("/").slice(0, -1).join("/")}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FaFolderOpen
                          onClick={async () => {
                            await navigateToFolder(
                              file.Path.split("/").slice(0, -1).join("/")
                            );
                            setDocumentSearch("");
                          }}
                          className="text-xl text-yellow-500 shadow-lg"
                        />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {files.map((file) => (
                    <div
                      key={file.DocumentVersionId}
                      className={`flex cursor-pointer items-center justify-between border-b border-gray-200 py-2 px-4 hover:bg-gray-100 ${
                        selectedFile?.DocumentId === file.DocumentId &&
                        "bg-blue-100"
                      }`}
                      onClick={() => setSelectedFile(file)}
                      onDoubleClick={() => {
                        if (file.DocumentTypeId === "FOL") enterFolder(file);
                        else {
                          callback(file);
                        }
                      }}
                    >
                      <div className="flex items-center">
                        {fileTypeIcons[file.DocumentTypeId]}
                        <span className="ml-4">{file.Name}</span>
                      </div>
                      <div>
                        <FaLink
                          className="text-xl shadow-lg"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${window.location.origin}/staff/shared_content/document-browser.aspx?iqa=${file.DocumentId}`
                            );
                            toast.success("Link copied to clipboard");
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default FileExplorer;
