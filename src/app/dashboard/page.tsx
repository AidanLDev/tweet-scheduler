'use client';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import App from '@/app/components/App';
import { availableSchedule } from '../util';
import { useSearchParams } from 'next/navigation';
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotPopup } from '@copilotkit/react-ui';

import '@copilotkit/react-ui/styles.css';
import '@copilotkit/react-textarea/styles.css';

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
    <CopilotKit runtimeUrl='/api/copilotkit/'>
      <App
        yourSchedule={yourSchedule}
        updateYourSchedule={updateYourSchedule}
      />
      <CopilotPopup
        instructions='Help the user create and manage their personal brand'
        defaultOpen={true}
        labels={{
          title: 'Posts Scheduler Copilot',
          initial:
            'Hello there! I can help you manage your schedule. WHat do you want to do? You can generate posts, add, and delete scheduled posts.',
        }}
        clickOutsideToClose={false}
      ></CopilotPopup>
    </CopilotKit>
  );
}
