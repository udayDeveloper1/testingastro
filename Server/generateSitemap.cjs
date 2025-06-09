const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require("fs");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const cron = require("node-cron");
const express = require("express");
const app = express();

const hostname = "https://ipo-trend.com/";

const staticLinks = [
  { url: "/", },
  { url: "/?ipo=upcoming", },
  { url: "/?ipo=live", },
  { url: "/?ipo=listed", },

  { url: "/live/mainboard/" },
  { url: "/live/sme/" },

  { url: "/upcoming/mainboard" },
  { url: "/upcoming/sme" },

  { url: "/listed/mainboard/1" },
  { url: "/listed/mainboard/2" },
  { url: "/listed/mainboard/3" },
  { url: "/listed/mainboard/4" },
  { url: "/listed/mainboard/5" },
  { url: "/listed/mainboard/6" },
  { url: "/listed/mainboard/7" },
  { url: "/listed/mainboard/8" },

  { url: "/ipo-news/1" },
  { url: "/ipo-news/2" },
  { url: "/ipo-news/3" },

  { url: "/about-us" },
  { url: "/contactUs" },
  { url: "/login" },
  { url: "/privacyPolicy" },
  { url: "/termsAndConditions" },
  { url: "/faqs" },
];

const brokerData = [
  {
    id: 1,
    name: 'Zerodha',
    //   image: brokerzerodha,
    rating: '4.5',
    services: [
      { name: 'Equity', available: true },
      { name: 'Commodity', available: true },
      { name: 'Currency', available: true },
      { name: 'Futures', available: true },
      { name: 'Options', available: true }
    ],
    details: {
      account_opening: '₹300',
      account_maintenance: '₹300/year',
      equity_delivery: 'Zero',
      equity_intraday: '0.03%'
    },
    features: ['Mobile Trading', 'Web Platform', 'Research'],
    link: 'https://zerodha.com/',
    navigation: "/broker/zerodha",
  },
  {
    id: 2,
    name: 'Angel One',
    //   image: brokerAngel,
    rating: '4.3',
    services: [
      { name: 'Equity', available: true },
      { name: 'Commodity', available: true },
      { name: 'Currency', available: true },
      { name: 'Futures', available: true },
      { name: 'Options', available: false }
    ],
    details: {
      account_opening: '₹0',
      account_maintenance: '₹450/year',
      equity_delivery: '₹20/order',
      equity_intraday: '0.05%'
    },
    features: ['Mobile Trading', 'Web Platform', 'API Trading'],
    link: 'https://www.angelone.in/',
    navigation: "/broker/angelOne",
  },
  {
    id: 3,
    name: 'Upstox',
    //   image: brokerUpstox,
    rating: '4.2',
    services: [
      { name: 'Equity', available: true },
      { name: 'Commodity', available: false },
      { name: 'Currency', available: true },
      { name: 'Futures', available: true },
      { name: 'Options', available: true }
    ],
    details: {
      account_opening: '₹0',
      account_maintenance: '₹250/year',
      equity_delivery: 'Zero',
      equity_intraday: '0.05%'
    },
    features: ['Mobile Trading', 'Web Platform', 'Research'],
    link: 'https://upstox.com/',
    navigation: "/broker/upstox",
  },
  {
    id: 4,
    name: '5paisa',
    //   image: brokerpaisa5,
    rating: '4.0',
    services: [
      { name: 'Equity', available: true },
      { name: 'Commodity', available: true },
      { name: 'Currency', available: true },
      { name: 'Futures', available: true },
      { name: 'Options', available: true }
    ],
    details: {
      account_opening: '₹250',
      account_maintenance: '₹400/year',
      equity_delivery: '₹10/order',
      equity_intraday: '0.05%'
    },
    features: ['Mobile Trading', 'Web Platform', 'Low Brokerage'],
    link: 'https://www.5paisa.com/demat-account?query=top_nav_oda_d',
    navigation: "/broker/5paisa",
  },
  {
    id: 5,
    name: 'Groww',
    //   image: brokergroww,
    rating: '4.4',
    services: [
      { name: 'Equity', available: true },
      { name: 'Commodity', available: false },
      { name: 'Currency', available: false },
      { name: 'Futures', available: true },
      { name: 'Options', available: true }
    ],
    details: {
      account_opening: '₹0',
      account_maintenance: '₹200/year',
      equity_delivery: 'Zero',
      equity_intraday: '0.05%'
    },
    features: ['Mobile Trading', 'Mutual Funds', 'IPO'],
    link: "https://groww.in/",
    navigation: "/broker/groww",
  },
  {
    id: 6,
    name: 'ICICI Direct',
    //   image: brokericici,
    rating: '4.1',
    services: [
      { name: 'Equity', available: true },
      { name: 'Commodity', available: true },
      { name: 'Currency', available: true },
      { name: 'Futures', available: true },
      { name: 'Options', available: true }
    ],
    details: {
      account_opening: '₹500',
      account_maintenance: '₹500/year',
      equity_delivery: '0.25%',
      equity_intraday: '0.08%'
    },
    features: ['3-in-1 Account', 'Research', 'Insurance'],
    link: "https://www.icicidirect.com/",
    navigation: "/broker/iciciDirect",
  }
]

const transformCompanyName = (companyName) => {
  return companyName
    ?.split(/\s+/) // Split by spaces
    .slice(0, 2) // Get the first two words
    .join('-') // Join with hyphen
    .toLowerCase() + '-ipo';
}

const transformNewsName = (title) => {
  const words = title.toLowerCase().split(" ");
  return words.slice(0, 2).join("_");
}

const formatNewsTitle = (title) => {
  const words = title.toLowerCase().split(" ");
  return words.slice(0, 3).join("_") + '_news';
}

const fetchDynamicRoutes = async () => {
  try {
    const response = await axios.get(`https://api.ipo-trend.com/ipo/sitemap/`);

    const transformedDataIPO = response?.data?.data?.results?.ipo_data?.flatMap(company => {
      const baseUrl = `https://ipo-trend.com/ipo/${transformCompanyName(company.company_name)}/${company.symbol.toLowerCase()}`;
      return [
        { url: baseUrl },
        { url: `${baseUrl}/ipo-details` },
        { url: `${baseUrl}/ipo-subscription` },
        { url: `${baseUrl}/ipo-news` },
        { url: `${baseUrl}/ipo-gmp` },
        { url: `${baseUrl}/ipo-allotnment` },
      ];
    }) || [];

    const transformedDataNews = response.data?.data?.results?.news_data?.flatMap(news => {
      const formattedTitle = formatNewsTitle(news?.title);
      return [
        { url: `https://ipo-trend.com/ipo-news/${formattedTitle}/${news.id}` },
        { url: `https://ipo-trend.com/marketNews/${formattedTitle}/${news.id}` }
      ];
    }) || [];


    const transformedDataBrokers = brokerData?.map(broker => ({
      url: `https://ipo-trend.com/${broker?.navigation}`,
    })) || [];

    const count = response.data?.data?.results?.all_ipo_count || 0;

    const transformedPageData = Array.from({ length: count }, (_, i) => ({
      url: `https://ipo-trend.com/listed/All%20ipo/${i + 1}`,
    }));

    return [...transformedDataIPO, ...transformedDataNews, ...transformedDataBrokers, ...transformedPageData];

  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return [];
  }
};

// Function to generate the sitemap
const generateSitemap = async () => {
  const dynamicLinks = await fetchDynamicRoutes();

  const allLinks = [...staticLinks, ...dynamicLinks];

  const sitemap = new SitemapStream({ hostname });

  // Write each link to the sitemap stream
  allLinks.forEach((link) => sitemap.write(link));
  sitemap.end();

  // Convert stream to XML
  const sitemapXML = await streamToPromise(sitemap);

  // // Write the XML to a file
  // fs.writeFileSync(path.join(__dirname, "dist", "sitemap.xml"), sitemapXML);

  const distDir = path.join(__dirname, '..', "build");

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true }); // recursive ensures nested folders get created
  }

  const sitemapPath = path.join(distDir, "sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemapXML);
};

const PORT = 3838;  // Use environment variable, fallback to 3838
const DOMAIN = "http://localhost"; // Default to localhost

cron.schedule("0 0 * * *", () => {
  generateSitemap();
});

app.get(`/generate-sitemap`, async (req, res) => {
  try {
    await generateSitemap();
    res.status(200).json({ message: "Sitemap updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update sitemap." });
  }
});

app.listen(PORT, () => {
  generateSitemap();
});

// Call the function
// node generateSitemap.cjs -f