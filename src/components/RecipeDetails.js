import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import '../css/RecipeDetails.css';

const RecipeDetails = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await API.get(`/recipes/recipe/${recipeId}`);
                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };
        fetchRecipeDetails();
    }, [recipeId]);

    if (!recipe) return <p>Loading recipe details...</p>;

    return (
        <div className="recipe-details-page">
            <h1 className="recipe-title">{recipe.strMeal}</h1>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image-large" />
            <div className="recipe-info">
                <p><strong>Category:</strong> {recipe.strCategory}</p>
                <p><strong>Area:</strong> {recipe.strArea}</p>
                <p><strong>Tags:</strong> {recipe.strTags}</p>
                <p><strong>Instructions:</strong> {recipe.strInstructions}</p>
            </div>

            <div className="ingredients">
                <h2>Ingredients</h2>
                <ul>
                    {[...Array(20).keys()].map(i => {
                        const ingredient = recipe[`strIngredient${i + 1}`];
                        const measure = recipe[`strMeasure${i + 1}`];
                        return ingredient ? (
                            <li key={i}>{measure} {ingredient}</li>
                        ) : null;
                    })}
                </ul>
            </div>

            <div className="recipe-links">
                {recipe.strYoutube && (
                    <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="recipe-link">
                        Watch on YouTube
                    </a>
                )}
                {recipe.strSource && (
                    <a href={recipe.strSource} target="_blank" rel="noopener noreferrer" className="recipe-link">
                        Original Source
                    </a>
                )}
            </div>
        </div>
    );
};

export default RecipeDetails;
