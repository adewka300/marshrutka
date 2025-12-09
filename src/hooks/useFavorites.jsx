import { useState, useEffect } from 'react';

// Хук для работы с избранным
export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    // Инициализируем состояние из localStorage
    try {
      const saved = localStorage.getItem('favoriteRoutes');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      return [];
    }
  });

  // Сохраняем в localStorage при изменении избранного
  useEffect(() => {
    try {
      localStorage.setItem('favoriteRoutes', JSON.stringify(favorites));
      console.log('Saved to localStorage:', favorites);
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  // Добавить маршрут в избранное
  const addToFavorites = (routeId) => {
    console.log('Adding to favorites:', routeId, 'Current:', favorites);
    if (!favorites.includes(routeId)) {
      const newFavorites = [...favorites, routeId];
      console.log('New favorites:', newFavorites);
      setFavorites(newFavorites);
    }
  };

  // Удалить маршрут из избранного
  const removeFromFavorites = (routeId) => {
    console.log('Removing from favorites:', routeId, 'Current:', favorites);
    const newFavorites = favorites.filter(id => id !== routeId);
    setFavorites(newFavorites);
  };

  // Проверить, находится ли маршрут в избранном
  const isFavorite = (routeId) => {
    const result = favorites.includes(routeId);
    console.log('isFavorite check:', routeId, 'result:', result, 'favorites:', favorites);
    return result;
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
}