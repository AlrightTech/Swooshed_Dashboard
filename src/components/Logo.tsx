import React, { useState, useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTrashAlt,
  faPenSquare,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { BASEURL } from './Api/Api_Url';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

function Logo() {
  const [image, setImage] = useState(null);

  const [updateImage, setUpdateImage] = useState(false);

  const navigate = useNavigate();

  ///////////////////////////////////////////// drag drop image /////////////////////////////////////////////////
  const [dragActive, setDragActive] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////// code to post logo ////////////////////////////
  const formData = new FormData();

  if (isFileSelected) {
    const fileInput = inputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      // console.log(fileInput.files[0]);

      formData.append('logopic', fileInput.files[0]);
    }
  }

  const handleAdd = async () => {
    try {
      const response = await axios.post(`${BASEURL}/api/auth/logo`, formData);
      console.log(response);
      if (response.status == 200) {
        setUpdateImage(true);
        setIsFileSelected(false);
        toast.success('Logo Uploaded');
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 400) {
        toast.error('First Delete The Logo Then Upload');
        setIsFileSelected(false);
      }
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////  display logo ////////////////////////////////

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASEURL}/api/auth/logo`);
      console.log(response);
      setImage(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [updateImage]);

  const handleDelete = async (id: any) => {
    try {
      const response = await axios.delete(`${BASEURL}/api/auth/logo/${id}`);

      if (response.status == 200) {
        setImage(null);
        toast.success('Data deleted');
        navigate('/logo');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="rounded-sm border border-stroke bg-white px-5 py-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="grid py-8 lg:grid-cols-3">
          <div className="">
            <img
              src={`${BASEURL}/uploads/${image?.logopic}`}
              alt="Logo"
              className=" h-75 w-full rounded-lg"
            />

            <div className="flex justify-center gap-1 ">
              {/* <button className="bg-blue-500 mt-2 rounded-lg border-2 py-2 px-4">
                <FontAwesomeIcon icon={faPenSquare} className="mr-2" />
                Update
              </button> */}

              <button
                onClick={() => {
                  handleDelete(image?._id);
                }}
                className="bg-red-500 mt-2 rounded-lg border-2 py-2 px-4"
              >
                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                Delete
              </button>
            </div>
          </div>
          <div className="col-span-2 flex  flex-col px-5 ">
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
                      <p className="rounded-lg p-2 text-sm font-bold text-success">
                        Successfully selected the file !!
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p>Drag and drop your file here or</p>
                      <button className="upload-button" onClick={onButtonClick}>
                        Upload a file
                      </button>
                    </div>
                  )}
                </label>
                {dragActive && <div id="drag-file-element"></div>}
              </form>
            </div>

            {/* file uploader end  */}

            <button
              onClick={handleAdd}
              className="bg-green-500 mt-2 rounded-lg border-2 py-2 px-4"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Update Logo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logo;
