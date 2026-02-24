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
    collection: '',
    condition: 'Mint',
    edition: '',
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
      alert('Car has been added successfully!'); // Show confirmation alert
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      {/* Add New Car bar */}
      <div
        className="add-car-bar"
        onClick={() => setIsFormOpen(!isFormOpen)} // Toggle form visibility
        style={{
          backgroundColor: '#3498db',
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
          <div>
            <input
              type="text"
              placeholder="Model"
              onChange={handleChange}
              name="model"
              value={car.model}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Brand"
              onChange={handleChange}
              name="brand"
              value={car.brand}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Color"
              onChange={handleChange}
              name="color"
              value={car.color}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Year"
              onChange={handleChange}
              name="year"
              value={car.year}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Diecast Brand"
              onChange={handleChange}
              name="diecastBrand"
              value={car.diecastBrand}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Collection"
              onChange={handleChange}
              name="collection"
              value={car.collection}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Condition"
              onChange={handleChange}
              name="condition"
              value={car.condition}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Edition"
              onChange={handleChange}
              name="edition"
              value={car.edition}
            />
          </div>
          <div>
            <button onClick={handleClick} >Add Car</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Add;
