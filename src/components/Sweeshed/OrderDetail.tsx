import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASEURL } from '../Api/Api_Url';
import { useEffect, useState } from 'react';

const OrderDetail = () => {
  const [prodData, setProdData] = useState();
  const [notes, setNotes] = useState("");
  const [selectedResult, setSelectedResult] = useState('Authentic');

 
  const { id } = useParams();

  console.log(id, selectedResult , notes);

  const fetchOrderData = async () => {

    try {
      const response = await axios.post(`${BASEURL}/api/admin/getOrderById`, {
        orderId: id,
      });
      setProdData(response?.data.order);
      console.log(response.data.order);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrderData();
  }, []);




  return (
    <>
      {/* //////////////////////////  Name ///////////////////// */}
      <div className="mb-5 flex flex-col rounded-lg bg-white p-5  shadow-lg">
        <div>
          <span className=" text-[1.2rem] text-black ">Name: </span>
          <span className=" text-[1.2rem] text-black">
            {prodData?.product.name}
          </span>
        </div>
        <p>please check carefully</p>
      </div>
      {/* ///////////////////////   images   /////////////////// */}
      <div className="mb-5 flex  flex-col rounded-lg bg-white p-5 shadow-lg">
        <h2 className="text-[1.2rem] text-black">Order Images</h2>

        <div className="flex flex-wrap gap-2 my-6">

           {/* frontside image */}
        <div className="dark:bg-neutral-700 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
  <div className="relative overflow-hidden bg-cover bg-no-repeat lg:h-[300px] lg:w-[300px]">
    <img
      className="object-cover w-full h-full rounded-t-lg"
      src={`${BASEURL}/${prodData?.product.frontside}`}
      alt=""
    />
    <a href="#!">
      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
    </a>
  </div>
  <div className="p-6">
    <h5 className="text-neutral-800 dark:text-neutral-50 mb-2 text-xl font-medium leading-tight">
      Front Side
    </h5>

    <button
      type="button"
      className="hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      data-te-ripple-init
      data-te-ripple-color="light"
    >
      Delete
    </button>
  </div>
</div>
          
           {/* backside image */}
        <div className="dark:bg-neutral-700 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
  <div className="relative overflow-hidden bg-cover bg-no-repeat lg:h-[300px] lg:w-[300px]">
    <img
      className="object-cover w-full h-full rounded-t-lg"
      src={`${BASEURL}/${prodData?.product.backside}`}
      alt=""
    />
    <a href="#!">
      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
    </a>
  </div>
  <div className="p-6">
    <h5 className="text-neutral-800 dark:text-neutral-50 mb-2 text-xl font-medium leading-tight">
      Back Side
    </h5>

    <button
      type="button"
      className="hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      data-te-ripple-init
      data-te-ripple-color="light"
    >
      Delete
    </button>
  </div>
</div>

        
        </div>
      </div>
      {/* ///////////////////////   Result   /////////////////// */}
      <div className="flex flex-wrap gap-3 rounded-lg bg-white p-5 shadow-lg">
        {/* ///////////////////////   Authentication Result    /////////////////// */}
        <div className="flex w-70 flex-col gap-3 rounded-lg p-3 shadow-lg">
          <h2 className="mb-3 text-[1.2rem] text-black">
            Authentication Result
          </h2>
          <div>
            <label className="text-gray-900  dark:text-gray-400 mb-1 block text-sm font-medium">
              Editable
            </label>
            <select
              id="countries"
              className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full rounded-lg border p-2.5 text-sm dark:text-white"
            >
              <option selected>Yes</option>
              <option value="US">No</option>
            </select>
          </div>

          <div>
            <label className="text-gray-900 dark:text-gray-400 mb-1 block text-sm font-medium">
              Notes
            </label>
            <textarea
              placeholder="Notes Here"
              className="border-gray-300 w-full rounded-lg border p-2"
            />
          </div>
          <button
            type="button"
            className="hover:bg-success-600 focus:bg-success-600 active:bg-success-700 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
          >
            Update Order
          </button>
        </div>
        {/* ///////////////////////   Ticket Info    /////////////////// */}
        <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow-lg">
          <h2 className="mb-3 text-[1.2rem] text-black">Ticket Info </h2>
          <div className=" flex w-full  items-center justify-center gap-4 bg-bodydark  p-6">
            <span className="rounded bg-danger p-1 text-black">Responded</span>
            <span>12/12/2023 21:32:43</span>
          </div>
          <h2 className=" text-[1.2rem] text-black ">Order Creator</h2>
          <hr />
          <div className="flex flex-col gap-3 rounded-lg p-3 shadow-lg">
            <h2 className="text-[1.3  rem] mb-3 text-black">
              Authentication Result
            </h2>
            <div>
            <label className="text-gray-900 dark:text-gray-400 mb-1 block text-sm font-medium">
        Result
      </label>
      <select
        id="countries"
        className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full rounded-lg border p-2.5 text-sm dark:text-white"
        value={selectedResult}
        onChange={(e)=>{setSelectedResult(e.target.value)}}
      >
        <option value="Authentic">Authentic</option>
        <option value="Fake">Fake</option>
        <option value="Indefineable">Indefineable</option>
      </select>
            </div>

            <div>
              <label className="text-gray-900 dark:text-gray-400 mb-1 block text-sm font-medium">
                Notes
              </label>
              <textarea
                placeholder="Notes Here"
                className="border-gray-300 w-full rounded-lg border p-2"
                value={notes}
                onChange={(e)=>{setNotes(e.target.value)}}
              />
            </div>
            <button
              type="button"
              className="hover:bg-success-600 focus:bg-success-600 active:bg-success-700 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
            >
              Update Order
            </button>
          </div>
        </div>
        {/* ///////////////////////   user info    /////////////////// */}
        <div className="flex w-70 flex-col gap-3 rounded-lg p-3 shadow-lg">
          <h2 className="mb-3 text-[1.2rem] text-black">User Info</h2>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
