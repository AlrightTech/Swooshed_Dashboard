import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { BASEURL } from './Api/Api_Url';
import { Toaster, toast } from 'react-hot-toast';

const SocialLinksDetail = () => {
  const [socialData, setSocialData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/auth/social-media`);
      console.log(response);
      setSocialData(response.data.reverse());
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(`${BASEURL}/api/auth/social-media/${id}`);
      setSocialData((prevData) => prevData.filter((item) => item._id !== id));
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
                <th className="min-w-[220px] py-4 px-4 text-sm font-bold text-black dark:text-white xl:pl-11">
                  Platform
                </th>
                <th className="min-w-[150px] py-4 px-4 text-sm font-bold text-black dark:text-white">
                  URL
                </th>

                <th className="min-w-[120px] py-4 px-4 text-sm font-bold text-black dark:text-white">
                  Image
                </th>
                <th className="py-4 px-4 text-sm font-bold text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {socialData.map((item) => {
                const { _id, platform, url, image } = item;
                return (
                  <tr>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="text-sm font-medium text-black dark:text-white">
                        {platform}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-blue  font-medium dark:text-white">
                        {<a href={url}>{url}</a>}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="inline-flex py-1 px-3 text-sm text-sm font-medium text-success">
                        <img
                          className="my-5 h-20 w-40 object-cover"
                          src={`${BASEURL}/uploads/${image}`}
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
                        <Link to={`/sociallinksform/${_id}`}>
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

export default SocialLinksDetail;
