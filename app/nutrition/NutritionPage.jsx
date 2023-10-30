'use client';

import { useState, useEffect } from 'react';
import Modal from 'react-modal';

// Modal.setAppElement('#__next'); // For accessibility purposes with react-modal

export default function Nutrition() {
    const [foods, setFoods] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentFood, setCurrentFood] = useState({});

    useEffect(() => {
        // Fetch the foods data here
        fetch('/foods?userId=YOUR_USER_ID')
            .then(res => res.json())
            .then(data => setFoods(data));
    }, []);

    const handleOpenModal = (food = {}) => {
        setCurrentFood(food);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setCurrentFood({});
        setIsOpen(false);
    };

    return (
        <div>
            <h1>Nutrition Page</h1>
            <button onClick={() => handleOpenModal()}>Add New Food</button>
            
            {foods.map(food => (
                <div key={food._id}>
                    <h3>{food.name}</h3>
                    {/* Render other details of food */}
                    <button onClick={() => handleOpenModal(food)}>Update</button>
                    <button onClick={() => { /* Logic to delete this food */ }}>Delete</button>
                </div>
            ))}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Food Modal"
            >
                <h2>{currentFood._id ? 'Update' : 'Add'} Food</h2>
                {/* The form for adding/updating the food goes here */}
                <button onClick={handleCloseModal}>Close</button>
            </Modal>
        </div>
    );
}
