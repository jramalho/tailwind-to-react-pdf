import { tailwindToReactPDF, reactStyleToReactPDF } from './tailwindToReactPDF';

describe('tailwindToReactPDF', () => {
  test('should convert basic Tailwind classes to React-PDF styles', () => {
    const result = tailwindToReactPDF('text-lg font-bold text-blue-500');
    
    expect(result).toEqual({
      fontSize: 18,
      fontWeight: 700,
      color: '#4299e1'
    });
  });
  
  test('should handle multiple spacing classes correctly', () => {
    const result = tailwindToReactPDF('m-2 mt-4 px-3');
    
    expect(result).toEqual({
      margin: 8,
      marginTop: 16,
      paddingLeft: 12,
      paddingRight: 12
    });
  });
  
  test('should handle flex layout classes', () => {
    const result = tailwindToReactPDF('flex flex-col items-center justify-between');
    
    expect(result).toEqual({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    });
  });
  
  test('should handle border classes', () => {
    const result = tailwindToReactPDF('border border-gray-300 rounded-lg');
    
    expect(result).toEqual({
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#e2e8f0',
      borderRadius: 8
    });
  });
  
  test('should ignore unknown classes', () => {
    const result = tailwindToReactPDF('text-lg unknown-class another-unknown');
    
    expect(result).toEqual({
      fontSize: 18
    });
  });
  
  test('should return empty object for empty string', () => {
    const result = tailwindToReactPDF('');
    expect(result).toEqual({});
  });
  
  test('should return empty object for null or undefined', () => {
    // @ts-ignore - Testing null/undefined cases
    expect(tailwindToReactPDF(null)).toEqual({});
    // @ts-ignore - Testing null/undefined cases
    expect(tailwindToReactPDF(undefined)).toEqual({});
  });
});

describe('reactStyleToReactPDF', () => {
  test('should convert React style object to React-PDF style object', () => {
    const result = reactStyleToReactPDF({
      fontSize: 18,
      fontWeight: 700,
      color: '#4299e1',
      display: 'flex',
      flexDirection: 'column'
    });
    
    expect(result).toEqual({
      fontSize: 18,
      fontWeight: 700,
      color: '#4299e1',
      display: 'flex',
      flexDirection: 'column'
    });
  });
  
  test('should handle empty style object', () => {
    const result = reactStyleToReactPDF({});
    expect(result).toEqual({});
  });
  
  test('should handle null or undefined style object', () => {
    // @ts-ignore - Testing null case
    expect(reactStyleToReactPDF(null)).toEqual({});
    expect(reactStyleToReactPDF(undefined)).toEqual({});
  });
});