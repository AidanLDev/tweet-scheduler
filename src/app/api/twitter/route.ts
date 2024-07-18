import { NextRequest, NextResponse } from 'next/server';

const BasicAuthToken = Buffer.from(
  `${process.env.TWITTER_CLIENT_ID!}:${process.env.TWITTER_CLIENT_SECRET!}`,
  'utf-8'
).toString('base64');

const twitterOauthTokenParams = {
  client_id: process.env.TWITTER_CLIENT_ID!,
  code_verifier: '8KxxO-RPl0bLSxX5AWwgdiFbMnry_VOKzFeIlVA7NoA',
  redirect_uri: `http://www.localhost:3000/dashboard`,
  grant_type: 'authorization_code',
};

export const fetchUserToken = async (code: string) => {
  try {
    const formatData = new URLSearchParams({
      ...twitterOauthTokenParams,
      code,
    });
    const getTokenRequest = await fetch(
      'https://api.twitter.com/2/oauth2/token',
      {
        method: 'POST',
        body: formatData.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${BasicAuthToken}`,
        },
      }
    );
    const getTokenResponse = await getTokenRequest.json();
    return getTokenResponse;
  } catch (err) {
    console.error('Failed to fetch users token: ', err);
    return null;
  }
};

export const fetchUserData = async (accessToken: string) => {
  try {
    const getUserRequest = await fetch('https://api.twitter.com/2/users/me', {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const getUserProfile = await getUserRequest.json();
    return getUserProfile;
  } catch (err) {
    console.error('Failed to fetch user data: ', err);
  }
};
