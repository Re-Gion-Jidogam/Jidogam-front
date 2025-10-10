// 회원가입 - 인적사항 기입 페이지

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

interface SignupStepProps {
  email: string;
  nickname: string;
  nicknameStatus: "checking" | "available" | "duplicate" | "";
  password: string;
  confirmPassword: string;
  onNicknameChange: (nickname: string) => void;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (confirmPassword: string) => void;
  onSignup: () => void;
}

// TODO: 비밀번호, 비밀번호 확인란 내용 일치하는지
// TODO: 눈 토글 사용해서 보이게, 안보이게

export function SignupStep({
  email,
  nickname,
  nicknameStatus,
  password,
  confirmPassword,
  onNicknameChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSignup,
}: SignupStepProps) {
  let errorMessage = "";
  let successMessage = "";

  switch (nicknameStatus) {
    case "available":
      errorMessage = "";
      successMessage = "사용 가능한 닉네임입니다.";
      break;
    case "checking":
      errorMessage = "";
      successMessage = "확인 중 ...";
      break;
    case "duplicate":
      errorMessage = "중복된 닉네임입니다.";
      successMessage = "";
      break;
    default:
      errorMessage = "";
      successMessage = "";
  }

  return (
    <div className="w-full h-full flex flex-col justify-between items-center p-3">
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <TextInput
            label="이메일"
            value={email}
            disabled={true}
            rightElement={
              <span className="font-medium text-xs text-gray-600">
                인증완료
              </span>
            }
            showCharCount={false}
          />
          <TextInput
            label="닉네임"
            value={nickname}
            errorMessage={errorMessage}
            successMessage={successMessage}
            maxLength={15}
            onChange={(e) => {
              const limited = e.target.value.slice(0, 15);
              onNicknameChange(limited);
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <TextInput
            label="비밀번호"
            value={password}
            maxLength={20}
            onChange={(e) => {
              const limited = e.target.value.slice(0, 20);
              onPasswordChange(limited);
            }}
          />
          <TextInput
            label="비밀번호 확인"
            value={confirmPassword}
            maxLength={20}
            onChange={(e) => {
              const limited = e.target.value.slice(0, 20);
              onConfirmPasswordChange(limited);
            }}
          />
        </div>
      </div>

      <Button
        color="green"
        variants="primary"
        onClick={onSignup}
        disabled={
          !nickname ||
          nicknameStatus !== "available" ||
          !password ||
          !confirmPassword
        }
        className="w-full py-3.5"
      >
        가입하기
      </Button>
    </div>
  );
}
