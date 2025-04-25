import React, { useState, useEffect } from "react";
import { useUserStore } from "../../store";

export default function TimeGrid({ schedule }) {
  const { scheduleData, setScheduleData, user } = useUserStore();
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/avaliablities/' + user._id);
        const data = await response.json();
        setScheduleData(data.availability);
      } catch (error) {
        console.log("Error fetching availability:", error);
      }
    };

    if (schedule === 0) {
      fetchData();
    } else if (schedule === 1) {
      setScheduleData([]);
    }
  }, [schedule]);

  const hourLabels = [];
  for (let hour = 0; hour < 24; hour++) {
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const amPm = hour < 12 ? "AM" : "PM";
    hourLabels.push(`${formattedHour} ${amPm}`);
  }

  const convertTimeToIndex = (time) => {
    const match = time.toLowerCase().match(/(\d+):(\d+)(am|pm)/);
    if (!match) return -1;

    let [_, h, m, period] = match;
    h = parseInt(h);
    m = parseInt(m);

    if (period === "pm" && h !== 12) h += 12;
    if (period === "am" && h === 12) h = 0;

    return (h * 4) + (m / 15);
  };

  return (
    <div className="flex flex-col items-center ml-10">
      <div className="overflow-x-auto w-full">
        <div className="p-4 rounded-xl shadow-[0_0_30px_theme('colors.neon')] bg-black">
          <div className="grid">
            <div className="grid grid-cols-[200px_repeat(96,1fr)] bg-darkGreen text-white text-xs text-center font-extrabold p-2 shadow-[0_0_10px_2px_theme('colors.neon')]">
              <div className="p-2 text-base font-bold"></div>
              {hourLabels.map((hour, index) => (
                <div key={index} className="p-2 col-span-4">{hour}</div>
              ))}
            </div>
            {daysOfWeek.map((day, dayIndex) => {
              const dayAvailability = scheduleData?.find((d) => d.day === day) || null;

              return (
                <div key={dayIndex} className="grid grid-cols-[200px_repeat(96,1fr)] border-t text-center text-xs">
                  <div className="p-4 text-lg font-extrabold text-customwhite bg-darkGreen shadow-[0_0_10px_2px_theme('colors.neon')]">
                    {day}
                  </div>
                  {[...Array(96)].map((_, timeIndex) => {
                    const isAvailable = dayAvailability?.time_slots?.some((slot) => {
                      const startIndex = convertTimeToIndex(slot.start);
                      const endIndex = convertTimeToIndex(slot.end);
                      return timeIndex >= startIndex && timeIndex < endIndex;
                    });

                    const shouldHaveBorder = timeIndex % 4 === 0 && !isAvailable;

                    return (
                      <div
                        key={timeIndex}
                        className={`p-2 ${shouldHaveBorder ? "border-l border-gray-700" : ""} ${
                          isAvailable ? "bg-neon shadow-[0_0_10px_2px_theme('colors.neon')]" : "bg-gray-800"
                        }`}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}