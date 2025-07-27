"use client";

import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from "react";

import clsx from "clsx";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  maxLength?: number;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      errorMessage,
      id,
      className,
      autoComplete = "off",
      disabled,
      maxLength = 50,
      value = "",
      onChange,
      ...props
    },
    ref,
  ) => {
    const [text, setText] = useState<string>(String(value));

    const isBlank = text.length === 0;
    const isError = Boolean(errorMessage);

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
          "group flex flex-col gap-1 bg-gray-0",
          "font-medium text-gray-600",
          "transition-all",
        )}
      >
        <div
          className={clsx(
            "relative flex flex-col gap-1 px-[1.125rem] transition-all",
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
            <span className={clsx("inline-block", "text-xs")}>
              {text.length} / {maxLength}
            </span>
          </div>
        </div>
        {isError && (
          <p className={clsx("px-3", "text-xs text-red-400")}>{errorMessage}</p>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
