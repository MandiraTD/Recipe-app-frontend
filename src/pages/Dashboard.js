import React, { useEffect, useState } from 'react';
import API from '../services/api';
import '../css/Dashboard.css';
import Logo from '../icons/logo.PNG';
import Logoutbtn from '../icons/logout.PNG';
import Like from '../icons/like.png';

const Dashboard = () => {

    
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [message, setMessage] = useState(''); 
    

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await API.get('/recipes/categories');
                setCategories(response.data.slice(0, 5)); 
                setSelectedCategory(response.data[0]?.strCategory); 
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

  
    useEffect(() => {
        const fetchRecipes = async () => {
            if (selectedCategory) {
                try {
                    const response = await API.get(`/recipes/category/${selectedCategory}`);
                    setRecipes(response.data);
                } catch (error) {
                    console.error('Error fetching recipes:', error);
                }
            }
        };
        fetchRecipes();
    }, [selectedCategory]);


    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    const handleAddToFavorites = async (recipeId) => {
        try {
            const response = await API.post('/recipes/favorites', { recipeId });
            alert('Added to favorite recipes!');
            
        } catch (error) {
            console.error('Error adding to favorites:', error);
            
            
            if (error.response && error.response.status === 500) {
                alert("It looks like you're not logged in☹️ Please sign in to continue😊"); 
            } else {
                setMessage('An error occurred. Please try again later.');
            }
            
           
        }
    };
    
    const handleLogout = async () => {
        try {
            await API.post('/auth/logout'); 
            localStorage.removeItem('token'); 
            alert('Successfully logged out!');
            window.location.href = '/'; 
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Failed to log out. Please try again.');
        }
    };
    
   
    

    return (
       <div className='body'>
          
            <nav className="navbar">
                <img src={Logo} alt='logo' />
                <div className='nav-links'>
                   <a href="/">HOME</a>
                    <a href="/favorites">FAVORITES</a>
               </div>
              
                <img src={Logoutbtn} alt='logout' onClick={handleLogout} className="logout-icon" />
                
            </nav>

            <div className="dashboard">
            <div className="categories">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <button
                            key={category.idCategory}
                            className={`category-button ${category.strCategory === selectedCategory ? 'selected' : ''}`}
                            onClick={() => handleCategoryClick(category.strCategory)}
                        >
                            {category.strCategory}
                        </button>
                    ))
                ) : (
                    <p>Loading categories...</p>
                )}
            </div>

          

            <div className="recipes-grid">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div className="recipe-card" key={recipe.idMeal}>
                            <div className="recipe-image-placeholder">
                                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
                            </div>
                            <div className="recipe-details">
                                <p className="recipe-name">{recipe.strMeal}</p>
                                <button  aria-label="heart" style={{background:"none", border:"none"}}
                                onClick={() => handleAddToFavorites(recipe.idMeal)}>
                                    <img src={Like} alt='like' className="remove-icon" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recipes available.</p>
                )}
            </div>

          
            {message && <p className="success-message">{message}</p>}
        
        </div>
        </div>
    );
};

export default Dashboard;
