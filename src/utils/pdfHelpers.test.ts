import { Font } from '@react-pdf/renderer';
import { registerFonts, convertToPt, calculateTextHeight } from './pdfHelpers';

// Mock Font.register
jest.mock('@react-pdf/renderer', () => ({
  Font: {
    register: jest.fn()
  }
}));

describe('pdfHelpers', () => {
  describe('registerFonts', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should register a single font with normal style', () => {
      const fonts = {
        'Open Sans': {
          normal: 'path/to/OpenSans-Regular.ttf'
        }
      };

      registerFonts(fonts);

      expect(Font.register).toHaveBeenCalledWith({
        family: 'Open Sans',
        src: 'path/to/OpenSans-Regular.ttf',
        fontWeight: 'normal',
        fontStyle: 'normal'
      });
    });
  });

  describe('convertToPt', () => {
    test('should handle numeric input', () => {
      expect(convertToPt(10)).toBeCloseTo(10, 5);
      expect(convertToPt(0)).toBeCloseTo(0, 5);
      expect(convertToPt(-5)).toBeCloseTo(-5, 5);
    });

    test('should convert px to pt', () => {
      expect(convertToPt('10px')).toBeCloseTo(7.5, 5);
      expect(convertToPt('100px')).toBeCloseTo(75, 5);
      expect(convertToPt('0px')).toBeCloseTo(0, 5);
    });

    test('should keep pt values as is', () => {
      expect(convertToPt('10pt')).toBeCloseTo(10, 5);
      expect(convertToPt('100pt')).toBeCloseTo(100, 5);
      expect(convertToPt('0pt')).toBeCloseTo(0, 5);
    });

    test('should convert rem to pt', () => {
      expect(convertToPt('1rem')).toBeCloseTo(12, 5); // 16px * 1 * 0.75 = 12pt
      expect(convertToPt('2rem')).toBeCloseTo(24, 5); // 16px * 2 * 0.75 = 24pt
      expect(convertToPt('1.5rem')).toBeCloseTo(18, 5); // 16px * 1.5 * 0.75 = 18pt
    });

    test('should convert em to pt', () => {
      expect(convertToPt('1em')).toBeCloseTo(12, 5); // 16px * 1 * 0.75 = 12pt
      expect(convertToPt('2em')).toBeCloseTo(24, 5); // 16px * 2 * 0.75 = 24pt
      expect(convertToPt('1.5em')).toBeCloseTo(18, 5); // 16px * 1.5 * 0.75 = 18pt
    });

    test('should convert percentage to pt', () => {
      expect(convertToPt('100%')).toBeCloseTo(12, 5); // 16px * 1 * 0.75 = 12pt
      expect(convertToPt('200%')).toBeCloseTo(24, 5); // 16px * 2 * 0.75 = 24pt
      expect(convertToPt('150%')).toBeCloseTo(18, 5); // 16px * 1.5 * 0.75 = 18pt
    });

    test('should use custom base font size when provided', () => {
      expect(convertToPt('1rem', 20)).toBeCloseTo(15, 5); // 20px * 1 * 0.75 = 15pt
      expect(convertToPt('100%', 24)).toBeCloseTo(18, 5); // 24px * 1 * 0.75 = 18pt
      expect(convertToPt('2em', 12)).toBeCloseTo(18, 5); // 12px * 2 * 0.75 = 18pt
    });

    test('should handle invalid or empty input', () => {
      expect(convertToPt('')).toBeCloseTo(0, 5);
      expect(convertToPt('invalid')).toBeCloseTo(0, 5);
      expect(convertToPt('10')).toBeCloseTo(10, 5);
    });

    test('should handle units without conversion factors', () => {
      expect(convertToPt('10vw')).toBeCloseTo(10, 5);
      expect(convertToPt('20vh')).toBeCloseTo(20, 5);
      expect(convertToPt('5ch')).toBeCloseTo(5, 5);
    });
  });

  describe('calculateTextHeight', () => {
    test('should calculate height for single line text', () => {
      expect(calculateTextHeight(10)).toBeCloseTo(12, 5); // 10pt * 1.2 = 12pt
      expect(calculateTextHeight(12)).toBeCloseTo(14.4, 5); // 12pt * 1.2 = 14.4pt
      expect(calculateTextHeight(16)).toBeCloseTo(19.2, 5); // 16pt * 1.2 = 19.2pt
    });

    test('should use custom line height when provided', () => {
      expect(calculateTextHeight(10, 1.5)).toBeCloseTo(15, 5); // 10pt * 1.5 = 15pt
      expect(calculateTextHeight(12, 2)).toBeCloseTo(24, 5); // 12pt * 2 = 24pt
      expect(calculateTextHeight(16, 1)).toBeCloseTo(16, 5); // 16pt * 1 = 16pt
    });

    test('should calculate height for multiple lines', () => {
      expect(calculateTextHeight(10, 1.2, 2)).toBeCloseTo(24, 5); // 10pt * 1.2 * 2 = 24pt
      expect(calculateTextHeight(12, 1.5, 3)).toBeCloseTo(54, 5); // 12pt * 1.5 * 3 = 54pt
      expect(calculateTextHeight(16, 1, 4)).toBeCloseTo(64, 5); // 16pt * 1 * 4 = 64pt
    });

    test('should handle zero or negative values', () => {
      expect(calculateTextHeight(0)).toBeCloseTo(0, 5);
      expect(calculateTextHeight(10, 0)).toBeCloseTo(0, 5);
      expect(calculateTextHeight(10, 1.2, 0)).toBeCloseTo(0, 5);
      
      // Negative values should be treated as their absolute values
      expect(calculateTextHeight(-10)).toBeCloseTo(-12, 5); // -10pt * 1.2 = -12pt
      expect(calculateTextHeight(10, -1.5)).toBeCloseTo(-15, 5); // 10pt * -1.5 = -15pt
    });
  });
});