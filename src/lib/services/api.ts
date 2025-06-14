export const API_BASE_URL = "http://localhost:3000";

export const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  return fetch(`${API_BASE_URL}${url}`, options).then((res) => {
    return res.json() as Promise<T>;
  });
};
