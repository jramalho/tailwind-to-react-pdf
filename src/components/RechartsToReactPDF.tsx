import React, { useRef, useEffect, useState } from 'react';
import { Image, Svg } from '@react-pdf/renderer';

interface RechartsToReactPDFProps {
  chart: React.ReactNode;
  width?: number;
  height?: number;
  onCapture?: (svgString: string) => void;
}

// Component to render SVG content in React-PDF
const SvgContent = ({ content }: { content: string }) => {
  return <svg dangerouslySetInnerHTML={{ __html: content }} />;
};

export const RechartsToReactPDF: React.FC<RechartsToReactPDFProps> = ({ 
  chart, 
  width = 500, 
  height = 300,
  onCapture
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !chart) return;

    // Aumentar o tempo de espera para garantir que o gráfico seja renderizado
    const timer = setTimeout(() => {
      try {
        // Verificar se o elemento está no DOM
        if (!chartRef.current) {
          console.error('Chart reference is no longer available');
          return;
        }

        // Tentar encontrar o SVG de várias maneiras
        let svgElement = chartRef.current.querySelector('svg');
        
        // Se não encontrar diretamente, procurar em elementos filhos
        if (!svgElement) {
          const canvasElement = chartRef.current.querySelector('canvas');
          if (canvasElement) {
            // Para Chart.js, podemos tentar capturar o canvas em vez do SVG
            console.log('Found canvas element, attempting to convert to image');
            
            // Criar um SVG temporário
            const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            tempSvg.setAttribute('width', width.toString());
            tempSvg.setAttribute('height', height.toString());
            
            // Adicionar uma imagem do canvas ao SVG
            const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            img.setAttribute('width', width.toString());
            img.setAttribute('height', height.toString());
            img.setAttribute('href', canvasElement.toDataURL('image/png'));
            tempSvg.appendChild(img);
            
            svgElement = tempSvg;
          } else {
            console.error('Failed to find SVG or canvas element in chart');
            return;
          }
        }
        
        // Clone the SVG to avoid modifying the original
        const svgClone = svgElement.cloneNode(true) as SVGElement;
        
        // Ensure the SVG has width and height attributes
        if (!svgClone.hasAttribute('width')) {
          svgClone.setAttribute('width', width.toString());
        }
        if (!svgClone.hasAttribute('height')) {
          svgClone.setAttribute('height', height.toString());
        }
        
        // Convert to string
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgClone);
        
        setSvgContent(svgString);
        
        if (onCapture) {
          onCapture(svgString);
        }
      } catch (error) {
        console.error('Failed to capture chart SVG:', error);
      }
    }, 1000); // Aumentado para 1000ms para dar mais tempo para renderização

    return () => clearTimeout(timer);
  }, [chart, width, height, onCapture]);

  return (
    <>
      {/* Hidden div to render the chart component */}
      <div 
        ref={chartRef} 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          top: 0,
          width: width, 
          height: height,
          opacity: 1, // Alterado para 1 para garantir renderização
          pointerEvents: 'none',
          overflow: 'visible',
          zIndex: -1000
        }}
      >
        {chart}
      </div>
      
      {/* Render the captured SVG in React-PDF */}
      {svgContent && (
        <Svg width={width} height={height}>
          <svg dangerouslySetInnerHTML={{ __html: svgContent }} />
        </Svg>
      )}
    </>
  );
};