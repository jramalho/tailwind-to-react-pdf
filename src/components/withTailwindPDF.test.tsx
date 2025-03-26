import React from 'react';
import { withTailwindPDF } from './withTailwindPDF';

// Mock React PDF components
jest.mock('@react-pdf/renderer', () => ({
  Text: jest.fn(({ style, children }) => ({ type: 'Text', style, children })),
}));

// Mock tailwindToReactPDF
jest.mock('../utils/tailwindToReactPDF', () => ({
  tailwindToReactPDF: jest.fn((className) => {
    const styles = {};
    if (className.includes('text-lg')) styles.fontSize = 18;
    if (className.includes('font-bold')) styles.fontWeight = 700;
    if (className.includes('text-blue-500')) styles.color = '#4299e1';
    return styles;
  }),
  reactStyleToReactPDF: jest.fn((style) => style || {}),
}));

describe('withTailwindPDF', () => {
  // Create a simple test component for each test
  const TestComponent = jest.fn(props => props);
  
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
    TestComponent.mockClear();
  });
  
  test('should apply Tailwind classes as styles', () => {
    // Create the enhanced component
    const EnhancedComponent = withTailwindPDF(TestComponent);
    
    // Render it with props
    const result = EnhancedComponent({
      className: 'text-lg font-bold text-blue-500',
      children: 'Test'
    });
    
    // Verify the result
    expect(TestComponent).toHaveBeenCalledTimes(1);
    expect(result.style).toEqual({
      fontSize: 18,
      fontWeight: 700,
      color: '#4299e1'
    });
    expect(result.children).toBe('Test');
  });
  
  test('should combine Tailwind classes with inline styles', () => {
    const EnhancedComponent = withTailwindPDF(TestComponent);
    
    const result = EnhancedComponent({
      className: 'text-lg',
      style: { fontWeight: 700, color: 'red' },
      children: 'Test'
    });
    
    expect(TestComponent).toHaveBeenCalledTimes(1);
    expect(result.style).toEqual({
      fontSize: 18,
      fontWeight: 700,
      color: 'red'
    });
    expect(result.children).toBe('Test');
  });
  
  test('should pass through other props', () => {
    const EnhancedComponent = withTailwindPDF(TestComponent);
    
    const result = EnhancedComponent({
      className: 'text-lg',
      customProp: 'test-value',
      children: 'Test'
    });
    
    expect(TestComponent).toHaveBeenCalledTimes(1);
    expect(result.style).toEqual({
      fontSize: 18
    });
    expect(result.customProp).toBe('test-value');
    expect(result.children).toBe('Test');
  });
  
  test('should handle empty or missing className', () => {
    const EnhancedComponent = withTailwindPDF(TestComponent);
    
    const result1 = EnhancedComponent({
      children: 'Test'
    });
    
    const result2 = EnhancedComponent({
      className: '',
      children: 'Test'
    });
    
    expect(result1.style).toEqual({});
    expect(result2.style).toEqual({});
  });
});