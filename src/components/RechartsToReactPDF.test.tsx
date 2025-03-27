import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { RechartsToReactPDF } from './RechartsToReactPDF';
import { Svg } from '@react-pdf/renderer';

// Mock the react-pdf/renderer components
jest.mock('@react-pdf/renderer', () => ({
  Svg: jest.fn(({ children, width, height }) => (
    <div data-testid="pdf-svg" style={{ width, height }}>{children}</div>
  )),
  Image: jest.fn(({ src, width, height }) => (
    <img data-testid="pdf-image" style={{ width, height }} src={src} />
  ))
}));

// Mock a simple Recharts-like component
const MockChart = () => (
  <svg width="400" height="200">
    <rect x="10" y="10" width="380" height="180" fill="blue" />
    <text x="200" y="100" textAnchor="middle" fill="white">Mock Chart</text>
  </svg>
);

describe('RechartsToReactPDF', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock XMLSerializer
    global.XMLSerializer = jest.fn().mockImplementation(() => ({
      serializeToString: jest.fn().mockReturnValue('<svg><rect /><text>Mock Chart</text></svg>')
    }));
  });

  it('renders a chart in a hidden div', () => {
    const { container } = render(
      <RechartsToReactPDF chart={<MockChart />} />
    );
    
    const hiddenDiv = container.querySelector('div[style*="position: absolute"]');
    expect(hiddenDiv).toBeInTheDocument();
    expect(hiddenDiv?.querySelector('svg')).toBeInTheDocument();
  });

  it('captures SVG and renders it in a PDF Svg component', async () => {
    const { getByTestId } = render(
      <RechartsToReactPDF chart={<MockChart />} width={600} height={400} />
    );
    
    // Wait for the useEffect to run and capture the SVG
    await waitFor(() => {
      expect(Svg).toHaveBeenCalled();
      const svgElement = getByTestId('pdf-svg');
      expect(svgElement).toBeInTheDocument();
      // Fix: Match the actual style with px units
      expect(svgElement).toHaveStyle({ width: '600px', height: '400px' });
    });
  });

  it('passes custom width and height to the PDF Svg component', async () => {
    const { getByTestId } = render(
      <RechartsToReactPDF chart={<MockChart />} width={800} height={500} />
    );
    
    await waitFor(() => {
      const svgElement = getByTestId('pdf-svg');
      // Fix: Match the actual style with px units
      expect(svgElement).toHaveStyle({ width: '800px', height: '500px' });
    });
  });

  it('uses default width and height when not provided', async () => {
    const { getByTestId } = render(
      <RechartsToReactPDF chart={<MockChart />} />
    );
    
    await waitFor(() => {
      const svgElement = getByTestId('pdf-svg');
      // Fix: Match the actual style with px units
      expect(svgElement).toHaveStyle({ width: '500px', height: '300px' });
    });
  });

  it('handles null chart gracefully', () => {
    const { container } = render(
      <RechartsToReactPDF chart={null} />
    );
    
    const hiddenDiv = container.querySelector('div[style*="position: absolute"]');
    expect(hiddenDiv).toBeInTheDocument();
    expect(hiddenDiv?.querySelector('svg')).not.toBeInTheDocument();
  });
});