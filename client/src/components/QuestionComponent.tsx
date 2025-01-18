import { useState } from 'react';

interface QuestionnaireProps {
    questions: string[];
    aspectRatios: string[];
    onComplete: (answers: string[]) => void;
    fetchImages: (query: string) => Promise<string[]>;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ questions, aspectRatios, onComplete, fetchImages }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
    const [searchQuery, setSearchQuery] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleNext = (answer: string) => {
        setAnswers((prev) => {
            const updatedAnswers = [...prev];
            updatedAnswers[currentQuestion] = answer;
            return updatedAnswers;
        });

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            onComplete(answers);
        }
    };

    const handleSkip = () => {
        handleNext('Skipped');
    };

    const handleImageSearch = async (query: string) => {
        setLoading(true);
        try {
            const results = await fetchImages(query);
            setImages(results);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
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
                            <div className="grid grid-cols-3 gap-4">
                                {aspectRatios.map((ratio) => (
                                    <button
                                        key={ratio}
                                        className="bg-white border border-gray-300 rounded-lg shadow-lg p-10 flex items-center justify-center text-lg font-semibold hover:bg-blue hover:text-white transition"
                                        onClick={() => handleNext(ratio)}
                                    >
                                        <img src="aspect.png" className="h-10 w-10 m-2" alt={ratio} />
                                        {ratio}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : index === 1 || index === 2 ? (
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
                                        (document.querySelector('input') as HTMLInputElement)?.value.trim() || ''
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
                                    onClick={() => handleImageSearch(searchQuery)}
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
                                className="bg-blue text-white px-6 py-2 rounded-lg mt-4"
                            >
                                Skip
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Questionnaire;
