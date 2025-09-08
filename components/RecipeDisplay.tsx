
import React from 'react';
import type { Recipe } from '../types';

interface RecipeDisplayProps {
  recipe: Recipe;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-fade-in w-full">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{recipe.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{recipe.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 border-b-2 border-emerald-500 pb-2">Ingredients</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 border-b-2 border-emerald-500 pb-2">Instructions</h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
