import React, { useRef, useEffect, useState } from 'react';
import { Image, Svg } from '@react-pdf/renderer';

interface RechartsToReactPDFProps {
  chart: React.ReactNode;
  width?: number;
  height?: number;
}

export const RechartsToReactPDF: React.FC<RechartsToReactPDFProps> = ({ 
  chart, 
  width = 500, 
  height = 300 
}) => {
  const [svgString, setSvgString] = useState<string | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Find the SVG element inside the rendered chart
      const svgElement = chartRef.current.querySelector('svg');
      if (svgElement) {
        // Clone the SVG to avoid modifying the original
        const svgClone = svgElement.cloneNode(true) as SVGElement;
        
        // Convert to string
        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svgClone);
        
        setSvgString(svgStr);
      }
    }
  }, [chart]);

  // Render the chart in a hidden div to capture its SVG
  return (
    <>
      <div style={{ position: 'absolute', left: '-9999px' }} ref={chartRef}>
        {chart}
      </div>
      
      {svgString && (
        <Svg width={width} height={height}>
          {/* Use the captured SVG string */}
          <svg dangerouslySetInnerHTML={{ __html: svgString }} />
        </Svg>
      )}
    </>
  );
};