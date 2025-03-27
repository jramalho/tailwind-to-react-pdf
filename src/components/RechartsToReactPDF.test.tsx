import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { RechartsToReactPDF } from './RechartsToReactPDF';

// Mock Svg component from react-pdf
jest.mock('@react-pdf/renderer', () => ({
  Svg: ({ children, width, height }: { children: React.ReactNode, width: number, height: number }) => (
    <div data-testid="pdf-svg" style={{ width: `${width}px`, height: `${height}px` }}>
      {children}
    </div>
  )
}));

// Create a simple mock chart component
const MockChart = () => (
  <svg width="400" height="200">
    <rect x="10" y="10" width="380" height="180" fill="blue" />
    <text x="200" y="100" fill="white" textAnchor="middle">Mock Chart</text>
  </svg>
);

describe('RechartsToReactPDF', () => {
  it('captures SVG content from chart', async () => {
    // Increase timeout for this test
    jest.setTimeout(10000);
    
    // Mock XMLSerializer
    const mockSerializeToString = jest.fn().mockReturnValue('<svg>mocked svg content</svg>');
    window.XMLSerializer = jest.fn().mockImplementation(() => ({
      serializeToString: mockSerializeToString
    }));
    
    const { getByTestId } = render(
      <RechartsToReactPDF chart={<MockChart />} />
    );
    
    // Wait longer for the SVG to be processed
    await waitFor(() => {
      const svgElement = getByTestId('pdf-svg');
      expect(svgElement).toBeInTheDocument();
    }, { timeout: 2000 });
  });
  
  it('uses default width and height when not provided', async () => {
    // Increase timeout for this test
    jest.setTimeout(10000);
    
    const { getByTestId } = render(
      <RechartsToReactPDF chart={<MockChart />} />
    );
    
    // Wait longer for the SVG to be processed
    await waitFor(() => {
      const svgElement = getByTestId('pdf-svg');
      expect(svgElement).toBeInTheDocument();
      expect(svgElement).toHaveStyle({ width: '500px', height: '300px' });
    }, { timeout: 2000 });
  });
  
  it('uses custom width and height when provided', async () => {
    // Increase timeout for this test
    jest.setTimeout(10000);
    
    const { getByTestId } = render(
      <RechartsToReactPDF chart={<MockChart />} width={600} height={400} />
    );
    
    // Wait longer for the SVG to be processed
    await waitFor(() => {
      const svgElement = getByTestId('pdf-svg');
      expect(svgElement).toBeInTheDocument();
      expect(svgElement).toHaveStyle({ width: '600px', height: '400px' });
    }, { timeout: 2000 });
  });
  
  it('calls onCapture callback when provided', async () => {
    // Increase timeout for this test
    jest.setTimeout(10000);
    
    const onCaptureMock = jest.fn();
    
    render(
      <RechartsToReactPDF 
        chart={<MockChart />} 
        onCapture={onCaptureMock} 
      />
    );
    
    // Wait for the onCapture to be called
    await waitFor(() => {
      expect(onCaptureMock).toHaveBeenCalled();
    }, { timeout: 2000 });
  });
});