'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth-store';
import api from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, user } = useAuthStore();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    setMounted(true);
    if (isAuthenticated && user) {
      if (user.role === 'MASTER_ADMIN') {
        router.push('/admin');
      } else if (user.role === 'CAREGROUP_LEADER') {
        router.push('/leader');
      } else {
        router.push('/user');
      }
    }
  }, [isAuthenticated, user, router]);

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="text-center">
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      const { token, refreshToken, user } = response.data;

      if (!token || !refreshToken || !user) {
        setError('Invalid response from server');
        return;
      }

      login(token, refreshToken, user);

      // Small delay to ensure state is saved
      setTimeout(() => {
        // Redirect based on role
        if (user.role === 'MASTER_ADMIN') {
          router.push('/admin');
          router.refresh();
        } else if (user.role === 'CAREGROUP_LEADER') {
          router.push('/leader');
          router.refresh();
        } else {
          router.push('/user');
          router.refresh();
        }
      }, 100);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8 py-3">
          <div className="flex justify-center mb-4">
            {!logoError ? (
              <img 
                src="/logo.png" 
                alt="UPC VOT MINTAL Logo" 
                className="h-32 md:h-40 w-auto"
                onError={() => setLogoError(true)}
              />
            ) : null}
          </div>
          {logoError && (
            <h1 className="font-heading text-4xl md:text-5xl text-primary-900 mb-2">
              UPC VOT MINTAL
            </h1>
          )}
          <div className="w-20 h-1 bg-secondary-500 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-neutral-600">Welcome back</p>
          <p className="text-sm text-primary-600 font-semibold mt-2">(Portfolio Demo)</p>
        </div>

        {/* Login Card */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Demo Credentials Info */}
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <ul className="space-y-1 text-left">
                <li>• <strong>admin</strong> - Master Admin</li>
                <li>• <strong>leader</strong> - Caregroup Leader</li>
                <li>• <strong>user</strong> - Regular User</li>
              </ul>
              <p className="mt-2 text-xs">Any password works for demo</p>
            </div>

            <div>
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="input"
                placeholder="Enter your username"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="input"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-neutral-500">
            <p>Church Membership Management System</p>
            <p className="text-xs mt-1">Portfolio Demo Version</p>
          </div>
        </div>
      </div>
    </div>
  );
}

