// Главный файл приложения интернет-магазина (v1)
const products = require('./products.js');
const {
  getPopularProducts,
  getTopRatedProducts,
  getRandomRecommendations
} = require('./recommendations.js');

console.log('=== ИНТЕРНЕТ-МАГАЗИН v1 ===\n');

// Вывод всех товаров
console.log('📦 Все товары:');
products.forEach(product => {
  console.log(`  [${product.id}] ${product.name} - ${product.price} руб. (рейтинг: ${product.rating})`);
});

console.log('\n⭐ Популярные товары:');
getPopularProducts(3).forEach(product => {
  console.log(`  ✓ ${product.name} (популярность: ${product.popularity})`);
});

console.log('\n🏆 Товары с высоким рейтингом:');
getTopRatedProducts(3).forEach(product => {
  console.log(`  ✓ ${product.name} (рейтинг: ${product.rating})`);
});

console.log('\n🎲 Случайные рекомендации:');
getRandomRecommendations(3).forEach(product => {
  console.log(`  ✓ ${product.name}`);
});
