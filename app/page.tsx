'use client';

import { useState, useEffect } from 'react';
import { Users, CheckCircle2, AlertTriangle, BookOpen, QrCode, Calendar, UserPlus, FileText, Shield, BarChart3, ArrowRight, Sparkles } from 'lucide-react';
import { mockLeaderStats, mockVerseOfTheDay, mockMembers, mockBibleStudies } from '@/lib/mock-data';
import VerseOfTheDay from '@/components/VerseOfTheDay';
import AttendanceStatusBar from '@/components/AttendanceStatusBar';

export default function PortfolioShowcase() {
  const [logoError, setLogoError] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'leader' | 'admin' | 'user'>('overview');

  const stats = mockLeaderStats;
  const activeMembersPercentage = stats.totalMembers > 0
    ? Math.round((stats.activeMembers / stats.totalMembers) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {!logoError ? (
                <img
                  src="/logo.png"
                  alt="UPC VOT MINTAL Logo"
                  className="h-12 sm:h-16 w-auto"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <h1 className="font-heading text-2xl sm:text-3xl text-primary-900">
                  UPC VOT MINTAL
                </h1>
              )}
              <span className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-xs sm:text-sm font-semibold">
                Portfolio Showcase
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-neutral-600">
              <Sparkles size={16} className="text-secondary-500" />
              <span>Mock Data Demo</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-primary-900 mb-4">
            Church Membership QR Code System
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-600 max-w-3xl mx-auto">
            A comprehensive church management platform with QR code attendance tracking, 
            member management, and caregroup coordination
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <span className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-semibold">Next.js 14</span>
            <span className="px-4 py-2 bg-secondary-100 text-secondary-800 rounded-full text-sm font-semibold">TypeScript</span>
            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">Tailwind CSS</span>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Zustand</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-neutral-200">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'System Overview', icon: BarChart3 },
              { id: 'leader', label: 'Leader Dashboard', icon: UserPlus },
              { id: 'admin', label: 'Admin Dashboard', icon: Shield },
              { id: 'user', label: 'User Dashboard', icon: Users },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-semibold text-sm transition-colors ${
                  activeTab === id
                    ? 'border-primary-600 text-primary-700'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Features */}
            <section>
              <h2 className="font-heading text-2xl text-primary-900 mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card hover:shadow-xl transition-shadow">
                  <div className="p-3 bg-primary-100 rounded-lg w-fit mb-4">
                    <QrCode size={24} className="text-primary-700" />
                  </div>
                  <h3 className="font-heading text-xl mb-2">QR Code Attendance</h3>
                  <p className="text-neutral-600">Track member attendance with unique QR codes for each member</p>
                </div>
                <div className="card hover:shadow-xl transition-shadow">
                  <div className="p-3 bg-secondary-100 rounded-lg w-fit mb-4">
                    <Users size={24} className="text-secondary-700" />
                  </div>
                  <h3 className="font-heading text-xl mb-2">Member Management</h3>
                  <p className="text-neutral-600">Comprehensive member profiles with membership stages and status tracking</p>
                </div>
                <div className="card hover:shadow-xl transition-shadow">
                  <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4">
                    <BookOpen size={24} className="text-purple-700" />
                  </div>
                  <h3 className="font-heading text-xl mb-2">Bible Study Scheduling</h3>
                  <p className="text-neutral-600">Organize and manage bible study sessions with team assignments</p>
                </div>
                <div className="card hover:shadow-xl transition-shadow">
                  <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                    <UserPlus size={24} className="text-green-700" />
                  </div>
                  <h3 className="font-heading text-xl mb-2">Caregroup Management</h3>
                  <p className="text-neutral-600">Assign leaders, track caregroup activities, and manage team structures</p>
                </div>
                <div className="card hover:shadow-xl transition-shadow">
                  <div className="p-3 bg-orange-100 rounded-lg w-fit mb-4">
                    <Calendar size={24} className="text-orange-700" />
                  </div>
                  <h3 className="font-heading text-xl mb-2">Event & Announcements</h3>
                  <p className="text-neutral-600">Share church events and important announcements with members</p>
                </div>
                <div className="card hover:shadow-xl transition-shadow">
                  <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                    <BarChart3 size={24} className="text-blue-700" />
                  </div>
                  <h3 className="font-heading text-xl mb-2">Analytics Dashboard</h3>
                  <p className="text-neutral-600">Track attendance trends, member growth, and engagement metrics</p>
                </div>
              </div>
            </section>

            {/* System Statistics */}
            <section>
              <h2 className="font-heading text-2xl text-primary-900 mb-6">System Statistics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary-500 rounded-lg">
                      <Users size={24} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-primary-700 mb-2">Total Members</h3>
                  <p className="text-3xl font-bold text-primary-900">{stats.totalMembers}</p>
                  <p className="text-xs text-primary-600 mt-1">Active church members</p>
                </div>

                <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-500 rounded-lg">
                      <CheckCircle2 size={24} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-green-700 mb-2">Active Members</h3>
                  <p className="text-3xl font-bold text-green-900">{stats.activeMembers}</p>
                  <p className="text-xs text-green-600 mt-1">{activeMembersPercentage}% of total</p>
                </div>

                <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-orange-500 rounded-lg">
                      <AlertTriangle size={24} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-orange-700 mb-2">To Follow Up</h3>
                  <p className="text-3xl font-bold text-orange-900">{stats.toFollowUpMembers}</p>
                  <p className="text-xs text-orange-600 mt-1">Need attention</p>
                </div>

                <div className="card bg-gradient-to-br from-secondary-50 to-secondary-100 border-secondary-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-secondary-500 rounded-lg">
                      <BookOpen size={24} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-secondary-700 mb-2">Bible Studies</h3>
                  <p className="text-3xl font-bold text-secondary-900">{stats.totalBibleStudies}</p>
                  <p className="text-xs text-secondary-600 mt-1">{stats.upcomingBibleStudies} upcoming</p>
                </div>
              </div>
            </section>

            {/* Verse of the Day */}
            <section>
              <h2 className="font-heading text-2xl text-primary-900 mb-6">Verse of the Day</h2>
              <VerseOfTheDay />
            </section>
          </div>
        )}

        {activeTab === 'leader' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-3xl text-primary-900 mb-2">Caregroup Leader Dashboard</h2>
              <p className="text-neutral-600">Managing: {stats.caregroupName}</p>
            </div>

            {/* Attendance Status */}
            <AttendanceStatusBar />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                <div className="p-3 bg-primary-500 rounded-lg w-fit mb-4">
                  <Users size={24} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-primary-700 mb-2">Total Members</h3>
                <p className="text-3xl font-bold text-primary-900">{stats.totalMembers}</p>
              </div>

              <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="p-3 bg-green-500 rounded-lg w-fit mb-4">
                  <CheckCircle2 size={24} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-green-700 mb-2">Active Members</h3>
                <p className="text-3xl font-bold text-green-900">{stats.activeMembers}</p>
              </div>

              <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <div className="p-3 bg-orange-500 rounded-lg w-fit mb-4">
                  <AlertTriangle size={24} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-orange-700 mb-2">To Follow Up</h3>
                <p className="text-3xl font-bold text-orange-900">{stats.toFollowUpMembers}</p>
              </div>

              <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="p-3 bg-purple-500 rounded-lg w-fit mb-4">
                  <FileText size={24} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-purple-700 mb-2">Pending Requests</h3>
                <p className="text-3xl font-bold text-purple-900">{stats.pendingRequests}</p>
              </div>
            </div>

            {/* Recent Members Preview */}
            <div className="card">
              <h3 className="font-heading text-xl mb-4">Recent Members</h3>
              <div className="space-y-3">
                {mockMembers.slice(0, 3).map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-neutral-900">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-sm text-neutral-600">{member.membershipType}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      member.attendanceStatus === 'ACTIVE' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {member.attendanceStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-3xl text-primary-900 mb-2">Master Admin Dashboard</h2>
              <p className="text-neutral-600">Complete system overview and management</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                <div className="p-3 bg-primary-500 rounded-lg w-fit mb-4">
                  <Users size={24} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-primary-700 mb-2">Total Members</h3>
                <p className="text-3xl font-bold text-primary-900">245</p>
                <p className="text-xs text-primary-600 mt-1">Across all caregroups</p>
              </div>

              <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="p-3 bg-blue-500 rounded-lg w-fit mb-4">
                  <UserPlus size={24} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-blue-700 mb-2">Caregroup Leaders</h3>
                <p className="text-3xl font-bold text-blue-900">12</p>
                <p className="text-xs text-blue-600 mt-1">Active leaders</p>
              </div>

              <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="p-3 bg-purple-500 rounded-lg w-fit mb-4">
                  <Shield size={24} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-purple-700 mb-2">Total Caregroups</h3>
                <p className="text-3xl font-bold text-purple-900">15</p>
                <p className="text-xs text-purple-600 mt-1">Active groups</p>
              </div>

              <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="p-3 bg-green-500 rounded-lg w-fit mb-4">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-green-700 mb-2">Attendance Rate</h3>
                <p className="text-3xl font-bold text-green-900">87%</p>
                <p className="text-xs text-green-600 mt-1">This month</p>
              </div>
            </div>

            <div className="card">
              <h3 className="font-heading text-xl mb-4">Admin Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <p className="font-semibold mb-2">✓ Full Member Management</p>
                  <p className="text-sm text-neutral-600">Create, edit, and manage all member profiles</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <p className="font-semibold mb-2">✓ Caregroup Assignment</p>
                  <p className="text-sm text-neutral-600">Assign members to caregroups and assign leaders</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <p className="font-semibold mb-2">✓ Analytics & Reports</p>
                  <p className="text-sm text-neutral-600">View comprehensive analytics and generate reports</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <p className="font-semibold mb-2">✓ System Configuration</p>
                  <p className="text-sm text-neutral-600">Manage system settings and configurations</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'user' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-3xl text-primary-900 mb-2">Regular User Dashboard</h2>
              <p className="text-neutral-600">Personal dashboard for church members</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VerseOfTheDay />
              
              <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="p-3 bg-green-500 rounded-lg w-fit mb-4">
                  <QrCode size={24} className="text-white" />
                </div>
                <h3 className="font-heading text-xl mb-3">My QR Code</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Your unique membership QR code for attendance tracking
                </p>
                <button className="btn-primary w-full">
                  View QR Code
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="font-heading text-xl mb-4">Upcoming Bible Studies</h3>
              <div className="space-y-3">
                {mockBibleStudies.map((study) => (
                  <div key={study.id} className="p-4 bg-neutral-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-neutral-900">{study.title}</p>
                        <p className="text-sm text-neutral-600 mt-1">{study.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-neutral-500">
                          <span>{new Date(study.date).toLocaleDateString()}</span>
                          <span>{study.time}</span>
                          <span>{study.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-neutral-200 text-center space-y-2">
          <p className="text-sm text-neutral-500">
            Portfolio Showcase - UPC VOT MINTAL Church Management System
          </p>
          <p className="text-sm font-semibold text-primary-700">
            Created by <span className="text-primary-900">Alvin Villamero</span> for UPC VOT Mintal
          </p>
          <p className="text-xs text-neutral-400 mt-2">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </footer>
      </main>
    </div>
  );
}
