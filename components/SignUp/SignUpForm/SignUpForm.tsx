import React, { HTMLAttributes, FormEvent, useState } from "react";
import { useRouter } from "next/router";

import styles from "./SignUpForm.module.scss";

//^ hooks
import useInput from "@/hooks/use-input";

//^ components
import SimpleInput from "@/components/Input/SimpleInput/SimpleInput";
import PrimaryBtn from "@/components/auth/UI/Button/PrimaryBtn";
import LoadingWheel from "@/components/auth/UI/Loading/LoadingWheel";

const SignUpForm = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  //^ state hook
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrMsg, setValidationErrMsg] = useState("");

  //^ router
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
    onChangeHandler: passChangeHandler,
    onBlurHandler: passBlurHandler,
  } = useInput(
    (value: string) => value.trim().length > 6 && !value.includes(" ")
  );

  const {
    enteredValue: confirmPassEnteredValue,
    hasError: confirmPassHasError,
    isValid: confirmPassIsValid,
    onChangeHandler: confirmPassChangeHandler,
    onBlurHandler: confirmPassBlurHandler,
  } = useInput((value: string) => value === passEnteredValue);

  const isFormValid = userIsValid && passIsValid && confirmPassIsValid;

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValidationErrMsg("");

    interface SignUpData {
      userName: string;
      userPass: string;
      userConfirmPass: string;
    }

    const data: SignUpData = {
      userName: userEnteredValue,
      userPass: passEnteredValue,
      userConfirmPass: confirmPassEnteredValue,
    };

    setIsLoading(true);

    const postSignUp = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (postSignUp.status === 422 || postSignUp.status === 401) {
      setIsLoading(false);
      const response: { message: string } = await postSignUp.json();
      setValidationErrMsg(response.message);

      return;
    }

    if (!postSignUp.ok) {
      setIsLoading(false);

      const response = await postSignUp.json();
      console.log(response);

      throw new Error("Something went wrong");
    }

    setIsLoading(false);

    router.replace("/login");
  };

  return (
    <div className={`${styles["signup-form"]} ${className}`}>
      <form method="POST" onSubmit={formSubmitHandler}>
        <div className={styles["inputs"]}>
          <SimpleInput
            type="text"
            placeholder="Enter a Username"
            value={userEnteredValue}
            hasError={userHasError || validationErrMsg.length > 0}
            inputMessage={`${
              validationErrMsg.length === 0
                ? "Should be more than 5 char without space"
                : validationErrMsg
            }`}
            onChange={userChangeHandler}
            onBlur={userBlurHandler}
          />
          <SimpleInput
            type="password"
            placeholder="Enter a password"
            defaultValue={passEnteredValue}
            onChange={passChangeHandler}
            onBlur={passBlurHandler}
            hasError={passHasError}
            inputMessage="Should be more than 6 char without space"
          />
          <SimpleInput
            type="password"
            placeholder="Confirm password"
            defaultValue={confirmPassEnteredValue}
            onChange={confirmPassChangeHandler}
            onBlur={confirmPassBlurHandler}
            hasError={confirmPassHasError}
            inputMessage="Password Not matched"
          />
        </div>
        <div className={styles["button"]}>
          <PrimaryBtn disabled={!isFormValid} className={styles["primary-btn"]}>
            {isLoading ? <LoadingWheel /> : "SignUp"}
          </PrimaryBtn>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
