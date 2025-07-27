import { ButtonHTMLAttributes, Ref, forwardRef } from "react";

import clsx from "clsx";

const buttonVariants = {
  green: {
    primary:
      "bg-primary-300 hover:bg-primary-400 border-primary-300 hover:border-primary-400 text-gray-0",
    secondary:
      "bg-primary-100 hover:bg-primary-200 border-primary-100 hover:border-primary-200 text-primary-400 hover:text-gray-0",
    outlined:
      "bg-gray-0 hover:bg-primary-200 border-primary-400 hover:border-primary-300 text-primary-400 hover:text-gray-0",
    ghost:
      "bg-gray-0 hover:bg-primary-50 border-gray-0 hover:border-primary-50 text-gray-700 hover:text-primary-400",
  },
  red: {
    primary:
      "bg-red-200 hover:bg-red-400 border-red-300 hover:border-red-400 text-gray-0",
    secondary:
      "bg-red-50 hover:bg-red-100 border-red-50 hover:border-red-100 text-red-400 hover:text-gray-0",
    outlined:
      "bg-gray-0 hover:bg-red-200 border-red-300 hover:border-red-200 text-red-400 hover:text-gray-0",
    ghost:
      "bg-gray-0 hover:bg-red-50 border-gray-0 hover:border-red-50 text-red-200 hover:text-red-400",
  },
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "green" | "red";
  variants?: keyof (typeof buttonVariants)["green"];
}

const Button = forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const {
    children,
    className,
    color = "green",
    variants = "primary",
    ...rest
  } = props;

  return (
    <button
      ref={ref}
      className={clsx(
        "rounded-xl border py-3.5 px-6 text-sm text-gray-0 font-semibold cursor-pointer",
        "disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-700 disabled:cursor-default",
        "transition",
        buttonVariants[color][variants],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
