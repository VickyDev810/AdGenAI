// src/services/apiService.ts

interface GenerateAdResponse {
    advertisement?: string;
    error?: string;
}

export const generateAdPrompt = async (textInput: string, image: string | null): Promise<GenerateAdResponse> => {
    try {
        const response = await fetch('http://localhost:5000/generate_ad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput, image: image }),
        });

        const data = await response.json();

        if (data.advertisement) {
            return { advertisement: data.advertisement };  // Return the generated advertisement
        } else {
            return { error: data.error };  // Return error if present
        }
    } catch (error) {
        console.error('Error connecting to the backend:', error);
        return { error: 'An error occurred while generating the ad prompt.' };
    }
};
