"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  body,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-hidden
	 	 bg-neutral-800/70 outline-none focus:outline-none"
    >
      <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5">
        <div
          className={`translate h-full duration-300
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
        >
          <div
            className="translate  relative flex h-full w-full flex-col rounded-lg border-0
			   bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto"
          >
            <button
              className="p-1border-0hover:opacity-70transition absolute right-2 top-2"
              onClick={handleClose}
            >
              <IoMdClose size={18} />
            </button>
            <div className="relative flex-auto px-6 pt-6">{body}</div>
            <div className="flex flex-col gap-2 px-6 pb-6">
              <div className=" flex w-full flex-row items-center gap-4 pt-8">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    disabled={disabled}
                    onClick={handleSecondaryAction}
                    variant="outline"
                  >
                    {secondaryActionLabel}
                  </Button>
                )}
                <Button
                  disabled={disabled}
                  variant="default"
                  onClick={handleSubmit}
                  className="w-full"
                >
                  Continue
                </Button>
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
