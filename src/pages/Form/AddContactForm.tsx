import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASEURL } from '../../components/Api/Api_Url';
import { useNavigate, useParams } from 'react-router-dom';

import { Toaster, toast } from 'react-hot-toast';

const AddContactForm = () => {
  const { id } = useParams();
  console.log(id);
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addressError, setAddressError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const navigate = useNavigate();
  const validateForm = () => {
    let isValid = true;

    if (!address) {
      setAddressError('Please enter the address.');
      isValid = false;
    } else {
      setAddressError('');
    }

    if (!email) {
      setEmailError('Please enter the email.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!phone) {
      setPhoneError('Please enter the phone number.');
      isValid = false;
    } else {
      setPhoneError('');
    }

    return isValid;
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(`${BASEURL}/api/auth/contact`, {
          address: address,
          email: email,
          phone: phone,
        });
        if (response.status == 200) {
          setEmail('');
          setAddress('');
          setPhone('');
          toast.success('Form submitted successfully');
          navigate('/addcontact');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getData = async () => {
    try {
      const response = await axios.post(`${BASEURL}/api/auth/contact`, {
        id,
      });
      console.log(response);
      setEmail(''), setAddress(''), setPhone('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-[14px] text-sm font-medium text-black dark:text-white">
                    Address
                  </label>
                  <input
                    name="address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    required
                    type="text"
                    placeholder="234 XC, Street 2 ..."
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      addressError ? 'border-red-500' : ''
                    }`}
                  />
                  {addressError && (
                    <p
                      className="text-red-500 text-xs"
                      style={{ color: 'red' }}
                    >
                      {addressError}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-[14px] text-sm font-medium text-black dark:text-white">
                    Email
                  </label>

                  <input
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    type="text"
                    placeholder="xyzwer@34gmail.com.."
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      emailError ? 'border-red-500' : ''
                    }`}
                  />
                  {emailError && (
                    <p
                      className="text-red-500 text-xs"
                      style={{ color: 'red' }}
                    >
                      {emailError}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-[14px] text-sm font-medium text-black dark:text-white">
                    Phone
                  </label>
                  <input
                    type="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    placeholder="Phone"
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      phoneError ? 'border-red-500' : ''
                    }`}
                  />
                  {phoneError && (
                    <p
                      className="text-red-500 text-xs"
                      style={{ color: 'red' }}
                    >
                      {phoneError}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-primary py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    style={{ color: 'white', fontWeight: 'bold' }}
                  >
                    Add Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContactForm;
