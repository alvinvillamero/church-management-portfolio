'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface AttendanceStatus {
  statusLevel: 1 | 2 | 3;
  absences: number;
  attendanceStatus: string;
  followUpStatus: string | null;
  lastAttendanceDate: string | null;
  notificationMessage: string;
  statusColor: 'green' | 'yellow' | 'red';
  progressPercentage: number;
  caregroupLeader: {
    name: string;
    caregroupName: string;
  } | null;
}

interface AttendanceStatusBarProps {
  className?: string;
}

export default function AttendanceStatusBar({ className = '' }: AttendanceStatusBarProps) {
  const [status, setStatus] = useState<AttendanceStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAttendanceStatus();
  }, []);

  const fetchAttendanceStatus = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/users/me/attendance-status');
      setStatus(response.data as AttendanceStatus);
    } catch (err: any) {
      console.error('Failed to fetch attendance status:', err);
      setError('Failed to load attendance status');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`card ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-neutral-200 rounded w-1/4 mb-3"></div>
          <div className="h-6 bg-neutral-200 rounded w-full mb-2"></div>
        </div>
      </div>
    );
  }

  if (error || !status) {
    return null; // Don't show anything if there's an error or no status
  }

  const getStatusIcon = () => {
    if (status.statusLevel === 1) {
      return <CheckCircle size={20} className="text-green-600" />;
    } else if (status.statusLevel === 2) {
      return <AlertCircle size={20} className="text-yellow-600" />;
    } else {
      return <XCircle size={20} className="text-red-600" />;
    }
  };

  const getStatusLabel = () => {
    if (status.statusLevel === 1) {
      return 'Good Standing';
    } else if (status.statusLevel === 2) {
      return 'Warning';
    } else {
      return 'Needs Follow-up';
    }
  };

  const getProgressBarGradient = () => {
    if (status.statusLevel === 1) {
      return 'bg-gradient-to-r from-green-400 via-green-500 to-green-600';
    } else if (status.statusLevel === 2) {
      return 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600';
    } else {
      return 'bg-gradient-to-r from-red-400 via-red-500 to-red-600';
    }
  };

  const getProgressBarBgColor = () => {
    if (status.statusLevel === 1) {
      return 'bg-gradient-to-r from-green-50 to-green-100';
    } else if (status.statusLevel === 2) {
      return 'bg-gradient-to-r from-yellow-50 to-yellow-100';
    } else {
      return 'bg-gradient-to-r from-red-50 to-red-100';
    }
  };

  const getProgressBarShadow = () => {
    if (status.statusLevel === 1) {
      return 'shadow-lg shadow-green-500/50';
    } else if (status.statusLevel === 2) {
      return 'shadow-lg shadow-yellow-500/50';
    } else {
      return 'shadow-lg shadow-red-500/50';
    }
  };

  return (
    <div className={`card ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <h3 className="font-heading text-lg text-primary-900">Attendance Status</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          status.statusLevel === 1
            ? 'bg-green-100 text-green-800'
            : status.statusLevel === 2
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {getStatusLabel()}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-neutral-700">Consecutive Absences</span>
          <span className={`text-sm font-bold ${
            status.statusLevel === 1
              ? 'text-green-600'
              : status.statusLevel === 2
              ? 'text-yellow-600'
              : 'text-red-600'
          }`}>
            {status.absences} / 3
          </span>
        </div>
        <div className={`w-full h-8 rounded-full overflow-hidden ${getProgressBarBgColor()} border-2 ${
          status.statusLevel === 1
            ? 'border-green-200'
            : status.statusLevel === 2
            ? 'border-yellow-200'
            : 'border-red-200'
        }`}>
          <div
            className={`h-full transition-all duration-700 ease-out ${getProgressBarGradient()} ${getProgressBarShadow()} relative`}
            style={{ width: `${status.progressPercentage}%` }}
          >
            {/* Shine effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            {/* Progress percentage text */}
            <div className="h-full w-full flex items-center justify-end pr-3 relative z-10">
              {status.progressPercentage > 15 && (
                <span className="text-xs font-bold text-white drop-shadow-md">
                  {Math.round(status.progressPercentage)}%
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Level Indicators */}
        <div className="flex justify-between mt-1">
          <div className={`text-xs ${status.absences === 0 ? 'font-bold text-green-600' : 'text-neutral-400'}`}>
            Level 1
          </div>
          <div className={`text-xs ${status.absences === 1 || status.absences === 2 ? 'font-bold text-yellow-600' : 'text-neutral-400'}`}>
            Level 2
          </div>
          <div className={`text-xs ${status.absences >= 3 ? 'font-bold text-red-600' : 'text-neutral-400'}`}>
            Level 3
          </div>
        </div>
      </div>

      {/* Notification Alert */}
      {status.notificationMessage && (
        <div className={`p-4 rounded-lg border-l-4 ${
          status.statusLevel === 1
            ? 'bg-green-50 border-green-500'
            : status.statusLevel === 2
            ? 'bg-yellow-50 border-yellow-500'
            : 'bg-red-50 border-red-500'
        }`}>
          <div className="flex items-start space-x-3">
            {getStatusIcon()}
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                status.statusLevel === 1
                  ? 'text-green-800'
                  : status.statusLevel === 2
                  ? 'text-yellow-800'
                  : 'text-red-800'
              }`}>
                {status.notificationMessage}
              </p>
              {status.caregroupLeader && status.statusLevel === 3 && (
                <p className="text-xs text-neutral-600 mt-1">
                  Your caregroup leader: <span className="font-semibold">{status.caregroupLeader.name}</span> ({status.caregroupLeader.caregroupName})
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Last Attendance Date */}
      {status.lastAttendanceDate && (
        <div className="mt-3 text-xs text-neutral-500">
          Last attended: {new Date(status.lastAttendanceDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      )}
    </div>
  );
}

