'use client'
import { signIn } from "next-auth/react"
import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback,useState } from "react"
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import useRegisterModal from "../hooks/useRegisterModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import toast from "react-hot-toast"
import Button from "../Button"
import useLoginModal from "../hooks/useLoginModal"
import { useRouter } from "next/navigation"
const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [loading,setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    }=useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:'',
        }
    });
    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);
        signIn('credentials',{
            ...data,
            redirect:false,
        })
        .then((callback)=>{
            setIsLoading(false);
            if(callback?.ok){
                toast.success("Logged In");
                router.refresh();
                loginModal.onClose();
            }
            if(callback?.error){
                toast.error("Some error happened!!!!!");

            }
        })
    
    };
    const bodyContent  = (
        <div className="flex flex-col gap-4">
            <Heading
            title="Welcome back!"
            subtitle="Login to your Account"
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
            <hr className="bg-neutral-100 text-neutral-100"/>
            <Button
            outline
            label="Continue with Google"
            Icon={FcGoogle}
            onClick={()=>{signIn('google')}}
            />
            <Button
            outline
            label="Continue with Github"
            Icon={AiFillGithub}
            onClick={()=>{signIn('github');}}
            />
        </div>


    )
  return (
    <Modal
    disabled={loading}
    isOpen={loginModal.isOpen}
    title={`Login`}
    actionLabel={`Continue`}
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default LoginModal
