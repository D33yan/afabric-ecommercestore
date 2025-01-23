'use client'

import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router, mounted]);

  // Don't render anything during SSR or before hydration
  if (!mounted || loading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : null;
}