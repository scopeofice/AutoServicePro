import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Registration from "./Registration";
import HomePage from "./HomePage";
import UserHomepage from "./UserHomepage";
import Logout from './Logout';
import AboutUs from './AboutUs';
import AddCustomerBooking from "./AddCustomerBooking";


export default function RouterPath() {

    const element =

        <>
            <Routes>
                <Route path="" element={<HomePage />}></Route>
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/Registration" element={<Registration />}></Route>
                <Route path="/User" element={<UserHomepage />}></Route>
                <Route path="/Logout" element={<Logout />}></Route>
                <Route path="/AboutUs" element={<AboutUs />}></Route>
                <Route path="/BookService" element={<AddCustomerBooking />}></Route>

            </Routes>
        </>

    return element;

}
