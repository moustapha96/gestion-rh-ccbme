


import {
  PageMetaData,
  PasswordFormInput,
  TextFormInput,
} from "@/components";
import useLogin from "./useLogin";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const SignIn = () => {
  const { loading, login, control } = useLogin();

  return (
    <>
      <PageMetaData title="Connexion" />

      <form className="mt-2 shrink" onSubmit={login}>
        <TextFormInput
          containerClassName="mb-4"
          label="Adresse email"
          name="email"
          labelClassName="block text-base/normal text-zinc-200 font-semibold"
          className="block rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
          fullWidth
          control={control}
        />

        <PasswordFormInput
          label="Mot de passe"
          containerClassName="mb-4"
          name="password"
          labelClassName="block text-base/normal text-zinc-200 font-semibold"
          fullWidth
          className="block w-full rounded border-white/10 py-2.5 bg-transparent text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
          control={control}
        />

        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-1 gap-y-2">
          {/* <div className="inline-flex items-center">
            <input
              type="checkbox"
              className="size-4 rounded border-white/20 bg-white/20 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary/60 focus:ring-offset-0"
              id="checkbox-signin"
            />
            <label
              className="ms-2 select-none align-middle text-base/none text-zinc-200"
              htmlFor="checkbox-signin"
            >
              Se souvenir de moi
            </label>
          </div> */}
          {/* <Link
            to="/auth/forgot-pass"
            className="border-b border-dashed text-zinc-200"
          >
            <small>Mot de passe oublié ?</small>
          </Link> */}
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="group mt-5 inline-flex w-full items-center justify-center rounded bg-blueLogo px-6 py-2.5 text-white backdrop-blur-2xl transition-all hover:text-white"
          >
            {loading ? "Chargement..." : "Se connecter"}
            {loading && <LoaderCircle className="ml-2 animate-spin" />}
          </button>
        </div>
      </form>

      <br />
      {/* <p className="shrink text-center text-zinc-200">
        Vous n'avez pas de compte ?
        <Link to="/auth/sign-up" className="ms-1 text-blueLogo">
          <b>Inscription</b>
        </Link>
      </p> */}
    </>
  );
};

export default SignIn;