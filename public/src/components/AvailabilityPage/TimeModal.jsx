import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerMulti from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useState, useEffect, useRef } from 'react';
import { useUpdateAvaliablityStore } from "../../store";

export default function TimeModal() {
    const {
        setStartTime,
        setEndTime,
        start_time,
        end_time,
        day,
        updateLocalSchedule,
        closeTimeModal,
        clearTimes,
        setHasChanges
    } = useUpdateAvaliablityStore();

    const handleStartTimeChange = (time) => {
        let formattedTime = time.format("hh:mmA");
        if (formattedTime[0] === '0') {
            formattedTime = formattedTime.substring(1);
        }
        setStartTime(formattedTime);
    };

    const handleEndTimeChange = (time) => {
        let formattedTime = time.format("hh:mmA");
        if (formattedTime[0] === '0') {
            formattedTime = formattedTime.substring(1);
        }
        setEndTime(formattedTime);
    };

    const handleCloseModal = () => {
        closeTimeModal();
    };

    const handleAddTime = () => {
        updateLocalSchedule(day, start_time, end_time);
        closeTimeModal();
        clearTimes();
        setHasChanges(true);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-black/50">
            <div className="relative p-4 rounded-lg bg-neon shadow-[0_0_10px_#39ff14,0_0_20px_#39ff14,0_0_30px_#39ff14]">
                <div className="bg-customwhite p-6">
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-10">
                            <div className="flex flex-col">
                                <p className='text-lg'>Start Time</p>
                                <DatePickerMulti
                                    disableDayPicker
                                    selected={start_time}
                                    onChange={handleStartTimeChange}
                                    format="hh:mm A"
                                    plugins={[<TimePicker hideSeconds />]}
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className='text-lg'>End Time</p>
                                <DatePickerMulti
                                    disableDayPicker
                                    selected={end_time}
                                    onChange={handleEndTimeChange}
                                    format="hh:mm A"
                                    plugins={[<TimePicker hideSeconds />]}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-5">
                            
                            <button
                                className="text-center font-semibold bg-darkGreen w-20 text-white hover:bg-neon hover:text-black"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="text-center  font-semibold bg-darkGreen w-20 text-white hover:bg-neon hover:text-black"
                                onClick={handleAddTime}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}