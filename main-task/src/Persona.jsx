import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // Import UserContext
import logo from './tringapps-copy-2.png';
import './Persona.css';

const Persona = () => {
    const navigate = useNavigate();
    const { personas } = useContext(UserContext); // Access personas from context

    const goToAddPersonaPage = () => {
        navigate('/Persona/AddPersona');
    };

    const goToEditPersona = (index) => {
        navigate(`/Persona/EditPersona/${index}`);
    }
    const goToHomePage = () => {
        navigate('/');
    }
    // console.log("the datas",personas);
    return (
        <>
            {/* Adding header */}
            <header>
                <div className="header">
                    <img src={logo} className='logo' alt="logo" />
                    <button className='logout-btn' onClick={goToHomePage}>Logout</button>
                </div>
            </header>

            {/* Add Persona button if we click this it will navigate addPersona Page */}
            <div className='main-content'>
                <div className='outer-class'>
                    <div className='add-persona-btn'>
                        <button className='btn-persona' onClick={goToAddPersonaPage}>Add Persona</button>
                    </div>
                    <div className="card-list">
                        <div className="row">
                        <div className="card" onClick={goToAddPersonaPage} style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                            <h3>Add Persona</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </div>
                            {/* in this card section it will show the all the cards  */}
                            {/* main reason to use map is for edit and deleting the cards */}
                            {/* in the crd templete we are showing image , name and quote */}
                            {personas.map((persona, index) => {
                                console.log("item",persona)
                                return (
                                
                                // if we click the card it will navigate the editPersona page with index

                                <div className="card" key={index} onClick={() => goToEditPersona(index)}>
                                    <div className='section-1'>

                                        <img
                                            src={persona.image}
                                            style={{ height: '150px', width: '300px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="section-2">
                                        <div className="content">
                                            <h5>{persona.name}</h5>
                                            <p>{persona.quote}</p>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Persona;