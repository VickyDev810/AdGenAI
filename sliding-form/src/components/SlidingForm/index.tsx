import React, { useState } from 'react';
import FormSlide from './FormSlide';
import { FormSlideProps } from './types';

const slides: FormSlideProps[] = [
    { id: 1, content: 'Slide 1 Content' },
    { id: 2, content: 'Slide 2 Content' },
    { id: 3, content: 'Slide 3 Content' },
];

const SlidingForm: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    return (
        <div className="sliding-form">
            <FormSlide 
                key={slides[currentSlide].id} 
                content={slides[currentSlide].content} 
                onNext={handleNextSlide} 
            />
        </div>
    );
};

export default SlidingForm;