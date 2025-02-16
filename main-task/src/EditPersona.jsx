import React, { useContext, useState, useEffect } from 'react';
import './AddPersona.css';
import defaultImage from './Banner.png';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from './UserContext';

const EditPersona = () => {
    const navigate = useNavigate();
    const { index } = useParams(); 
    const { personas, editPersona } = useContext(UserContext); 

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

    useEffect(() => {
        if (personaToEdit) {
            setPersonaData(personaToEdit);
            setSavedImage(personaToEdit.image);
        }
    }, [personaToEdit]);

    const handleInputChanges = (e, field) => {
        setPersonaData((prevData) => ({ ...prevData, [field]: e.target.value }));
    };

    const handleImageEdit = (value) => {
        setEditImageState(value);
    };

    const handleSaveImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSavedImage(imageUrl);
            setPersonaData((prevData) => ({ ...prevData, image: imageUrl }));
        }
        handleImageEdit(false);
    };

    const handleEditPersona = () => {
        if (personaToEdit) {
            editPersona(parseInt(index), personaData); // Update the persona in the context
            navigate('/Persona');
        }
    };

    const goBackToPersona = () => {
        navigate('/Persona');
    };

    return (
        <div>
            {editImageState && (
                <div className='popup'>
                    <div className="upload-btn">
                        <label htmlFor="">Choose an image:</label>
                        <input type="file" onChange={(e) => handleSaveImage(e)} />
                        <button onClick={() => handleImageEdit(false)}>Cancel</button>
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
                                    name=""
                                    id=""
                                    placeholder="Enter the text"
                                    value={personaData.quote}
                                    onChange={(e) => handleInputChanges(e, "quote")}
                                ></textarea>
                            </div>
                            <div className="col">
                                <label htmlFor="">Description</label>
                                <textarea
                                    name=""
                                    id=""
                                    placeholder="Enter a general Description/bio about the persona"
                                    value={personaData.description}
                                    onChange={(e) => handleInputChanges(e, "description")}
                                ></textarea>
                            </div>
                            <div className="col">
                                <label htmlFor="">Attitudes/Motivations</label>
                                <textarea
                                    name=""
                                    id=""
                                    placeholder="What drives and incentives the persona to reach desired goals? What mindset does the persona have?"
                                    value={personaData.attitudes}
                                    onChange={(e) => handleInputChanges(e, "attitudes")}
                                ></textarea>
                            </div>
                        </div>
                        <div className='row-2'>
                            <div className="col">
                                <label htmlFor="">Pain Point</label>
                                <textarea
                                    name=""
                                    id=""
                                    placeholder='What are the highest challenges that the persona faces in their lab?'
                                    value={personaData.painPoints}
                                    onChange={(e) => handleInputChanges(e, "painPoints")}
                                ></textarea>
                            </div>
                            <div className="col">
                                <label htmlFor="">Jobs / Needs</label>
                                <textarea
                                    name=""
                                    id=""
                                    placeholder='What are the Persona functional social and emotional needs to be successful'
                                    value={personaData.jobNeeds}
                                    onChange={(e) => handleInputChanges(e, "jobNeeds")}
                                ></textarea>
                            </div>
                            <div className="col">
                                <label htmlFor="">Activities</label>
                                <textarea
                                    name=""
                                    id=""
                                    placeholder='What does the persona like to do in their free time?'
                                    value={personaData.activities}
                                    onChange={(e) => handleInputChanges(e, "activities")}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="last-section" style={{display:'flex' , justifyContent:'space-between'}}>
                    <div className="delete-btn">
                        <button className='btn' style={{width:'145px' ,height:'50px',color:'red',border:'none',background:'none',fontSize:'smaller',fontWeight:'700'}}>Delete</button>
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