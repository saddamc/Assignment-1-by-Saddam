import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";



const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = () => {
        // console.log(food, user.email)
        if (user && user.email) {
            // send cart item to the database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch cart to update the cart items count
                        refetch();
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    //    send the user to the login page
                    navigate('/login', { state: { from: location } })
                }
            });

        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl ml-4">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-slate-900 text-white font-bold absolute rounded-md right-0 mr-4 mt-4 px-4 py-0.5">${price} </p>
            <div className="card-body flex flex-col items-center ">
                <h2 className="card-title">{name}</h2>
                <p>{recipe} </p>
                <div className="card-actions justify-center">
                    <button onClick={handleAddToCart} className="btn border-b-4  bg-[#e8e8e8] hover:bg-[#111827] hover:border-orange-400 uppercase text-lg  text-orange-400 border-0 border-orange-400 btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;