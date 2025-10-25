/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.NODE_ENV === 'production' ? 'https://your-production-domain.com' : 'http://localhost:3000', // Динамически меняем в зависимости от среды
	generateRobotsTxt: true, // Генерация robots.txt
	sitemapSize: 5000, // Размер sitemap
};