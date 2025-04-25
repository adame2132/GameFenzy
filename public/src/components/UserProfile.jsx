import logo from '../assets/react.svg';
import { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
);

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
};

export default function UserProfile({ person }) {
    const neonColors = [
        '#97FB57', // Neon green
        '#FF6EC7', // Neon pink
        '#00FFFF', // Aqua
        '#FFFF00', // Yellow
        '#FF00FF', // Magenta
        '#00FF00', // Lime
        '#FF4500', // Orange Red
        '#7CFC00', // Lawn Green
        '#00CED1', // Dark Turquoise
        '#FF1493'  // Deep Pink
      ];
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [eventAttendance, setEventAttendance] = useState(null);
    const [sportPreferences, setSportPreferences] = useState(null);

    const generateNeonColors = (dataLength) => {
        return Array.from({ length: dataLength }, (_, i) => neonColors[i % neonColors.length]);
      };


    function extractMonth(event) {
        const monthString = event.event.date.substring(5, 7);
        const monthInt = parseInt(monthString, 10);
        return monthInt;
    }
    const createData = () => {
        const label_one = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const values = Array(12).fill(0);
        const sportsPlayed = [];
        const values2 = [];
        console.log(history);
    
        history.forEach((event) => {
            console.log("event is : ", event);
            const index = extractMonth(event) - 1;
            values[index] += 1;
    
            const name = event.event.sport_name;
            const index2 = sportsPlayed.findIndex((sport) => sport === name);
            if (index2 === -1) {
                sportsPlayed.push(name);
                values2.push(1);
            } else {
                values2[index2] += 1;
            }
        });
        setEventAttendance({
            labels: label_one,
            datasets: [
                {
                    label: 'Events Attended',
                    data: values,
                    borderColor: 'rgb(151, 251, 87)',
                    backgroundColor: 'rgb(31, 41, 55)',
                    tension: 0.4,
                    fill: true,
                },
            ],
        });
        setSportPreferences({
            labels: sportsPlayed,
            datasets: [{
                label: 'Sport History',
                data: values2,
                backgroundColor: generateNeonColors(sportsPlayed.length)
                
            }]
        });
    };

    // const sportPreferences = {
    //     labels: ['Soccer', 'Basketball', 'Tennis', 'Volleyball'],
    //     datasets: [
    //         {
    //             label: 'Sports',
    //             data: [30, 20, 10, 40],
    //             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    //         },
    //     ],
    // };

    const fetchHistory = async () => {
        setLoadingHistory(true);
        try {
            const res = await fetch(`http://localhost:8080/participents/users/history/${person._id}`);
            if (!res.ok) throw new Error('Failed to fetch joined events');
            const data = await res.json();
            setHistory(data);
            console.log('History is: ', data);
            createData();
        } catch (err) {
            console.error('Error fetching joined events:', err);
        } finally {
            setLoadingHistory(false);
        }
    };

    useEffect(() => {
        if (!loadingHistory) {
            fetchHistory();
        }
    }, [person]);

    useEffect(()=>{
        createData();

    }, [history])

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex pb-5 items-center gap-20 border-b bg-darkGreen">
                <div className="flex w-full  justify-center items-center gap-20">
                    {/* <img src={logo} alt="" className="w-20 h-20 rounded-full object-cover" /> */}
                    <div className="flex flex-col items-center">
                        <p className="text-2xl text-customwhite font-extrabold">{person.fname} {person.lname}</p>
                        <p className="text-md text-customwhite font-semibold">{person.age} years old</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-10 flex-wrap justify-center">
                <div className="w-96 h-60">
                    <h3 className="text-lg font-semibold mb-2 text-center">Event Attendance</h3>
                    <div className="w-full h-full">
                        {eventAttendance && <Line data={eventAttendance} options={chartOptions} />}
                    </div>
                </div>

                <div className="w-96 h-60">
                    <h3 className="text-lg mb-2 font-semibold text-center">Favorite Sports</h3>
                    <div className="w-full h-full">
                        {sportPreferences && <Pie data={sportPreferences} options={chartOptions} />}
                    </div>
                </div>
            </div>
        </div>
    );
}