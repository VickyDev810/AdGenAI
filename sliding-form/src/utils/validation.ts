// src/utils/validation.ts

export const validateInput = (input: string): boolean => {
    // Example validation: check if input is not empty
    return input.trim().length > 0;
};

export const validateEmail = (email: string): boolean => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Add more validation functions as needed