import React from 'react';
import { withTailwindPDF } from './withTailwindPDF';
import { ComponentType } from 'react';

// Mock React PDF components
jest.mock('@react-pdf/renderer', () => ({
  Text: jest.fn(({ style, children }) => ({ type: 'Text', style, children })),
}));

// Mock tailwindToReactPDF
jest.mock('../utils/tailwindToReactPDF', () => ({
  tailwindToReactPDF: jest.fn((className) => {
    let styles = {};
    if (className.includes('text-lg')) styles = { ...styles, fontSize: 18 };
    if (className.includes('font-bold')) styles = { ...styles, fontWeight: 700 };
    if (className.includes('text-blue-500')) styles = { ...styles, color: '#4299e1' };
    return styles;
  }),
  reactStyleToReactPDF: jest.fn((style) => style || {}),
}));

describe('withTailwindPDF', () => {
  // Define interface for component props
  interface TestProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    customProp?: string;
    [key: string]: any;
  }
  
  // Create a proper React component that returns a React element
  const TestComponent: ComponentType<TestProps> = (props) => {
    return React.createElement('div', props);
  };
  
  // Create a spy to track calls to the component
  let testComponentSpy: jest.SpyInstance;
  
  beforeEach(() => {
    // Set up spy on the component
    testComponentSpy = jest.spyOn(React, 'createElement');
    jest.clearAllMocks();
  });
  
  test('should apply Tailwind classes as styles', () => {
    // Create the enhanced component
    const EnhancedComponent = withTailwindPDF(TestComponent);
    
    // Render it with props
    EnhancedComponent({
      className: 'text-lg font-bold text-blue-500',
      children: 'Test'
    });
    
    // Check the last call to createElement to verify props
    const lastCall = testComponentSpy.mock.calls[testComponentSpy.mock.calls.length - 1];
    expect(lastCall[1].style).toEqual({
      fontSize: 18,
      fontWeight: 700,
      color: '#4299e1'
    });
    expect(lastCall[1].children).toBe('Test');
  });
  
  test('should combine Tailwind classes with inline styles', () => {
    const EnhancedComponent = withTailwindPDF(TestComponent);
    
    EnhancedComponent({
      className: 'text-lg',
      style: { fontWeight: 700, color: 'red' },
      children: 'Test'
    });
    
    const lastCall = testComponentSpy.mock.calls[testComponentSpy.mock.calls.length - 1];
    expect(lastCall[1].style).toEqual({
      fontSize: 18,
      fontWeight: 700,
      color: 'red'
    });
    expect(lastCall[1].children).toBe('Test');
  });
  
  test('should pass through other props', () => {
    const EnhancedComponent = withTailwindPDF(TestComponent);
    
    EnhancedComponent({
      className: 'text-lg',
      customProp: 'test-value',
      children: 'Test'
    });
    
    const lastCall = testComponentSpy.mock.calls[testComponentSpy.mock.calls.length - 1];
    expect(lastCall[1].style).toEqual({
      fontSize: 18
    });
    expect(lastCall[1].customProp).toBe('test-value');
    expect(lastCall[1].children).toBe('Test');
  });
  
  test('should handle empty or missing className', () => {
    const EnhancedComponent = withTailwindPDF(TestComponent);
    
    EnhancedComponent({
      children: 'Test'
    });
    
    EnhancedComponent({
      className: '',
      children: 'Test'
    });
    
    const calls = testComponentSpy.mock.calls;
    expect(calls[calls.length - 2][1].style).toEqual({});
    expect(calls[calls.length - 1][1].style).toEqual({});
  });
});