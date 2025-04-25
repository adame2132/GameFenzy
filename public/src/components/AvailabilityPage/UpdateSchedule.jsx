import { useEffect } from "react";
import { useUserStore } from "../../store";
import { useUpdateAvaliablityStore } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function UpdateSchedule() {
  const {
    setDay,
    openTimeModal,
    localSchedule,
    setLocalSchedule,
    hasChanges,
    setHasChanges,
  } = useUpdateAvaliablityStore();
  const { scheduleData, user } = useUserStore();

  useEffect(() => {
    if (scheduleData && scheduleData.length > 0) {
      setLocalSchedule(scheduleData);
    }
  }, [scheduleData]);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleAddTimeSlot = (day) => {
    setDay(day);
    openTimeModal();
  };

  const handleDeleteTimeSlot = (day, index) => {
    const updatedSchedule = [...localSchedule];
    const dayIndex = updatedSchedule.findIndex((d) => d.day === day);

    if (dayIndex !== -1) {
      updatedSchedule[dayIndex].time_slots.splice(index, 1);

      if (updatedSchedule[dayIndex].time_slots.length === 0) {
        updatedSchedule.splice(dayIndex, 1);
      }
    }

    setLocalSchedule(updatedSchedule);
    setHasChanges(true);
  };

  const handleSaveChanges = async () => {
    const requestBody = JSON.stringify({ availability: localSchedule });
    try {
      const response = await fetch(
        `http://localhost:8080/avaliablities/${user._id}`,
        {
          method: "PATCH",
          body: requestBody,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        console.log("Schedule updated successfully!");
        setHasChanges(false);
      } else {
        console.error("Failed to update schedule:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  return (
    <div className="p-4 flex flex-col items-end">
      <div className="border-[6px] border-darkGreen rounded-xl shadow-[0_0_20px_4px_#39ff14] w-full">
        <table className="border-collapse w-full text-center">
          <thead>
            <tr>
              {daysOfWeek.map((day) => (
                <th
                  key={day}
                  className="border border-gray-300 p-2 text-white bg-darkGreen font-extrabold"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {daysOfWeek.map((day) => {
                const dayData = localSchedule.find((d) => d.day === day);
                return (
                  <td
                    key={day}
                    className="border border-gray-300 p-2 align-top"
                  >
                    {dayData ? (
                      dayData.time_slots.map((slot, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-darkGreen p-2 mt-2 rounded mb-2"
                        >
                          <span className="text-md text-customwhite font-semibold">
                            {slot.start} - {slot.end}
                          </span>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-neon font-bold ml-2 cursor-pointer"
                            onClick={() => handleDeleteTimeSlot(day, index)}
                          />
                        </div>
                      ))
                    ) : (
                      <p className="text-customwhite font-semibold">
                        No availability
                      </p>
                    )}
                    <button
                      className="bg-darkGrey hover:bg-neon hover:text-black text-white text-sm px-3 py-1 mt-2"
                      onClick={() => handleAddTimeSlot(day)}
                    >
                      Add
                    </button>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <button
        className={`mt-4 px-6 py-2 rounded text-white ${
          hasChanges
            ? "bg-neon text-black"
            : "bg-darkGrey text-white cursor-not-allowed"
        }`}
        onClick={handleSaveChanges}
        disabled={!hasChanges}
      >
        Save Changes
      </button>
    </div>
  );
}