import Header from '../components/header';
import Footer from '../components/footer';
import Questionnaire from '../components/QuestionComponent';



function HomePage() {
    const questions = [
        'What is your desired aspect ratio?',
        'What sector does your image belong to?',
        'What is the targer age group?',
        'Do you want a specific reference stock image?',
    ];

    const aspectRatios = ['16:9', '9:16', '4:3', '1:1', '3:2', '1:2', '2:1', '5:3','12:6'];

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

    return (
        <div className="flex flex-col h-screen" style={{ fontFamily: 'Poppins' }}>
            <Header />
            <div className="flex-grow flex">
            <div className="w-[40%] p-10 bg-footer flex flex-col justify-center">
                <h1 className="text-4xl font-bold mb-5 text-center">Create Images</h1>


                {/*this is input div */}
                <div className='flex w-full h-fit border border-blue rounded-lg mb-5 mt-4'>
                    <div className="relative w-full">
                        <input
                            type="text"
                            className=" rounded-lg h-56 pl-14 w-full mb-4"
                            placeholder="Enter your prompt"
                        />
                        
                        <button className="absolute top-40 left-2  text-white rounded-full p-2 flex justify-center">
                            <img src="bulb.png" alt="Icon" className="h-10 w-10" />
                        </button>
                    </div>
                </div>


                {/* buttons */}
                    <button className="flex gap-3 bg-violet text-white rounded-lg p-5 mb-10 justify-center">
                        Generate
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
