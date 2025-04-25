import React, {Suspense, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from '../store';
import { usePageStore } from '../store';
// import { isTokenValid } from '../helpers/validateToken';
const  LoginSignUp = React.lazy(()=> import( '../pages/LoginSignUp'));
// const Home = React.lazy(()=> import('../pages/Home'));
const Events = React.lazy(()=> import('../pages/Events'));
const Friends = React.lazy(()=> import('../pages/Friends'));
const Availability = React.lazy(()=> import('../pages/Availiabilty'));
const Profile = React.lazy(() => import("../pages/Profile"));





export const AppRoutes = () => {
    const {currentPage} = usePageStore();
    const logout = useUserStore((state) => state.logout);
    const token = useUserStore((state)=> state.token);
    // useEffect(()=> {
    //     if(token && isTokenValid(token)){
    //         logout();
    //     }

    // }, [currentPage])
    
    return (
        <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<LoginSignUp/>} />
                {/* <Route path="/home" element = { token ? <Home/> : <Navigate to="/"/>}/> */}
                <Route path="/events" element = {token ? <Events/>: <Navigate to="/"/>}/>
                <Route path="/friends" element = {token ? <Friends/>: <Navigate to="/"/>}/>
                <Route path="/availiability" element = {token ? <Availability/>: <Navigate to="/"/>}/>
                <Route path="/users/profile" element = {token ? <Profile/>: <Navigate to="/"/>}/>
            </Routes>
        </Suspense>
    </Router>


)};