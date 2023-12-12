import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASEURL } from '../components/Api/Api_Url';
import { useEffect, useState } from 'react';




const OrderPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState();
  const [orders, setOrders] = useState([]);


  {
    /* ///////////////////   Orders Stats API /////////////////////// */
  }

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/admin/getAdminStats`);
      console.log(response.data);
      setStats(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  {
    /* ///////////////////  Total Orders API /////////////////////// */


  }

  


  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/api/admin/getAllOrders`
      );
      console.log(response.data);
      setOrders(response?.data.orders);

   
    } catch (error) {
      console.log(error);
    }
  };

  // Update the useEffect hook for fetching orders
  useEffect(() => {
    fetchOrders();
  }, []);


  

  return (
    <section>
      {/* ///////////////////////   Info for Orders /////////////////////// */}
      <div className="shadow-indigo-500/40 mb-5 rounded-lg p-3 shadow-lg">
        <p className=" my-4 text-[2rem] font-bold text-black">Orders:</p>
        <div className=" my-4 flex flex-wrap gap-3">
          <div className="shadow-indigo-500/40   flex flex-1 flex-col items-center  justify-center  gap-5 rounded-lg bg-primary p-5 shadow-lg   ">
            <h2 className=" text-[4rem] text-black">
              {stats?.totalOrdersCount}
            </h2>
            <p className=" text-[1 rem] text-black">Total orders</p>
          </div>
          <div className="shadow-indigo-500/40   flex w-[50%]  flex-1 flex-col items-center justify-center  gap-5 rounded-lg bg-danger p-5 shadow-lg">
            <h2 className=" text-[4rem] text-black">
              {stats?.authenticOrderCount}
            </h2>
            <p className=" text-[1 rem] text-black">Authenticated Orders</p>
          </div>
        </div>
        <div className=" flex flex-wrap gap-3">
          <div className="shadow-indigo-500/40   flex flex-1  flex-col items-center  justify-center  gap-5 rounded-lg bg-body p-5 shadow-lg   ">
            <h2 className=" text-[4rem] text-black">
              {stats?.respondingOrdersCount}
            </h2>
            <p className=" text-[1 rem] text-black">Responded Orders</p>
          </div>
          <div className="shadow-indigo-500/40   flex w-[50%] flex-1 flex-col items-center justify-center  gap-5 rounded-lg bg-meta-5 p-5 shadow-lg">
            <h2 className=" text-[4rem] text-black">
              {stats?.pendingOrdersCount}
            </h2>
            <p className=" text-[1 rem] text-black">Pending Orders</p>
          </div>
        </div>
      </div>

      {/* ///////////////////////   Tables for order /////////////////////// */}
      <div className="rounded-lg border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark p-2">
        <div className="max-w-full overflow-x-auto">
          <div className=" flex items-center justify-start">
            <p>Search:</p>
            <input
              type="text"
              placeholder="Search order"
              className=" p-3 outline-none"
            />
          </div>
          <div className="table-container max-h-96 overflow-y-auto">
          <table className="w-full table-auto ">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Order ID
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Slugs
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Notes
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Created At
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order?._id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                    {order?._id && order._id.substring(0, 10)}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">   {order?.product.name }</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                    {order?.status }
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white"> {order?.product.slug }</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white"> {order?.product.note }</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{ order?.createdAt}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          navigate(`/orderDetail/${order._id}`);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                            fill=""
                          />
                          <path
                            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                            fill=""
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         </div>
        
        </div>
      
     
      </div>
                        
      
    </section>
  );
};

export default OrderPage;
