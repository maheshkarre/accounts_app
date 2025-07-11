'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);
  const [showDots, setShowDots] = useState(false);
  const [error, setError] = useState('');
  const [showLoginAnimation, setShowLoginAnimation] = useState(false);
  
   useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      router.replace('/dashboard'); // Prevent back to login if already logged in
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
      } else {
        localStorage.setItem('user', data.user.username);
        localStorage.setItem('role', data.user.role);

        setShowLoginAnimation(true);

        setTimeout(() => {
          if (data.user.role === 'faculty') {
            router.push('/dashboard/payments-search');
          } else {
            router.push('/dashboard');
          }
        }, 2500); // Delay for login animation
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-login if credentials filled (optional feature)
  useEffect(() => {
    if (credentials.username && credentials.password && credentials.role) {
      const timer = setTimeout(() => {
        const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
        handleLogin(fakeEvent);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [credentials]);

  // Show bouncing dots after 5s of loading
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setShowDots(true), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowDots(false);
    }
  }, [loading]);

  // ✅ Login transition animation
  if (showLoginAnimation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="p-6 rounded-full bg-blue-700/30 border border-blue-500/40 inline-block">
            <BookOpen className="h-16 w-16 text-blue-300 animate-pulse" />
          </div>
          <p className="text-white mt-4 text-lg font-semibold animate-pulse">Logging you in...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-2xl bg-blue-600/20 border border-blue-500/20">
              <BookOpen className="h-12 w-12 text-blue-400" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">CJITS</h1>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
          <h2 className="text-2xl text-center text-white font-bold mb-2">Welcome back</h2>
          <p className="text-center text-slate-400 text-sm mb-4">Sign in to your account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm mb-1">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full p-2 rounded bg-slate-800/50 border border-slate-600 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-1">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full p-2 rounded bg-slate-800/50 border border-slate-600 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-1">Role</label>
              <select
                value={credentials.role}
                onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
                className="w-full p-2 rounded bg-slate-800/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="accountant">Accountant</option>
                <option value="faculty">Faculty</option>
                <option value="student">Student</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  Signing in...
                  {showDots && (
                    <div className="flex space-x-1">
                      <motion.span
                        className="w-1.5 h-1.5 bg-white rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-1.5 h-1.5 bg-white rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-1.5 h-1.5 bg-white rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  )}
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>

        {/* Animated Feature Icons */}
        <div className="grid grid-cols-3 gap-4 text-center mt-4">
          {[
            { icon: <Zap className="h-5 w-5 text-green-400" />, label: 'Fast Update', bg: 'bg-green-600/20', border: 'border-green-500/20' },
            { icon: <BookOpen className="h-5 w-5 text-purple-400" />, label: 'Paperless Update', bg: 'bg-purple-600/20', border: 'border-purple-500/20' },
            { icon: <Shield className="h-5 w-5 text-orange-400" />, label: 'Secure Updates', bg: 'bg-orange-600/20', border: 'border-orange-500/20' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: 0, ease: 'easeInOut' }}
              className="space-y-2"
            >
              <div className={`p-2 rounded-lg mx-auto w-fit ${item.bg} ${item.border} border`}>
                {item.icon}
              </div>
              <p className="text-xs text-slate-400">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

