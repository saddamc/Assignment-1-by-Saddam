import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBook, FaUsers, FaWallet } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const AdminHome = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()

    const {data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async() => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const {data: chartData = []} = useQuery({
      queryKey: ['order-stats'],
      queryFn: async () => {
        const res = await axiosSecure.get('/order-stats');
        return res.data;
      }
    })

    // custom shape for the bar chart
    const getPath = (x, y, width, height) => {
      return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
      ${x + width / 2}, ${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
      Z`;
    };
    
    const TriangleBar = (props) => {
      const { fill, x, y, width, height } = props;
    
      return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    // custom shape for the pie chart
    const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const pieChartData = chartData.map(data => {
  return {name: data.category, value: data.revenue}
})

    // if (isLoading) {
    //     return <progress className="progress w-56"></progress>
    // }

    return (
        <div>
            <h2 className="text-4xl">
                <span className="text-purple-500 font-extrabold">Welcome to </span>
                <span className="text-blue-700 font-bold ml-6 uppercase ">{
                    user?.displayName ? user.displayName : 'Back'
                }</span>
            </h2>
            <div className="flex mt-12 gap-5 text-white">
  
  <div className="flex gap-2 p-6 bg-[#c44bf5] text-center items-center rounded-xl w-[20%]  shadow-lg shadow-green-300 ">
    <div className="">
     <FaWallet className="text-4xl"></FaWallet>
    </div>
    <div>
      <div className="text-white">Revenue</div>
      <div className="stat-value">${stats.revenue}</div>
      <div className="text-sm">May 1st - June 1st</div>
    </div>
  </div>
  
  <div className="flex gap-2 p-6 bg-[#d7a961] text-center items-center rounded-xl w-[20%]  shadow-lg shadow-green-300 ">
    <div className="">
      <FaUsers className="text-4xl"></FaUsers>
    </div>
    <div>
    <div className="">Users</div>
    <div className="stat-value">{stats.users} </div>
    <div className="">↗︎ 400 (22%)</div>
    </div>
  </div>
  <div className="flex gap-2 p-6 bg-[#fe598d] text-center items-center rounded-xl w-[20%] shadow-lg shadow-green-300 ">
    <div className="">
      <FaBook className="text-4xl"></FaBook>
    </div>
    <div>
    <div className="">Menu Items</div>
    <div className="stat-value">{stats.menuItems} </div>
    <div className="">↗︎ 400 (22%)</div>
    </div>
  </div>
  
  <div className="flex gap-2 p-6 bg-[#72b6ff] text-center items-center rounded-xl w-[20%]  shadow-lg shadow-green-300 ">
    <div>
    <BiFoodMenu className="text-4xl"></BiFoodMenu>
    </div>
    <div>
    <div className="">Orders</div>
    <div className="stat-value">{stats.orders} </div>
    <div className="">↘︎ 90 (14%)</div>
    </div>
  </div>
  
            </div>
            <div className="flex mt-12">
              <div className="w-1/2">
              <p className="text-center uppercase font-bold mb-4">Order Chart </p>
              <BarChart
      width={500}
      height={300}
      data={chartData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 6]} />
        ))}
      </Bar>
              </BarChart> 
    

              </div>
              <div className="w-1/2">
              <PieChart width={400} height={400}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>

              </div>
            </div>
        </div>
    );
};

export default AdminHome; 