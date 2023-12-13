import React, { useState } from 'react';
import axios from 'axios';
import '../uploader.css';
import { BASEURL } from '../../../components/Api/Api_Url';
import {  useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

export default function AddPoster() {


  const [dragActive, setDragActive] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);

 




  const navigate = useNavigate();
  ///////////////////////////// Code for drag drop image/////////////////////////////

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
      console.log('File selected:', e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setIsFileSelected(true);

      console.log('File se  lected:', e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const formData = new FormData();


//   formData.append('description', description);
  if (isFileSelected) {
    const fileInput = inputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      console.log(fileInput.files[0]);

      formData.append('image', fileInput.files[0]);
    }
  }

  // ... (code for handling file selection)

  const validateForm = () => {
    let isValid = true;



    return isValid;
  };

  const handleSubmits = async () => {
    console.log("Logging FormData as object:");
    const formDataObject = Object.fromEntries(formData.entries());
    console.log(formDataObject);
    
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${BASEURL}/api/admin/addPoster`,
          formData
        );
        if (response.status === 200) {
      ;
     
          setIsFileSelected(false);
          toast.success('Successfully Submitted!');
          navigate('/posters');
        }
        console.log(response); // Handle the response data
      } catch (error) {
        console.error(error);
        toast.error('Failed to submit the form. Please try again.');
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
                      {isFileSelected ? (
                        <div>
                          <p className=" rounded-lg p-2 text-sm font-bold    text-success">
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

                <div className="">
                  <button
                    type="submit"
                    onClick={handleSubmits}
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-primary py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    style={{ color: 'white', fontWeight: 'bold' }}
                  >
                    Add Poster +
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
