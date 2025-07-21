'use client'
import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import useRegisterModal from "../hooks/useRegisterModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import toast from "react-hot-toast"
import Button from "../Button"
import useLoginModal from "../hooks/useLoginModal"
import { signIn } from "next-auth/react"
const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [loading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
            .then(() => {

                loginModal.onOpen();
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error(`Something went wrong`);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Airbnb"
                subtitle="Create an Account"
            />
            <Input
                id="email"
                type="email"
                label="Email"
                disabled={loading}
                register={register}
                required
                error={errors}
            />
            <Input
                id="name"
                label="Name"
                disabled={loading}
                register={register}
                required
                error={errors}
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={loading}
                register={register}
                required
                error={errors}
            />
        </div>
    );
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr className="bg-neutral-100 text-neutral-100" />
            <Button
                outline
                label="Continue with Google"
                Icon={FcGoogle}
                onClick={() => {signIn("google"); }}
            />
            <Button
                outline
                label="Continue with Github"
                Icon={AiFillGithub}
                onClick={() => { signIn('github'); }}
            />
            <div className="text-neutral-500 text-center mt-4 font-lg">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Already Have an Account?
                    </div>
                    <div className="text-neutral-800 cursor-pointer hover:underline font-semibold" onClick={() => { registerModal.onClose(); loginModal.onOpen() }}>
                        Log in
                    </div>



                </div>



            </div>




        </div>


    )






    return (
        <Modal
            disabled={loading}
            isOpen={registerModal.isOpen}
            title={`Register`}
            actionLabel={`Continue`}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal
