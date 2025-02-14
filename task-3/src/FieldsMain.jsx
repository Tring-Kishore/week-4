import React, { useState } from 'react';

const FieldsMain = () => {
  const [formData, setFormData] = useState({name: '',age: '',skill: '',designation: '',address: '',});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  
  const openModal = () => {
    setIsModalOpen(true);
    setFormData({ name: '', age: '', skill: '', designation: '', address: '' });
  };

 
  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = (index) =>{
    const updateData = [...submittedData];
    updateData.splice(index,1);
    setSubmittedData(updateData);
  }
  const handleEdit = (index) =>{
    setFormData(submittedData[index]);
    setEditIndex(index);
    setIsModalOpen(true);

  }
  const handleUpdate = () =>{
    const updatField = [...submittedData];
    updatField[editIndex] = formData;
    setSubmittedData(updatField);
    closeModal();
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if(editIndex !== null)
    {
        handleUpdate();
    }
    else
    {
        setSubmittedData([...submittedData, formData]);
        closeModal(); 
    }
  };

  return (
    <div>
      <h1>Form Data</h1>
      <button onClick={openModal}>Add Data</button>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '10px' }}>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChanges} />
            <input type="text" placeholder="Age" name="age" value={formData.age} onChange={handleChanges} />
            <input type="text" placeholder="Skill" name="skill" value={formData.skill} onChange={handleChanges} />
            <input type="text" placeholder="Designation" name="designation" value={formData.designation} onChange={handleChanges} />
            <input type="text" placeholder="Address" name="address" value={formData.address} onChange={handleChanges} />
            <button type="submit">Submit</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </form>
        </div>
      )}

      {submittedData.length > 0 && (
        <div style={{display:"flex",justifyContent:"center"}}>
        <table style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Skill</th>
              <th>Designation</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.age}</td>
                <td>{data.skill}</td>
                <td>{data.designation}</td>
                <td>{data.address}</td>
                <td>
                    <div style={{display:"flex",justifyContent:"space-evenly"}}>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default FieldsMain;