import { BsCartPlusFill } from "react-icons/bs";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageItems = () => {
    const [menu, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = (item ) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                // console.log(res.data)
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        icon: "success",
                        text: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                      refetch();
                }
            }
          });
    }
    return (
        <div>
            <SectionTitle heading="Manage All Items" subHeading="Hurry Up"></SectionTitle>
     
            <div className="flex gap-12  mb-8 items-center  py-4 font-bold">
                <div className="flex  w-4/12 gap-24 bg-slate-100 shadow-md p-4 rounded-lg  ">
                    <div className="w-3/12 text-white ">
                        <p className="px-4 py-3 bg-green-500 rounded-lg shadow-lg font-bold text-xl"><BsCartPlusFill /></p>
                    </div>
                    <div className="w-9/12 text-center">
                        <h2 className="text-lg opacity-50">Total Cart  </h2>
                        <p className="text-2xl">{menu.length} </p>
                    </div>
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
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item, index) => <tr key={item._id}>
                                <td>
                                    {index + 1}
                                </td>
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
                                <td>
                                    <Link to={`/dashboard/updateItem/${item._id}`}>
                                    <button 
                                        className="btn btn-ghost btn-sm bg-orange-500"> <FaEdit className="text-white"></FaEdit> </button>
                                    </Link>
                                </td>
                                <td>
                                    <button 
                                    onClick={() => handleDeleteItem(item)}
                                        className="btn btn-ghost btn-xs"><FaTrashAlt className="text-red-600"></FaTrashAlt> </button>
                                </td>
                            </tr>)
                        } 



                    </tbody>
                
                </table>
            </div>
        </div>

    )
};

export default ManageItems; 