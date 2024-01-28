const roomPrefix = 'room';

export const isRoomId = (id: string) => {
  return id.startsWith(roomPrefix);
};

export const toSocketRoomId = (id: string) => {
  return `${roomPrefix}-${id}`;
};