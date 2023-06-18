// types
import type { FormEvent } from "react";
// components
import Field from "./components/Field";
// hooks
import { useState } from "react";
// icons
import { faAt, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  function handlerSubmit(e: FormEvent) {
    e.preventDefault();
  }

  function handlerPasswordVisibility() {
    setIsVisible((prev) => !prev);
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      <form className="flex flex-col gap-2 w-80" onSubmit={handlerSubmit}>
        <Field
          title="e-mail"
          icon={faAt}
          error={null}
          type="email"
          placeholder="name@mail.com"
        />
        <Field
          title="test"
          icon={faAt}
          error={null}
          type="password"
          placeholder="name@mail.com"
        />
        <Field
          title="password"
          icon={isVisible ? faLockOpen : faLock}
          error={"invalid password"}
          onIconClick={handlerPasswordVisibility}
          type={isVisible ? "text" : "password"}
          placeholder="6+ characters, 1 Capital letter"
        />
        <Field
          title="confirm password"
          icon={isVisible ? faLockOpen : faLock}
          error={null}
          onIconClick={handlerPasswordVisibility}
          type={isVisible ? "text" : "password"}
          placeholder="Same password"
        />
        <button
          className="w-full p-3 mt-3 rounded-md bg-accentBlue text-white"
          type="submit"
        >
          Create an account
        </button>
      </form>
    </div>
  );
}

export default App;
