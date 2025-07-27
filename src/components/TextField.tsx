"use client";

import {
  ChangeEvent,
  forwardRef,
  TextareaHTMLAttributes,
  useState,
} from "react";

import clsx from "clsx";

interface TextFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
}

const TextField = forwardRef<HTMLTextAreaElement, TextFieldProps>(
  (
    {
      className,
      autoComplete = "off",
      maxLength = 300,
      value = "",
      disabled,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [text, setText] = useState<string>(String(value));

    const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
      const { value } = e.target;

      if (value.length <= maxLength) {
        setText(value);
      }
    };

    return (
      <div
        className={clsx(
          "flex flex-col items-end gap-1.5 py-3.5 px-[1.125rem]",
          "bg-gray-0 border border-gray-300 rounded-xl",
          "font-medium text-gray-600",
          "focus-within:border-primary-300",
        )}
      >
        <textarea
          ref={ref}
          value={text}
          autoComplete={autoComplete}
          onChange={changeHandler}
          className={clsx(
            "w-full outline-none resize-none",
            "text-sm text-gray-800",
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
    );
  },
);

TextField.displayName = "TextField";

export default TextField;
