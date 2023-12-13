import React, { useState } from 'react';
import axios from 'axios';
// import { BASEURL } from '../../../components/Api/Api_Url';
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { BASEURL } from '../../components/Api/Api_Url';

export default function AddPromo() {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState<number>(0);
  const [expireyDate, setexpireyDate] = useState('')
  const [isFileSelected, setIsFileSelected] = useState(false);

  const [promoCodeError, setPromoCodeError] = useState('');
  const [discountError, setdiscountError] = useState('');
  const [expireDateError, setexpireDateError] = useState('');

  const navigate = useNavigate();
  ///////////////////////////// Code for drag drop image/////////////////////////////

  const inputRef = React.useRef<HTMLInputElement>(null);


 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const formData = new FormData();

  formData.append('categoryName', promoCode);
  //   formData.append('description', description);
  if (isFileSelected) {
    const fileInput = inputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      console.log(fileInput.files[0]);

      formData.append('categoryImage', fileInput.files[0]);
    }
  }

  // ... (code for handling file selection)

  const validateForm = () => {
    let isValid = true;

    if (!promoCode) {
      setPromoCodeError('Please enter the event title.');
      isValid = false;
    } else {
      setPromoCodeError('');
    }
    if(!discount){
      setdiscountError('Please enter the discount value.');
      isValid = false;
    }else{
      setdiscountError('')
    }
    if(!expireyDate){
      setexpireDateError('Please enter the expire date.');
      isValid = false;
    }else{
      setexpireDateError('')
    }

    return isValid;
  };

  const handleSubmits = async () => {
    console.log("Logging FormData as object:");


    if (validateForm()) {
      try {
        const response = await axios.post(
          `${BASEURL}/api/admin/addPromo`,
         {promoCode:promoCode,
          discount,
          expiryDate:expireyDate
        }
        );
        if (response.status === 200) {
          setPromoCode('');

          setIsFileSelected(false);
          toast.success('Successfully Submitted!');
          navigate('/promo');
        }
        console.log(response); // Handle the response data
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-sm text-black dark:text-white">
                    <b>Promo Code</b>
                  </label>
                  <input
                    name="event_title"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                    }}
                    type="text"
                    placeholder="Place promo code here"
                    required
                    className={`font-small w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${promoCodeError ? 'border-red-500' : ''
                      }`}
                  />
                  {promoCodeError && (
                    <p
                      className="text-red-500 text-xs"
                      style={{ color: 'red' }}
                    >
                      {promoCodeError}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label className="mb-3 block text-sm text-black dark:text-white">
                    <b>Discount</b>
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="discount"
                      value={discount}
                      onChange={(e) => {
                        setDiscount(e.target.value);
                      }}
                      min={0}
                      type="number"
                      placeholder="Place discount here"
                      required
                      className={`font-small w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${discountError ? 'border-red-500' : ''
                        }`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400">$</span>
                    </div>
                  </div>
                  {discountError && (
                    <p className="text-red-500 text-xs" style={{ color: 'red' }}>
                      {discountError}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-sm text-black dark:text-white">
                    <b>Expires Date</b>
                  </label>
                  <input
                    name="date"
                    value={expireyDate}
                    onChange={(e) => {
                      setexpireyDate(e.target.value);
                    }}
                    type="date"
                    placeholder="Place promo code here"
                    required
                    className={`font-small w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${expireDateError ? 'border-red-500' : ''
                      }`}
                  />
                  {expireDateError && (
                    <p
                      className="text-red-500 text-xs"
                      style={{ color: 'red' }}
                    >
                      {expireDateError}
                    </p>
                  )}
                </div>

                <div className="">
                  <button
                    type="submit"
                    onClick={handleSubmits}
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-primary py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    style={{ color: 'white', fontWeight: 'bold' }}
                  >
                    Add Promo +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
