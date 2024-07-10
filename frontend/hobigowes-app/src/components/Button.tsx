import React from "react";

interface Props {
  children?: React.ReactNode;
  btnType: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const Button = ({ children, btnType, onClick, type = "button" }: Props) => {
  return (
    <button type={type} className={"btn btn-" + btnType} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
