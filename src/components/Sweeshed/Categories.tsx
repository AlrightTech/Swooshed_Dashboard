import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Toaster, toast } from 'react-hot-toast';
import { BASEURL } from '../Api/Api_Url';

export default function Categories() {
  const [categoryData, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASEURL}/api/admin/getAllCategories`);
        setCategory(response?.data.categories);
        console.log(response.data.categories, 'data fetched');
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: any) => {
    console.log(id)
    try {
      await axios.delete(`${BASEURL}/api/admin/deleteCategory`,{ data: { _id: id } });

      setCategory((prevData) => {
        // Filter out the deleted record from the previous data
        const newData = prevData.filter((e) => e._id !== id);
        return newData;
      });

      toast.success('Data Deleted Successfully ');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 text-sm font-medium text-black dark:text-white xl:pl-11">
                  <b>Category Title</b>
                </th>
              
                <th className="min-w-[120px] py-4 px-4 text-sm font-medium text-black dark:text-white">
                  <b>Image</b>
                </th>
                <th className="py-4 px-4 text-sm font-medium text-black dark:text-white">
                  <b>Actions</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {categoryData?.map((item) => {
                const { _id, name, image } = item;
             
                return (
                  <tr key={_id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="text-sm font-medium text-black dark:text-white">
                        {/* {item?.event_title} */}
                        {name}
                      </h5>
                    </td>
                  
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="inline-flex py-1 px-3 text-sm font-medium text-success">
                        <img
                          className="my-5 h-15 w-40 object-cover"
                          // src={item?.event_Picture}
                          src={`${BASEURL}/category/${image}`}
                          alt="Event"
                        />
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => handleDelete(_id)}
                          className="hover:text-primary "
                          style={{ color: '#e63946', fontSize: '15px' }}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                        <Link to={`/category/${_id}`}>
                          <button
                            className="hover:text-primary"
                            style={{ color: '#40916c', fontSize: '16px' }}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </Link>
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
