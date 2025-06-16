const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require("fs");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const cron = require("node-cron");
const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors()); // Allow all origins (development)
const hostname = "https://chatmyastrologer.com";

const LanguageOption = {
  ENGLISH: 'en',
  GUJRATI: 'gu',
  HINDI: 'hi',
};

const homepageStaticLink = [
  { url: `${hostname}` },
  { url: `${hostname}/${LanguageOption?.GUJRATI}` },
  { url: `${hostname}/${LanguageOption?.HINDI}` }
]

const staticLinks = [
  // { url: "", },
  { url: "chat-with-astrologer", },
  { url: "free-kundli", },
  { url: "kundali-matching", },
  { url: "todays-panchang" },
  { url: "general-prediction" },
  { url: "kundali-prediction" },
  { url: "horoscope/daily-horoscope" },
  { url: "horoscope/yesterday-horoscope" },
  { url: "horoscope/tomorrow-horoscope" },
  { url: "horoscope/weekly-horoscope" },
  { url: "horoscope/yearly-horoscope" },
  { url: "blog" },
  { url: "marriage-muhurat" },
  { url: "bhoomi-pooja-muhurat" },
  { url: "namkaran-muhurat" },
  { url: "rahu-kaal" },
  { url: "choghadiya" },
  { url: "profile-setting" },
  { url: "transaction-wallet" },
  { url: "order-history-call" },
  { url: "our-astrologer" },
  { url: "contact-us" },
  { url: "privacy-policy" },
  { url: "terms-conditions" },
  { url: "about-us" },
];



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

function transformBlogName(blog) {
  return blog?.split(/\s+/).slice(0, 2).join('-').toLowerCase();
}

const fetchDynamicRoutes = async () => {
  try {

    const blogResponse = await axios.post(
      'https://devapi.chatmyastrologer.com/api/v1/app/home/blog_listing',
      {
        search: ''
      },
      {
        headers: {
          'api-key': 'astrotalk@tracewave',
          'Accept-Language': 'en',
          'Content-Type': 'application/json'
        }
      }
    );

    const transformedBlogData = blogResponse?.data?.data?.blogList?.flatMap(blog => {
      const baseUrl = `blog-details/${transformBlogName(blog?.title)}/${blog?.unique_id?.toLowerCase()}`;
      return [
        { url: baseUrl },
        // { url: `${baseUrl}/ipo-details` },
      ];
    }) || [];

    const astrologerDetailsResponce = await axios.post('https://devapi.chatmyastrologer.com/api/v1/app/astrologers/astrologers_filter',
      {
        search: ''
      },
      {
        headers: {
          'api-key': 'astrotalk@tracewave',
          'Accept-Language': 'en',
          'Content-Type': 'application/json'
        }
      }
    );

    const transformedAstrologerData = astrologerDetailsResponce?.data?.data?.astrologerList?.flatMap(astro => {
      const baseUrl = `astrologer-detail-page/${astro?.uniqueID?.toLowerCase()}`;
      return [
        { url: baseUrl },
      ];
    }) || [];

    const horoscopeDynamicData = horoscopeList?.flatMap(data => [
      {
        url: `horoscope-details/daily-horoscope/${data?.name}`,
      },
      {
        url: `horoscope-details/yesterday-horoscope/${data?.name}`,
      },
      {
        url: `horoscope-details/tomorrow-horoscope/${data?.name}`,
      },
      {
        url: `horoscope-details/weekly-horoscope/${data?.name}`,
      },
      {
        url: `horoscope-details/yearly-horoscope/${data?.name}`,
      }
    ]) || [];

    // console.log('horoscopeDynamicData', horoscopeDynamicData);

    return [...horoscopeDynamicData, ...transformedBlogData, ...transformedAstrologerData];

  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return [];
  }
};

// Function to generate the sitemap
const generateSitemap = async () => {

  const dynamicLinks = await fetchDynamicRoutes();


  const allLinks = [...staticLinks, ...dynamicLinks];

  const languageUpdation = allLinks?.flatMap(data => [
    {
      url: `${hostname}/${data.url}`,
    },
    {
      url: `${hostname}/${LanguageOption.GUJRATI}/${data.url}`,
    },
    {
      url: `${hostname}/${LanguageOption.HINDI}/${data.url}`,
    }
  ]) || [];

  const allUpdatedLinks = [...homepageStaticLink, ...languageUpdation];

  // console.log('dynamicLinks', allUpdatedLinks);

  const sitemap = new SitemapStream({ hostname });
  allUpdatedLinks?.forEach((link) => sitemap.write(link));
  sitemap.end();

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
};

const PORT = 1819;  // Use environment variable, fallback to 3838
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
  console.log('Sitemap Genratet successfully');
});

// Call the function
// node generateSitemap.cjs -f