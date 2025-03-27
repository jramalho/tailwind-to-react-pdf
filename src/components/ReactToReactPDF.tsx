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

    // Map HTML elements to React-PDF components
    if (typeof type === 'string') {
      switch (type) {
        // Container elements
        case 'div':
        case 'section':
        case 'article':
        case 'main':
        case 'header':
        case 'footer':
        case 'nav':
        case 'aside':
          return <View style={combinedStyles} {...restProps}>{transformedChildren}</View>;
        
        // Text elements
        case 'p':
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'span':
        case 'strong':
        case 'em':
        case 'label':
          return <Text style={combinedStyles} {...restProps}>{transformedChildren}</Text>;
        
        // Table elements
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
        
        default:
          console.warn(`Unsupported HTML element: ${type}. Rendering as View.`);
          return <View style={combinedStyles} {...restProps}>{transformedChildren}</View>;
      }
    }

    // For custom React components, clone the element with transformed children
    return React.cloneElement(element, { ...props, style: combinedStyles }, transformedChildren);
  };

  return <>{transformNode(children)}</>;
};