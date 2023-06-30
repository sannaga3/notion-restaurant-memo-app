import { FC } from "react";
import { FieldErrors } from "react-hook-form";

type Props = {
  errorProp: FieldErrors | string;
};

const FormError: FC<Props> = ({ errorProp }) => {
  console.log(errorProp);

  const showErrorMessage = () => {
    if (typeof errorProp === "string") {
      return (
        <div className="border-2 border-red-700 p-3 mb-4">
          <li className="text-red-700">{errorProp}</li>
        </div>
      );
    }

    const errors = Object.values(errorProp).map(
      (error) => error!.message as string
    );
    return (
      <>
        {errors.length > 0 && (
          <div className="border-2 border-red-700 p-3 mb-4">
            {errors.map((error, index) => {
              return (
                <li className="text-red-700" key={index}>
                  {error}
                </li>
              );
            })}
          </div>
        )}
      </>
    );
  };

  return <>{showErrorMessage()}</>;
};

export default FormError;
