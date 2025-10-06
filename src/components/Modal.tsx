import { ReactNode } from "react";

import clsx from "clsx";

import Button, { ButtonProps } from "./Button";
import SVGIcon from "./SVGIcon";

interface ModalProps {
  title: string;
  body: ReactNode;
  footer: ReactNode;
  onClickClose: () => void;
}

function ModalContainer({ title, body, footer, onClickClose }: ModalProps) {
  return (
    <div className="fixed inset-0 animate-fade-in">
      <div className="absolute inset-0 bg-black/20" onClick={onClickClose} />
      <div
        className={clsx(
          "absolute top-1/2 left-1/2 -translate-1/2",
          "w-[19.875rem] p-3 bg-gray-0 rounded-xl",
        )}
      >
        <div className="flex align-center justiy-between w-full pb-6">
          <button
            type="button"
            className="absolute top-1 right-3 cursor-pointer"
            onClick={onClickClose}
          >
            <SVGIcon icon="CloseIcon" />
          </button>
          <p className="flex-1 self-center pt-0.5 pb-2.5 text-xs font-semibold text-center">
            {title}
          </p>
        </div>
        <div className="pb-6">{body}</div>
        <div className="flex">{footer}</div>
      </div>
    </div>
  );
}

function ModalButton({ children, ...props }: ButtonProps) {
  return (
    <Button className="flex-1 py-3" {...props}>
      {children}
    </Button>
  );
}

const Modal = Object.assign(ModalContainer, {
  Button: ModalButton,
});

export default Modal;
