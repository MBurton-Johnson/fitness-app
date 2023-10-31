'use client';

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/navigation';


// Modal.setAppElement('#__next'); // For accessibility purposes with react-modal

export default function Nutrition() {

    const router = useRouter();  // <-- Initialize the useRouter hook
    const userId = router.query?.id; // <-- Destructure the userId from the router's query object
    const [foods, setFoods] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentFood, setCurrentFood] = useState({});
    const [foodType, setFoodType] = useState(null);  // 'breakfast', 'lunch', 'dinner', 'snack'

    useEffect(() => {
        // Only fetch data if userId is available (router.query might be empty on initial render)
        if (userId) {
            fetch(`/foods?userId=${userId}`)  // <-- Replace placeholder with userId from URL
                .then(res => res.json())
                .then(data => setFoods(data));
        }
    }, [userId]); 

    const handleOpenModal = (type, food = {}) => {
        setFoodType(type);
        setCurrentFood(food);
        setIsOpen(true);
    };
    
    const handleCloseModal = () => {
        setCurrentFood({});
        setIsOpen(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const foodData = {
            ...currentFood,
            type: foodType
        };    
        if (currentFood._id) {
            fetch(`/foods/${currentFood._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentFood),
            }).then(() => {
                handleCloseModal();
                // Refetch or update state directly to reflect changes
            });
        } else {
            fetch('http://localhost:3006/foods/new', {

            fetch(`http://localhost:3006/foods/new/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentFood),
                
            }).then(() => {
                handleCloseModal();
                // Refetch or update state directly to reflect changes
            });
        }
    } 
    return (
        <div>
            <h1>Nutrition Page</h1>
            <button onClick={() => handleOpenModal('breakfast')}>Add Breakfast</button>
            <button onClick={() => handleOpenModal('lunch')}>Add Lunch</button>
            <button onClick={() => handleOpenModal('dinner')}>Add Dinner</button>
            <button onClick={() => handleOpenModal('snack')}>Add Snack</button>

            {foods.map(food => (
                <div key={food._id}>
                    <h3>{food.name}</h3>
                    {/* Render other details of food */}
                    <button onClick={() => handleOpenModal(food)}>Update</button>
                    <button onClick={() => { /* Logic to delete this food */ }}>Delete</button>
                </div>
            ))}

            <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} contentLabel="Food Modal">
                <h2>{currentFood._id ? 'Update' : 'Add'} Food</h2>
                <form onSubmit={handleFormSubmit}>
                    <input
                        value={currentFood.name || ''}
                        onChange={(e) => setCurrentFood({ ...currentFood, name: e.target.value })}
                        placeholder="Name"
                    />
                    <input
                        value={currentFood.description || ''}
                        onChange={(e) => setCurrentFood({ ...currentFood, description: e.target.value })}
                        placeholder="Description"
                    />
                    <input
                        type="number"
                        value={currentFood.calories || ''}
                        onChange={(e) => setCurrentFood({ ...currentFood, calories: e.target.value })}
                        placeholder="Calories"
                    />                    
                    <input
                        type="number"
                        value={currentFood.protein || ''}
                        onChange={(e) => setCurrentFood({ ...currentFood, protein: e.target.value })}
                        placeholder="Protein"
                    />
                    <input
                        type="number"
                        value={currentFood.carbs || ''}
                        onChange={(e) => setCurrentFood({ ...currentFood, carbs: e.target.value })}
                        placeholder="Carbs"
                    />
                    <input
                        type="number"
                        value={currentFood.fat || ''}
                        onChange={(e) => setCurrentFood({ ...currentFood, fat: e.target.value })}
                        placeholder="Fat"
                    />
                    <input
                        type="number"
                        value={currentFood.fiber || ''}
                        onChange={(e) => setCurrentFood({ ...currentFood, fiber: e.target.value })}
                        placeholder="Fiber"
                    />
                    <input
                        type="number"
                        value={currentFood.sugar || ''}
                        onChange={(e) => setCurrentFood({ ...currentFood, sugar: e.target.value })}
                        placeholder="Sugar"
                    />

                    <button type="submit">{currentFood._id ? 'Update' : 'Add'} Food</button>
                </form>
                <button onClick={handleCloseModal}>Close</button>
            </Modal>
        </div>
    );
}
