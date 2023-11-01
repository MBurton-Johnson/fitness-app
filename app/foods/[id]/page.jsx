'use client';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useRouter, useParams } from 'next/navigation';
import '/components/AddFood/AddFood.css';
import '/components/AddFood/AddFoodModal.css';

export default function Nutrition() {

    const { id: userId } = useParams();  // <-- Use useParams to get the userId directly
    const router = useRouter(); 

    const [foods, setFoods] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentFood, setCurrentFood] = useState({});
    const [foodCategory, setFoodCategory] = useState(null);  // 'breakfast', 'lunch', 'dinner', 'snack'

useEffect(() => {
    fetch(`http://localhost:3006/foods?userId=${userId}`)
        .then(res => res.json())
        .then(data => setFoods(data));
    }, [userId]); // Fetch foods once when the component mounts and whenever userId changes


    const handleOpenModal = (category, food = {}) => {
        setFoodCategory(category);
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
            category: foodCategory
        };    
        if (currentFood._id) {
            fetch(`http://localhost:3006/foods/${currentFood._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(foodData),
            }).then(() => {
                fetchFoods(); 
                handleCloseModal();
                // Refetch or update state directly to reflect changes
            });
        } else {


            fetch(`http://localhost:3006/foods/new/${userId}`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(foodData),
                
            }).then(() => {
                handleCloseModal();
                // Refetch or update state directly to reflect changes
            });
        }
    } 

    const handleDeleteFood = (foodId) => {
        // Logic to delete this food, e.g., making a DELETE request to your API
        // After successful deletion, close the modal and optionally refresh the food list
    }

    const renderFoodsByType = (category) => {
        return foods.filter(food => food.category === category).map(food => (
            <div key={food._id} className="food-item" onClick={() => handleOpenModal(category, food)}>
                <h3>{food.name}</h3>
                <span>{food.calories} kcal</span>
            </div>
        ));
    }    

    const getTotalCaloriesByType = (category) => {
        const foodsForCategory = foods.filter(food => food.category === category);
        const totalCalories = foodsForCategory.reduce((acc, food) => acc + food.calories, 0);
        return totalCalories;
    }    

    const fetchFoods = () => {
        fetch(`http://localhost:3006/foods?userId=${userId}`)
            .then(res => res.json())
            .then(data => setFoods(data));
    };    

    return (
        <div className="container">

    <div className="meal-section">
        <div className="meal-header">
            <h2>Breakfast</h2> 
            <span>{getTotalCaloriesByType('breakfast')} kcal</span>
        </div>
        {renderFoodsByType('breakfast')}
        <button className="add-button" onClick={() => handleOpenModal('breakfast')}>ADD FOOD</button>
    </div>
    <div className="meal-section">
    <div className="meal-header">
            <h2>Lunch</h2> 
            <span>{getTotalCaloriesByType('lunch')} kcal</span>
        </div>        
        {renderFoodsByType('lunch')}
        <button className="add-button" onClick={() => handleOpenModal('lunch')}>ADD FOOD</button>
    </div>
    <div className="meal-section">
    <div className="meal-header">
            <h2>Dinner</h2> 
            <span>{getTotalCaloriesByType('dinner')} kcal</span>
        </div>        
        {renderFoodsByType('dinner')}
        <button className="add-button" onClick={() => handleOpenModal('dinner')}>ADD FOOD</button>
    </div>
    <div className="meal-section">
    <div className="meal-header">
            <h2>Snacks</h2> 
            <span>{getTotalCaloriesByType('snacks')} kcal</span>
        </div>        
        {renderFoodsByType('snacks')}
        <button className="add-button" onClick={() => handleOpenModal('snacks')}>ADD FOOD</button>
    </div>

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
                        value={currentFood.servingSize || ''}
                        onChange={(e) => setCurrentFood({ ...currentFood, servingSize: e.target.value })}
                        placeholder="Serving Size (grams)"
                    />                    
                    <input
                        type="number"
                        value={currentFood.protein || ''}
                        onChange={(e) => setCurrentFood({ ...currentFood, protein: e.target.value })}
                        placeholder="Protein (grams)"
                    />
                    <input
                        type="number"
                        value={currentFood.carbs || ''}
                        onChange={(e) => setCurrentFood({ ...currentFood, carbs: e.target.value })}
                        placeholder="Carbs (grams)"
                    />
                    <input
                        type="number"
                        value={currentFood.fat || ''}
                        onChange={(e) => setCurrentFood({ ...currentFood, fat: e.target.value })}
                        placeholder="Fa (grams)"
                    />
                    <input
                        type="number"
                        value={currentFood.fiber || ''}
                        onChange={(e) => setCurrentFood({ ...currentFood, fiber: e.target.value })}
                        placeholder="Fiber (grams)"
                    />
                    <input
                        type="number"
                        value={currentFood.sugar || ''}
                        onChange={(e) => setCurrentFood({ ...currentFood, sugar: e.target.value })}
                        placeholder="Sugar (grams)"
                    />

                    <button type="submit">{currentFood._id ? 'Update' : 'Add'} Food</button>
                        {currentFood._id && <button onClick={() => handleDeleteFood(currentFood._id)}>Delete</button>}
                </form>
                    <button onClick={handleCloseModal}>Close</button>
        </Modal>

        </div>
    );
}
