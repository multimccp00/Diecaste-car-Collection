import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [car, setCar] = useState({
    model: '',
    brand: '',
    color: '',
    year: null,
    diecastBrand: 'HotWheels',
    collection: 'none',
    condition: 'Mint',
    edition: 'none',
  });

  const [isFormOpen, setIsFormOpen] = useState(false); // Controls if the form is open or closed

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCar((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/cars', car);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='form'>
      {/* Add New Car bar */}
      <div
        className="add-car-bar"
        onClick={() => setIsFormOpen(!isFormOpen)} // Toggle form visibility
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px',
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: '5px',
        }}
      >
        {isFormOpen ? 'Close Add Car Form' : 'Add New Car'}
      </div>

      {/* Form appears when isFormOpen is true */}
      {isFormOpen && (
        <div className="car-form" style={{ marginTop: '20px' }}>
          <input
            type="text"
            placeholder="model"
            onChange={handleChange}
            name="model"
          />
          <input
            type="text"
            placeholder="brand"
            onChange={handleChange}
            name="brand"
          />
          <input
            type="text"
            placeholder="color"
            onChange={handleChange}
            name="color"
          />
          <input
            type="number"
            placeholder="year"
            onChange={handleChange}
            name="year"
          />
          <select
            name="diecastBrand"
            value={car.diecastBrand}
            onChange={handleChange}
          >
            <option value="HotWheels">HotWheels</option>
            <option value="Matchbox">Matchbox</option>
            <option value="Majorette">Majorette</option>
          </select>
          <select
            name="collection"
            value={car.collection}
            onChange={handleChange}
          >
            <option value="none">None</option>
            <option value="specialEdition">Special Edition</option>
            <option value="limited">Limited</option>
          </select>
          <input
            type="text"
            placeholder="condition"
            onChange={handleChange}
            name="condition"
          />
          <input
            type="text"
            placeholder="edition"
            onChange={handleChange}
            name="edition"
          />
          <button onClick={handleClick}>Add</button>
        </div>
      )}
    </div>
  );
};

export default Add;
