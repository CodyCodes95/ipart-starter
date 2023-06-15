import { Dialog } from "@headlessui/react";
import { FC } from "react";

type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: any) => void;
}

const Modal:FC<ModalProps> = ({isOpen, children, setIsOpen}) => {
  return (
    <Dialog
        open={isOpen}
          onClose={() => setIsOpen(undefined)}
          // ^^ infering the open state from whatever type the selected is (pattern I like, is this right?)
        className="relative z-[5001]"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* The actual dialog panel  */}
              <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
                  {children}
                     </Dialog.Panel>
        </div>
      </Dialog>
  )
}

export default Modal