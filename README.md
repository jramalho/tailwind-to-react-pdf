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
```jsx
import { Document, Page } from '@react-pdf/renderer';
import { tailwindToReactPDF, ReactToReactPDF } from 'tailwind-to-react-pdf';

const MyDocument = () => (
  <Document>
    <Page>
      <ReactToReactPDF>
        <div className="flex p-4">
          <h1 className="text-2xl font-bold text-blue-500">Hello, PDF!</h1>
          <p className="mt-4">This is a PDF document styled with Tailwind CSS classes.</p>
        </div>
      </ReactToReactPDF>
    </Page>
  </Document>
);
```

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
## Direct style conversion
```jsx
import { Text, View } from '@react-pdf/renderer';
import { tailwindToReactPDF } from 'tailwind-to-react-pdf';

const MyComponent = () => (
  <View style={tailwindToReactPDF('flex p-4 border rounded-lg')}>
    <Text style={tailwindToReactPDF('text-lg font-bold text-blue-500')}>
      Hello, PDF!
    </Text>
  </View>
);
```


## Using with Recharts
```jsx
import { Document, Page } from '@react-pdf/renderer';
import { ReactToReactPDF, RechartsToReactPDF } from 'tailwind-to-react-pdf';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 }
];

const MyChart = () => (
  <BarChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="value" fill="#8884d8" />
  </BarChart>
);

const MyDocument = () => (
  <Document>
    <Page>
      <ReactToReactPDF>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Sales Report</h1>
          <div className="mt-4">
            <RechartsToReactPDF chart={<MyChart />} width={500} height={300} />
          </div>
        </div>
      </ReactToReactPDF>
    </Page>
  </Document>
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

If you're contributing code, please make sure to build and test your changes before submitting a PR:

```bash
npm run build
npm test
```
For maintainers: to publish a new version to npm, update the version in package.json and run:

```bash
npm publish
 ```
 
When you want to update your package in the future:

1. Update the version number in package.json (following [semantic versioning](https://semver.org/))
2. Make your changes
3. Build the package
4. Run `npm publish`

For example, to update from version 0.1.0 to 0.1.1:

```bash
# Update version in package.json
npm version patch  # This automatically updates the version number
npm publish

## Disclaimer
This library is not affiliated with Tailwind CSS or React PDF. It is a utility that converts Tailwind CSS classes to React PDF styles. This library is free software and released under the MIT license.
This library was created with a "vibe coding" approach - an experimental, flow-state development process. It's a work in progress created with the assistance of Trae AI. Use at your own discretion and feel free to contribute to make it better! (BTW he created this disclaimer too);

## License
MIT
