import React from 'react';
import { Document, Page, PDFViewer } from '@react-pdf/renderer';
import { ReactToReactPDF } from '../components/ReactToReactPDF';

const ReactToReactPDFExample = () => (
  <PDFViewer width="100%" height="600px">
    <Document>
      <Page size="A4">
        <ReactToReactPDF>
          <div className="flex flex-col items-center p-10">
            <h1 className="text-2xl font-bold text-blue-500 mb-4">
              React to React-PDF Example
            </h1>
            
            <div className="border border-gray-300 rounded p-4 mb-4 w-full">
              <h2 className="text-lg font-medium mb-2">
                Section with Border
              </h2>
              <p className="text-gray-700">
                This example demonstrates how to transform regular React components 
                with Tailwind classes into React-PDF components.
              </p>
            </div>
            
            <div className="flex flex-row justify-between w-full">
              <div className="bg-gray-100 p-3 rounded w-1/2 mr-2">
                <p className="text-center">Column 1</p>
              </div>
              <div className="bg-gray-200 p-3 rounded w-1/2 ml-2">
                <p className="text-center">Column 2</p>
              </div>
            </div>
          </div>
        </ReactToReactPDF>
      </Page>
    </Document>
  </PDFViewer>
);

export default ReactToReactPDFExample;