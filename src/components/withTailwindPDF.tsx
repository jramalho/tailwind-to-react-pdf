import React from 'react';
import { tailwindToReactPDF, reactStyleToReactPDF } from '../utils/tailwindToReactPDF';

interface WithTailwindPDFProps {
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

/**
 * HOC que converte um componente React-PDF para aceitar classes Tailwind
 * @param WrappedComponent Componente React-PDF a ser envolvido
 * @returns Componente com suporte a classes Tailwind
 */
export const withTailwindPDF = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithTailwindPDFProps> => {
  return ({ className = '', style = {}, ...props }) => {
    const tailwindStyles = tailwindToReactPDF(className);
    const reactStyles = reactStyleToReactPDF(style);
    
    // Combina os estilos, dando prioridade aos estilos inline
    const combinedStyles = { ...tailwindStyles, ...reactStyles };
    
    return <WrappedComponent style={combinedStyles} {...props as P} />;
  };
};