import { HTMLAttributes, FormEvent, useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/client";
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

  //^ next auth session
  const [session, loading] = useSession();

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

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: userEnteredValue,
        password: passEnteredValue,
        // callbackUrl: "/",
      });

      console.log(result);

      if (result && result?.error) {
        setIsLoading(false);
        setErrorResponse(result.error);
      }

      if (!result?.error) {
        setIsLoading(false);

        router.replace("/");
      }
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
