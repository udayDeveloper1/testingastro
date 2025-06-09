// import React, { useEffect, useRef, useState } from "react";
// import AgoraRTC from "agora-rtc-sdk-ng";

// const APP_ID = "d2fef31c72d14276af5bf0461f53a548";
// const CHANNEL_NAME = "test-channel";
// const TOKEN = null;

// const UserSide = () => {
//   const clientRef = useRef(null);
//   const localAudioTrackRef = useRef(null);
//   const [joined, setJoined] = useState(false);
//   const [remoteUsers, setRemoteUsers] = useState([]);
//   const [muted, setMuted] = useState(false);
//   const [activeSpeakerUid, setActiveSpeakerUid] = useState(null);

//   useEffect(() => {
//     if (!joined) return;

//     const client = clientRef.current;

//     AgoraRTC.setLogLevel(0);

//     client.enableAudioVolumeIndicator();

//     client.on("volume-indicator", (volumes) => {
//       const loudest = volumes.reduce(
//         (prev, curr) => (curr.level > prev.level ? curr : prev),
//         { level: 0 }
//       );
//       setActiveSpeakerUid(loudest.uid);
//     });

//     client.on("user-published", async (user, mediaType) => {
//       await client.subscribe(user, mediaType);
//       if (mediaType === "audio") {
//         user.audioTrack.play();
//       }
//       setRemoteUsers((prev) => {
//         if (!prev.find((u) => u.uid === user.uid)) return [...prev, user];
//         return prev;
//       });
//     });

//     client.on("user-unpublished", (user) => {
//       setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
//     });

//     return () => {
//       client.off("volume-indicator");
//       client.off("user-published");
//       client.off("user-unpublished");
//     };
//   }, [joined]);

//   const joinCall = async () => {
//     const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
//     clientRef.current = client;

//     await client.join(APP_ID, CHANNEL_NAME, TOKEN, "user");

//     const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
//     localAudioTrackRef.current = localAudioTrack;

//     await client.publish([localAudioTrack]);

//     setJoined(true);
//     console.log("User joined call");
//   };

//   const leaveCall = async () => {
//     if (localAudioTrackRef.current) {
//       localAudioTrackRef.current.stop();
//       localAudioTrackRef.current.close();
//     }
//     await clientRef.current.leave();
//     setJoined(false);
//     setRemoteUsers([]);
//     setActiveSpeakerUid(null);
//     setMuted(false);
//     console.log("User left call");
//   };

//   const toggleMute = () => {
//     if (!localAudioTrackRef.current) return;
//     localAudioTrackRef.current.setEnabled(muted); // toggles based on current muted state
//     setMuted(!muted);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>User Side - Voice Call</h2>
//       {joined ? (
//         <>
//           <button
//             onClick={leaveCall}
//             style={{ backgroundColor: "red", color: "#fff", marginRight: 10, padding: 10 }}
//           >
//             Leave Call
//           </button>
//           <button
//             onClick={toggleMute}
//             style={{ backgroundColor: muted ? "gray" : "orange", color: "#fff", padding: 10 }}
//           >
//             {muted ? "Unmute" : "Mute"}
//           </button>
//           <h4>Remote Users Connected:</h4>
//           <ul>
//             {remoteUsers.map((user) => (
//               <li key={user.uid}>
//                 User ID: {user.uid} {activeSpeakerUid === user.uid && "🎤"}
//               </li>
//             ))}
//           </ul>
//         </>
//       ) : (
//         <button onClick={joinCall} style={{ backgroundColor: "green", color: "#fff", padding: 10 }}>
//           Join Call as User
//         </button>
//       )}
//     </div>
//   );
// };

// export default UserSide;
