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

    // Use setTimeout to ensure the chart has been rendered
    setTimeout(() => {
      try {
        const svgElement = chartRef.current?.querySelector('svg');
        
        if (!svgElement) {
          console.error('Failed to find SVG element in chart');
          return;
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
        
        // Extract the inner content (without the outer svg tag)
        const innerContent = svgString
          .replace(/<svg[^>]*>/, '')
          .replace(/<\/svg>$/, '');
        
        setSvgContent(innerContent);
        
        if (onCapture) {
          onCapture(innerContent);
        }
      } catch (error) {
        console.error('Failed to capture chart SVG:', error);
      }
    }, 100); // Small delay to ensure chart rendering
  }, [chart, width, height, onCapture]);

  return (
    <>
      {/* Hidden div to render the Recharts component */}
      <div 
        ref={chartRef} 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          width: width, 
          height: height 
        }}
      >
        {chart}
      </div>
      
      {/* Render the captured SVG in React-PDF */}
      {svgContent && (
        <Svg width={width} height={height}>
          <SvgContent content={svgContent} />
        </Svg>
      )}
    </>
  );
};