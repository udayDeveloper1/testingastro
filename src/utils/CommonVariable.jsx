//  date formate 

export const DateFormat = {
    DATE_FORMAT: "YYYY-MM-DD", // 2024-06-12
    ABBREVIATED_DATE_FORMAT: "D MMM", // 12 Jun
    ABBREVIATED_FULL_DATE_FORMAT: "DD MMM, YYYY", // 12 Jun, 2024
    DATE_SLASH_FORMAT_SPACE: "DD/MM/YYYY", // 12/06/2024
    DATE_SLASH_FORMAT: "DD/MM/YYYY", // 12/06/2024
    DATE_DASH_FORMAT: "YYYY-MM-DD",  // with dashes

    DATE_TIME_FORMAT: "DD MMM YYYY, hh:mm A", // 12 Jun 2024, 03:45 PM
    DATE_TIME_MONTH_WISE_FORMAT: "MMM DD YYYY, hh:mm A", // Jun 12 2024, 03:45 PM
    DATE_DASH_TIME_FORMAT: "D-M-YYYY h:mm A", // 12-6-2024 3:45 PM
    DATE_YEAR_WISE_DASH_TIME_FORMAT: "YYYY-MM-DD h:mm A", // 2024-06-12 3:45 PM
    DATE_LOCAL_DASH_TIME_FORMAT: "YYYY-MM-DDTHH:mm", // 2024-06-12T15:45
    DATE_DOT_TIME_FORMAT: "DD.MM.YYYY H:mm", // 12.06.2024 15:45
    DATE_WEEK_MONTH_NAME_FORMAT: "ddd, MMMM DD", // Wed, June 12
    DATE_WITH_DAY_FORMAT: 'D MMMM YYYY (dddd)'
};

// Time Formats
export const TimeFormat = {
    TIME_12_HOUR_FORMAT: "hh:mm A", // 06:43 PM
    TIME_24_HOUR_FORMAT: "HH:mm", // 18:43
    TIME_WITH_SECONDS_12_HOUR_FORMAT: "hh:mm:ss A", // 06:43:54 PM
    TIME_WITH_SECONDS_24_HOUR_FORMAT: "HH:mm:ss", // 18:43:54
    DATE_FORMAT_SHORT: "MM/DD/YYYY", // 07/02/2024
    DATE_FORMAT_LONG: "MMMM D, YYYY", // July 2, 2024
    DATE_TIME_12_HOUR_FORMAT: "MMMM D, YYYY h:mm A", // July 2, 2024 6:43 PM
    DATE_TIME_24_HOUR_FORMAT: "MMMM D, YYYY HH:mm", // July 2, 2024 18:43
    FULL_DATE_TIME_12_HOUR_FORMAT: "dddd, MMMM D, YYYY h:mm A", // Tuesday, July 2, 2024 6:43 PM
    FULL_DATE_TIME_24_HOUR_FORMAT: "dddd, MMMM D, YYYY HH:mm", // Tuesday, July 2, 2024 18:43
};

// all rgex
export const InputRegex = {
    CHAR_REGEX: /^[A-Za-z\s]*$/,
    NUMBER_REGEX: /^[0-9]{0,6}$/,
    FIRSTNAME_REGEX: /^[A-Za-z]*$/,
    LASTNAME_REGEX: /^[A-Za-z]*$/,
    EMAIL_REGEX: /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    ONCHANGEEMAIL_REGEX: /^[A-Z0-9a-z.@]+$/,
    MOBILE_REGEX: /^[0-9]{0,11}$/,
    PASSWORD_REGEX: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&<>*~:`-]).{8,}$/,
    ADDRESS_REGEX: /^[A-Za-z0-9, ]+$/,
};

export const AwsFolder = {
    PROFILE_IMAGE: 'Profile_image'
}

export const ModelName = {
    POST_MODEL: 'POSTMODEL',
    DELETE_MODEL: 'DELETEMODEL',
    FAQ_MODEL: 'FAQMODEL',
    LOGOUT_MODEL: 'DELETEMODEL',
};

export const browserOptions = [
    { value: 'firefox', label: 'Firefox' },
    { value: 'safari', label: 'Safari' },
    { value: 'opera', label: 'Opera' },
    { value: 'chrome', label: 'Chrome' },
    { value: 'IE', label: 'Internet Explorer' }
];

export const Codes = {
    SUCCESS: 1,
    INVALID_OR_FAIL: 0,
    NO_DATA_FOUND: 2,
    DELETE_ACCOUNT: 3,
    USER_SESSION_EXPIRE: -1,
    USER_REFRESH_SESSION_EXPIRE: -2,
    ASTROLOGER_DISCONNECTED: 11,
};

export const InputTypesEnum = {
    ID: 'id',
    FIRSTNAME: 'firstname',
    LASTNAME: 'lastname',
    DOB: 'date_birth',
    TOB: 'time_of_birth',
    PLACE_OF_BIRTH: 'place_of_birth',
    PINCODE: 'pincode',
    ADDRESS: 'address',
    CITY: 'city',
    PROFILE_IMAGE: 'profile_image',
    EMAIL: "email",


    NAME: 'name',
    GIRL_NAME: 'girl_name',

    GENDER: 'gender',
    // GENDER: 'gender',
    DAY: 'day',
    MONTH: 'month',
    YEAR: 'year',

    DAY_2: 'day_2',
    MONTH_2: 'month_2',
    YEAR_2: 'year_2',

    HOURS: 'hours',
    MINUTE: 'minute',
    SECOND: 'second',

    HOURS_2: 'hours_2',
    MINUTE_2: 'minute_2',
    SECOND_2: 'second_2',

    LOCATION: 'location',
    LOCATION_2: 'location_2',


};

export const LanguageOption = {
    ENGLISH: 'en',
    GUJRATI: 'gu',
    HINDI: 'hi',
};

/////////////////// Use for FAQs

export const pageOption = [
    {
        'label': "Home Screen",
        'value': `home_screen`,

    },
    {
        'label': "Free Kundli Screen",
        'value': `free_kundli`,
    },
    {
        'label': "Kundli Matching",
        'value': `kundli_matching`,
    },
    {
        'label': "Chat With Astrologer",
        'value': `chat_astrologer`,
    },
    {
        'label': "Talk With Astrologer",
        'value': `talk_astrologer`,
    },
    {
        'label': "Horoscope",
        'value': `horoscope`,
    },
    {
        'label': "Today Panchang",
        'value': `today_panchang`,
    },
];