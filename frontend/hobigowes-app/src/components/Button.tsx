import React from "react";

interface Props {
  children?: any;
  btnType: string;
  // onClick: () => void;
}

const Button = ({ children, btnType }: Props) => {
  return <button className={"btn btn-" + btnType}>{children}</button>;
};

export default Button;
