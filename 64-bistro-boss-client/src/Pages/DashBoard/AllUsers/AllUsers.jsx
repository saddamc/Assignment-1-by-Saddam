import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDeleteUser = user => {
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

                axiosSecure.delete(`/users/${user._id}`)
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
                        <p className="px-4 py-3 bg-green-500 rounded-lg shadow-lg font-bold text-xl"><FaUsers /> </p>
                    </div>
                    <div className="w-9/12 text-center">
                        <h2 className="text-lg opacity-50">Total Users  </h2>
                        <p className="text-2xl"> {users.length} </p>
                    </div>
                </div>
                {/* <div className="flex w-4/12 gap-12">
                </div>
                <div className=" w-4/12 text-center ">
                </div> */}
            </div>
            <div className="overflow-x-auto">
                <table className="table  w-full">

                    <thead className="bg-orange-300 text-white">
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    {user.photo}
                                </td>
                                <td>
                                    {user.name}
                                </td>
                                <td>{user.email} </td>
                                <th>
                                    {user.role === 'admin' ? 'admin' : <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-lg bg-orange-500"><FaUsers className="text-white text-2xl"></FaUsers>
                                    </button>}
                                </th>
                                <th>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-xs"><FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                </th>
                            </tr>)
                        }



                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default AllUsers;