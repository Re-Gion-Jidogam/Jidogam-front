"use client";

import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from "react";

import clsx from "clsx";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  successMessage?: string;
  maxLength?: number;
  rightElement?: React.ReactNode; // 글자 수 카운터 대신 다른 요소를 보여주고 싶을 때 사용
  showCharCount?: boolean; // 글자 수 표시 여부
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      errorMessage,
      successMessage,
      id,
      className,
      autoComplete = "off",
      disabled,
      maxLength = 50,
      value = "",
      onChange,
      rightElement,
      showCharCount = true,
      ...props
    },
    ref,
  ) => {
    const [text, setText] = useState<string>(String(value));

    const isBlank = text.length === 0;
    const isError = Boolean(errorMessage);
    const isSuccess = Boolean(successMessage) && !isError;

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      const { value } = e.target;

      if (value.length <= maxLength) {
        setText(value);
      }
    };

    return (
      <div
        className={clsx(
          "group flex flex-col gap-1",
          "font-medium text-gray-600",
          "transition-all",
        )}
      >
        <div
          className={clsx(
            "relative flex flex-col gap-1 bg-gray-0 px-[1.125rem] transition-all",
            "group-focus-within:pt-[1.6875rem] group-focus-within:pb-[0.5625rem]",
            "border border-gray-300 focus-within:border-primary-300 rounded-xl",
            {
              "py-[1.125rem]": isBlank,
            },
            {
              "pt-[1.6875rem]": !isBlank,
              "pb-[0.5625rem]": !isBlank,
            },
            {
              "border-red-200": isError,
              "border-primary-300": isSuccess,
            },
          )}
        >
          {label && (
            <label
              htmlFor={id}
              className={clsx(
                "absolute left-[1.125rem] z-0 transition-all",
                "font-medium text-gray-600",
                {
                  "text-sm": isBlank,
                  "top-1/2": isBlank,
                  "-translate-y-1/2": isBlank,
                  "group-focus-within:top-0": isBlank,
                  "group-focus-within:translate-y-[0.5625rem]": isBlank,
                  "group-focus-within:text-xs": isBlank,
                },
                {
                  "text-xs": !isBlank,
                  "top-0": !isBlank,
                  "translate-y-[0.5625rem]": !isBlank,
                },
              )}
            >
              {label}
            </label>
          )}
          <div className="flex items-end ">
            <input
              ref={ref}
              id={id}
              value={text}
              disabled={disabled}
              autoComplete={autoComplete}
              onChange={changeHandler}
              className={clsx(
                "relative flex-1 gap-1.5 outline-none z-10",
                "text-sm font-medium text-gray-800",
                {
                  "text-gray-600": disabled,
                },
                className,
              )}
              {...props}
            />
            {rightElement ||
              (showCharCount && (
                <span className={clsx("inline-block", "text-xs")}>
                  {text.length} / {maxLength}
                </span>
              ))}
          </div>
        </div>
        {isError && (
          <p className={clsx("px-3", "text-xs text-red-400")}>{errorMessage}</p>
        )}
        {isSuccess && (
          <p className={clsx("px-3", "text-xs text-primary-400")}>
            {successMessage}
          </p>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
