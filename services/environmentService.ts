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

    const data = await response.json() as { error?: string; [key: string]: any };

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
      const errorMsg = (data && typeof data === 'object' && 'error' in data)
        ? (data as { error?: string }).error
        : undefined;
      throw new Error(errorMsg || 'Failed to fetch environments');
    }

    return data; 
  } catch (err) {
    console.error('Error fetching environments:', err);
    throw err; 
  }
};

export const updateEnvironment = async (id: string, name: string) => {
  try {
    const response = await fetch(`${API_URL}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name }),
    });
    const data = await response.json() as { error?: string; [key: string]: any };

    if (!response.ok) {
      throw new Error(data.error || 'Failed to update environment');
    }

    return data;
  } catch (err) {
    console.error('Error updating environment:', err);
    throw err;
  }
};
export const deleteEnvironment = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json() as { error?: string; [key: string]: any };

    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete environment');
    }

    return data;
  } catch (err) {
    console.error('Error deleting environment:', err);
    throw err;
  }
};


