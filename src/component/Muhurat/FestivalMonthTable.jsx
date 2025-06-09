import React from "react";
import { Card } from "antd";
import CustomTable from "../Custom/CustomTable";

// Festival Data for 2024
const festivalData = {
    January: [
        { key: 1, date: "January 1", day: "Monday", festival: "New Year" },
        { key: 2, date: "January 14", day: "Sunday", festival: "Lohri" },
        { key: 3, date: "January 15", day: "Monday", festival: "Pongal, Uttarayan, Makar Sankranti" },
        { key: 4, date: "January 23", day: "Tuesday", festival: "Subhas Chandra Bose Jayanti" },
        { key: 5, date: "January 26", day: "Friday", festival: "Republic Day" },
    ],
    February: [
        { key: 6, date: "February 14", day: "Wednesday", festival: "Basant Panchmi, Saraswati Puja" },
    ],
    March: [
        { key: 7, date: "March 8", day: "Friday", festival: "Mahashivratri" },
        { key: 8, date: "March 24", day: "Sunday", festival: "Holika Dahan" },
        { key: 9, date: "March 25", day: "Monday", festival: "Holi" },
    ],
    April: [
        { key: 10, date: "April 9", day: "Tuesday", festival: "Chaitra Navratri, Ugadi, Gudi Padwa" },
        { key: 11, date: "April 10", day: "Wednesday", festival: "Cheti Chand" },
        { key: 12, date: "April 13", day: "Saturday", festival: "Baisakhi" },
        { key: 13, date: "April 14", day: "Sunday", festival: "Ambedkar Jayanti" },
        { key: 14, date: "April 17", day: "Wednesday", festival: "Chaitra Navratri Parana, Ram Navami" },
    ],
    May: [
        { key: 15, date: "May 1", day: "Wednesday", festival: "Labor Day" },
        { key: 16, date: "May 23", day: "Thursday", festival: "Buddha Purnima" },
    ],
    June: [
        { key: 17, date: "June 17", day: "Monday", festival: "Eid al-Adha (Bakrid)" },
    ],
    July: [
        { key: 18, date: "July 7", day: "Sunday", festival: "Rath Yatra" },
    ],
    August: [
        { key: 19, date: "August 15", day: "Thursday", festival: "Independence Day, Raksha Bandhan" },
        { key: 20, date: "August 19", day: "Monday", festival: "Muharram" },
        { key: 21, date: "August 26", day: "Monday", festival: "Janmashtami" },
    ],
    September: [
        { key: 22, date: "September 7", day: "Saturday", festival: "Ganesh Chaturthi" },
        { key: 23, date: "September 16", day: "Monday", festival: "Onam" },
    ],
    October: [
        { key: 24, date: "October 2", day: "Wednesday", festival: "Gandhi Jayanti" },
        { key: 25, date: "October 12", day: "Saturday", festival: "Navratri Begins" },
        { key: 26, date: "October 20", day: "Sunday", festival: "Durga Ashtami" },
        { key: 27, date: "October 21", day: "Monday", festival: "Dussehra" },
    ],
    November: [
        { key: 28, date: "November 1", day: "Friday", festival: "Diwali" },
        { key: 29, date: "November 2", day: "Saturday", festival: "Govardhan Puja" },
        { key: 30, date: "November 3", day: "Sunday", festival: "Bhai Dooj" },
        { key: 31, date: "November 15", day: "Friday", festival: "Guru Nanak Jayanti" },
    ],
    December: [
        { key: 32, date: "December 25", day: "Wednesday", festival: "Christmas" },
    ],
};

// Define table columns
const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Day", dataIndex: "day", key: "day" },
    { title: "Festival/Holiday", dataIndex: "festival", key: "festival" },
];

const FestivalTable = () => {
    return (
        <div>
            {Object.keys(festivalData).map((month) => (
                <Card key={month} title={`${month} Festival 2024`} style={{ marginBottom: "20px" }} className="festivalTableCard ">
                    <CustomTable columns={columns} data={festivalData[month]} pagination={false} className="px-6 pb-6 "/>
                </Card>
            ))}
        </div>
    );
};

export default FestivalTable;
