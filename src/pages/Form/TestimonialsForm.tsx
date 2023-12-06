import React, { useState, useRef } from 'react';
import './uploader.css';
import axios from 'axios';
import { BASEURL } from '../../components/Api/Api_Url';
// import { useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

function TestimonialsForm() {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [designation, setDesignation] = useState('');

  const [nameError, setNameError] = useState('');
  const [feedbackError, setFeedbackError] = useState('');
  const [designationError, setDesignationError] = useState('');
  const [isFileSelected, setIsFileSelected] = useState(false);

  // const { id } = useParams();
  // console.log(id);

  const navigate = useNavigate();

  ///////////////////////////////////////////// code for image drag drop////////////////////////////////
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
      console.log('File selected:', e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setIsFileSelected(true);
      console.log('File selected:', e.target.files[0]);
    }
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
        const response = await axios.post(
          `${BASEURL}/api/auth/testimonial`,
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
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                      {isFileSelected ? (
                        <div>
                          <p className="rounded-lg p-2 text-sm font-medium text-success">
                            Successfully selected the file !!
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p>Drag and drop your file here or</p>
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
                    Add Testimonials
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

export default TestimonialsForm;
