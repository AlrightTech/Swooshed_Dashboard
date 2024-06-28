import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASEURL } from '../Api/Api_Url';
import { useEffect, useState } from 'react';
import moment from 'moment';
import NoImage from '../../images/noImage.png';
import toast, { Toaster } from 'react-hot-toast';

const OrderDetail = () => {
  const [prodData, setProdData] = useState();
  const [notes, setNotes] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [selectedResult, setSelectedResult] = useState('AUTHENTIC');
  const [edit, setEdit] = useState('true');

  const { id } = useParams();

  console.log(id, selectedResult, notes);

  ////////////////////////////////// updating the status ////////////////////////////////////

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${BASEURL}/api/admin/updateOrderProductStatus`,
        {
          productStatus: selectedResult,
          orderId: id,
        }
      );
      if (res.data.success == true) {
        console.log(res.data);
        toast.success('Successfully Updated!');
        fetchOrderData();
        setSelectedResult('AUTHENTIC');
        setNotes('');
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error}`);
    }
  };
  ////////////////////////////////// updating the status ////////////////////////////////////

  const handleEditable = async (e) => {
    e.preventDefault();

    console.log(prodData.product._id, edit, editNotes);

    try {
      const res = await axios.post(
        `${BASEURL}/api/admin/decideUseEditProductStatus`,
        {
          productId: prodData?.product._id,
          editable: edit,
          editableNote: editNotes,
        }
      );

      if (res.data.success === true) {
        console.log(res.data);
        toast.success('Successfully Updated!');
        fetchOrderData();
        setEdit('true');
        setEditNotes('');
      } else {
        console.error('Server responded with an error:', res.data.error); // Log the error details
      }
    } catch (error) {
      console.error('An error occurred while making the request:', error);
      toast.error(`${error}`);
    }
  };

  //////////////////////////  fetching orders /////////////////////////////////////////
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

  ///////////////////////////////// deleting the image ////////////////////////
  const handleImageDelete = async (productId, ProductImage) => {
    console.log(ProductImage, productId);

    try {
      if (ProductImage) {
        const res = await axios.delete(
          `${BASEURL}/api/admin/deleteProductImage`,
          {
            data: {
              productId: productId,
              image: ProductImage,
            },
          }
        );

        console.log(res.data);
        if (res.status == 200) {
          toast.success('Successfully deleted!');
          fetchOrderData();
        }
      } else {
        toast.error('No Image Found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {/* //////////////////////////  Name ///////////////////// */}
      <div className="mb-5 flex flex-col rounded-lg bg-white p-5  shadow-lg">
        <div>
          <span className=" text-[1.2rem] text-black ">Name: </span>
          <span className=" text-[1.2rem] text-black">
            {prodData?.product.name}
          </span>
        </div>
        <div>
          <span className=" text-[1.2rem] text-black ">Brand: </span>
          <span className=" text-[1.2rem] text-black">
            {prodData?.product.brandId?.name}
          </span>
        </div>
        <p>please check carefully</p>
      </div>
      {/* ///////////////////////   images   /////////////////// */}
      <div className="mb-5 flex  flex-col rounded-lg bg-white p-5 shadow-lg">
        <h2 className="text-[1.2rem] text-black">Order Images</h2>

        <div className="my-6 flex flex-wrap gap-2">
          {/* frontside image */}

          <div className="dark:bg-neutral-700 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            {console.log(`${BASEURL}/${prodData?.product.backside}`)}
            <div className="relative overflow-hidden bg-cover bg-no-repeat md:h-[300px] md:w-[300px] lg:h-[300px] lg:w-[300px] ">
              <img
                className="h-full w-full rounded-t-lg object-cover"
                crossorigin="anonymous"
                src={
                  prodData?.product.frontside
                    ? `${BASEURL}/${prodData?.product.frontside}`
                    : `${NoImage}`
                }
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
                onClick={() =>
                  handleImageDelete(
                    prodData?.product._id,
                    prodData?.product.frontside
                  )
                }
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
            <div className="relative overflow-hidden bg-cover bg-no-repeat md:h-[300px] md:w-[300px] lg:h-[300px] lg:w-[300px]">
              <img
                className="h-full w-full rounded-t-lg object-cover"
                crossorigin="anonymous"
                src={
                  `${BASEURL}/${prodData?.product?.backside}`
                  // prodData?.product.backside
                  //   ? `${BASEURL}/${prodData?.product.backside}`
                  //   : `${NoImage}`
                }
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
                onClick={() =>
                  handleImageDelete(
                    prodData?.product._id,
                    prodData?.product.backside
                  )
                }
              >
                Delete
              </button>
            </div>
          </div>
          {/* Apperance image */}
          <div className="dark:bg-neutral-700 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className="relative overflow-hidden bg-cover bg-no-repeat md:h-[300px] md:w-[300px] lg:h-[300px] lg:w-[300px]">
              <img
                className="h-full w-full rounded-t-lg object-cover"
                crossorigin="anonymous"
                src={
                  prodData?.product.appearance
                    ? `${BASEURL}/${prodData?.product.appearance}`
                    : `${NoImage}`
                }
                alt=""
              />
              <a href="#!">
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </a>
            </div>
            <div className="p-6">
              <h5 className="text-neutral-800 dark:text-neutral-50 mb-2 text-xl font-medium leading-tight">
                Appearance Side
              </h5>

              <button
                type="button"
                className="hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() =>
                  handleImageDelete(
                    prodData?.product._id,
                    prodData?.product.appearance
                  )
                }
              >
                Delete
              </button>
            </div>
          </div>
          {/* Inside image */}
          <div className="dark:bg-neutral-700 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className="relative overflow-hidden bg-cover bg-no-repeat md:h-[300px] md:w-[300px] lg:h-[300px] lg:w-[300px]">
              <img
                className="h-full w-full rounded-t-lg object-cover"
                crossorigin="anonymous"
                src={
                  prodData?.product.inside
                    ? `${BASEURL}/${prodData?.product.inside}`
                    : `${NoImage}`
                }
                alt=""
              />
              <a href="#!">
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </a>
            </div>
            <div className="p-6">
              <h5 className="text-neutral-800 dark:text-neutral-50 mb-2 text-xl font-medium leading-tight">
                Inside Image
              </h5>

              <button
                type="button"
                className="hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() =>
                  handleImageDelete(
                    prodData?.product._id,
                    prodData?.product.inside
                  )
                }
              >
                Delete
              </button>
            </div>
          </div>
          {/* receipt image */}
          <div className="dark:bg-neutral-700 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className="relative overflow-hidden bg-cover bg-no-repeat md:h-[300px] md:w-[300px] lg:h-[300px] lg:w-[300px]">
              <img
                className="h-full w-full rounded-t-lg object-cover"
                crossorigin="anonymous"
                src={
                  prodData?.product.receipt
                    ? `${BASEURL}/${prodData?.product.receipt}`
                    : `${NoImage}`
                }
                alt=""
              />
              <a href="#!">
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </a>
            </div>
            <div className="p-6">
              <h5 className="text-neutral-800 dark:text-neutral-50 mb-2 text-xl font-medium leading-tight">
                Receipt Tag
              </h5>

              <button
                type="button"
                className="hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() =>
                  handleImageDelete(
                    prodData?.product._id,
                    prodData?.product.receipt
                  )
                }
              >
                Delete
              </button>
            </div>
          </div>
          {/* priceTag image */}
          <div className="dark:bg-neutral-700 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className="relative overflow-hidden bg-cover bg-no-repeat md:h-[300px] md:w-[300px] lg:h-[300px] lg:w-[300px]">
              <img
                className="h-full w-full rounded-t-lg object-cover"
                crossorigin="anonymous"
                src={
                  prodData?.product.receipt
                    ? `${BASEURL}/${prodData?.product.receipt}`
                    : `${NoImage}`
                }
                alt=""
              />
              <a href="#!">
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </a>
            </div>
            <div className="p-6">
              <h5 className="text-neutral-800 dark:text-neutral-50 mb-2 text-xl font-medium leading-tight">
                Price Tag
              </h5>

              <button
                type="button"
                className="hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() =>
                  handleImageDelete(
                    prodData?.product._id,
                    prodData?.product.priceTag
                  )
                }
              >
                Delete
              </button>
            </div>
          </div>
          {/* sideTag image */}
          <div className="dark:bg-neutral-700 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className="relative overflow-hidden bg-cover bg-no-repeat md:h-[300px] md:w-[300px] lg:h-[300px] lg:w-[300px]">
              <img
                className="h-full w-full rounded-t-lg object-cover"
                crossorigin="anonymous"
                src={
                  prodData?.product.sideTag
                    ? `${BASEURL}/${prodData?.product.sideTag}`
                    : `${NoImage}`
                }
                alt=""
              />
              <a href="#!">
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </a>
            </div>
            <div className="p-6">
              <h5 className="text-neutral-800 dark:text-neutral-50 mb-2 text-xl font-medium leading-tight">
                Side Tag
              </h5>

              <button
                type="button"
                className="hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() =>
                  handleImageDelete(
                    prodData?.product._id,
                    prodData?.product.sideTag
                  )
                }
              >
                Delete
              </button>
            </div>
          </div>
          {/* Additional image */}
          <div className="dark:bg-neutral-700 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className="relative overflow-hidden bg-cover bg-no-repeat md:h-[300px] md:w-[300px] lg:h-[300px] lg:w-[300px]">
              <img
                className="h-full w-full rounded-t-lg object-cover"
                crossorigin="anonymous"
                src={
                  prodData?.product.additional
                    ? `${BASEURL}/${prodData?.product.additional}`
                    : `${NoImage}`
                }
                alt=""
              />
              <a href="#!">
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </a>
            </div>
            <div className="p-6">
              <h5 className="text-neutral-800 dark:text-neutral-50 mb-2 text-xl font-medium leading-tight">
                Additional Image
              </h5>

              <button
                type="button"
                className="hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() =>
                  handleImageDelete(
                    prodData?.product._id,
                    prodData?.product.additional
                  )
                }
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
            <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-gray-400">
              Editable
            </label>
            <select
              id="countries"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={edit}
              onChange={(e) => {
                setEdit(e.target.value);
              }}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-gray-400">
              Notes
            </label>
            <textarea
              placeholder="Notes Here"
              className="w-full rounded-lg border border-gray-300 p-2"
              value={editNotes}
              onChange={(e) => {
                setEditNotes(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            onClick={handleEditable}
            className="hover:bg-success-600 focus:bg-success-600 active:bg-success-700 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
          >
            Update Order
          </button>
        </div>
        {/* ///////////////////////   Ticket Info    /////////////////// */}
        <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow-lg">
          <h2 className="mb-3 text-[1.2rem] text-black">Ticket Info </h2>
          <div className=" flex w-full flex-wrap  items-center justify-center gap-4 bg-bodydark  p-6">
            <span
              className={`rounded p-1 text-black ${
                prodData?.productStatus === 'AUTHENTIC'
                  ? 'bg-success'
                  : prodData?.productStatus === 'FAKE'
                  ? 'bg-danger'
                  : prodData?.productStatus === 'INDEFINABLE'
                  ? 'bg-warning'
                  : ''
              } text-white`}
            >
              {prodData?.productStatus}
            </span>

            <span className=" lg:w-44">
              {moment(prodData?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </span>
          </div>
          <h2 className=" text-[1.2rem] text-black ">Order Creator</h2>
          <hr />
          <div className="flex flex-col gap-3 rounded-lg p-3 shadow-lg">
            <h2 className="text-[1.3  rem] mb-3 text-black">
              Authentication Result
            </h2>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-gray-400">
                Result
              </label>
              <select
                id="countries"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={selectedResult}
                onChange={(e) => {
                  setSelectedResult(e.target.value);
                }}
              >
                <option value="AUTHENTIC">AUTHENTIC</option>
                <option value="FAKE">FAKE</option>
                <option value="INDEFINABLE">INDEFINEABLE</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-gray-400">
                Notes
              </label>
              <textarea
                placeholder="Notes Here"
                className="w-full rounded-lg border border-gray-300 p-2"
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
              />
            </div>
            <button
              type="button"
              className="hover:bg-success-600 focus:bg-success-600 active:bg-success-700 inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
              onClick={handleStatusUpdate}
            >
              Update Order
            </button>
          </div>
        </div>
        {/* ///////////////////////   user info    /////////////////// */}
        <div className="flex h-[510px] w-70 flex-col gap-3 rounded-lg p-3 shadow-lg">
          <h2 className="mb-3 text-[1.2rem] text-black">User Info</h2>

          <div className="flex  h-screen w-full justify-center">
            <div className="max-w-xs">
              <div className="rounded-lg bg-white py-3 shadow-xl">
                <div className="photo-wrapper p-2">
                  {console.log(prodData?.user)}
                  <img
                    className="mx-auto h-32 w-32 rounded-full"
                    crossorigin="anonymous"
                    src={
                      prodData?.user?.authType === 'GOOGLE'
                        ? prodData?.user?.image
                        : `${BASEURL}/${prodData?.user?.image}`
                    }
                    // src={`${BASEURL}/${prodData?.user?.image}`}
                    alt="profile image"
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-center text-xl font-medium leading-8 text-gray-900">
                    {prodData?.user?.name}
                  </h3>

                  <table className="my-3 text-xs">
                    <tbody>
                      <tr>
                        <td className="px-2 py-2 font-semibold text-gray-500">
                          Phone
                        </td>
                        <td className="px-2 py-2">
                          {prodData?.user?.phoneNumber}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2 font-semibold text-gray-500">
                          Email
                        </td>
                        <td className="px-2 py-2">{prodData?.user?.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
