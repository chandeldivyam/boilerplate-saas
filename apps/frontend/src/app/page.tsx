// ./apps/frontend/src/app/page.tsx
import { apiClient } from "@/lib/utils"; // Use alias path

// Define an interface for the expected organization data structure
interface Organization {
  organizationId: string;
  name: string;
}

async function getOrganizations(): Promise<Organization[]> {
  try {
    // Use the apiClient helper
    const response = await apiClient("/api/organizations", {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `API Error: ${response.status} ${response.statusText}`,
        errorText
      );
      // Throw an error to trigger the nearest error boundary (error.tsx)
      throw new Error(
        `Failed to fetch organizations: ${response.status} ${response.statusText}`
      );
    }

    const data: Organization[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return []; // Return empty array on error for graceful degradation in this example
  }
}

export default async function Home() {
  // Fetch data directly in the Server Component
  const organizations = await getOrganizations();

  return (
    <div>
      <h1>Home</h1>
      <h2>Organizations (Fetched Server-Side)</h2>
      {organizations.length > 0 ? (
        <ul>
          {organizations.map((org) => (
            <li key={org.organizationId}>{org.name}</li>
          ))}
        </ul>
      ) : (
        <p>No organizations found or error fetching data.</p>
      )}
    </div>
  );
}
