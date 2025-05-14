export type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  isOnline: boolean;
  lastSeen?: string;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
  read: boolean;
  media?: {
    type: 'image' | 'document';
    url: string;
    name?: string;
    size?: string;
  };
};

export type Chat = {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
};

export type Group = {
  id: string;
  name: string;
  description?: string;
  avatar: string;
  members: User[];
  createdBy: string;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
};

export const users: User[] = [
  {
    id: 'user1',
    name: 'Alex Johnson',
    username: 'alexj',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Computer Science major, love hiking and coding!',
    isOnline: true,
  },
  {
    id: 'user2',
    name: 'Sarah Williams',
    username: 'sarahw',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Psychology student. Coffee enthusiast.',
    isOnline: false,
    lastSeen: '2023-06-15T15:24:00Z',
  },
  {
    id: 'user3',
    name: 'Miguel Rodriguez',
    username: 'miguelr',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Engineering student, basketball player',
    isOnline: true,
  },
  {
    id: 'user4',
    name: 'Emily Chen',
    username: 'emilyc',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Art history major. Love photography.',
    isOnline: false,
    lastSeen: '2023-06-15T18:30:00Z',
  },
  {
    id: 'user5',
    name: 'David Kim',
    username: 'davidk',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Business major, soccer team captain',
    isOnline: true,
  },
  {
    id: 'user6',
    name: 'Olivia Smith',
    username: 'olivias',
    avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'English literature student. Bookworm.',
    isOnline: false,
    lastSeen: '2023-06-16T09:15:00Z',
  },
  {
    id: 'user7',
    name: 'James Taylor',
    username: 'jamest',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Mathematics major. Chess club president.',
    isOnline: true,
  },
  {
    id: 'user8',
    name: 'Sofia Garcia',
    username: 'sofiag',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Nursing student. Volunteer at university hospital.',
    isOnline: false,
    lastSeen: '2023-06-16T11:45:00Z',
  },
];

export const currentUser: User = {
  id: 'currentUser',
  name: 'Jamie Martin',
  username: 'jamiem',
  avatar: 'https://images.pexels.com/photos/1844547/pexels-photo-1844547.jpeg?auto=compress&cs=tinysrgb&w=300',
  bio: 'Computer Science major at MU. Coding, gaming, and photography.',
  isOnline: true,
};

export const messages: Message[] = [
  {
    id: 'msg1',
    senderId: 'user1',
    text: 'Hey, how are you doing?',
    createdAt: '2023-06-16T10:24:00Z',
    read: true,
  },
  {
    id: 'msg2',
    senderId: 'currentUser',
    text: 'I\'m good! Just finished my exams. How about you?',
    createdAt: '2023-06-16T10:25:00Z',
    read: true,
  },
  {
    id: 'msg3',
    senderId: 'user1',
    text: 'Congrats! I\'m still studying for mine. CS301 is killing me.',
    createdAt: '2023-06-16T10:26:00Z',
    read: true,
  },
  {
    id: 'msg4',
    senderId: 'currentUser',
    text: 'I took that last semester. Let me know if you need any help!',
    createdAt: '2023-06-16T10:28:00Z',
    read: true,
  },
  {
    id: 'msg5',
    senderId: 'user1',
    text: 'That would be awesome! Want to meet at the library tomorrow?',
    createdAt: '2023-06-16T10:30:00Z',
    read: true,
  },
  {
    id: 'msg6',
    senderId: 'currentUser',
    text: 'Sure thing. How about 2pm near the CS section?',
    createdAt: '2023-06-16T10:32:00Z',
    read: true,
  },
  {
    id: 'msg7',
    senderId: 'user1',
    text: 'Perfect! See you then.',
    createdAt: '2023-06-16T10:33:00Z',
    read: true,
  },
  {
    id: 'msg8',
    senderId: 'user1',
    text: 'Actually, can we make it 3pm instead? I have a class until 2:45.',
    createdAt: '2023-06-16T14:20:00Z',
    read: false,
  },
  {
    id: 'msg9',
    senderId: 'user2',
    text: 'Hi Jamie! Are we still on for the study group tonight?',
    createdAt: '2023-06-16T15:05:00Z',
    read: false,
  },
  {
    id: 'msg10',
    senderId: 'user3',
    text: 'Hey, did you get the notes from yesterday\'s lecture? I missed class.',
    createdAt: '2023-06-16T11:24:00Z',
    read: true,
  },
  {
    id: 'msg11',
    senderId: 'currentUser',
    text: 'Yes, I\'ll share them with you. Give me a moment.',
    createdAt: '2023-06-16T11:30:00Z',
    read: true,
  },
  {
    id: 'msg12',
    senderId: 'currentUser',
    text: 'Here are the lecture notes',
    createdAt: '2023-06-16T11:32:00Z',
    read: true,
    media: {
      type: 'document',
      url: '#',
      name: 'CS301_Lecture_Notes.pdf',
      size: '2.4 MB',
    },
  },
  {
    id: 'msg13',
    senderId: 'user3',
    text: 'Thanks so much! You\'re a lifesaver.',
    createdAt: '2023-06-16T11:35:00Z',
    read: true,
  },
  {
    id: 'msg14',
    senderId: 'user4',
    text: 'Check out this photo from the campus event yesterday!',
    createdAt: '2023-06-16T09:24:00Z',
    read: true,
    media: {
      type: 'image',
      url: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  },
  {
    id: 'msg15',
    senderId: 'currentUser',
    text: 'That looks great! Wish I could have made it.',
    createdAt: '2023-06-16T09:26:00Z',
    read: true,
  },
];

export const chats: Chat[] = [
  {
    id: 'chat1',
    participants: [users[0], currentUser],
    lastMessage: messages[7],
    unreadCount: 1,
    updatedAt: '2023-06-16T14:20:00Z',
  },
  {
    id: 'chat2',
    participants: [users[1], currentUser],
    lastMessage: messages[8],
    unreadCount: 1,
    updatedAt: '2023-06-16T15:05:00Z',
  },
  {
    id: 'chat3',
    participants: [users[2], currentUser],
    lastMessage: messages[12],
    unreadCount: 0,
    updatedAt: '2023-06-16T11:35:00Z',
  },
  {
    id: 'chat4',
    participants: [users[3], currentUser],
    lastMessage: messages[14],
    unreadCount: 0,
    updatedAt: '2023-06-16T09:26:00Z',
  },
  {
    id: 'chat5',
    participants: [users[4], currentUser],
    lastMessage: {
      id: 'msg16',
      senderId: 'user5',
      text: 'Hey, are you coming to the soccer game tomorrow?',
      createdAt: '2023-06-15T18:24:00Z',
      read: true,
    },
    unreadCount: 0,
    updatedAt: '2023-06-15T18:24:00Z',
  },
  {
    id: 'chat6',
    participants: [users[5], currentUser],
    lastMessage: {
      id: 'msg17',
      senderId: 'currentUser',
      text: 'I really enjoyed that book you recommended!',
      createdAt: '2023-06-14T20:14:00Z',
      read: true,
    },
    unreadCount: 0,
    updatedAt: '2023-06-14T20:14:00Z',
  },
];

export const groups: Group[] = [
  {
    id: 'group1',
    name: 'CS Study Group',
    description: 'For helping each other with CS courses',
    avatar: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=300',
    members: [currentUser, users[0], users[2], users[4], users[6]],
    createdBy: 'user1',
    lastMessage: {
      id: 'gmsg1',
      senderId: 'user1',
      text: 'Anyone free to help with the algorithm assignment?',
      createdAt: '2023-06-16T16:30:00Z',
      read: false,
    },
    unreadCount: 1,
    updatedAt: '2023-06-16T16:30:00Z',
  },
  {
    id: 'group2',
    name: 'MU Basketball Team',
    description: 'Official group for team members',
    avatar: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=300',
    members: [currentUser, users[2], users[4], users[6], users[7]],
    createdBy: 'user3',
    lastMessage: {
      id: 'gmsg2',
      senderId: 'user3',
      text: 'Practice canceled tomorrow due to court maintenance',
      createdAt: '2023-06-16T14:15:00Z',
      read: true,
    },
    unreadCount: 0,
    updatedAt: '2023-06-16T14:15:00Z',
  },
  {
    id: 'group3',
    name: 'Campus Photography Club',
    description: 'Share your best shots from around campus',
    avatar: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=300',
    members: [currentUser, users[1], users[3], users[5], users[7]],
    createdBy: 'user4',
    lastMessage: {
      id: 'gmsg3',
      senderId: 'user4',
      text: 'Check out my sunset shot from the library rooftop!',
      createdAt: '2023-06-16T18:45:00Z',
      read: false,
      media: {
        type: 'image',
        url: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
    },
    unreadCount: 1,
    updatedAt: '2023-06-16T18:45:00Z',
  },
  {
    id: 'group4',
    name: 'MU Event Planning',
    description: 'For organizing campus events',
    avatar: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=300',
    members: [currentUser, users[0], users[1], users[3], users[5]],
    createdBy: 'user1',
    lastMessage: {
      id: 'gmsg4',
      senderId: 'user1',
      text: 'Next meeting is Tuesday at 5pm in the Student Union',
      createdAt: '2023-06-15T10:20:00Z',
      read: true,
    },
    unreadCount: 0,
    updatedAt: '2023-06-15T10:20:00Z',
  },
];

export const getChatMessages = (chatId: string): Message[] => {
  switch (chatId) {
    case 'chat1':
      return messages.slice(0, 8).reverse();
    case 'chat2':
      return [messages[8]].reverse();
    case 'chat3':
      return messages.slice(9, 13).reverse();
    case 'chat4':
      return messages.slice(13, 15).reverse();
    default:
      return [];
  }
};

export const getGroupMessages = (groupId: string): Message[] => {
  const groupMessages: Record<string, Message[]> = {
    group1: [
      {
        id: 'gmsg1',
        senderId: 'user1',
        text: 'Anyone free to help with the algorithm assignment?',
        createdAt: '2023-06-16T16:30:00Z',
        read: false,
      },
      {
        id: 'gmsg1_1',
        senderId: 'user2',
        text: 'I can help tomorrow afternoon',
        createdAt: '2023-06-16T16:35:00Z',
        read: true,
      },
      {
        id: 'gmsg1_2',
        senderId: 'currentUser',
        text: 'I\'m available tonight if that works better',
        createdAt: '2023-06-16T16:40:00Z',
        read: true,
      },
    ],
    group2: [
      {
        id: 'gmsg2_1',
        senderId: 'user4',
        text: 'When is the next game?',
        createdAt: '2023-06-16T13:30:00Z',
        read: true,
      },
      {
        id: 'gmsg2_2',
        senderId: 'user3',
        text: 'This Saturday at 2pm, against State University',
        createdAt: '2023-06-16T13:45:00Z',
        read: true,
      },
      {
        id: 'gmsg2',
        senderId: 'user3',
        text: 'Practice canceled tomorrow due to court maintenance',
        createdAt: '2023-06-16T14:15:00Z',
        read: true,
      },
    ],
    group3: [
      {
        id: 'gmsg3_1',
        senderId: 'user5',
        text: 'Anyone have a tripod I can borrow for the weekend?',
        createdAt: '2023-06-16T17:30:00Z',
        read: true,
      },
      {
        id: 'gmsg3_2',
        senderId: 'currentUser',
        text: 'I have one you can use. I\'ll bring it to campus tomorrow.',
        createdAt: '2023-06-16T17:45:00Z',
        read: true,
      },
      {
        id: 'gmsg3',
        senderId: 'user4',
        text: 'Check out my sunset shot from the library rooftop!',
        createdAt: '2023-06-16T18:45:00Z',
        read: false,
        media: {
          type: 'image',
          url: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
      },
    ],
    group4: [
      {
        id: 'gmsg4_1',
        senderId: 'user3',
        text: 'I have some ideas for the Spring Festival',
        createdAt: '2023-06-15T09:30:00Z',
        read: true,
      },
      {
        id: 'gmsg4_2',
        senderId: 'user5',
        text: 'Let\'s discuss at the meeting',
        createdAt: '2023-06-15T09:45:00Z',
        read: true,
      },
      {
        id: 'gmsg4',
        senderId: 'user1',
        text: 'Next meeting is Tuesday at 5pm in the Student Union',
        createdAt: '2023-06-15T10:20:00Z',
        read: true,
      },
    ],
  };

  return groupMessages[groupId] ? groupMessages[groupId].reverse() : [];
};

export const chatDetails = {
  messages,
  chats,
  groups,
  getChatMessages,
  getGroupMessages,
};