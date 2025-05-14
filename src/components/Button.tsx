import React from "react";
type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "small" | "medium" | "large";
  className?: string;
  disabled?: boolean;
};
export function Button({
  children,
  onClick,
  variant = "primary",
  size = "large",
  className = "",
  disabled = false
}: ButtonProps) {
  const baseStyles = "rounded-full font-bold shadow-lg transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4";
  const variantStyles = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 focus:ring-blue-300",
    secondary: "bg-gradient-to-r from-green-400 to-teal-500 text-white hover:from-green-500 hover:to-teal-600 focus:ring-green-300",
    success: "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 focus:ring-green-300",
    danger: "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 focus:ring-red-300"
  };
  const sizeStyles = {
    small: "text-sm py-1 px-4",
    medium: "text-lg py-2 px-6",
    large: "text-xl py-3 px-8"
  };
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed hover:scale-100 active:scale-100" : "";
  return <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}>
      {children}
    </button>;
}