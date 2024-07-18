'use client';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import App from '@/app/components/App';
import { availableSchedule } from '../util';
import { useSearchParams } from 'next/navigation';

export default function Dashboard() {
  const searchParams = useSearchParams();
  const [yourSchedule, updateYourSchedule] = useState<AvailableScheduleItem[]>(
    _.cloneDeep(availableSchedule)
  );

  const code = searchParams.get('code');

  const fetchToken = useCallback(async () => {
    const res = await fetch('/api/twitter', {
      method: 'POST',
      body: JSON.stringify({ code }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      const data = await res.json();
      console.log('data: ', data);
    }
  }, [code]);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return (
    <App yourSchedule={yourSchedule} updateYourSchedule={updateYourSchedule} />
  );
}
