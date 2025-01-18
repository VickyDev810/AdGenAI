import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Questionnaire from '../components/QuestionComponent';

function HomePage() {
    const questions = [
        'What is your desired aspect ratio?',
        'What sector does your image belong to?',
        'Do you want a specific reference stock image?',
    ];

    const aspectRatios = ['16:9', '9:16', '4:3', '1:1', '3:2', '1:2', '2:1', '5:3'];

    const fetchImages = async (query: string) => {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
        );
        const data = await response.json();
        return data.results.map((item: any) => item.urls.small);
    };

    const handleComplete = (answers: string[]) => {
        console.log('Completed Answers:', answers);
    };

    return (
        <div className="flex flex-col h-screen" style={{ fontFamily: 'Poppins' }}>
            <Header />
            <div className="flex-grow flex">
            <div className="w-[40%] px-10 bg-footer flex flex-col justify-center items-start">
                <h1 className="text-2xl font-bold mb-1 text-center">Create Personalized Ads</h1>
                <div className='flex w-full h-fit border border-blue rounded-lg mb-4 mt-1 '>
               
                    <div className="relative w-full h-56 bg-white rounded-lg">
                    <textarea 
                    class=" rounded-lg  px-8 w-full h-[70%] pt-5 text-xl border-none outline-none scroll-smooth overflow-auto scrollbar-hide resize-none" 
                    rows="3" 
                    placeholder="Enter prompt"
                    
                    >

                    </textarea>

                        
                        <button className="absolute top-40 left-2  text-white rounded-full p-2 flex justify-center">
                            <img src="bulb.png" alt="Icon" className="h-10 w-10" />
                        </button>
                    </div>
                </div>

                    <button className="flex gap-3 bg-violet text-white rounded-lg p-5 mb-10 justify-center">
                        Quick Generate
                        <img src="arrow.png" className="h-5 w-5" />
                    </button>
                    <div className="flex justify-center mb-4 w-full">
                        <button className="bg-signinpurple rounded-lg p-2 mx-2 text-white w-full h-20">
                            Text to Image
                        </button>
                        <button className="bg-signinpurple rounded-lg p-2 mx-2 text-white w-full h-20">
                            Image to Image
                        </button>
                    </div>
                </div>
                <div className="w-[60%] p-10 bg-gray-200 overflow-hidden relative">
                    <Questionnaire
                        questions={questions}
                        aspectRatios={aspectRatios}
                        onComplete={handleComplete}
                        fetchImages={fetchImages}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
