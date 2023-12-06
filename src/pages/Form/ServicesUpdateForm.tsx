import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { BASEURL } from '../../components/Api/Api_Url';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
const animatedComponents = makeAnimated();

export default function ServicesUpdateForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  const { id } = useParams();

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

  ///////////////////////////// fetch data for options /////////////////////
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASEURL}/api/auth/strategic-executions`
      );
      const transformedOptions = response.data.map((strategy: any) => ({
        value: strategy._id,
        label: strategy.strategic_title,
      }));
      setOptions(transformedOptions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  ////////////////////////////////////////////////////////////////

  ////////// submiting Data //////////////

  const handleSelectChange = (selectedOptions: any) => {
    setSelectedOption(selectedOptions);
    console.log(selectedOptions);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    selectedOption.forEach((option) => {
      formData.append('strategy_id', option.value);
    });

    if (isFileSelected) {
      const fileInput = inputRef.current;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        console.log(fileInput.files[0]);
        formData.append('image', fileInput.files[0]);
      }
    }

    try {
      const response = await axios.put(
        `${BASEURL}/api/auth/services/${id}`,
        formData
      );
      if (response.status == 200) {
        setTitle('');
        setDescription('');
        setIsFileSelected(false);
        setSelectedOption([]);
        toast.success('Form submitted successfully');
        navigate('/services');
      }
    } catch (error) {
      console.log(error);
    }
  };

  /////////////////////  get input field data //////////////////////////
  const getData = async () => {
    try {
      const response = await axios.post(`${BASEURL}/api/auth/updation/${id}`);
      console.log(response.data);

      setTitle(response.data.services.title);
      setDescription(response.data.services.description);
      setIsFileSelected(false);
      setSelectedOption([]);
      setSelectedImageSrc(response.data.services.image.url);
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
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    <b> Services Title</b>
                  </label>
                  <input
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="enter services title here's"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-sm font-medium font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    <b>Detail</b>
                  </label>
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Services content here's"
                    className="w-full rounded-lg border-[1.5px]  border-stroke bg-transparent py-3 px-5 text-sm font-medium font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    <b>Select Strategies</b>
                  </label>
                  <Select
                    options={options}
                    onChange={handleSelectChange}
                    value={selectedOption}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
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
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-primary py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    style={{ color: 'white', fontWeight: 'bold' }}
                  >
                    Update Services +
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
