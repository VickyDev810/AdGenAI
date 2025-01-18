import React from 'react';
import { FormSlideProps } from './types';

const FormSlide: React.FC<FormSlideProps> = ({ content, onNext }) => {
    const handleNext = () => {
        // Logic to validate input and advance to the next slide
        onNext();
    };

    return (
        <div className="form-slide">
            <h2>{content.title}</h2>
            <input
                type="text"
                placeholder={content.placeholder}
                className="border border-blue rounded-lg p-2 w-full mb-4"
            />
            <button onClick={handleNext} className="bg-violet text-white rounded-lg p-2">
                Next
            </button>
        </div>
    );
};

export default FormSlide;