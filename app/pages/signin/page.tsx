'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SigninPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (res?.error) {
      setMessage('❌ Invalid email or password');
    } else {
      setMessage('✅ Logged in successfully!');
      router.push('/'); // Redirect to homepage
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors'>
      <div className='w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors'>
        <h1 className='text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white'>
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
              Email
            </label>
            <input
              type='email'
              placeholder='you@example.com'
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300'>
              Password
            </label>
            <input
              type='password'
              placeholder='••••••••'
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                       text-white font-semibold py-2 rounded-lg transition disabled:opacity-50'
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.startsWith('✅')
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {message}
          </p>
        )}

        <p className='text-center text-sm text-gray-600 dark:text-gray-400 mt-6'>
          Don’t have an account?{' '}
          <a
            href='/pages/signup'
            className='text-blue-600 dark:text-blue-400 hover:underline font-medium'
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
