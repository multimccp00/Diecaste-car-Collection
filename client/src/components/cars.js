import React, { useState, useEffect } from "react";
import axios from "axios";
import Update from "./Update";
import FilterSortComponent from "./FilterSort";
import DeleteConfirmationModal from './DeleteConfirmationModal';

const Cars = ({ viewMode }) => {
  const [cars, setCars] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [displayedCars, setDisplayedCars] = useState({ grouped: false, cars: [] });

  // Modal state for delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCarToDelete, setSelectedCarToDelete] = useState(null);

  // Fetch all cars from the server
  const fetchAllCars = async () => {
    try {
      const res = await axios.get("http://localhost:8800/cars");
      // ensure we have an array before updating state
      if (Array.isArray(res.data)) {
        setCars(res.data);
        setDisplayedCars({ grouped: false, cars: res.data });
      } else {
        console.error("Unexpected response from /cars:", res.data);
        setCars([]);
        setDisplayedCars({ grouped: false, cars: [] });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  // Delete car function
  const handleDeleteClick = (carId) => {
    setSelectedCarToDelete(carId); // Set the car ID to delete
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  const handleDeleteConfirm = async () => {
    try {
      // Send the delete request to the server
      await axios.delete(`http://localhost:8800/cars/${selectedCarToDelete}`);
      // Remove the car from the local list after deletion
      setCars(cars.filter((car) => car.idcars !== selectedCarToDelete));
      setShowDeleteModal(false); // Close the modal after deletion
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false); // Close the modal without deleting
  };

  // Handle updating the car details
  const handleUpdate = (id) => {
    setSelectedCarId(id);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedCarId(null);
  };

  const handleFilterChange = (filteredData) => {
    setDisplayedCars(filteredData);
  };

  // Determine the layout of each car based on the view mode
  const renderCarContent = (car, isListView) => {
    if (isListView) {
      return (
        <>
          {car.img && <img src={car.img} alt="" />}
          <div className="car-info">
            <h2>{car.brand} {car.model}</h2>
            <p>Color: {car.color}</p>
            <p>Year: {car.year}</p>
            <p>Condition: {car.condition}</p>
            <p>Collection: {car.collection}</p>
            <p>Brand: {car.diecastBrand}</p>
            <p>Edition: {car.edition}</p>
            <div className="car-actions">
              <button
                className="edit-btn"
                onClick={() => handleUpdate(car.idcars)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteClick(car.idcars)}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        {car.img && <img src={car.img} alt="" />}
        <h2>{car.brand}</h2>
        <h2>{car.model}</h2>
        <p>Color: {car.color}</p>
        <p>Year: {car.year}</p>
        <p>Condition: {car.condition}</p>
        <p>Collection: {car.collection}</p>
        <p>Brand: {car.diecastBrand}</p>
        <div className="car-buttons">
          <button
            className="edit-btn"
            onClick={() => handleUpdate(car.idcars)}
          >
            Edit
          </button>
          <button
            className="delete-btn"
            onClick={() => handleDeleteClick(car.idcars)}
          >
            Delete
          </button>
        </div>
      </>
    );
  };

  const isListView = viewMode === 'view-list' || viewMode === 'view-list-two';

  // Render cars grouped or not grouped based on filter results
  const renderCars = () => {
    if (displayedCars.grouped) {
      return Object.entries(displayedCars.groups).map(([groupName, groupCars]) => (
        <div key={groupName} className="car-group">
          <h2 className="group-header">{groupName}</h2>
          <div className={`cars ${viewMode}`}>
            {groupCars.map(car => (
              <div className="car" key={car.idcars || car.id}>
                {renderCarContent(car, isListView)}
              </div>
            ))}
          </div>
        </div>
      ));
    } else {
      // make sure we always have an array to iterate over
      const list = Array.isArray(displayedCars.cars) ? displayedCars.cars : [];
      return (
        <div className={`cars ${viewMode}`}>
          {list.map(car => (
            <div className="car" key={car.idcars || car.id}>
              {renderCarContent(car, isListView)}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Car collection</h1>
      <FilterSortComponent cars={cars} onFilterChange={handleFilterChange} />
      {renderCars()}
      
      {/* Update Modal */}
      {showUpdateModal && (
        <Update
          carId={selectedCarId}
          onClose={closeUpdateModal}
          onUpdateSuccess={fetchAllCars}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default Cars;
