import React, { useContext, useState } from 'react';
import './AddPersona.css';
import defaultImage from './Banner.png';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddPersona = () => {
    const navigate = useNavigate();
    const goBackToPersona = () => {
        navigate('/Persona');
    };
    const { addPersona } = useContext(UserContext);
    const [personaData, setPersonaData] = useState({
        name: "",
        quote: "",
        description: "",
        attitudes: "",
        painPoints: "",
        jobNeeds: "",
        activities: "",
        image: defaultImage,
    });

    const handleInputChanges = (e, field) => {
        setPersonaData((prevData) => ({ ...prevData, [field]: e.target.value }));
    };

    const [previewImage, setPreviewImage] = useState(null);
    const [editImageState, setEditImageState] = useState(false);
    const [savedImage, setSavedImage] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Separate richTextState for each field
    const [richTextState, setRichTextState] = useState({
        painPoints: false,
        jobNeeds: false,
        activities: false,
    });

    const handleImageEdit = (value) => {
        setPreviewImage(savedImage ? savedImage : defaultImage);
        setEditImageState(value);
    };

    const handleSaveImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const lastOccurenceOfDot = file.name.lastIndexOf(".") + 1;
            const extFile = file.name.substr(lastOccurenceOfDot, file.name.length).toLowerCase();
            if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
                const imageUrl = URL.createObjectURL(file);
                setPreviewImage(imageUrl);
                return true;
            } else {
                imageInvalidToast();
                return false;
            }
        }
    };

    const saveImage = () => {
        setSavedImage(previewImage);
        setPersonaData((prevData) => ({ ...prevData, image: previewImage }));
        handleImageEdit(false);
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const handleAddPersona = () => {
        setFormSubmitted(true);
        if (validateFields()) {
            console.log("submitted values", personaData);
            addPersona(personaData);
            navigate('/Persona');
        } else {
            console.log("Validation failed");
        }
    };


    const imageInvalidToast = () => {
        toast.error('Please upload a valid image file (JPG, JPEG, or PNG).', {
          position: "top-center",
          autoClose: 4000, // Toast will be displayed for 4 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
    };

    const validateFields = () => {
        const requiredFields = ['name', 'quote', 'description', 'attitudes', 'painPoints', 'jobNeeds', 'activities'];
        const isValid = requiredFields.every((field) => personaData[field].trim() !== "");
        return isValid;
    };

    return (
        <div>
            {editImageState && (
                <div className='popup'>
                    <div className="upload-btn">
                        <img src={previewImage || personaData.image} alt="" style={{ height: '225px', width: '562px', objectFit: 'cover' }} />
                        <label htmlFor="">Choose a image :</label>
                        <button onClick={triggerFileInput}>Upload Image</button>
                        <input type="file" accept="image/*" id='fileInput' onChange={(e) => handleSaveImage(e)} style={{ display: 'none' }} />
                        <div className='buttons-btn'>
                            <button className='cancel' onClick={() => handleImageEdit(false)}>Cancel</button>
                            <button onClick={() => saveImage()} className='save-btn'>Save</button>
                        </div>
                    </div>
                </div>
            )}
            <div className='addPersonaPage'>
                <div className="image-container" style={{ backgroundImage: `url(${savedImage ? savedImage : defaultImage})` }}>
                    <div className='image-section'>
                        <div className="name">
                            <h5>Person Name</h5>
                            <input type="text" id='name' placeholder='Enter the Name' onChange={(e) => handleInputChanges(e, "name")} />
                            {formSubmitted && !personaData.name && <p className="error">Name is required</p>}
                        </div>
                        <div className="upload-img-btn">
                            <button className='btn-upload' onClick={() => handleImageEdit(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                </svg> Upload Image
                            </button>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className='row-1'>
                            <div className="col">
                                <label htmlFor="">Notable Quote</label>
                                <textarea name="" id="" placeholder="Enter the text" onChange={(e) => handleInputChanges(e, "quote")}></textarea>
                                {formSubmitted && !personaData.quote && <p className='error'>Quote is Required</p>}
                            </div>
                            <div className="col">
                                <label htmlFor="">Description</label>
                                <textarea name="" id="" placeholder="Enter a general Description/bio about the persona" onChange={(e) => handleInputChanges(e, "description")} ></textarea>
                                {formSubmitted && !personaData.description && <p className='error'>Description is Required</p>}
                            </div>
                            <div className="col">
                                <label htmlFor="">Attitudes/Motivations</label>
                                <textarea name="" id="" placeholder="What drives and incentives the persona to reach desired goals? What mindset does the persona have?" onChange={(e) => handleInputChanges(e, "attitudes")} ></textarea>
                                {formSubmitted && !personaData.attitudes && <p className='error'>Attitude is required</p>}
                            </div>
                        </div>
                        <div className='row-2'>
                            <div className="col">
                                <label htmlFor="">Pain Point</label>
                                {!richTextState.painPoints ? (
                                    <div
                                        className="textarea"
                                        onClick={() =>
                                            setRichTextState((prev) => ({
                                                ...prev,
                                                painPoints: true,
                                                jobNeeds: false,
                                                activities: false,
                                            }))
                                        }
                                    >
                                        {personaData.painPoints ? (
                                            <div dangerouslySetInnerHTML={{ __html: personaData.painPoints }} />
                                        ) : (
                                            <span style={{ color: "#aaa" }}>
                                                What are the highest challenges that the persona faces in their lab?
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <ReactQuill
                                        theme="snow"
                                        value={personaData.painPoints}
                                        onChange={(value) => setPersonaData((prev) => ({ ...prev, painPoints: value }))}
                                        placeholder="What are the highest challenges that the persona faces in their lab?"
                                    />
                                )}
                                {formSubmitted && !personaData.painPoints && <p className='error'>Pain Points is required</p>}
                            </div>
                            <div className="col">
                                <label htmlFor="">Jobs / Needs</label>
                                {!richTextState.jobNeeds ? (
                                    <div
                                        className="textarea"
                                        onClick={() =>
                                            setRichTextState((prev) => ({
                                                ...prev,
                                                jobNeeds: true,
                                                painPoints: false,
                                                activities: false,
                                            }))
                                        }
                                    >
                                        {personaData.jobNeeds ? (
                                            <div dangerouslySetInnerHTML={{ __html: personaData.jobNeeds }} />
                                        ) : (
                                            <span style={{ color: "#aaa" }}>
                                                What are the Persona functional social and emotional needs to be successful
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <ReactQuill
                                        className='quill'
                                        theme="snow"
                                        value={personaData.jobNeeds}
                                        onChange={(value) => setPersonaData((prev) => ({ ...prev, jobNeeds: value }))}
                                        placeholder="What are the Persona functional social and emotional needs to be successful"
                                    />
                                )}
                                {formSubmitted && !personaData.jobNeeds && <p className='error'>Job Needs is Required</p>}
                            </div>
                            <div className="col">
                                <label htmlFor="">Activities</label>
                                {!richTextState.activities ? (
                                    <div
                                        className="textarea"
                                        onClick={() =>
                                            setRichTextState((prev) => ({
                                                ...prev,
                                                activities: true,
                                                painPoints: false,
                                                jobNeeds: false,
                                            }))
                                        }
                                    >
                                        {personaData.activities ? (
                                            <div dangerouslySetInnerHTML={{ __html: personaData.activities }} />
                                        ) : (
                                            <span style={{ color: "#aaa" }}>
                                                What does the persona like to do in their free time?
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <ReactQuill
                                        className='quill'
                                        theme="snow"
                                        value={personaData.activities}
                                        onChange={(value) => setPersonaData((prev) => ({ ...prev, activities: value }))}
                                        placeholder="What does the persona like to do in their free time?"
                                    />
                                )}
                                {formSubmitted && !personaData.activities && <p className='error'>Activities is required</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="last-section">
                    <div className='btns'>
                        <button className='close-btn' onClick={() => goBackToPersona()} >CLOSE</button>
                        <button className='add-btn' onClick={() => handleAddPersona()} >
                            ADD PERSONA
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default AddPersona;