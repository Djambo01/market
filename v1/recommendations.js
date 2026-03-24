// Система рекомендаций товаров (v1 - базовая версия)
const products = require('./products.js');

/**
 * Получить популярные товары
 * @param {number} count - Количество товаров
 * @returns {Array} Массив популярных товаров
 */
function getPopularProducts(count = 3) {
  return products
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, count);
}

/**
 * Получить товары с высокий рейтингом
 * @param {number} count - Количество товаров
 * @returns {Array} Массив товаров
 */
function getTopRatedProducts(count = 3) {
  return products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
}

/**
 * Получить случайные рекомендации
 * @param {number} count - Количество товаров
 * @returns {Array} Массив случайных товаров
 */
function getRandomRecommendations(count = 3) {
  const shuffled = [...products].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Получить товары по категории
 * @param {string} category - Категория товаров
 * @returns {Array} Товары из категории
 */
function getProductsByCategory(category) {
  return products.filter(p => p.category === category);
}

module.exports = {
  getPopularProducts,
  getTopRatedProducts,
  getRandomRecommendations,
  getProductsByCategory
};
