import React from "react";

interface Props {
  children?: any;
  btnType: string;
  onClick?: () => void;
}

const Button = ({ children, btnType, onClick }: Props) => {
  return <button className={"btn btn-" + btnType} onClick={onClick}>{children}</button>;
};

export default Button;
