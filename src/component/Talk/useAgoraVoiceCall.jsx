// // hooks/useAgoraVoiceCall.js
// import { useEffect, useRef, useState } from "react";
// import AgoraRTC from "agora-rtc-sdk-ng";

// const APP_ID = "d2fef31c72d14276af5bf0461f53a548";

// export const useAgoraVoiceCall = ({ channelName = "test-channel", uid = "user" }) => {
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

//     await client.join(APP_ID, channelName, null, uid);

//     const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
//     localAudioTrackRef.current = localAudioTrack;

//     await client.publish([localAudioTrack]);

//     setJoined(true);
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
//   };

//   const toggleMute = () => {
//     if (!localAudioTrackRef.current) return;
//     localAudioTrackRef.current.setEnabled(muted);
//     setMuted(!muted);
//   };

//   return {
//     joined,
//     joinCall,
//     leaveCall,
//     toggleMute,
//     muted,
//     remoteUsers,
//     activeSpeakerUid,
//   };
// };
