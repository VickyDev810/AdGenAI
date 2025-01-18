export const generateAdPrompt = async (textInput: string, image: string | null): Promise<{ advertisement?: string; error?: string }> => {
    try {
        const response = await fetch('http://localhost:5000/generate_ad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput, image: image }),
        });

        const data = await response.json();
        console.log('API Response:', data); // Log the API response

        if (data.advertisement) {
            return { advertisement: data.advertisement };
        } else {
            return { error: data.error || 'Unknown error occurred' };
        }
    } catch (error) {
        console.error('Error in API call:', error);
        return { error: 'An error occurred while generating the ad prompt.' };
    }
};
