'use client';

import { confirmSignUp } from 'aws-amplify/auth';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get('email');

  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emailFromQuery) {
      setUsername(emailFromQuery);
    }
  }, [emailFromQuery]);

  const handleVerify = async () => {
    setLoading(true);
    try {
      await confirmSignUp({ username, confirmationCode: code });
      setMessage('✅ Verifikasi berhasil! Mengarahkan ke halaman login...');
      setTimeout(() => {
        router.push('/Signin');
      }, 2000);
    } catch (error: any) {
      setMessage('❌ Gagal verifikasi: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl mb-4 font-bold">Verifikasi Email</h1>

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Email / Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={!!emailFromQuery}
      />

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Kode Verifikasi"
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleVerify}
        disabled={!code || !username || loading}
      >
        {loading ? 'Memverifikasi...' : 'Verifikasi'}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
