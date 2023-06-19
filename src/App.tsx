// components
import Field from "./components/Field";
// hooks
import { useState } from "react";
import { useForm } from "react-hook-form";
// icons
import { faAt, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
// utils
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(6, "Minimum 6 characters")
      .regex(/(.*)[A-Z](.*)/, "Almost 1 uppercase character"),
    confirm: z.string(),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "Passwords don't matches",
    path: ["confirm"],
  });

type FormData = z.infer<typeof formSchema>;

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const { register, formState, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  function handlerValidSubmit(data: FormData) {
    console.log(data);
  }

  function handlerPasswordVisibility() {
    setIsVisible((prev) => !prev);
  }

  return (
    <div className="flex justify-center items-center w-full h-full p-14 bg-smokeWhite">
      <div className="flex flex-col gap-6 w-96 h-full p-10 rounded-lg bg-white shadow-xl">
        <div>
          <h1 className="text-4xl font-bold text-lightBlack mb-3">Sign Up</h1>
          <h3 className="font-semibold text-lightGray">
            Already a member?{" "}
            <a
              href="#"
              className="text-accentBlue hover:underline focus:underline"
            >
              Log in
            </a>
          </h3>
        </div>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(handlerValidSubmit)}
        >
          <Field
            title="e-mail"
            icon={faAt}
            error={formState.errors.email?.message}
            placeholder="name@mail.com"
            autoComplete="off"
            {...register("email")}
          />
          <Field
            title="password"
            icon={isVisible ? faLockOpen : faLock}
            error={formState.errors.password?.message}
            onIconClick={handlerPasswordVisibility}
            type={isVisible ? "text" : "password"}
            placeholder="6+ characters, 1 Capital letter"
            {...register("password")}
          />
          <Field
            title="confirm password"
            icon={isVisible ? faLockOpen : faLock}
            error={formState.errors.confirm?.message}
            onIconClick={handlerPasswordVisibility}
            type={isVisible ? "text" : "password"}
            placeholder="Same password"
            {...register("confirm")}
          />
          <button
            className="w-full p-3 border-transparent rounded-md mt-3 bg-accentBlue text-white transition-all hover:shadow-md focus:shadow-focus focus:shadow-accentBlueFocus"
            type="submit"
          >
            Create an account
          </button>
        </form>
        <h6 className="text-xs text-center text-lightGray">
          With creation of an account you automatic accept our{" "}
          <a
            href="#"
            className="text-accentBlue hover:underline focus:underline"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-accentBlue hover:underline focus:underline"
          >
            Terms of Service
          </a>
        </h6>
      </div>
    </div>
  );
}

export default App;
