const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require("fs");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const cron = require("node-cron");
const express = require("express");
const app = express();

const hostname = "https://devweb.chatmyastrologer.com";

const staticLinks = [
  { url: "/", },
  { url: "/chatWithAstrologer", },
  { url: "/freeKundli", },
  { url: "/kundaliMatching", },
  { url: "/todaysPanchang" },
  { url: "/general_prediction" },
  { url: "/kundali_prediction" },
  { url: "/horoscope/daily-horoscope" },
  { url: "/horoscope/yesterday-horoscope" },
  { url: "/horoscope/tomorrow-horoscope" },
  { url: "/horoscope/weekly-horoscope" },
  { url: "/horoscope/yearly-horoscope" },
  { url: "/blog" },
  { url: "/marrigeMuhurat" },
  { url: "/bhumipujaMuhurat" },
  { url: "/namkaranMuhurat" },
  { url: "/rahuKaal" },
  { url: "/profileSetting" },
  { url: "/transactionWallet" },
  { url: "/orderHistorycall" },
  { url: "/ourAstrologer" },
  { url: "/contactUs" },
  { url: "/privacyPolicy" },
  { url: "/termsConditions" },
  { url: "/aboutus" },
];

const LanguageOption = {
  ENGLISH: 'en',
  GUJRATI: 'gu',
  HINDI: 'hi',
};

const horoscopeList = [
  {
    id: 1,
    name: "Aries",
  },
  {
    id: 2,
    name: "Taurus",
  },
  {
    name: "Gemini",
    id: 3,
  },
  {
    name: "Cancer",
    id: 4
  },
  {
    name: "Leo",
    id: 5,
  },
  {
    name: "Virgo",
    id: 6,
  },
  {
    name: "Libra",
    id: 7,
  },
  {
    name: "Scorpio",
    id: 8,
  },
  {
    name: "Sagittarius",
    id: 9,
  },
  {
    name: "Capricorn",
    id: 10,
  },
  {
    name: "Aquarius",
    id: 11,
  },
  {
    name: "Pisces",
    id: 12,
  },
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

    const blogResponse = await axios.post(
      `https://devapi.chatmyastrologer.com/api/v1/app/home/blog_listing`,
      {
        headers: {
          'api-key': 'astrotalk@tracewave', // or whatever key name the API expects
          // You can add other headers if needed
        }
      }
    );

    console.log('blogResponce', blogResponse.data);

    const horoscopeDynamicData = horoscopeList?.flatMap(data => [
      {
        url: `/daily-horoscope/${data?.name}`,
      },
      {
        url: `/yesterday-horoscope/${data?.name}`,
      },
      {
        url: `/tomorrow-horoscope/${data?.name}`,
      },
      {
        url: `/weekly-horoscope/${data?.name}`,
      },
      {
        url: `/yearly-horoscope/${data?.name}`,
      }
    ]) || [];

    // const count = response.data?.data?.results?.all_ipo_count || 0;
    // const transformedPageData = Array.from({ length: count }, (_, i) => ({
    //   url: `https://ipo-trend.com/listed/All%20ipo/${i + 1}`,
    // }));

    // const transformedDataNews = response.data?.data?.results?.news_data?.flatMap(news => {
    //   const formattedTitle = formatNewsTitle(news?.title);
    //   return [
    //     { url: `${hostname}/${formattedTitle}/${news.id}` },
    //     { url: `${hostname}/${formattedTitle}/${news.id}` }
    //   ];
    // }) || [];

    return [...horoscopeDynamicData];

  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return [];
  }
};

// Function to generate the sitemap
const generateSitemap = async () => {
  const dynamicLinks = await fetchDynamicRoutes();

  const allLinks = [...staticLinks, ...dynamicLinks];

  // console.log("All Links:", allLinks);

  const languageUpdation = allLinks?.flatMap(data => [
    {
      url: `${hostname}/${LanguageOption.ENGLISH}${data.url}`,
    },
    {
      url: `${hostname}/${LanguageOption.GUJRATI}${data.url}`,
    },
    {
      url: `${hostname}/${LanguageOption.HINDI}${data.url}`,
    }
  ]) || [];

  const sitemap = new SitemapStream({ hostname });
  languageUpdation?.forEach((link) => sitemap.write(link));
  sitemap.end();


  // console.log('languageUpdation', languageUpdation);

  // Convert stream to XML
  const sitemapXML = await streamToPromise(sitemap);

  // // Write the XML to a file
  // fs.writeFileSync(path.join(__dirname, "dist", "sitemap.xml"), sitemapXML);

  const distDir = path.join(__dirname, '..', "dist");

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true }); // recursive ensures nested folders get created
  }

  const sitemapPath = path.join(distDir, "sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemapXML);
  console.log("Sitemap generated successfully!");
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
  console.log(`🚀 Server is running`);
  console.log(`Sitemap will be generated at: ${hostname}:${PORT}/generate-sitemap`);
});

// Call the function
// node generateSitemap.cjs -f