"use client";

import { createPortal } from "react-dom";

import Modal from "@/components/Modal";

interface ExitConfirmModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const EXIT_MODAL_BODY = (
  <p className="text-sm text-center leading-relaxed text-gray-700">
    가이드북을 만들지 않고 나갈까요?
    <br />
    <span className="text-red-400 font-semibold">
      작성중인 내용은 모두 지워져요.
    </span>
  </p>
);

export default function ExitConfirmModal({
  onCancel,
  onConfirm,
}: ExitConfirmModalProps) {
  return createPortal(
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
      <div>
        <Modal
          title="나가기"
          body={EXIT_MODAL_BODY}
          onClickClose={onCancel}
          footer={
            <>
              <Modal.Button color="green" variants="ghost" onClick={onCancel}>
                취소
              </Modal.Button>
              <Modal.Button color="red" variants="primary" onClick={onConfirm}>
                나가기
              </Modal.Button>
            </>
          }
        />
      </div>
    </>,
    document.body,
  );
}
