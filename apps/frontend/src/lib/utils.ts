// ./apps/frontend/src/lib/utils.ts

/**
 * Returns the appropriate API URL based on the execution context (server or client).
 */
export const getApiUrl = (): string => {
  // Check if running on the server (Node.js environment)
  if (typeof window === "undefined") {
    if (!process.env.INTERNAL_API_URL) {
      throw new Error("INTERNAL_API_URL environment variable is not set.");
    }
    return process.env.INTERNAL_API_URL;
  }

  // Running on the client (browser)
  if (!process.env.NEXT_PUBLIC_API_URL) {
    // This check might seem redundant because Next.js includes NEXT_PUBLIC_ vars
    // automatically, but it's good practice for clarity and robustness.
    throw new Error("NEXT_PUBLIC_API_URL environment variable is not set.");
  }
  return process.env.NEXT_PUBLIC_API_URL;
};

/**
 * A simple fetch wrapper that uses the correct API URL.
 * You might want to expand this into a more robust API client.
 */
export const apiClient = async (
  path: string,
  options?: RequestInit
): Promise<Response> => {
  const baseUrl = getApiUrl();
  const url = `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`; // Ensure leading slash

  return fetch(url, options);
};
