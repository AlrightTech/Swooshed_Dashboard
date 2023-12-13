import axios from 'axios';
import { BASEURL } from '../components/Api/Api_Url';
import { useEffect, useState } from 'react';
const RegisteredUsers = () => {

  const [user, setUser] = useState()
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/user/getAllUsers`);

      console.log(response?.data);
      setUser(response?.data.users)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   fetchUsers()
  }, [])
  
  return <>

<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Image
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Phone No
              </th>
            </tr>
          </thead>
          <tbody>
           {user?.map((item, index)=>{
return(
  <tr key={ index}>
  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
    <h5 className="font-medium text-black dark:text-white">
      {item?.name}
    </h5>
  
  </td>
  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
    <p className="text-black dark:text-white">{item?.email}</p>
  </td>
  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
    <img src={`${BASEURL}/${item?.image}`} alt="" className="my-5 h-20 w-40 object-cover"/>
  </td>
  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
    <div className="flex items-center space-x-3.5">
  <p>{item?.phoneNumber}</p>
    </div>
  </td>
</tr>
)
           })}
           
          </tbody>
        </table>
      </div>
    </div>
  </>;
};

export default RegisteredUsers;
