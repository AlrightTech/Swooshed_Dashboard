import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { BASEURL } from '../../components/Api/Api_Url';
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const TechnologyUpdateForm = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();
  ////////////////////////////////// code for image drag drop/////////////////////////////////////
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
  /////////////////////////////////////////////////////////////////////

  ///////// post updates data ///////////////////////

  const formData = new FormData();
  formData.append('techName', title);
  if (isFileSelected) {
    const fileInput = inputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      console.log(fileInput.files[0]);

      formData.append('image', fileInput.files[0]);
    }
  }

  const handleSubmits = async () => {
    let isValid = true;

    if (!title) {
      setTitleError('Please enter the technology title.');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (isValid) {
      try {
        const response = await axios.put(
          `${BASEURL}/api/auth/technology/${id}`,
          formData
        );
        if (response.status == 200) {
          setTitle('');
          setIsFileSelected(false);
          toast.success('Successfully Submitted!');
          navigate('/technologies');
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  /////////////// getting data to display in fields
  const getData = async () => {
    try {
      const response = await axios.post(`${BASEURL}/api/auth/updation/${id}`);
      console.log(response.data);
      setTitle(response.data.technologies.techName),
        setSelectedImageSrc(response.data.technologies.image);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Technology Title
                  </label>
                  <input
                    type="text"
                    placeholder="javascript, react, next etc..."
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      titleError ? 'border-red-500' : ''
                    }`}
                    name="techName"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                  {titleError && (
                    <p className="text-red-500 text-xs">{titleError}</p>
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
                    onClick={handleSubmits}
                    type="submit"
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-primary py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    style={{ color: 'white', fontWeight: 'bold' }}
                  >
                    Update Technology
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

export default TechnologyUpdateForm;
