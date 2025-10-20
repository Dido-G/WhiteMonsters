// environmentService.ts

const API_URL = "http://10.183.99.188:5000/environment";
export const createEnvironment = async (name: string, userId: number) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, user_id: userId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create environment');
    }

    return data; 
  } catch (err) {
    console.error('Error creating environment:', err);
    throw err;
  }

  
};


export const getEnvironments = async (userId: number) => {
  try {
    const response = await fetch(`${API_URL}/get?user_id=${userId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch environments');
    }

    return data; 
  } catch (err) {
    console.error('Error fetching environments:', err);
    throw err; 
  }
};