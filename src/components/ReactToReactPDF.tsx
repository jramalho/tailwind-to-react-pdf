import React, { ReactElement, ReactNode } from 'react';
import { Text, View } from '@react-pdf/renderer';
import { tailwindToReactPDF } from '../utils/tailwindToReactPDF';

interface ReactToReactPDFProps {
  children: ReactNode;
}

/**
 * Transforms React components with Tailwind classes into React-PDF components
 * @param props Component props including children
 * @returns React-PDF compatible components
 */
export const ReactToReactPDF: React.FC<ReactToReactPDFProps> = ({ children }) => {
  const transformNode = (node: ReactNode): ReactNode => {
    // If node is not a React element, return it as is
    if (!React.isValidElement(node)) {
      return node;
    }

    const element = node as ReactElement;
    const { type, props } = element;
    const { children, className, style, ...restProps } = props;

    // Transform children recursively
    const transformedChildren = React.Children.map(children, transformNode);

    // Convert className to React-PDF styles
    const tailwindStyles = className ? tailwindToReactPDF(className) : {};
    const combinedStyles = { ...tailwindStyles, ...style };

    // Handle custom React components
    if (typeof type === 'function' || typeof type === 'object') {
      const componentName = typeof type === 'function' ? type.name || '' : '';
      
      // Determine if the component is a text component or a container component
      const isTextComponent = componentName.includes('Text') || 
                             componentName.includes('Title') || 
                             componentName.includes('Description') || 
                             componentName.includes('Label') ||
                             componentName.includes('Paragraph');
      
      if (isTextComponent) {
        return <Text style={combinedStyles} {...restProps}>{transformedChildren}</Text>;
      } else {
        return <View style={combinedStyles} {...restProps}>{transformedChildren}</View>;
      }
    }

    // Map HTML elements to React-PDF components
    if (typeof type === 'string') {
      // Text elements
      const textElements = [
        'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'strong', 
        'em', 'label', 'a', 'abbr', 'address', 'b', 'bdi', 'bdo', 
        'cite', 'code', 'data', 'dfn', 'i', 'kbd', 'mark', 'q', 
        'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'small', 
        'sub', 'sup', 'time', 'u', 'var', 'wbr'
      ];
      
      if (textElements.includes(type)) {
        return <Text style={combinedStyles} {...restProps}>{transformedChildren}</Text>;
      }
      
      // Container elements
      const containerElements = [
        'div', 'section', 'article', 'main', 'header', 'footer', 
        'nav', 'aside', 'figure', 'figcaption', 'details', 'summary',
        'dialog', 'menu'
      ];
      
      if (containerElements.includes(type)) {
        return <View style={combinedStyles} {...restProps}>{transformedChildren}</View>;
      }
      
      // Table elements
      switch (type) {
        case 'table':
          return <View style={{ ...combinedStyles, display: 'flex', flexDirection: 'column' }} {...restProps}>{transformedChildren}</View>;
        
        case 'thead':
        case 'tbody':
        case 'tfoot':
          return <View style={{ ...combinedStyles, display: 'flex', flexDirection: 'column' }} {...restProps}>{transformedChildren}</View>;
        
        case 'tr':
          return <View style={{ ...combinedStyles, display: 'flex', flexDirection: 'row' }} {...restProps}>{transformedChildren}</View>;
        
        case 'th':
          return <View style={{ ...combinedStyles, flex: 1, padding: 5, fontWeight: 'bold' }} {...restProps}>
            <Text style={{ fontWeight: 'bold' }}>{transformedChildren}</Text>
          </View>;
        
        case 'td':
          return <View style={{ ...combinedStyles, flex: 1, padding: 5 }} {...restProps}>
            <Text>{transformedChildren}</Text>
          </View>;
      }
      
      // Default fallback
      console.warn(`Unsupported HTML element: ${type}. Rendering as View.`);
      return <View style={combinedStyles} {...restProps}>{transformedChildren}</View>;
    }

    // For custom React components, clone the element with transformed children
    return React.cloneElement(element, { ...props, style: combinedStyles }, transformedChildren);
  };

  return <>{transformNode(children)}</>;
};