// import React, { useRef, useState, useCallback } from "react";
// import { useNavigate } from "react-router";
// import AgoraRTC from "agora-rtc-sdk-ng";
// import { useSelector } from "react-redux";

// import qualification from "/newThemeHomePage/qualification.webp";
// import language from "/newThemeHomePage/language.webp";
// import experience from "/newThemeHomePage/experience.webp";
// import messageTalk from "/newThemeHomePage/messageTalk.webp";
// import yelloStar from "/newThemeHomePage/yelloStar.webp";
// import tickMark from "/newThemeHomePage/tickMark.webp";
// import starMobileCard from "/newThemeHomePage/starMobileCard.webp";

// const APP_ID = "d2fef31c72d14276af5bf0461f53a548";

// const AstrologerCardMobile = ({ astrologers = [] }) => {
//   const navigate = useNavigate();
//   const loginUser = useSelector((state) => state?.masterSlice?.loginUser);

//   // State to hold call info per astrologer
//   const [callStates, setCallStates] = useState({});
//   // Store Agora clients & local audio tracks by astrologer id
//   const clientsRef = useRef({});
//   const localAudioTracksRef = useRef({});

//   const setCallState = useCallback(
//     (id, newState) =>
//       setCallStates((prev) => ({
//         ...prev,
//         [id]: { ...prev[id], ...newState },
//       })),
//     []
//   );

//   const joinCall = useCallback(
//     async (astrologer) => {
//       try {
//         if (clientsRef.current[astrologer._id]) return; // Already joined

//         const channelName = `channel-${astrologer._id}`;
//         const uid = `${loginUser?.loginUserData?.name || "Guest"}-${
//           loginUser?.loginUserData?._id || "0"
//         }`;

//         const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
//         clientsRef.current[astrologer._id] = client;

//         await client.join(APP_ID, channelName, null, uid);

//         const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
//         localAudioTracksRef.current[astrologer._id] = localAudioTrack;

//         await client.publish([localAudioTrack]);

//         setCallState(astrologer._id, {
//           joined: true,
//           muted: false,
//           remoteUsers: [],
//           activeSpeakerUid: null,
//         });

//         AgoraRTC.setLogLevel(0);
        
//         client.enableAudioVolumeIndicator();

//         client.on("volume-indicator", (volumes) => {
//           const loudest = volumes.reduce(
//             (prev, curr) => (curr.level > prev.level ? curr : prev),
//             { level: 0 }
//           );
//           setCallState(astrologer._id, { activeSpeakerUid: loudest.uid });
//         });

//         client.on("user-published", async (user, mediaType) => {
//           await client.subscribe(user, mediaType);
//           if (mediaType === "audio") {
//             user.audioTrack.play();
//           }

//           setCallStates((prevStates) => {
//             const prevRemoteUsers =
//               prevStates[astrologer._id]?.remoteUsers || [];
//             if (!prevRemoteUsers.find((u) => u.uid === user.uid)) {
//               const updatedRemoteUsers = [...prevRemoteUsers, user];
//               return {
//                 ...prevStates,
//                 [astrologer._id]: {
//                   ...prevStates[astrologer._id],
//                   remoteUsers: updatedRemoteUsers,
//                 },
//               };
//             }
//             return prevStates;
//           });
//         });

//         client.on("user-unpublished", (user) => {
//           setCallStates((prevStates) => {
//             const prevRemoteUsers =
//               prevStates[astrologer._id]?.remoteUsers || [];
//             const updatedUsers = prevRemoteUsers.filter(
//               (u) => u.uid !== user.uid
//             );

//             if (updatedUsers.length === 0) {
//               leaveCall(astrologer._id);
//             }

//             return {
//               ...prevStates,
//               [astrologer._id]: {
//                 ...prevStates[astrologer._id],
//                 remoteUsers: updatedUsers,
//               },
//             };
//           });
//         });

//         client.on("user-left", (user) => {
//           setCallStates((prevStates) => {
//             const prevRemoteUsers =
//               prevStates[astrologer._id]?.remoteUsers || [];
//             const updatedUsers = prevRemoteUsers.filter(
//               (u) => u.uid !== user.uid
//             );

//             if (updatedUsers.length === 0) {
//               leaveCall(astrologer._id);
//             }

//             return {
//               ...prevStates,
//               [astrologer._id]: {
//                 ...prevStates[astrologer._id],
//                 remoteUsers: updatedUsers,
//               },
//             };
//           });
//         });

//       } catch (error) {
//         console.error("Failed to join call:", error);
//       }
//     },
//     [loginUser, setCallState]
//   );

//   const leaveCall = useCallback(
//     async (astrologerId) => {
//       try {
//         const client = clientsRef.current[astrologerId];
//         const localAudioTrack = localAudioTracksRef.current[astrologerId];

//         if (client) {
//           await client.leave();
//           client.removeAllListeners();
//           delete clientsRef.current[astrologerId];
//         }

//         if (localAudioTrack) {
//           localAudioTrack.stop();
//           localAudioTrack.close();
//           delete localAudioTracksRef.current[astrologerId];
//         }

//         setCallState(astrologerId, {
//           remoteUsers: [],
//           joined: false,
//           muted: false,
//           activeSpeakerUid: null,
//         });
//       } catch (err) {
//         console.error("Error leaving call:", err);
//       }
//     },
//     [setCallState]
//   );

//   const toggleMute = useCallback(
//     (astrologer) => {
//       const localAudioTrack = localAudioTracksRef.current[astrologer._id];
//       const currentMuted = callStates[astrologer._id]?.muted || false;
//       if (!localAudioTrack) return;

//       // If currently muted, enable the track (unmute), else disable (mute)
//       localAudioTrack.setEnabled(currentMuted);
//       setCallState(astrologer._id, { muted: !currentMuted });
//     },
//     [callStates, setCallState]
//   );

//   return (
//     <div className="flex flex-col gap-4">
//       {astrologers.map((astrologer) => {
//         const state = callStates[astrologer._id] || {};
//         const joined = state.joined || false;
//         const muted = state.muted || false;

//         return (
//           <div
//             key={astrologer._id}
//             className="relative flex flex-col justify-between w-full mx-auto bg-white cursor-pointer  rounded-[10px] p-[20px] renderAstroCard gap-2"
//             onClick={() => navigate(`/astrologerDetailPage/${astrologer._id}`)}
//             style={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)" }}
//           >
//             <div className="absolute top-4 left-4 flex items-center gap-1">
//               <img src={yelloStar} alt="" />
//               <span className="new_body_font text-[14px] font-semibold ml-1">
//                 {astrologer.orders || 2457}
//               </span>
//             </div>

//             <div className="absolute top-4 right-4 w-[20px] h-[20px]">
//               <img src={starMobileCard} alt="" className="w-[20px] h-[20px]" />
//             </div>

//             <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
//               <img
//                 src={astrologer.profile_image}
//                 alt={astrologer.name}
//                 className="w-[70px] h-[70px] rounded-full border-4 border-white object-cover shadow-md"
//               />
//             </div>

//             <div className="pt-8 pb-2 text-center relative">
//               <div className="flex justify-center items-center gap-2">
//                 <h2 className="text-[16px] font-bold text-gray-800 mb-0">
//                   {astrologer.name || "-"}
//                 </h2>
//                 {astrologer.astro_is_verified === "0" && (
//                   <img
//                     src={tickMark}
//                     alt="Verified"
//                     className="w-[14px] h-[14px]"
//                   />
//                 )}
//               </div>
//             </div>

//             <div className="pt-0">
//               <div className="grid grid-cols-2 gap-x-[80px] gap-y-[10px] text-sm new_body_font font-bold">
//                 <div className="flex items-center gap-2">
//                   <img src={qualification} alt="Category" />
//                   <span className="text-[14px] font-semibold">
//                     {astrologer.category}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <img src={language} alt="Languages" />
//                   <span className="text-[14px] font-semibold">
//                     {astrologer.language}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <img src={experience} alt="Experience" />
//                   <span className="text-[14px] font-semibold">
//                     {astrologer.experience} Years
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <img src={messageTalk} alt="Call" />
//                   <span className="text-[14px] font-semibold">Call</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-2 justify-center mt-4">
//               {joined ? (
//                 <>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleMute(astrologer);
//                     }}
//                     className="bg-yellow-400 rounded-md px-4 py-2"
//                   >
//                     {muted ? "Unmute" : "Mute"}
//                   </button>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       leaveCall(astrologer._id);
//                     }}
//                     className="bg-red-500 text-white rounded-md px-4 py-2"
//                   >
//                     End Call
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     joinCall(astrologer);
//                   }}
//                   className="bg-green-500 text-white rounded-md px-4 py-2"
//                 >
//                   Call Now
//                 </button>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default AstrologerCardMobile;
