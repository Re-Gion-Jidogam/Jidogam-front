"use client";

import { createPortal } from "react-dom";

import Modal from "@/components/Modal";

interface PublishGuideModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

const PUBLISH_MODAL_BODY = (
  <p className="text-sm text-center leading-relaxed text-gray-700">
    다른 사람들도 이 가이드북을 보고
    <br />
    도전할 수 있어요.
    <br />
    등록된 장소가 5개 이상이어야 활성화할 수 있어요.
    <br />
    <br />
    다른 사람이 이 가이드북에 도전한 후에는
    <br />
    출판을 끄거나 수정할 수 없어요.
  </p>
);

export default function PublishGuideModal({
  onConfirm,
  onClose,
}: PublishGuideModalProps) {
  return createPortal(
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
      <div>
        <Modal
          title="가이드북 출판"
          body={PUBLISH_MODAL_BODY}
          onClickClose={onClose}
          footer={
            <Modal.Button
              className="w-full h-[42px] flex items-center justify-center px-6 border-white/60! rounded-xl"
              onClick={onConfirm}
            >
              확인
            </Modal.Button>
          }
        />
      </div>
    </>,
    document.body,
  );
}
