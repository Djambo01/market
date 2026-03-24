// Главный файл приложения интернет-магазина (v2)
const products = require('./products.js');
const {
  UserHistory,
  getSmartRecommendations,
  getSimilarCategoryProducts,
  getUnviewedProducts
} = require('./recommendations.js');

console.log('=== ИНТЕРНЕТ-МАГАЗИН v2 (Улучшенная система рекомендаций) ===\n');

// Создаём экземпляр истории пользователя
const userHistory = new UserHistory();

// Симулируем просмотры товаров пользователем
console.log('👤 Пользователь просмотрел товары:');
[1, 2, 5].forEach(id => {
  userHistory.viewProduct(id);
  const product = products.find(p => p.id === id);
  console.log(`  ✓ ${product.name}`);
});

console.log('\n📊 Статистика пользователя:');
console.log(`  Просмотрено товаров: ${userHistory.getViewedProducts().length}`);
console.log(`  Предпочитаемые категории: ${userHistory.getPreferredCategories().join(', ')}`);

console.log('\n💡 Умные рекомендации (на основе истории):');
const smartRecs = getSmartRecommendations(userHistory, 3);
if (smartRecs.length > 0) {
  smartRecs.forEach(product => {
    console.log(`  ✓ ${product.name} (${product.category}) - рейтинг: ${product.rating}`);
  });
} else {
  console.log('  Рекомендации отсутствуют (все товары просмотрены)');
}

console.log('\n🔍 Товары из предпочитаемых категорий:');
const similarProducts = getSimilarCategoryProducts(userHistory, 3);
similarProducts.forEach(product => {
  console.log(`  ✓ ${product.name} - ${product.price} руб.`);
});

console.log('\n🆕 Непросмотренные популярные товары:');
const unviewed = getUnviewedProducts(userHistory, 3);
unviewed.forEach(product => {
  console.log(`  ✓ ${product.name} (популярность: ${product.popularity})`);
});

console.log('\n✅ Демонстрация завершена!');
