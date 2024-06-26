import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BsCartPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";


const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    const axiosSecure = useAxiosSecure();

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div>
            <div className="flex gap-12  mb-8 items-center  py-4 font-bold">
                <div className="flex  w-4/12 gap-24 bg-slate-100 shadow-md p-4 rounded-lg  ">
                    <div className="w-3/12 text-white ">
                        <p className="px-4 py-3 bg-green-500 rounded-lg shadow-lg font-bold text-xl"><BsCartPlusFill /></p>
                    </div>
                    <div className="w-9/12 text-center">
                        <h2 className="text-lg opacity-50">Total Cart  </h2>
                        <p className="text-2xl">{cart.length} </p>
                    </div>
                </div>
                <div className="flex w-4/12 gap-12 bg-slate-100 shadow-md p-4 rounded-lg  ">
                    <div className="w-3/12 text-white ">
                        <p className="px-4 py-3 bg-orange-400 rounded-lg shadow-lg font-bold text-xl">$</p>
                    </div>
                    <div className="w-9/12 text-center">
                        <h2 className="text-lg opacity-50">Total Price  </h2>
                        <p className="text-2xl">$ {totalPrice} </p>

                    </div>
                </div>


                <div className=" w-4/12 text-center ">
                { cart.length ? <Link to="/dashboard/payment"> 
                <button className="btn btn-warning w-36 font-bold text-xl "> $ PAY</button>
                </Link> :
                <button disabled className="btn btn-warning w-36 font-bold text-xl "> $ PAY</button>
                }
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table  w-full">

                    <thead className="bg-gray-100">
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>$ {item.price} </td>
                                <th>
                                    <button onClick={() => handleDelete(item._id)}
                                        className="btn btn-ghost btn-xs"><FaTrashAlt className="text-red-600"></FaTrashAlt> </button>
                                </th>
                            </tr>)
                        }



                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr className="bg-orange-300 text-[16px]">
                            <th></th>
                            <th></th>
                            <th> Total Price: </th>
                            <th>$ {totalPrice} </th>
                            <th></th>
                        </tr>
                    </tfoot>


                </table>
            </div>
        </div>

    );
};

export default Cart;