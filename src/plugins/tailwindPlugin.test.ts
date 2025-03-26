import { tailwindPDFPlugin, extractTailwindTheme } from './tailwindPlugin';

describe('tailwindPDFPlugin', () => {
  test('should create a Tailwind plugin with pdf variant', () => {
    const addVariant = jest.fn();
    const plugin = tailwindPDFPlugin();
    
    expect(plugin.name).toBe('tailwind-pdf');
    
    // Call the handler
    plugin.handler({ addVariant });
    
    // Check if addVariant was called with the correct arguments
    expect(addVariant).toHaveBeenCalledWith('pdf', '&.pdf');
  });
});

describe('extractTailwindTheme', () => {
  test('should extract colors from theme', () => {
    const theme = {
      colors: {
        blue: {
          500: '#4299e1'
        },
        red: {
          500: '#f56565'
        }
      }
    };
    
    const result = extractTailwindTheme(theme);
    
    expect(result.colors).toEqual(theme.colors);
  });
  
  test('should extract font sizes from theme', () => {
    const theme = {
      fontSize: {
        sm: '0.875rem',
        base: '1rem',
        lg: ['1.125rem', { lineHeight: '1.75rem' }]
      }
    };
    
    const result = extractTailwindTheme(theme);
    
    expect(result.fontSizes).toEqual({
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem'
    });
  });
  
  test('should extract spacing from theme', () => {
    const theme = {
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        4: '1rem'
      }
    };
    
    const result = extractTailwindTheme(theme);
    
    expect(result.spacing).toEqual(theme.spacing);
  });
  
  test('should handle empty theme', () => {
    const result = extractTailwindTheme({});
    
    expect(result).toEqual({});
  });
});