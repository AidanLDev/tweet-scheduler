'use client';
import _ from 'lodash';
import { useState } from 'react';
import App from '@/app/components/App';
import { availableSchedule } from '../util';

export default function Dashboard() {
  //👇🏻 saves a deep copy of the availableSchedule array into the React state
  const [yourSchedule, updateYourSchedule] = useState<AvailableScheduleItem[]>(
    _.cloneDeep(availableSchedule)
  );

  return (
    <App yourSchedule={yourSchedule} updateYourSchedule={updateYourSchedule} />
  );
}
