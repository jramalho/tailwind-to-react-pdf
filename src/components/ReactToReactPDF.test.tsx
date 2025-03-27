import React from 'react';
import { render } from '@testing-library/react';
import { ReactToReactPDF } from './ReactToReactPDF';
import { Text, View } from '@react-pdf/renderer';

// Mock the react-pdf/renderer components
jest.mock('@react-pdf/renderer', () => ({
  Text: jest.fn(({ children, style }) => (
    <div data-testid="pdf-text" style={style}>{children}</div>
  )),
  View: jest.fn(({ children, style }) => (
    <div data-testid="pdf-view" style={style}>{children}</div>
  ))
}));

// Mock the tailwindToReactPDF utility
jest.mock('../utils/tailwindToReactPDF', () => ({
  tailwindToReactPDF: jest.fn((className) => {
    if (className.includes('flex')) return { display: 'flex' };
    if (className.includes('text-blue-500')) return { color: '#4299e1' };
    if (className.includes('font-bold')) return { fontWeight: 700 };
    if (className.includes('text-2xl')) return { fontSize: 24 };
    if (className.includes('p-4')) return { padding: '16px' }; // Changed from 16 to '16px'
    if (className.includes('border')) return { borderWidth: 1, borderStyle: 'solid', borderColor: '#e2e8f0' };
    return {};
  })
}));

describe('ReactToReactPDF', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('transforms div elements to View components', () => {
    const { getByTestId } = render(
      <ReactToReactPDF>
        <div className="flex">Content</div>
      </ReactToReactPDF>
    );
    
    const viewElement = getByTestId('pdf-view');
    expect(viewElement).toHaveStyle({ display: 'flex' });
    expect(viewElement.textContent).toBe('Content');
    expect(View).toHaveBeenCalled();
  });

  it('transforms text elements to Text components', () => {
    const { getByTestId } = render(
      <ReactToReactPDF>
        <p className="text-blue-500 font-bold">Text content</p>
      </ReactToReactPDF>
    );
    
    const textElement = getByTestId('pdf-text');
    expect(textElement.textContent).toBe('Text content');
    expect(Text).toHaveBeenCalled();
  });

  it('transforms nested elements correctly', () => {
    const { getAllByTestId } = render(
      <ReactToReactPDF>
        <div className="flex">
          <h1 className="text-2xl font-bold">Heading</h1>
          <p>Paragraph</p>
        </div>
      </ReactToReactPDF>
    );
    
    const viewElements = getAllByTestId('pdf-view');
    const textElements = getAllByTestId('pdf-text');
    
    expect(viewElements).toHaveLength(1);
    expect(textElements).toHaveLength(2);
    expect(viewElements[0]).toHaveStyle({ display: 'flex' });
    expect(textElements[0]).toHaveStyle({ fontSize: 24, fontWeight: 700 });
    expect(textElements[0].textContent).toBe('Heading');
    expect(textElements[1].textContent).toBe('Paragraph');
  });

  it('transforms table elements correctly', () => {
    const { getAllByTestId } = render(
      <ReactToReactPDF>
        <table className="border">
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
            </tr>
          </tbody>
        </table>
      </ReactToReactPDF>
    );
    
    const viewElements = getAllByTestId('pdf-view');
    const textElements = getAllByTestId('pdf-text');
    
    // 1 table + 1 thead + 1 tbody + 2 tr + 2 th + 2 td = 9 View elements
    expect(viewElements).toHaveLength(9);
    
    // 2 th content + 2 td content = 4 Text elements
    expect(textElements).toHaveLength(4);
    
    // Check table has border style
    expect(viewElements[0]).toHaveStyle({ 
      borderWidth: 1, 
      borderStyle: 'solid', 
      borderColor: '#e2e8f0' 
    });
  });

  it('combines Tailwind styles with inline styles', () => {
    const { getByTestId } = render(
      <ReactToReactPDF>
        <div className="p-4" style={{ backgroundColor: 'red' }}>Content</div>
      </ReactToReactPDF>
    );
    
    const viewElement = getByTestId('pdf-view');
    expect(viewElement).toHaveStyle({ 
      padding: '16px',
      backgroundColor: 'red'
    });
  });
});