import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { FC } from "react";
import { cn } from "../../utils/classNames";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  className?: string;
  title: string;
};

const Modal: FC<ModalProps> = ({
  isOpen,
  children,
  setIsOpen,
  onClose,
  className,
  title,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        if (onClose) {
          return onClose();
        }
        setIsOpen(false);
      }}
      // ^^ infering the open state from whatever type the selected is (pattern I like, is this right?)
      className="relative z-[5001]"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel
          className={cn(
            "mx-auto overflow-y-auto rounded-md bg-white p-4",
            className
          )}
        >
          <div className="flex w-full items-center justify-between rounded-t-lg border-b-2 p-4">
            <Dialog.Title className="text-xl font-medium">{title}</Dialog.Title>
            <X
              className="h-12 w-12 cursor-pointer rounded-md p-2 hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            />
          </div>
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
