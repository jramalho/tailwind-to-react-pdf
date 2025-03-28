import React, { useRef, useEffect, useState, ReactElement } from 'react';
import { Svg } from '@react-pdf/renderer';

interface RechartsToReactPDFProps {
  chart: ReactElement;
  width?: number;
  height?: number;
  onCapture?: (svgString: string) => void;
}

export const RechartsToReactPDF: React.FC<RechartsToReactPDFProps> = ({ 
  chart, 
  width = 500, 
  height = 300,
  onCapture
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a container to render the chart
    const container = containerRef.current;
    if (!container) return;

    // Clear previous content
    container.innerHTML = '';

    // Render the chart in the container
    const chartInstance = React.cloneElement(chart, {
      width: width,
      height: height
    });
    
    // Use ReactDOM to render the chart
    const ReactDOM = require('react-dom');
    ReactDOM.render(chartInstance, container);

    // Wait for the chart to render
    setTimeout(() => {
      // Find the SVG element
      const svgElement = container.querySelector('svg');
      if (!svgElement) {
        console.error('No SVG element found in the chart');
        return;
      }

      // Clean up SVG for React-PDF
      // Remove any event listeners and React-specific attributes
      const cleanSvg = svgElement.cloneNode(true) as SVGElement;
      
      // Ensure all styles are properly applied
      const styles = window.getComputedStyle(svgElement);
      cleanSvg.setAttribute('style', styles.cssText);
      
      // Apply computed styles to all child elements
      const applyComputedStyles = (element: Element) => {
        const computedStyle = window.getComputedStyle(element);
        (element as SVGElement).setAttribute('style', computedStyle.cssText);
        
        Array.from(element.children).forEach(child => {
          applyComputedStyles(child);
        });
      };
      
      Array.from(svgElement.children).forEach((child, index) => {
        applyComputedStyles(child);
        cleanSvg.children[index].setAttribute('style', (child as SVGElement).getAttribute('style') || '');
      });

      // Convert SVG to string
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(cleanSvg);
      
      // Call onCapture callback if provided
      if (onCapture) {
        onCapture(svgString);
      }
      
      setSvgContent(svgString);
      
      // Clean up
      ReactDOM.unmountComponentAtNode(container);
    }, 500); // Increased timeout for rendering
    
    return () => {
      // Clean up on unmount
      if (container) {
        const ReactDOM = require('react-dom');
        ReactDOM.unmountComponentAtNode(container);
      }
    };
  }, [chart, width, height, onCapture]);

  // Hidden div to render the chart
  const hiddenStyle: React.CSSProperties = {
    position: 'absolute',
    visibility: 'hidden',
    pointerEvents: 'none',
    width: `${width}px`,
    height: `${height}px`,
    overflow: 'hidden'
  };

  return (
    <>
      <div ref={containerRef} style={hiddenStyle} />
      {svgContent && (
        <Svg width={width} height={height}>
          <svg
            dangerouslySetInnerHTML={{ __html: svgContent.replace(/<svg[^>]*>|<\/svg>/g, '') }}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
          />
        </Svg>
      )}
    </>
  );
};