import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { BsCurrencyDollar } from "react-icons/bs";
import { split } from "postcss/lib/list";


const PaymentHistory = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data: payments = []} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })

    return (
        <div>
            <SectionTitle heading="Payment History" subHeading="Check your payment"></SectionTitle>
     
            <div className="flex gap-12  mb-8 items-center  py-4 font-bold">
                <div className="flex  w-5/12 gap-24 bg-slate-100 shadow-md p-4 rounded-lg  ">
                    <div className="w-3/12 text-white ">
                        <p className="px-4 py-3 bg-teal-500 rounded-lg shadow-lg font-bold text-xl"><BsCurrencyDollar /></p>
                    </div>
                    <div className="w-9/12 text-center">
                        <h2 className="text-lg opacity-50">Total Payments </h2>
                        <p className="text-2xl">{payments.length} </p>
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
                            <th>Price</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => <tr key={payment._id}>
                                <td>
                                    {index + 1}
                                </td>
                               
                                <td>
                                    $ {payment.price}
                                </td>
                                <td>{payment.transactionId} </td>
                                <td>
                                    <p className="bg-purple-600 p-[2px] rounded-lg text-center text-white text-md font-bold ">{payment.status}</p>
                                   
                                </td>
                                <td>
                                  {payment.date}
                                </td>
                            </tr>)
                        } 



                    </tbody>
                
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;