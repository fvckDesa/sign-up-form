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
    <div className="flex justify-center items-center w-full h-full">
      <form
        className="flex flex-col gap-2 w-80"
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
          className="w-full p-3 border-transparent rounded-md mt-3 bg-accentBlue text-white transition-colors focus:shadow-focus focus:shadow-accentBlueFocus"
          type="submit"
        >
          Create an account
        </button>
      </form>
    </div>
  );
}

export default App;
