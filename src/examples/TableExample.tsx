import React from 'react';
import { Document, Page, PDFViewer } from '@react-pdf/renderer';
import { ReactToReactPDF } from '../components/ReactToReactPDF';

const TableExample = () => (
  <PDFViewer width="100%" height="600px">
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <ReactToReactPDF>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-blue-500 mb-4">
              Table Example
            </h1>
            
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Role</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-2">John Doe</td>
                  <td className="border border-gray-300 p-2">john@example.com</td>
                  <td className="border border-gray-300 p-2">Developer</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border border-gray-300 p-2">Jane Smith</td>
                  <td className="border border-gray-300 p-2">jane@example.com</td>
                  <td className="border border-gray-300 p-2">Designer</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-2">Bob Johnson</td>
                  <td className="border border-gray-300 p-2">bob@example.com</td>
                  <td className="border border-gray-300 p-2">Manager</td>
                </tr>
              </tbody>
            </table>
            
            <p className="text-sm text-gray-500 mt-4">
              This example shows how to render HTML tables in React-PDF
            </p>
          </div>
        </ReactToReactPDF>
      </Page>
    </Document>
  </PDFViewer>
);

export default TableExample;