import React, { useState } from 'react'

const InputField = () => {
    const [fields,setFields] = useState([{name:"",age:"",city:""}]);
    const [submittedData , setSubmittedData] = useState([]);

    const handleChanges = (index,field,value) =>{
        const newField = [...fields];
        newField[index][field] = value;
        setFields(newField);
    }

    const addField = () => {
      if (fields.some(field => field.name.trim() === "" || field.age.trim() === "" || field.city.trim() === "")) {
        alert("Please fill all the fields");
        return;
      }

      setFields([...fields,{name:"",age:"",city:""}]);
    }
    
    const removeField = (index) => {
        const newFields = fields.filter((_,i) => i !== index);
        setFields(newFields);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedData(fields);
      };

  return (
    <div className=''>
        <form action="" onSubmit={handleSubmit} className='form'>
            {
                fields.map((field,index) => (

                <div key={index} className='main'>
                  <div className="field">

                    <input type="text" placeholder='Enter the name' value={field.name} onChange={(e) => {handleChanges(index , "name",e.target.value)}} className='inputField firstInput' required />
                    <input type="number" placeholder='Enter the Age' value={field.age} onChange={(e) => {handleChanges(index , "age",e.target.value)}} className='inputField' required/>
                    <input type="text" placeholder='Enter the city' value={field.city} onChange={(e)=>{handleChanges(index,"city",e.target.value)}} className='inputField' required/>
                  </div>
                  <div className="buttons">
                    <button type='button' className='button' onClick={addField}>+</button>
                    {index > 0 && <button type='button' className='button' onClick={() => {removeField(index)}}>-</button>}
                  </div>
                </div>
                ))
            }
            <button type='submit' className='buttonField'>Submit</button>
        </form>
        {submittedData.length > 0 && (
        <div>
          <h3>Submitted Data:</h3>
          {submittedData.map((data, i) => (
            <p key={i}>{data.name} - {data.age} - {data.city}</p>
          ))}
        </div>
        )}  
    </div>
  );
};

export default InputField