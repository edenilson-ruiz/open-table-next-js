"use client";

import { useState } from "react";
import { partySize, times } from "../../../../data";
import DatePicker, { registerLocale } from "react-datepicker";

// import es from 'date-fns/locale/es';
// registerLocale('es', es);


export default function ReservationCard({ openTime, closeTime }: { openTime: string, closeTime: string }) {

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handleChangeDate = (date: Date | null) => {
        if (date) {
            return setSelectedDate(date)
        }
        return setSelectedDate(null);
    }

    const filterTimeByRestaurantOpenWindow = () => {
        // openTime = 14:30:00.000Z   2:30 PM
        // closeTime = 21:30:30.000Z  9:30 pm
        const timesWithinWindows: typeof times = [];

        let isWithinWindow = false;

        times.forEach(time => {
            if (time.time === openTime) {
                isWithinWindow = true;
            }
            if (isWithinWindow) {
                timesWithinWindows.push(time);
            }
            if (time.time === closeTime) {
                isWithinWindow = false;
            }
        });

        return timesWithinWindows;
    }

    return (
        <div className="fixed w-[15%] bg-white rounded p-3 shadow">
            <div className="text-center border-b pb-2 font-bold">
                <h4 className="mr-7 text-lg">Make a Reservation</h4>
            </div>
            <div className="my-3 flex flex-col">
                <label htmlFor="">Party size</label>
                <select name="" className="py-3 border-b font-light" id="">
                    {partySize.map(option =>
                        (<option key={option.value} value={option.value}>{option.label}</option>)
                    )}
                </select>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="">Date</label>
                    <DatePicker
                        dateFormat="MMMM d"
                        className="py-3 border-b font-light text-reg w-24"
                        wrapperClassName="w-[48%]"
                        selected={selectedDate}
                        onChange={handleChangeDate}
                    />
                </div>
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="">Time</label>
                    <select name="" id="" className="py-3 border-b font-light">
                        {filterTimeByRestaurantOpenWindow().map(time => (
                            <option key={time.time} value={time.time}>{time.displayTime}</option>
                        ))
                        }
                    </select>
                </div>
            </div>
            <div className="mt-5">
                <button
                    className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
                >
                    Find a Time
                </button>
            </div>
        </div>
    );
}