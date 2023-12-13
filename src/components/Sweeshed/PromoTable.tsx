import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'
import { Toaster, toast } from 'react-hot-toast';
import { BASEURL } from '../Api/Api_Url';

export default function PromoTable() {
  const [promoData, setPromoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASEURL}/api/admin/getPromo`);
        setPromoData(response?.data.promo);
        console.log(response.data.promo, 'data fetched');
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: any) => {
    console.log(id)
    try {
      await axios.delete(`${BASEURL}/api/admin/deletePromoCode/${id}`);

      setPromoData((prevData) => {
        // Filter out the deleted record from the previous data
        const newData = prevData.filter((e) => e._id !== id);
        return newData;
      });

      toast.success('Promo code deleted successfully ');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div  className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className=" py-2 px-6 lg:px-0 md:px-0  text-center text-sm font-medium text-black dark:text-white ">
                  <b>Promo code</b>
                </th>
                <th className=" py-2 px-6 lg:px-0 md:px-0 text-center text-sm font-medium text-black dark:text-white ">
                  <b>Discount</b>
                </th>
              
                <th className="py-2 px-6 lg:px-0 md:px-0 text-center  text-sm font-medium text-black dark:text-white">
                  <b>Expirey Date</b>
                </th>
                <th className="py-2px-6 lg:px-0 md:px-0 text-center  text-sm font-medium text-black dark:text-white">
                  <b>Status</b>
                </th>
                <th className="py-2  px-6 lg:px-0 md:px-0 text-sm font-medium text-black dark:text-white">
                  <b>Actions</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {promoData?.map((item) => {
                const { _id, promoCode, discount, expiryDate,isExpired } = item;
             
                return (
                  <tr key={_id}>
                    <td className="border-b px-6 lg:px-0 md:px-0 text-center border-[#eee] py-1   dark:border-strokedark ">
                      <h5 className="text-sm  font-medium text-black dark:text-white">
                        {/* {item?.event_title} */}
                        {promoCode}
                      </h5>
                    </td>
                    <td className="border-b px-6 lg:px-0 md:px-0  text-center border-[#eee] py-1  px-1  dark:border-strokedark">
                      <h5 className="text-sm  font-medium text-black dark:text-white">
                        {/* {item?.event_title} */}
                        {discount}$
                      </h5>
                    </td>
                    <td className="border-b px-6 lg:px-0 md:px-0   border-[#eee] py-1  text-center  dark:border-strokedark ">
                      <h5 className="text-sm  font-medium text-black dark:text-white">
                        {/* {item?.event_title} */}
                        {moment(expiryDate).format('YYYY-MM-DD')}
                      </h5>
                    </td>
                    <td className="border-b px-6 lg:px-0 md:px-0 border-[#eee] text-center py-1  dark:border-strokedark">
                    <p className="inline-flex  rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                    {isExpired?<>Expired</>:<>Active</> }
                    </p>
                  </td>
                   
                    

                    <td className="border-b px-6 lg:px-0 md:px-0  border-[#eee] py-5  dark:border-strokedark">
                      <div className="flex items-center space-x-3.5 ml-5">
          
                        <button
                          onClick={() => handleDelete(_id)}
                          className="hover:text-primary "
                          style={{ color: '#e63946', fontSize: '15px' }}
                        >
                                        
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                       
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
