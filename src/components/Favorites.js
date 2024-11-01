import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import '../css/Dashboard.css';
import DelIcon from '../icons/delete.png';
import Logoutbtn from '../icons/logout.PNG';
import Logo from '../icons/logo.PNG';
import Heart from '../icons/heart.png';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);


    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await API.get('/recipes/favorites');
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorite recipes:', error);
            }
        };
        fetchFavorites();
    }, []);

    const handleRemoveFavorite = async (recipeId) => {
        try {
            await API.delete(`/recipes/favorites/${recipeId}`);
           
            setFavorites(favorites.filter((favorite) => favorite.recipeId !== recipeId));
            alert('Recipe removed from favorites');

        } catch (error) {
            console.error('Error removing favorite recipe:', error);
            alert('Failed to remove favorite recipe');
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
        <div>
          
            <nav className="navbar">
            <img src={Logo} alt='logo' />
                <div className="nav-links">
                    <a href="/">HOME</a>
                    <a href="/favorites">FAVORITES</a>
                    <a href="/dashboard">DASHBOARD</a>
                </div>
                <img src={Logoutbtn} alt='logout' onClick={handleLogout} className="logout-icon"/>
            </nav>
            <div className="dashboard">
            <div className="recipes-grid">
                {favorites.length > 0 ? (
                    favorites.map((favorite) => (
                        <div className="recipe-card" key={favorite.recipeId}>
                            <div className="recipe-image-placeholder">
                                <img 
                                    src={favorite.picture} 
                                    alt={favorite.strMeal} 
                                    className="recipe-image" 
                                />
                            </div>
                            <div className="recipe-details">
                            
                                <Link to={`/recipe/${favorite.recipeId}`} className="recipe-name-link" style={{textDecoration:"none"}}>
                                <p className="recipe-names">{favorite.title || favorite.strMeal}</p>
                                </Link>

                                <img src={Heart} alt='like' className="icon" />

                                <button 
                                    className="remove-favorite-button" 
                                    onClick={() => handleRemoveFavorite(favorite.recipeId)} 
                                    style={{ background: 'none', border: 'none' }}
                                >
                                    <img src={DelIcon} alt="Remove" className="remove-icon" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No favorite recipes found.</p>
                )}
            </div>
        </div>
        </div>
    );
};

export default Favorites;
