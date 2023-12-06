import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { BASEURL } from './Api/Api_Url';
import { Toaster, toast } from 'react-hot-toast';

const TestimonialsDetail = () => {
  const [testiData, setTestidata] = useState<Array<any>>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/auth/testimonials`);
      console.log(response.data);
      setTestidata(response.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(`${BASEURL}/api/auth/testimonial/${id}`);
      setTestidata((prevData) => prevData.filter((item) => item._id !== id));
      toast.success('Data deleted');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4  text-sm   font-bold text-black dark:text-white xl:pl-11">
                  Client Name
                </th>
                <th className="min-w-[150px] py-4 px-4  text-sm   font-bold text-black dark:text-white">
                  Feed Back
                </th>
                <th className="min-w-[150px] py-4 px-4  text-sm   font-bold text-black dark:text-white">
                  Designation
                </th>
                <th className="min-w-[120px] py-4 px-4  text-sm   font-bold text-black dark:text-white">
                  Client Image
                </th>
                <th className="py-4 px-4  text-sm   font-bold text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {testiData?.map((item, i) => {
                const {
                  _id,
                  customerName,
                  customerDesignation,
                  customerFeedback,
                  customerImage,
                } = item;
                return (
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className=" text-sm   font-medium text-black dark:text-white">
                        {customerName}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {customerFeedback.substring(0, 40)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-success dark:text-white">
                        <b>{customerDesignation}</b>
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="inline-flex py-1 px-3 text-sm   font-bold text-success">
                        <img
                          className="my-5 h-20 w-40 object-cover"
                          src={`${BASEURL}/uploads/${customerImage}`}
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
                        <Link to={`/testimonialsform/${_id}`}>
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
    </>
  );
};

export default TestimonialsDetail;
