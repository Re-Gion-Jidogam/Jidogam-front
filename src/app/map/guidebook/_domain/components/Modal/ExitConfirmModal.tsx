"use client";

import { createPortal } from "react-dom";

import Modal from "@/components/Modal";

interface ExitConfirmModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  warningText?: string;
  confirmLabel?: string;
}

export default function ExitConfirmModal({
  onCancel,
  onConfirm,
  title = "나가기",
  description = "가이드북을 만들지 않고 나갈까요?",
  warningText = "작성중인 내용은 모두 지워져요.",
  confirmLabel = "나가기",
}: ExitConfirmModalProps) {
  const body = (
    <p className="text-sm text-center leading-relaxed text-gray-700">
      {description}
      <br />
      <span className="text-red-400 font-semibold">{warningText}</span>
    </p>
  );

  return createPortal(
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
      <div>
        <Modal
          title={title}
          body={body}
          onClickClose={onCancel}
          footer={
            <>
              <Modal.Button color="green" variants="ghost" onClick={onCancel}>
                취소
              </Modal.Button>
              <Modal.Button color="red" variants="primary" onClick={onConfirm}>
                {confirmLabel}
              </Modal.Button>
            </>
          }
        />
      </div>
    </>,
    document.body,
  );
}
