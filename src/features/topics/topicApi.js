import CONFIG from '../../config.json';

export default async function getTopicsFromApi(token) {
  const endpoint = '/topics';

  const response = await fetch(CONFIG.BASE_URL + endpoint, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response || response.status !== 200) {
    throw new Error('You are not authorized to make this request');
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Can not get JSON from the response');
  }
}

export async function createTopicInApi(data) {
  const endpoint = '/topics';
  const { token, body } = data;
  const response = await fetch(CONFIG.BASE_URL + endpoint, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response || response.status !== 201) {
    throw new Error('You are not authorized to make this request');
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Can not get JSON from the response');
  }
}

export async function deleteTopicInApi(data) {
  const { token, id } = data;
  const endpoint = `/topics/${id}`;
  const response = await fetch(CONFIG.BASE_URL + endpoint, {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response || response.status !== 204) {
    throw new Error('You are not authorized to make this request');
  }

  return id;
}
