import { Dialog } from "@headlessui/react";
import { FC } from "react";

type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
}

const Modal:FC<ModalProps> = ({isOpen, children}) => {
  return (
    <Dialog
        open={isOpen}
        onClose={() => {
          console.log("close")
        }}
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