"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import LocationInput from "../inputs/LocationInput";
import { FieldValues, useForm } from "react-hook-form";

const locations = [
{
    label: "Gdańsk",
},
{
    label: "Kraków",
},
{
    label: "Sopot",
},
{
    label: "Gdynia",
},


]

enum STEPS {
    LOCATION = 0,
    INFO = 1,
    IMAGES=2,
    DESCRIPTION=3,
    PRICE=4,
}

const RentModal = () => {
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.LOCATION);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
        } = useForm<FieldValues>({
            defaultValues:{
                location: '',
                guestCount: 1,
                roomCount: 1,
                bathroomCount: 1,
                imageSrc: '',
                price: 1,
                title: '',
                description: '',
            }
        });

    const location = watch('location');

    const setCustomValue = (id:string, value:any) => {
        setValue(id, value,{
            shouldTouch: true,
            shouldValidate: true,
            shouldDirty: true,
        });
    }
    

    const onBack = () => {
        setStep((value) => value - 1);
    };
    const onNext = () => {
        setStep((value) => value + 1);
    };

    const actionLabel= useMemo(() => {
        if(step === STEPS.PRICE) {
            return 'Create';
        }
        return 'Next';
    }
    ,[step]);

    const secondaryLabel = useMemo(() => {
        if(step === STEPS.LOCATION) {
            return undefined;
        }
        return 'Back';
    }, [step]);


    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Location"
            subtitle="Choose where your room is located "/>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        
        {locations.map((item)=>(
            <div key={item.label} className="col-span-1">
                <LocationInput
                    onClick={(location)=>setCustomValue('location', location)}
                    selected={location === item.label}
                    label={item.label}
                />
            </div>
        ))}
        
        </div>


        </div>
    )


    return ( 
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.close}
        onSubmit={rentModal.close}
        actionLabel={actionLabel}
        secondaryLabel={secondaryLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        title="Add new property"
        body={bodyContent}
        />
     );
}
 
export default RentModal;