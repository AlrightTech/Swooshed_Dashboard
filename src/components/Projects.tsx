import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTrashAlt,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { BASEURL } from './Api/Api_Url';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

export default function Projects() {
  const [projData, setProjData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/auth/portfolio`);
      setProjData(response.data.reverse());
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASEURL}/api/auth/portfolio/${id}`);
      setProjData((prevData) => prevData.filter((item) => item._id !== id));
      toast.success('Successfully Submitted!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mb-5 flex justify-end">
        <Link to="/projectsform">
          <button
            className="add-button  bg-blue-500 h-10 transform rounded-full px-3 text-white transition-transform duration-300 hover:scale-110"
            style={{ background: '#023e8a' }}
          >
            <b>Add your Projects</b>{' '}
            <FontAwesomeIcon icon={faPlus} style={{ fontSize: '12px' }} />
          </button>
        </Link>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 text-sm  font-medium   text-black dark:text-white xl:pl-11">
                  <b>Projects Title</b>
                </th>
                <th className="min-w-[150px] py-4 px-4 text-sm  font-medium  text-black dark:text-white">
                  <b>Project Description</b>
                </th>
                <th className="min-w-[120px] py-4 px-4 text-sm  font-medium  text-black dark:text-white">
                  <b>Category</b>
                </th>
                <th className="min-w-[120px] py-4 px-4 text-sm  font-medium  text-black dark:text-white">
                  <b>Image</b>
                </th>

                <th className="py-4 px-4 text-sm  font-medium  text-black dark:text-white">
                  <b>Actions</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {projData.map((item) => {
                const {
                  _id,
                  projName,
                  categoryName,
                  projDescription,
                  projImage,
                } = item;
                return (
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="text-sm  font-medium  text-black dark:text-white">
                        {projName}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {projDescription.substring(0, 40)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {categoryName}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="inline-flex py-1 px-3 text-sm text-sm  font-medium  text-success">
                        <img
                          className="my-5 h-20 w-40 object-cover"
                          // src={projImage}
                          src={`${BASEURL}/uploads/${projImage}`}
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
                        <Link to={`/projectsform/${_id}`}>
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
