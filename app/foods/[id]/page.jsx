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
    const [totalCalories, setTotalCalories] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [goalCalories, setGoalCalories] = useState(0);

useEffect(() => {
    fetchUserData();
}, []);

const fetchUserData = async () => {
    try {
        const response = await fetch(`http://localhost:3006/users/one/${userId}`);
        const userData = await response.json();
        setGoalCalories(userData.goalCalories);
    } catch (error) {
        console.error('Failed to fetch user data:', error);
    }
};
    
useEffect(() => {
        const allCategories = ['breakfast', 'lunch', 'dinner', 'snacks'];
        let sum = 0;
        allCategories.forEach(category => {
            sum += getTotalCaloriesByType(category);
    });
        setTotalCalories(sum);
    }, [foods]); // Recompute totalCalories whenever the foods change.

useEffect(() => {
    fetchFoods();
}, [currentDate]);

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
                fetchFoods(); 
                handleCloseModal();
                // Refetch or update state directly to reflect changes
            });
        }
    } 

    const handleDeleteFood = (foodId) => {
        fetch(`http://localhost:3006/foods/${foodId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Remove the deleted food from the local state
                setFoods(prevFoods => prevFoods.filter(food => food._id !== foodId));
                handleCloseModal();
            } else {
                throw new Error('Failed to delete food');
            }
        })
        .catch(error => {
            console.error('There was an error deleting the food:', error);
        });
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
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
        fetch(`http://localhost:3006/foods?userId=${userId}&date=${dateStr}`)
            .then(res => res.json())
            .then(data => setFoods(data));
    };   

    const goToPreviousDay = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() - 1);
            return newDate;
        });
    };
    
    const goToNextDay = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() + 1);
            return newDate;
        });
    };
    
    return (
        <div className="container">

        <div className="date-navigation">
                    <button onClick={goToPreviousDay}>&lt;</button> {/* left arrow button */}
                    <h2>{currentDate.toDateString()}</h2>
                    <button onClick={goToNextDay}>&gt;</button> {/* right arrow button */}
                </div>

        <div className="calories-box">
            <h2>Calories Remaining</h2>
            <div className="calorie-calculation">
                <div className="calorie-item">
                    <div>{goalCalories}</div>
                    <div>Goal</div>
                </div>
                <div className="calorie-separator"> - </div>
                <div className="calorie-item">
                    <div>{totalCalories}</div>
                    <div>Food</div>
                </div>
                <div className="calorie-separator"> = </div>
                <div className="calorie-item">
                    <div className={(goalCalories - totalCalories) > 0 ? "positive" : "negative"}>
                        {goalCalories - totalCalories}
                    </div>
                    <div>Remaining</div>
                </div>
            </div>
        </div>
            
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
                    {currentFood._id && <button className="modal-delete-button" onClick={() => handleDeleteFood(currentFood._id)}>Delete</button>}
                </form>
                <button className="modal-close-button" onClick={handleCloseModal}>Close</button>
        </Modal>

        </div>
    );
}
