import React, { useState, useRef, useEffect } from 'react';
import './uploader.css';
import axios from 'axios';
import { BASEURL } from '../../components/Api/Api_Url';
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

function TestimonialUpdateForm() {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [designation, setDesignation] = useState('');

  const [nameError, setNameError] = useState('');
  const [feedbackError, setFeedbackError] = useState('');
  const [designationError, setDesignationError] = useState('');

  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();
  ///////////////////////////////////////////// code for image drag drop////////////////////////////////
  const [dragActive, setDragActive] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setIsFileSelected(true);
      const selectedFile = e.dataTransfer.files[0];
      displaySelectedImage(selectedFile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setIsFileSelected(true);
      setSelectedImageSrc(URL.createObjectURL(e.target.files[0]));
      const selectedFile = e.target.files[0];
      displaySelectedImage(selectedFile);
    }
  };

  const displaySelectedImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };
  ////////////////////////////////////////////////////
  const formData = new FormData();

  formData.append('customerName', name);
  formData.append('customerFeedback', feedback);
  formData.append('customerDesignation', designation);

  if (isFileSelected) {
    const fileInput = inputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      console.log(fileInput.files[0]);

      formData.append('customerImage', fileInput.files[0]);
    }
  }

  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError('Please enter the client name.');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!feedback) {
      setFeedbackError('Please enter the feedback.');
      isValid = false;
    } else {
      setFeedbackError('');
    }
    if (!designation) {
      setDesignationError('Please enter the Designation.');
      isValid = false;
    } else {
      setDesignationError('');
    }

    return isValid;
  };

  const handleSubmits = async () => {
    if (validateForm()) {
      try {
        const response = await axios.put(
          `${BASEURL}/api/auth/testimonialupdate/${id}`,
          formData
        );

        if (response.status === 200) {
          setName('');
          setFeedback('');
          setDesignation('');
          setIsFileSelected(false);
          toast.success('Form submitted successfully');
          navigate('/testimonials');
        }

        setName('');
        setFeedback('');
        setDesignation('');
        setIsFileSelected(false);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  ////////////////getting data ////////////
  const getData = async () => {
    try {
      const response = await axios.post(`${BASEURL}/api/auth/updation/${id}`);
      console.log(response.data);

      setName(response.data.testimonials.customerName),
        setFeedback(response.data.testimonials.customerFeedback),
        setDesignation(response.data.testimonials.customerDesignation),
        // setIsFileSelected(false);
        setSelectedImageSrc(response.data.testimonials.customerImage);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-sm text-sm font-medium text-black dark:text-white">
                    Client Name
                  </label>
                  <input
                    name="customerName"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    placeholder="Mr. John Doe.."
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      nameError ? 'border-red-500' : ''
                    }`}
                  />
                  {nameError && (
                    <p
                      className="text-red-500 text-xs"
                      style={{ color: 'red' }}
                    >
                      {nameError}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Feedback
                  </label>
                  <textarea
                    value={feedback}
                    placeholder="best feedback !!"
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      feedbackError ? 'border-red-500' : ''
                    }`}
                    name="customerFeedback"
                    onChange={(e) => {
                      setFeedback(e.target.value);
                    }}
                  />
                  {feedbackError && (
                    <p
                      className="text-red-500 text-xs"
                      style={{ color: 'red' }}
                    >
                      {feedbackError}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Designation
                  </label>
                  <input
                    placeholder="client designation"
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      designationError ? 'border-red-500' : ''
                    }`}
                    name="customerDesignation"
                    value={designation}
                    onChange={(e) => {
                      setDesignation(e.target.value);
                    }}
                  />
                  {designationError && (
                    <p
                      className="text-red-500 text-xs"
                      style={{ color: 'red' }}
                    >
                      {designationError}
                    </p>
                  )}
                </div>
                {/* file uploader start  */}
                <div className="flex">
                  <form
                    id="form-file-upload"
                    onDragEnter={handleDrag}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      ref={inputRef}
                      name="event_Picture"
                      type="file"
                      id="input-file-upload"
                      multiple
                      onChange={handleChange}
                    />
                    <label
                      id="label-file-upload"
                      htmlFor="input-file-upload"
                      className={dragActive ? 'drag-active' : ''}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {!isFileSelected ? (
                        <div>
                          <img
                            src={selectedImageSrc}
                            alt="Uploaded"
                            style={{ maxWidth: '200px' }}
                          />
                        </div>
                      ) : (
                        <div>
                          <img
                            src={selectedImageSrc}
                            alt="Uploaded"
                            style={{ maxWidth: '200px' }}
                          />
                          <button
                            className="upload-button"
                            onClick={onButtonClick}
                          >
                            Upload a file
                          </button>
                        </div>
                      )}
                    </label>
                    {dragActive && <div id="drag-file-element"></div>}
                  </form>
                </div>

                {/* file uploader end  */}
                <div className="relative">
                  <button
                    type="submit"
                    onClick={handleSubmits}
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-primary py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    style={{ color: 'white', fontWeight: 'bold' }}
                  >
                    Update Testimonials
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestimonialUpdateForm;
