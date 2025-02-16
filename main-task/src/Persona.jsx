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

    console.log("the datas",personas);
    return (
        <>
            <header>
                <div className="header">
                    <img src={logo} className='logo' alt="logo" />
                </div>
            </header>
            <div className='main-content'>
                <div className='outer-class'>
                    <div className='add-persona-btn'>
                        <button className='btn-persona' onClick={goToAddPersonaPage}>Add Persona</button>
                    </div>
                    <div className="card-list">
                        <div className="row">
                            {personas.map((persona, index) => {
                                console.log("item",persona)
                                return (

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
                                            <p>{persona.activities}</p>
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