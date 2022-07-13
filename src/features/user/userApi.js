import { toast } from 'react-toastify';
import CONFIG from '../../config.json';

export default async function signinRequest(email, password) {
  const endpoint = '/users/sign_in';
  const data = {
    email,
    password,
  };

  const response = await fetch(CONFIG.BASE_URL + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response || response.status !== 200) {
    toast.error('Can not sign in user with the provided Endpoint');
    throw new Error('Can not sign in user with the provided Endpoint');
  }

  try {
    const data = await response.json();
    toast('Successfully logged in');
    return data;
  } catch (error) {
    toast.error('Can not get JSON from the response');
    throw new Error('Can not get JSON from the response');
  }
}
