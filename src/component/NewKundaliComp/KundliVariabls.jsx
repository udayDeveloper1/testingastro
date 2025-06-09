export function convertDegree(degree) {
    if (degree == null || isNaN(degree)) return "";

    const degrees = Math.floor(degree);
    const minutesDecimal = (degree - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const secondsDecimal = (minutesDecimal - minutes) * 60;
    const seconds = Math.floor(secondsDecimal);

    return `${degrees}°${minutes}'${seconds}"`;
}

export function getShortNakshatra(nakshatraName) {
    if (!nakshatraName || typeof nakshatraName !== 'string') return "-";
    return nakshatraName.slice(0, 3);
}

export const KundliChartType = {
    D1: "D1", // Rashi (Lagna) Chart
    // D2: "D2", // Hora Chart
    // D3: "D3", // Drekkana
    // D3s: "D3-s", // Drekkana - Subo special,
    // D4: "D4", // Chaturthamsa,
    // D5: "D5", // Panchamsa
    // D7 = "D7", // Saptamsa
    // D8 = "D8" // Ashtamsa
    D9: "D9", // Navamsa
    //     D10 : "D10" // Dasamsa
    //     D10R : "D10-R" // Dasamsa – Retro? or Recalculated?
    //     D12 : "D12" // Dwadashamsa
    //     D16 : "D16" // Shodashamsa
    //     D20 : "D20" // Vimsamsa
    //     D24 : "D24" // Siddhamsa/Chaturvimshamsa
    //     D24R : "D24-R" // Revised or Retrofitted D24
    //     D27 : "D27" // Bhamsha
    //     D40 : "D40" // Khavedamsa
    //     D45 : "D45" // Akshavedamsa
    //     D60 : "D60" // Shastiamsa
    //     D30 : "D30" // Trimshamsa
    chalit: "chalit", // chalit
    sun: "sun", // sun
    moon: "moon", // moon
    //     kp_chalit : "kp_chalit" // kp_chalit
    transit: "transit", // transit // pass the current date 19/04/2025
    varshapal: "varshapal",// varshapal // pass the request current year  2025

}

// enum KundliChartType: String, CaseIterable {
//     case D1 = "D1" // Rashi (Lagna) Chart
// //    case D2 = "D2" // Hora Chart
// //    case D3 = "D3" // Drekkana
// //    case D3s = "D3-s" // Drekkana - Subo special
// //    case D4 = "D4" // Chaturthamsa
// //    case D5 = "D5" // Panchamsa
// //    case D7 = "D7" // Saptamsa
// //    case D8 = "D8" // Ashtamsa
//     case D9 = "D9" // Navamsa
// //    case D10 = "D10" // Dasamsa
// //    case D10R = "D10-R" // Dasamsa – Retro? or Recalculated?
// //    case D12 = "D12" // Dwadashamsa
// //    case D16 = "D16" // Shodashamsa
// //    case D20 = "D20" // Vimsamsa
// //    case D24 = "D24" // Siddhamsa/Chaturvimshamsa
// //    case D24R = "D24-R" // Revised or Retrofitted D24
// //    case D27 = "D27" // Bhamsha
// //    case D40 = "D40" // Khavedamsa
// //    case D45 = "D45" // Akshavedamsa
// //    case D60 = "D60" // Shastiamsa
// //    case D30 = "D30" // Trimshamsa
//     case chalit = "chalit" // chalit
//     case sun = "sun" // sun
//     case moon = "moon" // moon
// //    case kp_chalit = "kp_chalit" // kp_chalit
//     case transit = "transit" // transit
//     case varshapal = "varshapal" // varshapal
// }