import React from 'react';
import { TailwindText, TailwindView, createTailwindStyles } from './TailwindPDF';
// We'll use the actual implementation in our tests
import { tailwindToReactPDF } from '../utils/tailwindToReactPDF';

// Mock React PDF components and include StyleSheet
jest.mock('@react-pdf/renderer', () => {
  return {
    Text: jest.fn(({ style, children }) => ({ type: 'Text', style, children })),
    View: jest.fn(({ style, children }) => ({ type: 'View', style, children })),
    Image: jest.fn(({ style, src }) => ({ type: 'Image', style, src })),
    Page: jest.fn(({ style, children }) => ({ type: 'Page', style, children })),
    Document: jest.fn(({ style, children }) => ({ type: 'Document', style, children })),
    // Add StyleSheet mock
    StyleSheet: {
      create: jest.fn(styles => styles)
    }
  };
});

describe('TailwindText', () => {
  test('should apply Tailwind classes as styles', () => {
    // Get the actual styles that would be applied
    const expectedStyles = tailwindToReactPDF('text-lg font-bold text-blue-500');
    
    const component = <TailwindText className="text-lg font-bold text-blue-500">Test</TailwindText>;
    
    // Create the rendered component manually
    const renderedComponent = component.type(component.props);
    
    // Compare with the actual styles from tailwindToReactPDF
    expect(renderedComponent.props.style).toMatchObject(expectedStyles);
  });
  
  test('should combine Tailwind classes with inline styles', () => {
    const customStyle = { fontWeight: 700, color: 'red' };
    // Get the actual styles that would be applied
    const tailwindStyles = tailwindToReactPDF('text-lg');
    
    const component = (
      <TailwindText 
        className="text-lg" 
        style={customStyle}
      >
        Test
      </TailwindText>
    );
    
    // Create the rendered component manually
    const renderedComponent = component.type(component.props);
    
    // Check that both tailwind and inline styles are applied
    expect(renderedComponent.props.style).toMatchObject({
      ...tailwindStyles,
      ...customStyle
    });
  });
});

describe('TailwindView', () => {
  test('should apply Tailwind classes as styles', () => {
    // Get the actual styles that would be applied
    const expectedStyles = tailwindToReactPDF('flex flex-col');
    
    const component = <TailwindView className="flex flex-col">Test</TailwindView>;
    
    // Create the rendered component manually
    const renderedComponent = component.type(component.props);
    
    // Compare with the actual styles from tailwindToReactPDF
    expect(renderedComponent.props.style).toMatchObject(expectedStyles);
  });
});

describe('createTailwindStyles', () => {
  test('should create styles from Tailwind classes', () => {
    // Get the actual styles that would be applied
    const expectedContainer = tailwindToReactPDF('flex flex-col');
    const expectedTitle = tailwindToReactPDF('text-lg font-bold text-blue-500');
    
    const styles = createTailwindStyles({
      container: 'flex flex-col',
      title: 'text-lg font-bold text-blue-500'
    });
    
    // Compare with the actual styles from tailwindToReactPDF
    expect(styles.container).toMatchObject(expectedContainer);
    expect(styles.title).toMatchObject(expectedTitle);
  });
});