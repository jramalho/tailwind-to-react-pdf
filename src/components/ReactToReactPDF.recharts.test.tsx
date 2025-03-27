import React from 'react';
import { render } from '@testing-library/react';
import { ReactToReactPDF } from './ReactToReactPDF';
import { RechartsToReactPDF } from './RechartsToReactPDF';
import { View } from '@react-pdf/renderer';

// Mock the react-pdf/renderer components
jest.mock('@react-pdf/renderer', () => ({
  Text: jest.fn(({ children, style }) => (
    <div data-testid="pdf-text" style={style}>{children}</div>
  )),
  View: jest.fn(({ children, style }) => (
    <div data-testid="pdf-view" style={{ 
      ...style,
      // Ensure padding is a string with 'px' if it's a number
      ...(style?.padding && typeof style.padding === 'number' ? { padding: `${style.padding}px` } : {})
    }}>
      {children}
    </div>
  )),
  Svg: jest.fn(({ children, width, height }) => (
    <div data-testid="pdf-svg" style={{ width, height }}>{children}</div>
  ))
}));

// Mock the tailwindToReactPDF utility
jest.mock('../utils/tailwindToReactPDF', () => ({
  tailwindToReactPDF: jest.fn((className) => {
    if (className.includes('flex')) return { display: 'flex' };
    if (className.includes('p-4')) return { padding: '16px' }; // Change from 16 to '16px'
    return {};
  })
}));

// Mock the RechartsToReactPDF component
jest.mock('./RechartsToReactPDF', () => ({
  RechartsToReactPDF: jest.fn(({ chart, width, height }) => (
    <div data-testid="recharts-to-pdf" style={{ width, height }}>
      {chart}
    </div>
  ))
}));

// Mock a simple Recharts-like component
const MockChart = () => (
  <svg width="400" height="200">
    <rect x="10" y="10" width="380" height="180" fill="blue" />
    <text x="200" y="100" textAnchor="middle" fill="white">Mock Chart</text>
  </svg>
);

describe('ReactToReactPDF with Recharts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a document with a Recharts chart', () => {
    const { getByTestId } = render(
      <ReactToReactPDF>
        <div className="flex p-4">
          <h1>Chart Example</h1>
          <RechartsToReactPDF chart={<MockChart />} width={600} height={400} />
        </div>
      </ReactToReactPDF>
    );
    
    const viewElement = getByTestId('pdf-view');
    expect(viewElement).toHaveStyle({ display: 'flex', padding: '16px' });
    
    const rechartsElement = getByTestId('recharts-to-pdf');
    expect(rechartsElement).toBeInTheDocument();
    expect(rechartsElement).toHaveStyle({ width: 600, height: 400 });
    
    expect(RechartsToReactPDF).toHaveBeenCalledWith(
      expect.objectContaining({
        width: 600,
        height: 400
      }),
      expect.anything()
    );
  });
});