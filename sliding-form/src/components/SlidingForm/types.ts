// src/components/SlidingForm/types.ts

export interface FormSlideProps {
    title: string;
    content: string;
    onNext: () => void;
    onPrevious: () => void;
    isLastSlide: boolean;
}