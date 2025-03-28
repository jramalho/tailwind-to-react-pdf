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
      // Melhorar a detecção do nome do componente
      const componentName = typeof type === 'function' ? type.name || '' : '';
      const displayName = (type as any).displayName || '';
      
      // Adicionar verificação para componentes com propriedade $$typeof (React.memo, forwardRef, etc)
      const typeofSymbol = (type as any).$$typeof ? 
        ((type as any).type?.displayName || (type as any).type?.name || '') : '';
      
      const finalName = displayName || typeofSymbol || componentName;
      
      // Log para depuração (remova em produção)
      console.debug('Component detection:', { 
        displayName, 
        componentName, 
        typeofSymbol,
        finalName,
        hasTypeOf: !!(type as any).$$typeof
      });
      
      // Determine if the component is a text component or a container component
      const isTextComponent = 
        finalName.includes('Text') || 
        finalName.includes('Title') || 
        finalName.includes('Description') || 
        finalName.includes('Label') ||
        finalName.includes('Paragraph') ||
        finalName.includes('Heading') ||
        finalName.includes('Link');
      
      // Special handling for known UI components
      if (finalName.includes('Card')) {
        return <View style={{ 
          ...combinedStyles, 
          padding: 10, 
          borderWidth: 1, 
          borderColor: '#e2e8f0', 
          borderRadius: 8,
          marginBottom: 10
        }} {...restProps}>{transformedChildren}</View>;
      }
      
      if (finalName.includes('CardHeader')) {
        return <View style={{ 
          ...combinedStyles, 
          paddingBottom: 8 
        }} {...restProps}>{transformedChildren}</View>;
      }
      
      if (finalName.includes('CardContent')) {
        return <View style={{ 
          ...combinedStyles, 
          padding: 8 
        }} {...restProps}>{transformedChildren}</View>;
      }
      
      if (finalName.includes('CardFooter')) {
        return <View style={{ 
          ...combinedStyles, 
          paddingTop: 8, 
          borderTopWidth: 1, 
          borderTopColor: '#e5e7eb' 
        }} {...restProps}>{transformedChildren}</View>;
      }
      
      if (isTextComponent) {
        return <Text style={{
          ...combinedStyles,
          marginBottom: 5,
          fontSize: finalName.includes('Title') ? 18 : 14
        }} {...restProps}>{transformedChildren}</Text>;
      } else {
        return <View style={{
          ...combinedStyles,
          marginBottom: 5
        }} {...restProps}>{transformedChildren}</View>;
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
        // Apply specific styles based on element type
        let additionalStyles = {};
        if (type === 'h1') additionalStyles = { fontSize: 24, fontWeight: 'bold', marginBottom: 10 };
        else if (type === 'h2') additionalStyles = { fontSize: 20, fontWeight: 'bold', marginBottom: 8 };
        else if (type === 'h3') additionalStyles = { fontSize: 18, fontWeight: 'bold', marginBottom: 6 };
        else if (type === 'h4') additionalStyles = { fontSize: 16, fontWeight: 'bold', marginBottom: 4 };
        else if (type === 'h5') additionalStyles = { fontSize: 14, fontWeight: 'bold', marginBottom: 4 };
        else if (type === 'h6') additionalStyles = { fontSize: 12, fontWeight: 'bold', marginBottom: 4 };
        else if (type === 'p') additionalStyles = { marginBottom: 8 };
        
        return <Text style={{ ...combinedStyles, ...additionalStyles }} {...restProps}>{transformedChildren}</Text>;
      }
      
      // Container elements
      const containerElements = [
        'div', 'section', 'article', 'main', 'header', 'footer', 
        'nav', 'aside', 'figure', 'figcaption', 'details', 'summary',
        'dialog', 'menu'
      ];
      
      if (containerElements.includes(type)) {
        return <View style={{ ...combinedStyles, marginBottom: 5 }} {...restProps}>{transformedChildren}</View>;
      }
      
      // Table elements
      switch (type) {
        case 'table':
          return <View style={{ ...combinedStyles, display: 'flex', flexDirection: 'column', marginBottom: 10 }} {...restProps}>{transformedChildren}</View>;
        
        case 'thead':
        case 'tbody':
        case 'tfoot':
          return <View style={{ ...combinedStyles, display: 'flex', flexDirection: 'column' }} {...restProps}>{transformedChildren}</View>;
        
        case 'tr':
          return <View style={{ ...combinedStyles, display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }} {...restProps}>{transformedChildren}</View>;
        
        case 'th':
          return <View style={{ ...combinedStyles, flex: 1, padding: 8, fontWeight: 'bold', backgroundColor: '#f9fafb' }} {...restProps}>
            <Text style={{ fontWeight: 'bold' }}>{transformedChildren}</Text>
          </View>;
        
        case 'td':
          return <View style={{ ...combinedStyles, flex: 1, padding: 8 }} {...restProps}>
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