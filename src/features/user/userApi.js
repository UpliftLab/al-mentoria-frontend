import PersistData from '../../app/persistData';
import CONFIG from '../../config.json';

export async function signinRequest(email, password) {
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
    throw new Error('Can not sign in user with the provided Endpoint');
  }

  try {
    const data = await response.json();
    const storage = new PersistData('al-mentoria-data');
    storage.set('token', data.data.token);
    return data;
  } catch (error) {
    throw new Error('Can not get JSON from the response');
  }
}

export async function signup(name, email, password) {
  const endpoint = '/users';

  const data = {
    name,
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
    throw new Error('Can not sign up user with the provided Endpoint');
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Can not get JSON from the response');
  }
}

export async function authenticate(token) {
  const endpoint = '/users/me';

  const response = await fetch(CONFIG.BASE_URL + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response || response.status !== 200) {
    throw new Error('Can not sign in user with the provided Endpoint');
  }

  try {
    const data = await response.json();
    const storage = new PersistData('al-mentoria-data');
    storage.set('token', data.data.token);
    return data;
  } catch (error) {
    throw new Error('Can not get JSON from the response');
  }
}
