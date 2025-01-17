
function HomePage() {
    return (
        <div className="flex h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path/to/techy-image.jpg')" }}>
            <div className="w-1/2 p-10">
                <h1 className="text-2xl font-bold mb-5">Generate ads here</h1>
                <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-4 w-full mb-4"
                    placeholder="Enter your prompt"
                />
                <div className="flex items-center mb-4">
                    <button className="bg-blue-500 text-white rounded-lg p-2 mr-2">
                        <i className="fas fa-paperclip"></i> {/* Attachment icon */}
                    </button>
                    <button className="bg-green-500 text-white rounded-lg p-2">
                        <i className="fas fa-bolt"></i> {/* Generate icon */}
                    </button>
                </div>
                <button className="bg-yellow-500 text-white rounded-lg p-2 mb-4">Generate</button>
                <div className="flex justify-center mb-4">
                    <button className="bg-gray-300 rounded-full p-2 mx-2">Text to Image</button>
                    <button className="bg-gray-300 rounded-full p-2 mx-2">Image to Image</button>
                    <button className="bg-gray-300 rounded-full p-2 mx-2">Text to Video</button>
                </div>
            </div>
            <div className="w-1/2 p-10">
                <div className="border border-gray-300 rounded-lg h-full">
                    {/* Images will be displayed here */}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
