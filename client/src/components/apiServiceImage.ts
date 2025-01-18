// src/components/apiServiceImage.ts

// Function to call the /generate_image endpoint
export const generateImage = async (prompt: string): Promise<{ imageUrl?: string; error?: string }> => {
    try {
        const response = await fetch('http://localhost:5001/generate_image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const error = await response.json();
            return { error: error.message || 'Failed to generate image' };
        }

        const data = await response.json();
        return { imageUrl: data.image_url };
    } catch (err) {
        return { error: 'Error communicating with the server' };
    }
};
