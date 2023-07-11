import { HTMLAttributes } from "react";

//^ styles
import styles from "./LoginForm.module.scss";

//^ hooks
import useInput from "@/hooks/use-input";

//^ component
import SimpleInput from "../../../Input/SimpleInput/SimpleInput";
import PrimaryBtn from "../../UI/Button/PrimaryBtn";

const LoginForm = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const {
    enteredValue: userEnteredValue,
    hasError: userHasError,
    isValid: userIsValid,
    onBlurHandler: userBlurHandler,
    onChangeHandler: userChangeHandler,
  } = useInput((value: string) => value.trim().length > 0);

  const {
    enteredValue: passEnteredValue,
    hasError: passHasError,
    isValid: passIsValid,
    onBlurHandler: passBlurHandler,
    onChangeHandler: passChangeHandler,
  } = useInput((value: string) => value.trim().length > 6);

  const isFormValid = userIsValid && passIsValid;

  return (
    <div className={`${styles["login-form"]} ${className}`}>
      <div className={styles["inputs"]}>
        <SimpleInput
          placeholder="Username"
          type="text"
          value={userEnteredValue}
          hasError={userHasError}
          onBlur={userBlurHandler}
          onChange={userChangeHandler}
          inputMessage={"Enter valid user-name"}
        />
        <SimpleInput
          placeholder="Password"
          type="password"
          defaultValue={passEnteredValue}
          hasError={passHasError}
          inputMessage="Enter at-least more than 6 characters"
          onBlur={passBlurHandler}
          onChange={passBlurHandler}
        />
      </div>
      <div className={styles["submit-btn"]}>
        <PrimaryBtn disabled={!isFormValid}>Login</PrimaryBtn>
      </div>
    </div>
  );
};

export default LoginForm;
