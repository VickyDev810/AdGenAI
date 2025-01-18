# Sliding Form Component

This project implements a sliding form component that allows users to navigate through a series of input slides. Each slide collects user input and advances to the next slide upon completion.

## Features

- Dynamic sliding form with multiple input slides
- Input validation for each slide
- Reusable button component
- Custom hook for managing slide state

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd sliding-form
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage

Import the `SlidingForm` component into your application and render it within your desired layout.

```tsx
import SlidingForm from './components/SlidingForm';

function App() {
    return (
        <div>
            <SlidingForm />
        </div>
    );
}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.