/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://robertbornemann.de', // your live domain
    generateRobotsTxt: true,
    // Optional but nice:
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 7000,
    exclude: ['/404'],
  };
  