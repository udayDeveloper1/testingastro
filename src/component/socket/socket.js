import { io } from 'socket.io-client';
import { Constatnt } from '../../utils/Constent';
const SOCKET_URL = Constatnt.SOCKETURL; 


export const createSocket = (userId, receiverId, is_freechat_count) => {
  return io(`${SOCKET_URL}/socket?user_id=${userId}&target_id=${receiverId}&free_chat=${is_freechat_count}`, {
    query: { user_id: userId },
    transports: ['websocket'],
  });
};