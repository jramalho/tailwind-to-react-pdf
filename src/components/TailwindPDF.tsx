import React from 'react';
import { Text, View, Image, Document, Page, StyleSheet } from '@react-pdf/renderer';
import { tailwindToReactPDF, reactStyleToReactPDF } from '../utils/tailwindToReactPDF';

// Tipos para as props dos componentes
interface TailwindComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  [key: string]: any;
}

// Componente Text com suporte a Tailwind
export const TailwindText: React.FC<TailwindComponentProps> = ({ 
  className = '', 
  style = {}, 
  children, 
  ...props 
}) => {
  const tailwindStyles = tailwindToReactPDF(className);
  const reactStyles = reactStyleToReactPDF(style);
  
  // Combina os estilos, dando prioridade aos estilos inline
  const combinedStyles = { ...tailwindStyles, ...reactStyles };
  
  return (
    <Text style={combinedStyles} {...props}>
      {children}
    </Text>
  );
};

// Componente View com suporte a Tailwind
export const TailwindView: React.FC<TailwindComponentProps> = ({ 
  className = '', 
  style = {}, 
  children, 
  ...props 
}) => {
  const tailwindStyles = tailwindToReactPDF(className);
  const reactStyles = reactStyleToReactPDF(style);
  
  // Combina os estilos, dando prioridade aos estilos inline
  const combinedStyles = { ...tailwindStyles, ...reactStyles };
  
  return (
    <View style={combinedStyles} {...props}>
      {children}
    </View>
  );
};

// Componente Image com suporte a Tailwind
export const TailwindImage: React.FC<TailwindComponentProps & { src: string }> = ({ 
  className = '', 
  style = {}, 
  src, 
  ...props 
}) => {
  const tailwindStyles = tailwindToReactPDF(className);
  const reactStyles = reactStyleToReactPDF(style);
  
  // Combina os estilos, dando prioridade aos estilos inline
  const combinedStyles = { ...tailwindStyles, ...reactStyles };
  
  return (
    <Image style={combinedStyles} src={src} {...props} />
  );
};

// Componente Page com suporte a Tailwind
export const TailwindPage: React.FC<TailwindComponentProps> = ({ 
  className = '', 
  style = {}, 
  children, 
  ...props 
}) => {
  const tailwindStyles = tailwindToReactPDF(className);
  const reactStyles = reactStyleToReactPDF(style);
  
  // Combina os estilos, dando prioridade aos estilos inline
  const combinedStyles = { ...tailwindStyles, ...reactStyles };
  
  return (
    <Page style={combinedStyles} {...props}>
      {children}
    </Page>
  );
};

// Componente Document (sem suporte a Tailwind, apenas para completude)
export const TailwindDocument: React.FC<Omit<TailwindComponentProps, 'className'>> = ({ 
  style = {}, 
  children, 
  ...props 
}) => {
  const reactStyles = reactStyleToReactPDF(style);
  
  return (
    <Document style={reactStyles} {...props}>
      {children}
    </Document>
  );
};

// Função utilitária para criar estilos React-PDF a partir de classes Tailwind
export const createTailwindStyles = (classNames: Record<string, string>) => {
  const styles: Record<string, any> = {};
  
  for (const [key, className] of Object.entries(classNames)) {
    styles[key] = tailwindToReactPDF(className);
  }
  
  return StyleSheet.create(styles);
};