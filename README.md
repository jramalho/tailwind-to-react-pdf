# tailwind-to-react-pdf

A utility library that brings the power of Tailwind CSS to React PDF documents. This library allows you to use familiar Tailwind class names to style your PDF documents created with `@react-pdf/renderer`.

## Installation

```bash
npm install tailwind-to-react-pdf
# or
yarn add tailwind-to-react-pdf
 ```
```

This library requires the following peer dependencies:

```bash
@react-pdf/renderer
react

 ```

## Basic Usage
```javascript
import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { 
  TailwindDocument, 
  TailwindPage, 
  TailwindView, 
  TailwindText 
} from 'tailwind-to-react-pdf';

const MyDocument = () => (
  <TailwindDocument>
    <TailwindPage size="A4" className="p-10 bg-white">
      <TailwindView className="flex flex-col items-center">
        <TailwindText className="text-2xl font-bold text-blue-500 mb-4">
          My PDF Document
        </TailwindText>
        
        <TailwindView className="border border-gray-300 rounded p-4 mb-4 w-full">
          <TailwindText className="text-lg font-medium mb-2">
            Section with Border
          </TailwindText>
          <TailwindText className="text-gray-700">
            This is an example of text inside a section with a border.
            Tailwind classes are converted to React-PDF styles.
          </TailwindText>
        </TailwindView>
      </TailwindView>
    </TailwindPage>
  </TailwindDocument>
);

const App = () => (
  <PDFViewer width="100%" height="600px">
    <MyDocument />
  </PDFViewer>
);

export default App;

## Available Components
- `TailwindDocument`: Equivalent to the `Document` component from `@react-pdf/renderer`
- `TailwindPage`: Equivalent to the `Page` component from `@react-pdf/renderer`
- `TailwindView`: Equivalent to the `View` component from `@react-pdf/renderer`
- `TailwindText`: Equivalent to the `Text` component from `@react-pdf/renderer`
- `TailwindImage`: Equivalent to the `Image` component from `@react-pdf/renderer`

## Using StyleSheet
```jsx
import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { 
  TailwindDocument, 
  TailwindPage, 
  TailwindView, 
  TailwindText,
  createTailwindStyles
} from 'tailwind-to-react-pdf';

// Create styles from Tailwind classes
const styles = createTailwindStyles({
  container: 'flex flex-col items-center p-10',
  title: 'text-2xl font-bold text-blue-500 mb-4',
  section: 'border border-gray-300 rounded p-4 mb-4 w-full',
  sectionTitle: 'text-lg font-medium mb-2',
  text: 'text-gray-700'
});

const MyDocument = () => (
  <TailwindDocument>
    <TailwindPage size="A4">
      <TailwindView style={styles.container}>
        <TailwindText style={styles.title}>
          My PDF Document
        </TailwindText>
        
        <TailwindView style={styles.section}>
          <TailwindText style={styles.sectionTitle}>
            Section with Border
          </TailwindText>
          <TailwindText style={styles.text}>
            This is an example of text inside a section with a border.
            Tailwind classes are converted to React-PDF styles.
          </TailwindText>
        </TailwindView>
      </TailwindView>
    </TailwindPage>
  </TailwindDocument>
);

const App = () => (
  <PDFViewer width="100%" height="600px">
    <MyDocument />
  </PDFViewer>
);

export default App;
 ```

## Higher-Order Component
```javascript
import React from 'react';
import { Text } from '@react-pdf/renderer';
import { withTailwindPDF } from 'tailwind-to-react-pdf';

// Create a custom component with Tailwind support
const CustomText = withTailwindPDF(Text);

// Usage
const MyComponent = () => (
  <CustomText className="text-lg font-bold text-blue-500">
    Custom text
  </CustomText>
);
 ```

## Utilities
```javascript
import { tailwindToReactPDF } from 'tailwind-to-react-pdf';

// Convert Tailwind classes to React-PDF styles
const styles = tailwindToReactPDF('text-lg font-bold text-blue-500');
// Result: { fontSize: 18, fontWeight: 700, color: '#4299e1' }
 ```

## Supported Tailwind Classes
This library supports a wide range of Tailwind classes including:
- Typography (`font size`, `weight`, `color`, `alignment`)
- Spacing (`margin`, `padding`)
- Flexbox (`display`, `direction`, `alignment`)
- Borders (`width`, `color`, `radius`)
- Background colors (`bg-color`)
- Width and height (`w-full`, `h-screen`)
- And more...

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## Disclaimer
This library is not affiliated with Tailwind CSS or React PDF. It is a utility that converts Tailwind CSS classes to React PDF styles. This library is free software and released under the MIT license.
This library was created with a "vibe coding" approach - an experimental, flow-state development process. It's a work in progress created with the assistance of Trae AI. Use at your own discretion and feel free to contribute to make it better! (BTW he created this disclaimer too);

## License
MIT
