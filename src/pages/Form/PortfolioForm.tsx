import React, { useState, useRef } from 'react';
import './uploader.css';
import axios from 'axios';
import { BASEURL } from '../../components/Api/Api_Url';
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

function PortfolioForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [url, setUrl] = useState('');
  const [projClient, setProjClient] = useState('');
  const [date, setDate] = useState('');

  const [titleError, setTitleError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [isFileSelected, setIsFileSelected] = useState(false);

  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  /////////////////////////////////////////// code for image drag drop /////////////////////////////////
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
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const formData = new FormData();
  formData.append('projName', title);
  formData.append('projDescription', description);
  formData.append('categoryName', category);
  formData.append('projUrl', url);
  formData.append('projClientName', projClient);
  formData.append('releaseDate', date);

  if (isFileSelected) {
    const fileInput = inputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      // console.log(fileInput.files[0]);

      formData.append('projImage', fileInput.files[0]);
    }
  }

  const validateForm = () => {
    let isValid = true;

    if (!title) {
      setTitleError('Please enter the project title.');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!category) {
      setCategoryError('Please enter the project category.');
      isValid = false;
    } else {
      setCategoryError('');
    }

    return isValid;
  };

  const handleSubmits = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${BASEURL}/api/auth/portfolio`,
          formData
        );
        if (response.status == 200) {
          setTitle(''),
            setCategory(''),
            setCategoryError(''),
            setDate(''),
            setDescription(''),
            setIsFileSelected(false);
          setProjClient('');
          setUrl('');
          navigate('/projects');

          toast.success('Successfully Submitted!');
        }
      } catch (error) {
        console.log(error);
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
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Project Title
                  </label>
                  <input
                    name="projName"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    type="text"
                    placeholder="enter project title here..."
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-medium font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      titleError ? 'border-red-500' : ''
                    }`}
                  />
                  {titleError && (
                    <p
                      className="text-red-500 text-xs"
                      style={{ color: 'red' }}
                    >
                      {titleError}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Category
                  </label>
                  <input
                    name="categoryName"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    type="text"
                    placeholder="enter project category here..."
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-medium font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      categoryError ? 'border-red-500' : ''
                    }`}
                  />
                  {categoryError && (
                    <p
                      className="text-red-500 text-xs"
                      style={{ color: 'red' }}
                    >
                      {categoryError}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Project Description
                  </label>
                  <textarea
                    name="projDescription"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="enter project description..."
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-medium font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      categoryError ? 'border-red-500' : ''
                    }`}
                  />
                  {categoryError && (
                    <p
                      className="text-red-500 text-xs"
                      style={{ color: 'red' }}
                    >
                      {categoryError}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Project URL
                  </label>
                  <input
                    type="text"
                    name="projUrl"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                    }}
                    placeholder="enter project URL..."
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-medium font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      categoryError ? 'border-red-500' : ''
                    }`}
                  />
                  {categoryError && (
                    <p
                      className="text-red-500 text-xs"
                      style={{ color: 'red' }}
                    >
                      {categoryError}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Project Client
                  </label>
                  <input
                    type="text"
                    name="projClientName"
                    value={projClient}
                    onChange={(e) => {
                      setProjClient(e.target.value);
                    }}
                    placeholder="enter project client..."
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-medium font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      categoryError ? 'border-red-500' : ''
                    }`}
                  />
                  {categoryError && (
                    <p
                      className="text-red-500 text-xs"
                      style={{ color: 'red' }}
                    >
                      {categoryError}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Release Date
                  </label>
                  <input
                    type="date"
                    name="releaseDate"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                    placeholder="enter project release date..."
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-medium font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      categoryError ? 'border-red-500' : ''
                    }`}
                  />
                  {categoryError && (
                    <p
                      className="text-red-500 text-xs"
                      style={{ color: 'red' }}
                    >
                      {categoryError}
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
                          <p className="rounded-lg p-2 text-sm font-bold text-success">
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
                    Add Portfolio Project +
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

export default PortfolioForm;
