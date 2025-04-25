export default function Matchingfriend() {
    return (
      <div className="flex flex-col bg-gray-800 rounded-lg px-10 h-140 mt-5">
        <div className="border-b-2 mt-5 border-neon shadow-neon bg-darkGreen w-full p-4">
          <h2 className="text-xl text-center text-customwhite font-semibold">
            Matching Friends Schedules
          </h2>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <p className="text-customwhite font-semibold">
            No Friends with matching Schedules
          </p>
        </div>
      </div>
    );
  }