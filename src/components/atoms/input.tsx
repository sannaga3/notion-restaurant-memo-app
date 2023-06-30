import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

type FormValues = {
  user_name: string;
  email: string;
};

type Props = {
  label: string;
  isNotLabel?: boolean;
  inputSize?: string;
  name: keyof FormValues;
  register: UseFormRegister<FormValues>;
  type: string;
  min?: number;
  max?: number;
  required?: boolean;
  minLen?: number;
  maxLen?: number;
  wrapperClassProp?: string | null;
  labelClassProp?: string | null;
  inputClassProp?: string | null;
  labelSize?: string;
};

const Input: FC<Props> = ({
  label = "",
  isNotLabel = false,
  name = "" as any,
  type = "",
  min,
  max,
  required = false,
  minLen = 6,
  maxLen = 30,
  register,
  wrapperClassProp = null,
  labelClassProp = null,
  inputClassProp = null,
  labelSize = "200px",
  inputSize = "200px",
}) => {
  const labelWidth = { width: labelSize };
  const inputWidth = { width: inputSize };

  return (
    <div
      className={
        wrapperClassProp ? wrapperClassProp : "flex items-center space-y-3"
      }
    >
      {!isNotLabel && (
        <label
          className={labelClassProp ? labelClassProp : "text-lg mt-3.5"}
          style={labelWidth}
        >
          {label}
        </label>
      )}
      <input
        {...register(name, {
          required: { value: required, message: `${label}を入力してください` },
          minLength: {
            value: minLen,
            message: `${label}は${minLen}文字以上で入力してください`,
          },
          maxLength: {
            value: maxLen,
            message: `${label}は${maxLen}文字以内で入力してください`,
          },
        })}
        type={type}
        min={min}
        max={max}
        className={
          inputClassProp
            ? inputClassProp
            : "input mb-3 outline outline-1 outline-gray-500 px-2 py-0.5"
        }
        style={inputWidth}
      />
    </div>
  );
};

export default Input;
