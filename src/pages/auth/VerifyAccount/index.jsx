import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { PageMetaData, TextFormInput } from "@/components";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../AppContext";
import { LoaderCircleIcon } from 'lucide-react';
import { toast } from "sonner";
import { resendOtp, verifierCodeOTP } from "@/services/loginService";

const VerifyAccount = () => {
    const { urlApi } = useContext(AppContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const verifyFormSchema = yup.object({
        email: yup.string().email("Veuillez entrer un email valide").required("Veuillez entrer votre email"),
        code: yup
            .string()
            .required("Veuillez entrer le code")
            .matches(/^\d{4}$/, "Le code doit contenir 4 chiffres"),
    });

    const { control, handleSubmit, watch, reset, setValue, getValues } = useForm({
        resolver: yupResolver(verifyFormSchema),
        defaultValues: {
            email: "",
            code: "",
        },
    });


    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const emailParam = params.get("email")
        console.log(emailParam)
        if (!emailParam) {
            toast.error("Information utilisateur manquante. Veuillez vous inscrire à nouveau.")
            navigate("/auth/sign-up")
            return
        }
        setValue("email", emailParam)
    }, [location, navigate])


    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await fetch(`${urlApi}partner/otp-verification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            console.log(res)
            if (!res.ok) {
                const errorData = await res.json()
                console.error("Erreur de l'API :", errorData)
                toast.error(errorData || "Erreur lors de la création du compte")
                return
            }

            toast.success("Votre compte a été vérifié avec succès!");
            reset();
            navigate("/auth/sign-in?mail=" + data.email)
        } catch (error) {
            console.error(error);
            toast.error(res.message || "Le code de vérification est incorrect.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (!email || countdown > 0) return;
        setResendLoading(true);
        try {
            const resp = await resendOtp(email)
            console.log(resp)

            toast.success("Un nouveau code a été envoyé à votre adresse email.");
            setCountdown(60); // Délai de 60 secondes avant de pouvoir renvoyer
        } catch (error) {
            console.error(error);
            toast.error("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <>
            <PageMetaData title="Vérification de compte" />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-white">Vérification de compte</h1>
                <p className="mt-2 text-zinc-300">
                    Veuillez entrer le code à 4 chiffres que nous avons envoyé à votre adresse email.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 shrink">
                <TextFormInput
                    containerClassName="mb-4"
                    label="Adresse email"
                    name="email"
                    disabled={getValues("email")}
                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                    className="block rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
                    placeholder="Entrez votre email"
                    fullWidth
                    control={control}
                />

                <TextFormInput
                    containerClassName="mb-4"
                    label="Code de vérification"
                    name="code"
                    labelClassName="block text-base/normal text-zinc-200 font-semibold"
                    className="block rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0 text-center text-2xl tracking-widest"
                    placeholder="0000"
                    maxLength={4}
                    fullWidth
                    control={control}
                />

                <div className="mb-6 flex flex-col justify-center gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="relative inline-flex w-full items-center justify-center rounded bg-primary px-6 py-3 text-base capitalize text-white transition-all hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Vérification..." : "Vérifier le compte"}
                        {loading && <LoaderCircleIcon className="ml-2 animate-spin" />}
                    </button>

                    <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={resendLoading || countdown > 0 || !getValues('email')}
                        className="relative inline-flex w-full items-center justify-center rounded border border-white/20 bg-transparent px-6 py-3 text-base capitalize text-white/80 transition-all hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {resendLoading
                            ? "Envoi en cours..."
                            : countdown > 0
                                ? `Renvoyer le code (${countdown}s)`
                                : "Renvoyer le code"}
                        {resendLoading && <LoaderCircleIcon className="ml-2 animate-spin" />}
                    </button>
                </div>
            </form>

            <p className="shrink text-center text-zinc-200">
                Retour à la
                <Link to="/auth/sign-in" className="ms-1 text-primary">
                    <b>Connexion</b>
                </Link>
            </p>
        </>
    );
};

export default VerifyAccount;
