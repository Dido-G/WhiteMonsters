import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 0); // small delay ensures root layout is mounted

    return () => clearTimeout(timeout);
  }, []);

  return null; // or a loading spinner
}