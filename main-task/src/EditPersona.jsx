import React, { useContext, useState, useEffect } from 'react';
import './EditPersona.css';
import defaultImage from './Banner.png';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

const EditPersona = () => {
    const navigate = useNavigate();
    const { index } = useParams();
    const { personas, editPersona, deletePersona } = useContext(UserContext);

    const personaToEdit = personas[parseInt(index)];

    const [personaData, setPersonaData] = useState({
        name: personaToEdit?.name || "",
        quote: personaToEdit?.quote || "",
        description: personaToEdit?.description || "",
        attitudes: personaToEdit?.attitudes || "",
        painPoints: personaToEdit?.painPoints || "",
        jobNeeds: personaToEdit?.jobNeeds || "",
        activities: personaToEdit?.activities || "",
        image: personaToEdit?.image || defaultImage,
    });

    const [editImageState, setEditImageState] = useState(false);
    const [savedImage, setSavedImage] = useState(personaToEdit?.image || null);
    const [deleteCardState, setDeleteCardState] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (personaToEdit) {
            setPersonaData(personaToEdit);
            setSavedImage(personaToEdit.image);
        }
    }, [personaToEdit]);

    const handleInputChanges = (e, field) => {
        setPersonaData((prevData) => ({ ...prevData, [field]: e.target.value }));
    };

    const handleRichTextChange = (value, field) => {
        setPersonaData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleImageEdit = (value) => {
        setEditImageState(value);
        if (!value) {
            setPreviewImage(null);
        }
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
                alert("Please upload a valid image file (JPG, JPEG, or PNG).");
                return false;
            }
        }
    };

    const closeEditImagePopup = (value) => {
        if (value === false && previewImage) {
            setSavedImage(previewImage);
            setPersonaData((prevData) => ({ ...prevData, image: previewImage }));
        }
        setPreviewImage(null);
        handleImageEdit(false);
    };

    const validateFields = () => {
        const requiredFields = ['name', 'quote', 'description', 'attitudes', 'painPoints', 'jobNeeds', 'activities'];
        const isValid = requiredFields.every((field) => personaData[field].trim() !== "");
        return isValid;
    };

    const handleEditPersona = () => {
        setFormSubmitted(true); // Mark form as submitted
        if (validateFields()) {
            editPersona(parseInt(index), personaData); // Update the persona in the context
            navigate('/Persona');
        } else {
            console.log("Validation Failed");
        }
    };

    const handleDeleteState = (value) => {
        setDeleteCardState(value);
    };

    const handleDeleteCard = () => {
        const oldData = [...personas];
        oldData.splice(parseInt(index), 1);
        deletePersona(oldData);
        console.log("Deleted Successfully");
        navigate('/Persona');
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const goBackToPersona = () => {
        navigate('/Persona');
    };

    const settingDefaultImage = () => {
        setPreviewImage(defaultImage);
    };

    return (
        <div>
            {editImageState && (
                <div className='popups'>
                    <div className="upload-btn">
                        <img src={previewImage || personaData.image} style={{ height: '225px', width: '562px', objectFit: 'cover' }} alt="Preview" />
                        <label htmlFor="">Choose an image:</label>
                        <button type="button" onClick={triggerFileInput} className='upload-img-btn'>Upload Image</button>
                        <input type="file" id="fileInput" style={{ display: 'none' }} accept="image/*" onChange={handleSaveImage} />
                        <div className='buttons-popup'>
                            <button className='setDefaultImage' onClick={settingDefaultImage}>Delete</button>
                            <div className='closesavebtn'>
                                <button className='cancels' onClick={() => handleImageEdit(false)}>Cancel</button>
                                <button onClick={() => closeEditImagePopup(false)} className='saves-btn'>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {deleteCardState && (
                <div className='popup delete-popup'>
                    <div className="upload-btn">
                        <label htmlFor="">Are You Sure You Want to Delete this card?</label>
                        <div className='btn-sections'>
                            <button onClick={() => handleDeleteState(false)}>Cancel</button>
                            <button onClick={handleDeleteCard}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
            <div className='addPersonaPage'>
                <div className="image-container" style={{ backgroundImage: `url(${savedImage ? savedImage : defaultImage})` }}>
                    <div className='image-section'>
                        <div className="name">
                            <h5>Person Name</h5>
                            <input
                                type="text"
                                placeholder='Enter the Name'
                                value={personaData.name}
                                onChange={(e) => handleInputChanges(e, "name")}
                            />
                            {formSubmitted && !personaData.name && <p className='error'>Name is Required</p>}
                        </div>
                        <div className="upload-img-btn">
                            <button className='btn-upload' onClick={() => handleImageEdit(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                </svg> Change Image
                            </button>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className='row-1'>
                            <div className="col">
                                <label htmlFor="">Notable Quote</label>
                                <textarea
                                    placeholder="Enter the text"
                                    value={personaData.quote}
                                    onChange={(e) => handleInputChanges(e, "quote")}
                                ></textarea>
                                {formSubmitted && !personaData.quote && <p className='error'>Quote is Required</p>}
                            </div>
                            <div className="col">
                                <label htmlFor="">Description</label>
                                <textarea
                                    placeholder="Enter a general Description/bio about the persona"
                                    value={personaData.description}
                                    onChange={(e) => handleInputChanges(e, "description")}
                                ></textarea>
                                {formSubmitted && !personaData.description && <p className='error'>Description is Required</p>}
                            </div>
                            <div className="col">
                                <label htmlFor="">Attitudes/Motivations</label>
                                <textarea
                                    placeholder="What drives and incentives the persona to reach desired goals? What mindset does the persona have?"
                                    value={personaData.attitudes}
                                    onChange={(e) => handleInputChanges(e, "attitudes")}
                                ></textarea>
                                {formSubmitted && !personaData.attitudes && <p className='error'>Attitudes is Required</p>}
                            </div>
                        </div>
                        <div className='row-2'>
                            <div className="col">
                                <label htmlFor="">Pain Point</label>
                                <ReactQuill className='quill' theme="snow" value={personaData.painPoints} onChange={(value) => handleRichTextChange(value, "painPoints")} placeholder="What are the highest challenges that the persona faces in their lab?" />
                                {formSubmitted && !personaData.painPoints && <p className='error'>Pain Points is Required</p>}
                            </div>
                            <div className="col">
                                <label htmlFor="">Jobs / Needs</label>
                                <ReactQuill className='quill' theme="snow" value={personaData.jobNeeds} onChange={(value) => handleRichTextChange(value, "jobNeeds")} placeholder="What are the Persona functional social and emotional needs to be successful" />
                                {formSubmitted && !personaData.jobNeeds && <p className='error'>Job Needs is Required</p>}
                            </div>
                            <div className="col">
                                <label htmlFor="">Activities</label>
                                <ReactQuill className='quill' theme="snow" value={personaData.activities} onChange={(value) => handleRichTextChange(value, "activities")} placeholder="What does the persona like to do in their free time?" />
                                {formSubmitted && !personaData.activities && <p className='error'>Activities is Required</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="last-section" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="delete-btn">
                        <button className='btn' onClick={() => handleDeleteState(true)} style={{ width: '145px', height: '50px', color: 'red', border: 'none', background: 'none', fontSize: 'smaller', fontWeight: '700' }}>Delete</button>
                    </div>
                    <div className='btns'>
                        <button className='close-btn' onClick={goBackToPersona}>CLOSE</button>
                        <button className='add-btn' onClick={handleEditPersona}>
                            EDIT PERSONA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPersona;