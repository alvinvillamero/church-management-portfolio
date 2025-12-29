// Mock data for portfolio demonstration
// This replaces all API calls with static data

export const mockUsers = {
  admin: {
    id: '1',
    username: 'admin',
    email: 'admin@church.com',
    role: 'MASTER_ADMIN' as const,
    member: null,
  },
  leader: {
    id: '2',
    username: 'leader',
    email: 'leader@church.com',
    role: 'CAREGROUP_LEADER' as const,
    member: {
      id: 'm1',
      firstName: 'John',
      lastName: 'Leader',
      picture: null,
    },
  },
  user: {
    id: '3',
    username: 'user',
    email: 'user@church.com',
    role: 'REGULAR_USER' as const,
    member: {
      id: 'm2',
      firstName: 'Jane',
      lastName: 'Member',
      picture: null,
    },
  },
};

export const mockLeaderStats = {
  caregroupName: 'Alpha Caregroup',
  totalMembers: 45,
  activeMembers: 38,
  toFollowUpMembers: 7,
  totalBibleStudies: 12,
  upcomingBibleStudies: 3,
  pendingRequests: 5,
  teamLeaders: 4,
};

export const mockVerseOfTheDay = {
  id: 'v1',
  verse: 'For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future.',
  reference: 'Jeremiah 29:11',
  reflection: 'God has a purpose for each of us. Trust in His plan and have faith in the journey ahead.',
  date: new Date().toISOString().split('T')[0],
};

export const mockMembers = [
  {
    id: 'm1',
    firstName: 'John',
    middleName: 'Michael',
    lastName: 'Doe',
    suffix: 'Jr.',
    membershipType: 'BONAFIDE',
    membershipStage: 'MEMBERSHIP',
    maturityStage: 'MATURITY',
    ministryStage: null,
    missionStage: null,
    attendanceStatus: 'ACTIVE',
    picture: null,
    user: {
      id: 'u1',
      username: 'johndoe',
      email: 'john@example.com',
      role: 'REGULAR_USER',
    },
    caregroup: {
      name: 'Alpha Caregroup',
    },
  },
  {
    id: 'm2',
    firstName: 'Jane',
    lastName: 'Smith',
    membershipType: 'BONAFIDE',
    membershipStage: 'MEMBERSHIP',
    maturityStage: 'MATURITY',
    ministryStage: 'MINISTRY',
    missionStage: null,
    attendanceStatus: 'ACTIVE',
    picture: null,
    user: {
      id: 'u2',
      username: 'janesmith',
      email: 'jane@example.com',
      role: 'REGULAR_USER',
    },
    caregroup: {
      name: 'Alpha Caregroup',
    },
  },
  {
    id: 'm3',
    firstName: 'Robert',
    lastName: 'Johnson',
    membershipType: 'TRANSIENT',
    membershipStage: 'MEMBERSHIP',
    maturityStage: null,
    ministryStage: null,
    missionStage: null,
    attendanceStatus: 'TO_FOLLOW_UP',
    picture: null,
    user: {
      id: 'u3',
      username: 'robertj',
      email: 'robert@example.com',
      role: 'REGULAR_USER',
    },
    caregroup: {
      name: 'Alpha Caregroup',
    },
  },
];

export const mockBibleStudies = [
  {
    id: 'bs1',
    title: 'Foundations of Faith',
    description: 'A study on the core beliefs of Christianity',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    time: '19:00',
    location: 'Church Main Hall',
    zoomLink: null,
    team: {
      id: 't1',
      name: 'Team Alpha',
    },
  },
  {
    id: 'bs2',
    title: 'Walking in Love',
    description: 'Understanding God\'s love and how to share it',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    time: '19:00',
    location: 'Online',
    zoomLink: 'https://zoom.us/j/123456789',
    team: {
      id: 't2',
      name: 'Team Beta',
    },
  },
];

export const mockTeamLeaders = [
  {
    id: 'tl1',
    userId: 'u4',
    assignedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      id: 'u4',
      username: 'teamlead1',
      email: 'teamlead1@example.com',
      member: {
        id: 'm4',
        firstName: 'Sarah',
        lastName: 'Williams',
        picture: null,
      },
    },
  },
];

export const mockScheduleRequests = [
  {
    id: 'sr1',
    requestedDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'PENDING',
    member: {
      id: 'm5',
      firstName: 'Michael',
      lastName: 'Brown',
    },
    caregroup: {
      id: 'cg1',
      name: 'Alpha Caregroup',
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Generate a mock QR code data URL
export function generateMockQRCode(memberId: string): string {
  // In a real app, this would generate an actual QR code
  // For portfolio, we'll return a placeholder data URL
  if (typeof document === 'undefined') {
    // Server-side: return a simple placeholder
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMwMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5RUiBDb2RlPC90ZXh0Pjwvc3ZnPg==';
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = '#000000';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('QR Code', 100, 100);
    ctx.fillText(memberId, 100, 120);
  }
  return canvas.toDataURL();
}

