import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Questionnaire from '../components/QuestionComponent';
import { generateAdPrompt } from '../components/services';  // Import the service for generating prompt
import { generateImage } from '../components/apiServiceImage'; // Import the image generation service



function HomePage() {
    const questions = [
        'What is your desired aspect ratio?',
        'What sector does your image belong to?',
        'What is the targer age group?',
        'Do you want a specific reference stock image?',
    ];

    const aspectRatios = ['16:9', '9:16', '4:3', '1:1', '3:2', '1:2', '2:1', '5:3',"12:6"];

    // State for user input, generated prompt, image URL, and loading state
    const [userInput, setUserInput] = useState('');
    const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchImages = async (query: string) => {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
        );
        const data = await response.json();
        return data.results.map((item: any) => item.urls.small);
    };

    const handleComplete = (answers: string[]) => {
        console.log('All Answers:', answers);
    };

    // Function to handle prompt generation (on bulb icon click)
    const handleGeneratePrompt = async () => {
        const { advertisement, error } = await generateAdPrompt(userInput, null);  // Call the service to generate prompt

        if (advertisement) {
            console.log('Generated Prompt:', advertisement); // Log the generated prompt
            setGeneratedPrompt(advertisement);  // Update state with generated prompt
            setUserInput(advertisement); // Set the generated prompt into the text area
        } else {
            console.error('Error generating prompt:', error);
            alert('Failed to generate prompt. Please try again.');
        }
    };

    // Function to handle image generation (on Quick Generate button click)
    const handleQuickGenerate = async () => {
        setLoading(true); // Set loading state to true while waiting for the image
        const { imageUrl, error } = await generateImage(generatedPrompt || '');  // Call the API to generate the image based on the prompt
        setLoading(false);

        if (imageUrl) {
            setGeneratedImage(imageUrl); // Set the generated image URL if successful
        } else {
            console.error('Image generation failed:', error);
            alert('Failed to generate image. Please try again.');
        }
    };

    return (
        <div className="flex flex-col h-screen" style={{ fontFamily: 'Poppins' }}>
            <Header />
            <div className="flex-grow flex">
                <div className="w-[40%] px-10 flex flex-col justify-center items-start drop-shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
                    <h1 className="text-violet text-3xl font-extrabold mb-1 text-center">CREATE PERSONALIZED ADS</h1>
                    <div className="flex w-full h-fit border border-blue rounded-lg mb-4 mt-1 ">
                        <div className="relative w-full h-56 bg-white rounded-lg">
                            <textarea
                                className="rounded-lg px-8 w-full h-[70%] pt-5 text-xl border-none outline-none scroll-smooth overflow-auto scrollbar-hide resize-none"
                                rows={3}
                                placeholder="Enter prompt"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)} // Update state on input change
                            />
                            <button
                                className="absolute top-40 left-2 text-white rounded-full p-2 flex justify-center"
                                onClick={handleGeneratePrompt} // Call handleGeneratePrompt to generate the ad prompt
                            >
                                <img src="bulb.png" alt="Icon" className="h-10 w-10" />
                            </button>
                            
                        </div>
                        
                    </div>

                    <button
                        className="flex gap-3 bg-violet text-white rounded-lg p-5 mb-10 justify-center"
                        onClick={handleQuickGenerate} // Call handleQuickGenerate to generate the image
                    >
                        Quick Generate
                        <img src="arrow.png" className="h-5 w-5" />
                    </button>

                    <div className="flex justify-center mb-4 w-full">
                        <button className="bg-buttonblue hover:bg-buttonbluehover rounded-lg p-2 mx-2 text-white w-full h-20">
                            Text to Image
                        </button>
                        <button className="bg-buttonblue hover:bg-buttonbluehover rounded-lg p-2 mx-2 text-white w-full h-20">
                            Image to Image
                        </button>
                    </div>
                    </div>

                {/* Right Section */}
                <div className="w-[60%] bg-heropattern  p-10 bg-gray-200 overflow-hidden relative">
                    {loading ? (
                        <p>Loading...</p> // Show loading text while generating the image
                    ) : generatedImage ? (
                        <div className="flex justify-center items-center border rounded-lg overflow-hidden" style={{ width: '30%', height: '60%' }}>
                            <img src={generatedImage} alt="Generated Ad" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        // Display the questionnaire until the prompt and image are generated
                        <Questionnaire
                            questions={questions}
                            aspectRatios={aspectRatios}
                            onComplete={handleComplete}
                            fetchImages={fetchImages}
                        />
                    )}
                </div>
            </div>
            <Footer />


        </div>
    );
}

export default HomePage;
