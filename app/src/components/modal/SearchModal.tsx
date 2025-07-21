'use client'
import { useRouter, useSearchParams } from "next/navigation";
import useSearchModal from "../hooks/useSearchModal"
import Modal from "./Modal";
import { useCallback, useMemo, useState } from "react";
import { DateRange, Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from 'query-string';
import Heading from "../Heading";
import Calendar from "../Calendar";
import Counter from "../inputs/Counter";
enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
};

const SearchModal = () => {
    const searchModal = useSearchModal();
    const router = useRouter();
    const params = useSearchParams();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setSteps] = useState(1);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoom] = useState(1);
    const [bathroomCount, setBathroom] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });
    const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location]);
    const onBack = () => {
        setSteps((value) => value - 1);
    }
    const onNext = () => {
        setSteps((value) => value + 1);
    }
    const onSubmit = useCallback(async () => {
        if (step != STEPS.INFO) {
            return onNext();
        }
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };
        if (dateRange?.startDate) {
            (updatedQuery as any)['startDate'] = dateRange.startDate.toISOString();
        }
        if (dateRange?.endDate) {
            (updatedQuery as any)['endDate'] = dateRange.endDate.toISOString();
        }
        const url = qs.stringifyUrl({ url: '/', query: updatedQuery }, { skipNull: true });
        setSteps(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    }, [
        step,
        searchModal,
        location,
        router,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        onNext,
        params
    ]);
    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Create';
        }
        return 'Next';
    }, [step]);
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }
        return 'Back';
    }, [step]);
    let BodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Where Do you wanna GO?"
                subtitle="Find the Perfect Location" />
            <CountrySelect value={location} onChange={(value) => { setLocation(value as CountrySelectValue); }} />
            <hr className="text-neutral-100 bg-neutral-100" />
            <Map center={location?.latlng} />

        </div>
    )
    if (step === STEPS.DATE) {
        BodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="When Do You Plan To Go?" subtitle="Make Sure Everyone Is Free" />
                <Calendar value={dateRange} onChange={(value) => { setDateRange(value.selection) }} />
            </div>
        )
    }
    if (step === STEPS.INFO) {
        BodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="More Information" subtitle="Find YOur Perfect Place" />
                <Counter
                    title="Guest"
                    subtitle="How Many Guests Are Coming"
                    value={guestCount}
                    onChange={(value) => { setGuestCount(value); }}
                />
                <Counter
                    title="Rooms"
                    subtitle="How Many Rooms Do You Have"
                    value={roomCount}
                    onChange={(value) => { setRoom(value); }}
                />
                <Counter
                    title="Bathrooms"
                    subtitle="How Many Bathrooms Are There"
                    value={bathroomCount}
                    onChange={(value) => { setBathroom(value); }}
                />
            </div>
        )
    }





    return (
        <Modal isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            secondaryAction={onBack}
            secondaryLabel={secondaryActionLabel}
            title="Filters"
            actionLabel={actionLabel}
            body={BodyContent}
        />
    );
}

export default SearchModal
