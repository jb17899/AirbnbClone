'use client'
import { useMemo, useState } from "react";
import useRentModal from "../hooks/useRentModal"
import Modal from "./Modal"
import Heading from "../Heading";
import categories from "../navbar/CategoriesList";
import CategoryInput from "./CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import dynamic from "next/dynamic";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRUPTION = 4,
    PRICE = 5
};



const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading,setIsLoading] = useState(false);

    const onBack = () => {
        setStep((value) => value - 1);
    }
    const onNext = () => {
        setStep((value) => value + 1);
    }
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }
        return 'Next';
    }, [step]);
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step]);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>(
        {
            defaultValues: {
                category: '',
                location: null,
                guestCount: 1,
                roomCount: 1,
                bathroomCount: 1,
                imageSrc: '',
                price: 1,
                title: '',
                descripttion: ''
            }
        }
    );
    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }
    const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location]);
    const onSubmit:SubmitHandler<FieldValues> = async(data)=>{
        if(step!==STEPS.PRICE){
            return onNext();
        }
        setIsLoading(true);
        axios.post('/api/listings', data)
            .then(() => {
                toast.success("Entry Successfully Created!!!!")
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                rentModal.onClose();
            })
            .catch(() => {
                toast.error('Not Able to Submit Your Entry At This Point.Please Try Later');
            })
            .finally(()=>{
                setIsLoading(false);
            })
    } 

    let BodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of These Best Describes Your Place?"
                subtitle="Pick a Category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((Element) => (
                    <div key={Element.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => { setCustomValue('category', category) }}
                            selected={category === Element.label}
                            label={Element.label}
                            icon={Element.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
    if (step === STEPS.LOCATION) {
        BodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Where is your Place Located?" subtitle="Help Your Guests find You!!!" />
                <CountrySelect
                    value={location}
                    onChange={(location) => { setCustomValue('location', location); }}
                />
                <Map
                    center={location?.latlng}
                />

            </div>
        )
    }
    if (step === STEPS.INFO) {
        BodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Share Some Basics About Your Place" subtitle="What amenities do you have" />
                <Counter
                    title="Guests"
                    subtitle="How Many Guests do You Allow?"
                    value={guestCount}
                    onChange={(guestCount) => { setCustomValue('guestCount', guestCount); }}
                />
                <Counter
                    title="Rooms"
                    subtitle="How Many Rooms do You Have?"
                    value={roomCount}
                    onChange={(roomCount) => { setCustomValue('roomCount', roomCount); }}
                />
                <Counter
                    title="Bathrooms"
                    subtitle="How Many Bathrooms do You Have?"
                    value={bathroomCount}
                    onChange={(bathroomCount) => { setCustomValue('bathroomCount', bathroomCount); }}
                />
            </div>
        )
    }
    if (step === STEPS.IMAGES) {
        BodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of Your Place"
                    subtitle="Show Guests What does Your Place Look Like"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(imageSrc) => { setCustomValue('imageSrc', imageSrc); }}
                />

            </div>
        )
    }
    if (step === STEPS.DESCRUPTION) {
        BodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How Would You Describe The Place??"
                    subtitle="Short and Sweet Works the Best"
                />
                <Input
                id="title"
                label="Title"
                register={register}
                disabled={isLoading}
                required
                error={errors}
                />
                <hr className="text-neutral-100 bg-neutral-100"/>
                <Input
                id="description"
                label="Description"
                register={register}
                disabled={isLoading}
                required
                error={errors}
                />
            </div>
        )
    }
    if(step === STEPS.PRICE){
        BodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="Now Set Your Price"
                subtitle="How much do you Charge for per night??"
                />
                <Input
                id="price"
                label="Price"
                register={register}
                disabled={isLoading}
                required
                error={errors}
                formatPrice
                type={`number`}
                />
            </div>
        )
    }


    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            actionLabel={actionLabel}
            secondaryLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Airbnb Your Home?"
            onSubmit={handleSubmit(onSubmit)}
            body={BodyContent}
        />
    )
}

export default RentModal
