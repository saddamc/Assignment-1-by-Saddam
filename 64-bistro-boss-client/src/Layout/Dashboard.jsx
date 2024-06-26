import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart();

    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();   /**previous: true */


    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome> Admin Home</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/addItems">
                                    <FaUtensils /> Add Items</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/manageItems">
                                    <FaList /> Manage Items </NavLink>
                                </li>
                                <li><NavLink to="/dashboard/bookings">
                                    <FaBook /> Manage Bookings</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/users">
                                    <FaUsers /> All Users</NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li><NavLink to="/dashboard/userHome">
                                    <FaHome></FaHome> User Home</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/reservation">
                                    <FaCalendar></FaCalendar> Reservation</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/cart">
                                    <FaShoppingCart></FaShoppingCart> My Cart ({cart.length}) </NavLink>
                                </li>
                                <li><NavLink to="/dashboard/review">
                                    <FaAd></FaAd> Add a review</NavLink>
                                </li>
                                <li><NavLink to="/dashboard/paymentHistory">
                                    <FaList></FaList>Payment History</NavLink>
                                </li>
                            </>
                    }


                    <div className="divider"></div>


                    {/* shared nav links */}
                    <li><NavLink to="/">
                        <FaHome></FaHome>Home</NavLink>
                    </li>
                    <li><NavLink to="/menu">
                        <TiThMenu></TiThMenu> Menu</NavLink>
                    </li>
                    <li><NavLink to="/order/salad">
                        <IoFastFoodSharp /> Order</NavLink>
                    </li>
                    <li><NavLink to="/order/contact">
                        <FaEnvelope /> Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;