// 로그인 페이지

import Button from "@/components/Button";
import SVGIcon from "@/components/SVGIcon";
import TextInput from "@/components/TextInput";

interface LoginStepProps {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onLogin: () => void;
  onPasswordReset: () => void;
}

export function LoginStep({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onPasswordReset,
}: LoginStepProps) {
  return (
    <div className="w-full h-full p-3 flex flex-col items-center justify-between">
      <div className="w-full flex flex-col gap-2">
        <TextInput
          label="이메일"
          value={email}
          showCharCount={false}
          onChange={(e) => onEmailChange(e.target.value)}
        />
        <TextInput
          label="비밀번호"
          value={password}
          maxLength={20}
          onChange={(e) => {
            const limited = e.target.value.slice(0, 20);
            onPasswordChange(limited);
          }}
        />
        <div
          className="flex items-center cursor-pointer"
          onClick={onPasswordReset}
        >
          <p className="pl-3 font-medium text-xs text-gray-600">
            비밀번호 찾기
          </p>
          <div className="w-4 h-4">
            <SVGIcon icon="RightGrayArrow" className="w-full h-full" />
          </div>
        </div>
      </div>

      <Button
        color="green"
        variants="primary"
        onClick={onLogin}
        disabled={!email || !password}
        className="w-full py-3.5"
      >
        로그인
      </Button>
    </div>
  );
}
