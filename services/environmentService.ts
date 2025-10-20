// environmentService.ts
export const createEnvironment = async (name: string, userId: number) => {
  try {
    const response = await fetch('http://10.179.74.108:5000/environment/add', {
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

    return data; // { message: "Environment created", id: 1 }
  } catch (err) {
    console.error('Error creating environment:', err);
    throw err; // re-throw so the component can handle it
  }
};