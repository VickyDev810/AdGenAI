import React from 'react';

interface QuestionComponentProps {
    question: string;
    handleNext: (answer: string) => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, handleNext }) => {
    return (
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
    );
};

export default QuestionComponent;