import { FaArrowLeft, FaArrowUp } from "react-icons/fa";
import { DocumentData } from "../../types/imisTypes";
import { toast } from "react-hot-toast";
import loader from "../assets/loader.svg";
import { getFolderByPath } from "../../utils/fileExplorer";
import { HiChevronRight } from "react-icons/hi";

type NavBarProps = {
  navStack: DocumentData[];
  setNavStack: React.Dispatch<React.SetStateAction<DocumentData[]>>;
  setCurrentFolder: React.Dispatch<React.SetStateAction<DocumentData>>;
  pathQuery: string;
  setPathQuery: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  documentSearch: string;
  setDocumentSearch: React.Dispatch<React.SetStateAction<string>>;
};

const NavBar: React.FC<NavBarProps> = ({
  navStack,
  setNavStack,
  setCurrentFolder,
  pathQuery,
  setPathQuery,
  loading,
  documentSearch,
  setDocumentSearch,
  setLoading,
}) => {
  const goBack = () => {
    if (navStack.length > 0) {
      setCurrentFolder(navStack.pop()!);
      setNavStack(navStack);
    }
  };

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
    <div className="space-between mb-4 flex w-full items-center border-b-2 p-2">
      <div className="flex w-3/4">
        <a
          className="flex cursor-pointer items-center rounded bg-blue-500 py-2 px-4 font-bold text-white no-underline hover:bg-blue-700"
          onClick={goBack}
          // disabled={navStack.length === 0}
        >
          <FaArrowLeft />
        </a>
        <div className="p-2" />
        {pathQuery.split("/").map((path, index) => (
          <div key={index} className="flex items-center">
            {index !== 0 && <HiChevronRight className="text-xl" />}
            <a
              className="cursor-pointer rounded bg-[#f0f0f0] p-2 shadow-sm hover:bg-[#e0e0e0]"
              onClick={() =>
                navigateToFolder(
                  pathQuery.substring(0, pathQuery.indexOf(path) + path.length)
                )
              }
            >
              {path}
            </a>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="w-1/4"
        placeholder="Search..."
        value={documentSearch}
        onChange={(e) => setDocumentSearch(e.target.value)}
      />
    </div>
  );
};

export default NavBar;
