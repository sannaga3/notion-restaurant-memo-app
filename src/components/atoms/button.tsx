import { FC, MouseEvent } from "react";

type Props = {
  text?: string;
  type?: "submit" | "reset" | "button";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  color?: string;
  width?: string;
  height?: string;
  textSize?: string;
  useDefaultClass?: boolean;
  classProps?: string;
  disabled?: boolean;
};

const Button: FC<Props> = ({
  text,
  type,
  onClick,
  color,
  width,
  height,
  textSize = "base",
  useDefaultClass = true,
  classProps = "",
  disabled = false,
}) => {
  const buttonStyle = useDefaultClass
    ? `text-white text-center px-2 border rounded-full hover:scale-105`
    : classProps;

  const textSizes = [
    { key: "xs", value: "12px" },
    { key: "sm", value: "14px" },
    { key: "base", value: "16px" },
    { key: "lg", value: "18px" },
    { key: "xl", value: "20px" },
    { key: "2xl", value: "24px" },
  ];
  const selectedSize = textSizes.find((size) => size.key === textSize);

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={onClick}
        type={type}
        className={buttonStyle}
        disabled={disabled}
        style={{
          backgroundColor: color,
          width: width,
          height: height,
          fontSize: selectedSize!.value,
        }}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
