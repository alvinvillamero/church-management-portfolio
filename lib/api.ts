// Mock API service - replaces axios with mock data
// This simulates API calls for portfolio demonstration

import {
  mockUsers,
  mockLeaderStats,
  mockVerseOfTheDay,
  mockMembers,
  mockBibleStudies,
  mockTeamLeaders,
  mockScheduleRequests,
  generateMockQRCode,
} from './mock-data';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock axios-like API client
const mockApi = {
  get: async (url: string, config?: any) => {
    await delay(300); // Simulate network delay
    
    // Parse query params
    const params = config?.params || {};
    
    // Route handlers
    if (url === '/auth/login') {
      throw new Error('Use POST for login');
    }
    
    if (url === '/users/me') {
      // Return current user based on stored token
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token === 'admin-token') {
        return { data: mockUsers.admin };
      } else if (token === 'leader-token') {
        return { data: { ...mockUsers.leader, member: mockUsers.leader.member } };
      } else if (token === 'user-token') {
        return { data: { ...mockUsers.user, member: mockUsers.user.member } };
      }
      return { data: mockUsers.user };
    }
    
    if (url === '/leader/dashboard/stats') {
      return { data: mockLeaderStats };
    }
    
    if (url === '/verses/today') {
      return { data: { verse: mockVerseOfTheDay } };
    }
    
    if (url.startsWith('/members/') && url.endsWith('/qr-code')) {
      const memberId = url.split('/')[2];
      // Use a simple placeholder for QR code
      const qrCode = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMwMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5RUiBDb2RlPC90ZXh0Pjwvc3ZnPg==';
      return { data: { qrCode } };
    }
    
    if (url === '/users/me/attendance-status') {
      return {
        data: {
          statusLevel: 1,
          absences: 0,
          attendanceStatus: 'ACTIVE',
          followUpStatus: null,
          lastAttendanceDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          notificationMessage: 'You are in good standing with your attendance.',
          statusColor: 'green',
          progressPercentage: 0,
          caregroupLeader: {
            name: 'John Leader',
            caregroupName: 'Alpha Caregroup',
          },
        },
      };
    }
    
    if (url === '/verses/view') {
      return { data: { success: true } };
    }
    
    if (url === '/leader/members') {
      return { data: { members: mockMembers, total: mockMembers.length } };
    }
    
    if (url === '/leader/bible-studies') {
      return { data: { bibleStudies: mockBibleStudies, total: mockBibleStudies.length } };
    }
    
    if (url === '/leader/team-leaders') {
      return { data: { teamLeaders: mockTeamLeaders, total: mockTeamLeaders.length } };
    }
    
    if (url === '/leader/schedule-requests') {
      return { data: { requests: mockScheduleRequests, total: mockScheduleRequests.length } };
    }
    
    return { data: {} };
  },
  
  post: async (url: string, data?: any) => {
    await delay(300);
    
    if (url === '/auth/login') {
      // Mock login - accept any credentials
      const { username } = data;
      let user, token, refreshToken;
      
      if (username === 'admin' || username === 'master_admin') {
        user = mockUsers.admin;
        token = 'admin-token';
        refreshToken = 'admin-refresh-token';
      } else if (username === 'leader' || username === 'caregroup_leader') {
        user = mockUsers.leader;
        token = 'leader-token';
        refreshToken = 'leader-refresh-token';
      } else {
        user = mockUsers.user;
        token = 'user-token';
        refreshToken = 'user-refresh-token';
      }
      
      return {
        data: {
          token,
          refreshToken,
          user,
        },
      };
    }
    
    return { data: { success: true } };
  },
  
  put: async (url: string, data?: any) => {
    await delay(300);
    return { data: { success: true } };
  },
  
  delete: async (url: string) => {
    await delay(300);
    return { data: { success: true } };
  },
  
  patch: async (url: string, data?: any) => {
    await delay(300);
    return { data: { success: true } };
  },
};

export default mockApi;

