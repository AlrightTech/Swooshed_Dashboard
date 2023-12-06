import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { BASEURL } from '../../components/Api/Api_Url';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function StrategiesUpdateForm() {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

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

  formData.append('strategic_title', title);
  formData.append('strategic_description', description);
  if (isFileSelected) {
    const fileInput = inputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      console.log(fileInput.files[0]);

      formData.append('stratImage', fileInput.files[0]);
    }
  }

  const handleSubmits = async () => {
    if (!title || !description) {
      setError('Please fill in all the required fields.');
      return;
    }

    try {
      const response = await axios.put(
        `${BASEURL}/api/auth/strategic-executions/${id}`,
        formData
      );
      console.log(response);
      if (response.status === 200) {
        setTitle('');
        setDescription('');
        setIsFileSelected(false);
        setSelectedImageSrc('');
        setError('');
        toast.success('Form submitted successfully');
        navigate('/strategies');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.post(`${BASEURL}/api/auth/updation/${id}`);
      console.log(response.data);
      setTitle(response.data.strategicExecution.strategic_title);
      setDescription(response.data.strategicExecution.strategic_description);

      setSelectedImageSrc(response.data.strategicExecution.stratImage);
    } catch (error) {
      console.log(error);
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
                  <label className="mb-3 block text-sm  font-medium text-black dark:text-white">
                    Strategy Title
                  </label>
                  <input
                    name="strategic_title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    type="text"
                    placeholder="set strategy title for your service"
                    className="w-full rounded-lg border-[1.5px]  border-stroke bg-transparent py-3 px-5 text-sm font-medium font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm  font-medium text-black dark:text-white">
                    Strategy Plan Detail
                  </label>
                  <textarea
                    name="strategic_description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="Set strategy execution plan detail..."
                    className="w-full rounded-lg border-[1.5px]  border-stroke bg-transparent py-3 px-5 text-sm font-medium font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
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
                  {error && <p className="text-red-500 mb-3">{error}</p>}
                  <button
                    type="submit"
                    onClick={handleSubmits}
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-primary py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    style={{ color: 'white', fontWeight: 'bold' }}
                  >
                    Update Strategy Plan +
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
