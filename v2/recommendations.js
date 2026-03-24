// Улучшенная система рекомендаций с учётом истории пользователя (v2)
const products = require('./products.js');

/**
 * История просмотра пользователя
 * Хранит ID просмотренных товаров
 */
class UserHistory {
  constructor() {
    this.viewedProducts = [];
    this.viewedCategories = {};
  }

  /**
   * Добавить товар в историю просмотров
   * @param {number} productId - ID товара
   */
  viewProduct(productId) {
    if (!this.viewedProducts.includes(productId)) {
      this.viewedProducts.push(productId);
      
      // Обновляем статистику по категориям
      const product = products.find(p => p.id === productId);
      if (product) {
        this.viewedCategories[product.category] = 
          (this.viewedCategories[product.category] || 0) + 1;
      }
    }
  }

  /**
   * Получить просмотренные товары
   * @returns {Array} ID просмотренных товаров
   */
  getViewedProducts() {
    return this.viewedProducts;
  }

  /**
   * Получить наиболее просматриваемые категории
   * @returns {Array} Отсортированные категории по популярности
   */
  getPreferredCategories() {
    return Object.entries(this.viewedCategories)
      .sort((a, b) => b[1] - a[1])
      .map(([category]) => category);
  }
}

/**
 * Получить рекомендации на основе истории пользователя
 * @param {UserHistory} history - История просмотров пользователя
 * @param {number} count - Количество рекомендаций
 * @returns {Array} Рекомендуемые товары
 */
function getSmartRecommendations(history, count = 3) {
  const preferredCategories = history.getPreferredCategories();
  const viewedIds = history.getViewedProducts();

  // Сначала ищем товары из предпочитаемых категорий
  const recommendedProducts = products.filter(p => {
    // Исключаем уже просмотренные товары
    if (viewedIds.includes(p.id)) {
      return false;
    }
    // Приоритет товарам из предпочитаемых категорий
    return preferredCategories.includes(p.category);
  });

  // Сортируем по рейтингу и популярности
  recommendedProducts.sort((a, b) => {
    const scoreA = (a.rating * 0.6) + (a.popularity / 100 * 0.4);
    const scoreB = (b.rating * 0.6) + (b.popularity / 100 * 0.4);
    return scoreB - scoreA;
  });

  return recommendedProducts.slice(0, count);
}

/**
 * Получить товары из категорий пользователя (исключая просмотренные)
 * @param {UserHistory} history - История пользователя
 * @param {number} count - Количество товаров
 * @returns {Array} Товары из предпочитаемых категорий
 */
function getSimilarCategoryProducts(history, count = 3) {
  const preferredCategories = history.getPreferredCategories();
  const viewedIds = history.getViewedProducts();

  return products.filter(p => {
    return preferredCategories.includes(p.category) && 
           !viewedIds.includes(p.id);
  }).slice(0, count);
}

/**
 * Получить товары, которые ещё не просмотрены
 * @param {UserHistory} history - История пользователя
 * @param {number} count - Количество товаров
 * @returns {Array} Непросмотренные товары
 */
function getUnviewedProducts(history, count = 3) {
  const viewedIds = history.getViewedProducts();
  return products
    .filter(p => !viewedIds.includes(p.id))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, count);
}

module.exports = {
  UserHistory,
  getSmartRecommendations,
  getSimilarCategoryProducts,
  getUnviewedProducts
};
