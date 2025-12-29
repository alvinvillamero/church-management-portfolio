'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { BookOpen, Sparkles } from 'lucide-react';

interface Verse {
  id: string;
  verse: string;
  reference: string;
  reflection?: string;
  date: string;
}

interface VerseOfTheDayProps {
  className?: string;
  onView?: () => void;
}

export default function VerseOfTheDay({ className = '', onView }: VerseOfTheDayProps) {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [isViewed, setIsViewed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodaysVerse();
  }, []);

  const fetchTodaysVerse = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/verses/today');
      if (response.data.verse) {
        setVerse(response.data.verse);
        setIsViewed(response.data.isViewed || false);
      }
    } catch (err: any) {
      console.error('Failed to fetch verse:', err);
      setError('Failed to load verse of the day');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsViewed = async () => {
    if (!verse || isViewed) return;

    try {
      await api.post('/verses/view', { verseId: verse.id });
      setIsViewed(true);
      if (onView) {
        onView();
      }
    } catch (err: any) {
      console.error('Failed to mark verse as viewed:', err);
    }
  };

  if (loading) {
    return (
      <div className={`group relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100 border-2 border-purple-200 rounded-xl p-4 sm:p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-neutral-200 rounded w-1/4 mb-3"></div>
          <div className="h-6 bg-neutral-200 rounded w-full mb-2"></div>
        </div>
      </div>
    );
  }

  // Show card even when there's no verse to maintain design balance
  if (error || !verse) {
    return (
      <div className={`group relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100 border-2 border-purple-200 rounded-xl p-4 sm:p-6 ${className}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg shadow-lg">
                <BookOpen size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-heading text-xl text-purple-900 mb-1">Verse of the Day</h3>
                <p className="text-xs text-purple-600 font-medium">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* No Verse Message */}
          <div className="bg-white rounded-lg p-6 sm:p-8 border-2 border-purple-100 shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <BookOpen size={32} className="text-purple-400" />
            </div>
            <p className="text-base sm:text-lg font-semibold text-neutral-700 mb-2">No New Verse for Today</p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Check back later for today's inspirational verse.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100 border-2 border-purple-200 rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:border-purple-400 ${className}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full -mr-16 -mt-16 group-hover:bg-purple-300/30 transition-colors duration-300"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <BookOpen size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-heading text-xl text-purple-900 mb-1">Verse of the Day</h3>
              <p className="text-xs text-purple-600 font-medium">
                {new Date(verse.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          {!isViewed && (
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full shadow-sm">
              <Sparkles size={14} className="text-purple-700" />
              <span className="text-xs font-bold text-purple-800">New</span>
            </div>
          )}
        </div>

        {/* Verse Content */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 sm:p-5 border-2 border-purple-100 shadow-sm">
            <p className="text-base sm:text-lg text-neutral-800 leading-relaxed italic mb-4 text-center">
              "{verse.verse}"
            </p>
            <div className="flex items-center justify-center space-x-2 pt-3 border-t border-purple-100">
              <div className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent flex-1"></div>
              <p className="text-sm font-bold text-purple-700 px-3">
                {verse.reference}
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent flex-1"></div>
            </div>
          </div>

          {verse.reflection && (
            <div className="bg-white/80 rounded-lg p-4 border border-purple-100 shadow-sm">
              <p className="text-xs font-semibold text-purple-700 mb-2 uppercase tracking-wide">Reflection</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {verse.reflection}
              </p>
            </div>
          )}

          {!isViewed && (
            <button
              onClick={handleMarkAsViewed}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3.5 sm:py-3 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2 min-h-[44px] touch-manipulation"
              style={{ padding: 'clamp(0.75rem, 2vw, 0.875rem) clamp(1.5rem, 4vw, 2rem)' }}
            >
              <Sparkles size={16} className="flex-shrink-0" />
              <span>Mark as Read</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

