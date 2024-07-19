import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';
import cron from 'node-cron';
import { scheduleJobs } from '@/workers';

const redis = new Redis();

export async function POST(req: NextRequest) {
  const { schedule } = await req.json();
  try {
    await redis.set('schedule', JSON.stringify(schedule));
    cron.schedule('* * * * *', async () => {
      console.log('Triggering jobs...');
      await scheduleJobs(schedule);
    });
    return NextResponse.json(
      { message: 'Schedule updated!', schedule },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating schedule', error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const schedule = await redis.get('schedule');
    if (schedule) {
      return NextResponse.json(
        { message: 'Schedule found', schedule: JSON.parse(schedule) },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Schedule not found' },
        { status: 500 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: 'Schedule not found' },
      { status: 500 }
    );
  }
}
