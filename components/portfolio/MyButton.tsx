// // components/common/Button.tsx
// import React from "react";
// import clsx from "clsx";

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: "primary" | "secondary" | "outline";
//   children: React.ReactNode;
// }

// const baseStyles =
//   "px-4 py-2 rounded font-semibold transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2";

// const variantStyles = {
//   primary: "bg-teal-600 text-white hover:bg-teal-700",
//   secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
//   outline: "border border-teal-600 text-teal-600 bg-white hover:bg-teal-50",
// };

// export const MyButton: React.FC<ButtonProps> = ({
//   variant = "primary",
//   className,
//   children,
//   ...props
// }) => (
//   <button
//     className={clsx(baseStyles, variantStyles[variant], className)}
//     {...props}
//   >
//     {children}
//   </button>
// );
