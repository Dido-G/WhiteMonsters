const API_URL = "http://10.183.99.207:5000/plants"; // match your Flask blueprint route

export const createPlant = async (name: string, environmentId: string, plantType: string = "default") => {

  try {
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        plant_type: plantType,
        enviroment_id: environmentId,
      }),
    });

    const data = await response.json() as { id: number; error?: string };

    if (!response.ok) {
      throw new Error(data.error || "Failed to create plant");
    }

    // Return the Plant object with defaults for the UI
    return {
      id: data.id.toString(),
      name,
      last_watered: "N/A",
      moisture: "N/A",
      light: "N/A",
    };
  } catch (err) {
    console.error("Error creating plant:", err);
    throw err;
  }
};

export const getPlantsByEnvironment = async (environmentId: string) => {
  try {
    const response = await fetch(`${API_URL}/get?environment_id=${environmentId}`);
    const data = await response.json() as { error?: string } & any;

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch plants");
    }

    
    return data.map((p: any) => ({
      id: p.id.toString(),
      name: p.name,
      lastWatered: p.last_watered || "N/A",
      moisture: p.ideal_humidity ? `${p.ideal_humidity}%` : "Unknown",
      light: p.plant_type || "N/A",
    }));
  } catch (err) {
    console.error("Error fetching plants:", err);
    throw err;
  }
};
