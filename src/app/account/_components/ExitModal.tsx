import Button from "@/components/Button";
import Modal from "@/components/Modal";

interface ExitModalProps {
  onClickClose: () => void;
  onConfirm: () => void;
}

export function ExitModal({ onClickClose, onConfirm }: ExitModalProps) {
  return (
    <Modal
      title="회원가입 중단"
      body={
        <div className="flex flex-col items-center">
          <p className="font-normal text-sm text-gray-800">
            정말로 회원가입을 중단할까요?
          </p>
          <p className="font-semibold text-sm text-red-300">
            작성한 내용은 저장되지 않아요.
          </p>
        </div>
      }
      footer={
        <div className="w-full flex">
          <Button
            color="green"
            variants="ghost"
            className="w-full"
            onClick={onClickClose}
          >
            취소
          </Button>
          <Button
            color="red"
            onClick={onConfirm}
            className="w-full py-[12.5px] border border-white/60"
          >
            가입 중단
          </Button>
        </div>
      }
      onClickClose={onClickClose}
    ></Modal>
  );
}
