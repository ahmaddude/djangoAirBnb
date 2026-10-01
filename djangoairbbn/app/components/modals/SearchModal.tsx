'use client'
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import SelectCountry,{SelectCountryValue} from "../forms/SelectCountry";
import { useState } from "react";
import { Range } from "react-date-range";
import DatePicker from '../forms/Calendar'
import CustomButton from "../forms/CustomButton";



    const initialDateRange={
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
    }


const SearchModal=()=>{
    let content= (<></>);
    const searchModal=useSearchModal();
    const [country, setCountry]=useState<SelectCountryValue>();
    const [guests, setGuests]=useState<string>('1')
    const [bedrooms, setbedrooms]=useState<string>('0')
    const [bathrooms, setbathrooms]=useState<string>('0')

    const [dateRange,setDateRange]=useState<Range>(initialDateRange)


    const closeAndSearch=()=>{
        searchModal.close();
    }

    const _setDateRange= (selection:Range)=>{
        if(searchModal.step=== 'checkIn'){
            searchModal.open('checkOut')
        }else if (searchModal.step=='checkOut'){
            searchModal.open('details');
        }

        setDateRange(selection);
    }

    const contentLocation=(
        <>
            <h2 className='mb-6 text-2xl'>Where do you want to go?</h2>

            <SelectCountry
            value={country}
            onChange={(value)=>setCountry(value as SelectCountryValue)}
            />

            <div className='mt-6 flex flex-row gap-4'>
                <CustomButton
                    label='Check in date ->'
                    onClick={()=> searchModal.open('checkIn')}
                />
            </div>
        </>
    )

    const contentCheckIn=(
        <>
            <h2 className='mb-6 text-2xl'>When do you want to check in?</h2>
            <DatePicker
                value={dateRange}
                onChange={(value)=>_setDateRange(value.selection)}
                />

            <div className='mt-6 flex flex-row gap-4'>
                <CustomButton
                    label='<- Location'
                    onClick={()=> searchModal.open('location')}
                />
            </div>

            <div className='mt-6 flex flex-row gap-4'>
                <CustomButton
                    label='Check out date ->'
                    onClick={()=> searchModal.open('checkOut')}
                />
            </div>
        </>
    )

    const contentCheckOut=(
        <>
            <h2 className='mb-6 text-2xl'>When do you want to check out?</h2>
            <DatePicker
                value={dateRange}
                onChange={(value)=>_setDateRange(value.selection)}
                />

            <div className='mt-6 flex flex-row gap-4'>
                <CustomButton
                    label='<- Location'
                    onClick={()=> searchModal.open('checkIn')}
                />
            </div>

            <div className='mt-6 flex flex-row gap-4'>
                <CustomButton
                    label='details ->'
                    onClick={()=> searchModal.open('details')}
                />
            </div>
        </>
    )

    const contentDetails=(
        <>
            <h2 className='mb-6 text-2xl'>Other Details</h2>

            <div className="space-y-4 ">
                <div className="space-y-4">
                    <label>Number of guests:</label>
                    <input type="number" min='1' value={guests} 
                        placeholder="Number of guests..."
                        onChange={(e)=>setGuests(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
            </div>
            <hr className="mt-5 mx-2 text-gray-400 shadow shadow-gray-500"/>

            <div className="space-y-4 ">
                <div className="space-y-4">
                    <label>Number of bedrooms:</label>
                    <input type="number" min='0' value={bedrooms} 
                        placeholder="Number of bedrooms..."
                        onChange={(e)=>setbedrooms(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
            </div>

                <hr className="mt-5 mx-2 text-gray-400 shadow shadow-gray-500"/>


            <div className="space-y-4 ">
                <div className="space-y-4">
                    <label>Number of bathrooms:</label>
                    <input type="number" min='0' value={bathrooms} 
                        placeholder="Number of bathrooms..."
                        onChange={(e)=>setbathrooms(e.target.value)}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
            </div>

            <div className='mt-6 flex flex-row gap-4'>
                <CustomButton
                    label='<- check out date'
                    onClick={()=> searchModal.open('checkOut')}
                />
            </div>

            <div className='mt-6 flex flex-row gap-4'>
                <CustomButton
                    label='Search'
                    onClick={closeAndSearch}
                />
            </div>
        </>
    )

    if (searchModal.step=='location'){
        content=contentLocation;
    }else if(searchModal.step=='checkIn'){
        content=contentCheckIn;
    }else if(searchModal.step==='checkOut'){
        content=contentCheckOut;
    }else if (searchModal.step==='details'){
        content=contentDetails
    }

    return(
        <Modal
            isOpen={searchModal.isOpen}
            close={searchModal.close}
            lable='Search'
            content={content}
        />
    )
}
export default SearchModal;