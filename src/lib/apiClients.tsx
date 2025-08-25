// lib/apiClient.ts
export const apiPost = async <T = never>(url: string, data: never): Promise<T> => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`POST ${url} failed: ${response.status}`);
    }

    return response.json();
};

export const apiPut = async <T = never>(url: string, data: never): Promise<T> => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`PUT ${url} failed: ${response.status}`);
    }

    return response.json();
};

export const apiDelete = async <T = never>(url: string): Promise<T> => {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`DELETE ${url} failed: ${response.status}`);
    }

    return response.json();
};


// lib/apiClient.ts

export const apiGet = async <T = never>(url: string, params?: Record<string, never>): Promise<T> => {
    const query = params
        ? '?' +
        new URLSearchParams(
            Object.entries(params).reduce((acc, [key, value]) => {
                if (value !== undefined && value !== null) acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        ).toString()
        : '';

    const response = await fetch(`${url}${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`GET ${url} failed: ${response.status}`);
    }

    return response.json();
};

// Azure API client with authentication
export const azureApiGet = async <T = never>(endpoint: string, authToken: string): Promise<T> => {
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Azure API GET ${endpoint} failed: ${response.status}`);
    }

    return response.json();
};

// Test function to debug Azure API connection
export const testAzureConnection = async (endpoint: string, authToken: string) => {
    try {
        console.log('Testing connection to:', endpoint);
        console.log('With auth token:', authToken ? 'Present' : 'Missing');
        
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
            const errorText = await response.text();
            console.log('Error response body:', errorText);
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Response data:', data);
        return data;
    } catch (error) {
        console.error('Connection test failed:', error);
        throw error;
    }
};
