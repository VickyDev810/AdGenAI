import { useState } from 'react';

const useFormSlider = (initialSlide: number, totalSlides: number) => {
    const [currentSlide, setCurrentSlide] = useState(initialSlide);

    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const previousSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const resetSlider = () => {
        setCurrentSlide(initialSlide);
    };

    return {
        currentSlide,
        nextSlide,
        previousSlide,
        resetSlider,
    };
};

export default useFormSlider;