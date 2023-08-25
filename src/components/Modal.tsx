import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { FC } from "react";
import { cn } from "../utils/classNames";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  title: string;
};

const Modal: FC<ModalProps> = ({
  isOpen,
  children,
  onClose,
  className,
  title,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      // ^^ infering the open state from whatever type the selected is (pattern I like, is this right?)
      className="relative z-[5001]"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex flex-col items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <div
          className={`flex items-center justify-between rounded-t-lg border-b-2 bg-gray-100 p-4 ${
            className?.includes("w-")
              ? `${className.split(" ").filter((c) => c.includes("w-"))[0]}`
              : "w-1/2"
          }  
      }`}
        >
          <Dialog.Title className="text-3xl font-medium">{title}</Dialog.Title>
          <X
            className="h-12 w-12 cursor-pointer rounded-md p-2 hover:bg-gray-200"
            onClick={onClose}
          />
        </div>
        <Dialog.Panel
          id="modal-panel"
          className={cn(
            "mx-auto overflow-y-auto rounded-b-md bg-white shadow-2xl",
            className
          )}
        >
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
