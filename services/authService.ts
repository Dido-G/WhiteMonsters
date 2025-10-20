// services/api.ts
const API_URL = "http://10.183.99.188:5000/auth";
export async function signupUser(data: { username: string; password: string }) {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = (errorData as { message?: string }).message || 'Signup failed';
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result; // { success: true, token: '...' }
  } catch (err: any) {
    throw new Error(err.message);
  }
}


export async function login(username: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = (errorData as { message?: string }).message || 'Login failed';
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result; // { success: true, token: '...' }
  } catch (err: any) {
    throw new Error(err.message);
  }
} 
