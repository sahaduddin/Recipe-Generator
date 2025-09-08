
import React, { useState, useCallback } from 'react';
import { generateRecipe } from './services/geminiService';
import type { Recipe } from './types';
import RecipeDisplay from './components/RecipeDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ChefHatIcon from './components/icons/ChefHatIcon';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('mirch, oil, and water bottal');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = useCallback(async () => {
    if (!ingredients.trim()) {
      setError('Please enter some ingredients.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const generatedRecipe = await generateRecipe(ingredients);
      setRecipe(generatedRecipe);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [ingredients]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-3">
            <ChefHatIcon className="w-10 h-10 text-emerald-500" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white">
              AI Recipe Generator
            </h1>
          </div>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Turn your pantry items into a delicious meal!
          </p>
        </header>

        <main className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl w-full">
          <div className="flex flex-col gap-4">
            <label htmlFor="ingredients" className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              What ingredients do you have?
            </label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g., chicken breast, rice, broccoli, soy sauce"
              className="w-full h-28 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow duration-200"
              disabled={isLoading}
            />
            <button
              onClick={handleGenerateRecipe}
              disabled={isLoading}
              className="w-full sm:w-auto self-center sm:self-end px-8 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Generating...' : 'Generate Recipe'}
            </button>
          </div>
        </main>

        <div className="mt-8 w-full">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {recipe && <RecipeDisplay recipe={recipe} />}
        </div>
        
        <footer className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
            <p>Powered by Google Gemini. Recipes are AI-generated and should be prepared with care.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
