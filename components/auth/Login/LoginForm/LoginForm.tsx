import { HTMLAttributes, FormEvent, useState } from "react";
import { useRouter } from "next/router";

//^ styles
import styles from "./LoginForm.module.scss";

//^ hooks
import useInput from "@/hooks/use-input";

//^ component
import SimpleInput from "../../../Input/SimpleInput/SimpleInput";
import PrimaryBtn from "../../UI/Button/PrimaryBtn";
import LoadingWheel from "../../UI/Loading/LoadingWheel";

const LoginForm = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  //^ use state
  const [isLoading, setIsLoading] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");

  //^ next router
  const router = useRouter();

  const {
    enteredValue: userEnteredValue,
    hasError: userHasError,
    isValid: userIsValid,
    onBlurHandler: userBlurHandler,
    onChangeHandler: userChangeHandler,
  } = useInput(
    (value: string) => value.trim().length > 5 && !value.includes(" ")
  );

  const {
    enteredValue: passEnteredValue,
    hasError: passHasError,
    isValid: passIsValid,
    onBlurHandler: passBlurHandler,
    onChangeHandler: passChangeHandler,
  } = useInput(
    (value: string) => value.trim().length > 6 && !value.includes(" ")
  );

  const isFormValid = userIsValid && passIsValid;

  const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      username: userEnteredValue,
      password: passEnteredValue,
    };

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 422) {
        setIsLoading(false);

        const resData = await response.json();
        setErrorResponse(resData.message);

        throw new Error(resData.message);
      }

      if (!response.ok) {
        setIsLoading(false);

        const resData = await response.json();
        setErrorResponse(resData.message);

        throw new Error(resData.message || "Something went wrong");
      }
      setIsLoading(false);

      interface loginResProps {
        id?: string;
        name?: string;
        accessToken?: string;
      }

      const resData: loginResProps = await response.json();

      localStorage.setItem("jwtToken", resData.accessToken as string);

      router.replace("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={`${styles["login-form"]} ${className}`}>
      <form onSubmit={submitFormHandler}>
        <div className={styles["inputs"]}>
          <SimpleInput
            placeholder="Username"
            type="text"
            value={userEnteredValue}
            hasError={userHasError || errorResponse.includes("username")}
            onBlur={userBlurHandler}
            onChange={userChangeHandler}
            inputMessage={`${
              errorResponse.includes("username")
                ? errorResponse
                : "Enter valid user-name"
            }`}
          />
          <SimpleInput
            placeholder="Password"
            type="password"
            defaultValue={passEnteredValue}
            hasError={passHasError || errorResponse.includes("password")}
            inputMessage={`${
              errorResponse.includes("password")
                ? errorResponse
                : "Enter at-least more than 6 characters"
            }`}
            onBlur={passBlurHandler}
            onChange={passChangeHandler}
          />
        </div>
        <div className={styles["submit-btn"]}>
          <PrimaryBtn disabled={!isFormValid || isLoading}>
            {isLoading ? <LoadingWheel /> : "Login"}
          </PrimaryBtn>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
