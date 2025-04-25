import {create} from "zustand";
import { persist } from 'zustand/middleware';
import { useJsApiLoader } from '@react-google-maps/api'
import {useEffect} from 'react'


const libraries = ["places", "marker"]

export const useAddModalStore = create((set) => ({
    isAddModalOpen: false,
    openAddModal: ()=>set({isAddModalOpen: true}),
    closeAddModal: ()=>set({isAddModalOpen: false})
}));


export const useEventDetailStore = create((set, get) => ({
    searchQuery: '',
    filterType: '',
    event : null,
    event: null,
    eventId: null,
    isEventDetailOpen: false,
    participents: null,
    setFilterType: (filter) => {
        set({filterType: filter});
    },
    setSearchQuery: (filter) => {
        set({searchQuery: filter});
    },
    setEventId: (id)=>{
        set({eventId: id})
        console.log("event id set to: ",get().eventId);
    },
    openEventDetail:()=>  {
        console.log("Open Event Detail called");
        set({isEventDetailOpen: true});
    },
    closeEventDetail:()=> set({isEventDetailOpen: false}),
    getEvent: async ()=>{
        console.log("get event called");
        const id = get().eventId;
        if(!id){
            return 
        }
        try{
            const response = await fetch('http://localhost:8080/events/'+id);
                if(response.status === 200){
                    const data = await response.json();
                    console.log("event reccived is: ", data);
                    set({event: data});
                }
                else{
                    console.log("Wrong status code given back when getting event with id: ", id);
                }

        }catch{
            console.log("Error trying to fetch event with Id: ", id);
        }
    },
    getParticipents: async () => {
        try{
            console.log("Getting particpents for event");
            const id = get().eventId;
            if(!id){
                return 
            }
            const response = await fetch('http://localhost:8080/participents/'+id);
            if(response.status == 200){
                const data = await response.json();
                console.log("Particpents are :", data);
                set({participents: data});
    
            }
        }
        catch{
            console.log("error trying to get particpents");
         }

    },
    clearEvent:()=> { 
        set({even: null});
        set({participents: null});
    },
    loadEvents: async ()=>{
        try{
            const response = await fetch('http://localhost:8080/events');
            if(response.status === 200){
                const data = await response.json();
                console.log("Data reccived: ", data);
                set({events: data});
            }
            else{
                console.log("Error fetchiung data incorrect status retured");
            }

        }catch(error){
            console.log("Error fetching all events");
            console.log(error);
        }

    }



}));

export const useGoogleMapsStore = create((set) => ({
    userLocation: null,
    isLoaded: false,
    setUserLocation: (location) => set({ userLocation: location }),
    setIsLoaded: (value) => set({ isLoaded: value }),
}));

export const useGoogleMaps = () => {
    const { setIsLoaded } = useGoogleMapsStore();
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDLtZvfRKbNin7NDXcaUj4uoaBSjwIwdP4",
        libraries: libraries,
    });

    useEffect(() => {
        setIsLoaded(isLoaded); 
    }, [isLoaded, setIsLoaded]);

    return { isLoaded };
};

export const useUserStore = create(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        refresh: null,
        scheduleData: null,
  
        setUser: (userSignedIn) => {
          set({ user: userSignedIn });
        },
        setToken: (t) => {
          set({ token: t });
        },
        setRefresh: (t) => {
            set({ refresh: t });
          },
        setScheduleData: (s) => {
          set({ scheduleData: s });
        },
        logout: () => {
          set({ token: null, user: null, scheduleData: null });
          localStorage.removeItem('user-store'); 
        },
      }),
      {
        name: 'user-store',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          refresh: state.refresh
        }),
      }
    )
  );

export const useUpdateAvaliablityStore = create((set, get) => ({
    day: null,
    start_time: null,
    end_time: null,
    isTimeModalOpen: false,
    localSchedule: [],
    hasChanges: false,
    setHasChanges: (value) => set({hasChanges: value}),
    openTimeModal: () => {
        set({isTimeModalOpen: true});
        console.log("Time modal should appear now");
    },
    closeTimeModal: () => {
        set({isTimeModalOpen: false});
        console.log("Time modal should appear now");
    },
    setDay: (d) => {
        set({day: d});
        console.log("day is set global for use: ", get().day);
    },
    setStartTime: (t) => {
        set({start_time: t});
        console.log("start time is set global for use: ", get().start_time);
    },
    setEndTime: (t) => {
        set({end_time: t});
        console.log("end time is set global for use: ", get().end_time);
    },
    setLocalSchedule: (s) => {
        set({localSchedule: s});
        console.log("local Schedule updated");
    },
    updateLocalSchedule: (day, start, end) => {
        const schedule = get().localSchedule;
        const newSlot = { start, end };
    
        const dayIndex = schedule.findIndex(d => d.day === day);
        let updatedSchedule;
    
        if (dayIndex !== -1) {
            updatedSchedule = [...schedule];
            updatedSchedule[dayIndex] = {
                ...updatedSchedule[dayIndex],
                time_slots: [...updatedSchedule[dayIndex].time_slots, newSlot],
            };
        } else {
            updatedSchedule = [...schedule, { day, time_slots: [newSlot] }];
        }
    
        set({ localSchedule: updatedSchedule });
        console.log("Updated schedule: ", updatedSchedule);
    },
    clearTimes: () => {
        set({ start_time: null, end_time: null });
        console.log("start_time and end_time have been cleared");
    },


}));

export const usePageStore = create((set) => ({
    currentPage: '/',
    setCurrentPage: (page) => {

        set({ currentPage: page });
        console.log("Current Page updated");
    }
}));

export const useSideMenuStore = create((set) => ({
    isSideMenuOpen: false,
    openSideMenu: () => {

        set({ isSideMenuOpen: true });
        console.log(" isSideMenu value changed to open");
    },
    closeSideMenu: () => {

        set({ isSideMenuOpen: false });
        console.log(" isSideMenu value changed to close");
    }
}));



