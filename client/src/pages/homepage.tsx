import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';



function HomePage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const questions = [
        "What is your desired aspect ratio?",
        "What sector does your image belong to?",
        "Do you want a specific reference stock image?",
    ];

    const aspectRatios = ['16:9', '9:16', '4:3', '1:1', '3:2', '1:2', '2:1', '5:3'];

    const handleNext = (answer: string) => {
        setAnswers((prev) => [...prev, answer]);
        setCurrentQuestion((prev) => prev + 1);
    };

    const handleSkip = () => {
        setAnswers((prev) => [...prev, "Skipped"]);
        setCurrentQuestion((prev) => prev + 1);
    };

    const fetchImages = async (query: string) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${query}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
            );
            const data = await response.json();
            setImages(data.results.map((item: any) => item.urls.small));
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
<<<<<<< HEAD
        <div className="flex h-screen bg-">
            <div className="w-[40%] p-10 bg-black">
                <h1 className="text-4xl font-extrabold text-white mb-5">Summer Jams Concert Series</h1>
                <input
                    type="text"
                    className="border border-white h-52 rounded-lg p-4 w-full mb-4 bg-white"
                    placeholder="Enter your prompt"
                />
               
                <div className="flex items-center mb-4">
                    <button className="bg-blue-600 text-white rounded-lg p-2 mr-2 hover:bg-blue-700">
                        <i className="fas fa-paperclip"></i> {/* Attachment icon */}
                        <i className="fas fa-paperclip"></i> {/* Attachment icon */}
                    </button>
                    <button className="bg-green-500 text-white rounded-lg p-2">
                        <i className="fas fa-bolt"></i> {/* Generate icon */}
=======
        <div className="flex flex-col h-screen" style={{ fontFamily: 'Poppins' }}>
            <Header />
            <div className="flex-grow flex">
                <div className="w-[40%] p-10 bg-footer flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-5 text-center">Create Images</h1>
                    <input
                        type="text"
                        className="border border-blue rounded-lg p-10 w-full mb-4 bg-white text-center"
                        placeholder="Enter your prompt"
                    />
                    <button className="flex gap-3 bg-violet text-white rounded-lg p-5 mb-10 justify-center">
                        Generate
                        <img src="arrow.png" className="h-5 w-5" />
>>>>>>> 5cf70b2c577e6b9c63083051d5fce5554ab1b34b
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
<<<<<<< HEAD
                <button className="bg-yellow-500 text-white rounded-lg p-2 mb-4">Generate</button>
                <div className="flex justify-center mb-4">
                    <button className="bg-gray-300 rounded-full p-2 mx-2">Text to Image</button>
                    <button className="bg-gray-300 rounded-full p-2 mx-2">Image to Image</button>
                    <button className="bg-gray-300 rounded-full p-2 mx-2">Text to Video</button>
                </div>
            </div>
            <div className="w-[60%] p-2">
                <div className="border border-gray-300 rounded-lg h-full">
                    {/* Images will be displayed here */}
=======
                <div className="w-[60%] p-10 bg-gray-200 overflow-hidden relative">
                    <div className="relative w-full h-full">
                        {questions.map((question, index) => (
                            <div
                                key={index}
                                className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-transform duration-500 ${
                                    index === currentQuestion
                                        ? 'translate-x-0'
                                        : index < currentQuestion
                                        ? '-translate-x-full'
                                        : 'translate-x-full'
                                }`}
                            >
                                {index === 0 ? (
                                    <>
                                        <h2 className="text-2xl font-bold mb-6">{question}</h2>
                                        <div className="grid grid-cols-4 gap-4">
                                            {aspectRatios.map((ratio) => (
                                                <button
                                                    key={ratio}
                                                    className="bg-white border border-gray-300 rounded-lg shadow-lg p-10 flex items-center justify-center text-lg font-semibold hover:bg-blue hover:text-white transition"
                                                    onClick={() => handleNext(ratio)}
                                                >
                                                    <img src="aspect.png" className="h-10 w-10 m-2" />
                                                    {ratio}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                ) : index === 1 ? (
                                    <>
                                        <h2 className="text-2xl font-bold mb-4">{question}</h2>
                                        <input
                                            type="text"
                                            className="border border-gray rounded-lg p-3 w-3/4 mb-4"
                                            placeholder="Your answer"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                                                    handleNext(e.currentTarget.value.trim());
                                                    e.currentTarget.value = ''; // Clear input
                                                }
                                            }}
                                        />
                                        <button
                                            onClick={() =>
                                                handleNext(
                                                    (document.querySelector('input') as HTMLInputElement)?.value.trim() ||
                                                        ''
                                                )
                                            }
                                            className="bg-blue text-white px-6 py-2 rounded-lg"
                                        >
                                            Next
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold mb-6">{question}</h2>
                                        <div className="mb-4 flex w-full justify-center">
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="border border-gray-400 rounded-lg p-3 w-3/4"
                                                placeholder="Search for images"
                                            />
                                            <button
                                                onClick={() => fetchImages(searchQuery)}
                                                className="bg-blue text-white px-6 py-2 ml-2 rounded-lg"
                                            >
                                                Search
                                            </button>
                                        </div>
                                        {loading ? (
                                            <p>Loading images...</p>
                                        ) : (
                                            <div className="grid grid-cols-3 gap-4">
                                                {images.map((image, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={image}
                                                        alt="Stock"
                                                        className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-75 transition"
                                                        onClick={() => handleNext(image)}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        <button
                                            onClick={handleSkip}
                                            className="bg-gray-500 text-white px-6 py-2 rounded-lg mt-4"
                                        >
                                            Skip
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
>>>>>>> 5cf70b2c577e6b9c63083051d5fce5554ab1b34b
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
