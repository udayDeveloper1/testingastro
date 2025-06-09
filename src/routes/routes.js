import Homepage from "../pages/HomePage";
import Login from "../component/auth/Login";
import ChatWithAstrologer from "../pages/chat/ChatWithAstrologer";
import { rootRoutes } from "./componentRoutes";
import TalkWithAstrologer from "../pages/Talk/TalkWithAstrologer";
import FreeKundali from "../pages/kundali/FreeKundali";
import KundaliMatching from "../pages/kundali/KundaliMatching";
import KundaliMatchingReport from "../pages/kundali/KundaliMatchingReport";

export const publicRoutes = [
  {
    path: rootRoutes.login,
    element: Login,
  },
];

export const privateRoutes = [
  {
    path: rootRoutes.homepage,
    element: Homepage,
  },
  {
    path: rootRoutes.login,
    element: Homepage,
  },
  {
    path: rootRoutes.chatWithAstrologer,
    element: ChatWithAstrologer,
  },
  {
    path: rootRoutes.talkWithAstrologer,
    element: TalkWithAstrologer,
  },
  {
    path: rootRoutes.freeKundli,
    element: FreeKundali,
  },
  {
    path: rootRoutes.kundaliMatching,
    element: KundaliMatching,
  },
  {
    path: rootRoutes.kundaliMatchingReport,
    element: KundaliMatchingReport,
  },


  // ----------------pdftesting ---------------------


]; 