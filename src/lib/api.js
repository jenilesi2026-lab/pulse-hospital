export const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const envUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const baseUrl = envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
  
  const response = await fetch(`${baseUrl}${endpoint}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
};
