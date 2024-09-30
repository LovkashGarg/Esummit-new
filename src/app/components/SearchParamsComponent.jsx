'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SearchParamsComponent({ eventsSectionRef }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo');
    if (scrollTo === 'events') {
      eventsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchParams]);

  return null;
}
