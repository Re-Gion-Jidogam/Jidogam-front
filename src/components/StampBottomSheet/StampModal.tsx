import Button from "@/components/Button";
import Modal from "@/components/Modal";

interface StampModalProps {
  placeName: string;
  onClickClose: () => void;
  onConfirm: () => void;
}

export function StampModal({
  placeName,
  onClickClose,
  onConfirm,
}: StampModalProps) {
  return (
    <Modal
      title="도장찍기"
      body={
        <div className="flex flex-col items-center">
          <p className="font-normal text-sm text-gray-800 mb-4">
            <span className="font-semibold">{placeName}</span>에 도장을
            찍을까요?
          </p>
          <p className="text-sm">다른 도장은 30분 후에 찍을 수 있어요.</p>
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
            color="green"
            onClick={onConfirm}
            className="w-full py-[12.5px] border border-white/60"
          >
            도장찍기
          </Button>
        </div>
      }
      onClickClose={onClickClose}
    ></Modal>
  );
}
