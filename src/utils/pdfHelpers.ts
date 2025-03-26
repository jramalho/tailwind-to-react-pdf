import { Font } from '@react-pdf/renderer';
type FontStyle = 'normal' | 'italic' | 'oblique';
type FontWeight = number | 'thin' | 'ultralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'ultrabold' | 'heavy';

/**
 * Registra fontes personalizadas para uso com React-PDF
 * @param fonts Objeto com as fontes a serem registradas
 */
export const registerFonts = (fonts: Record<string, { normal?: string; bold?: string; italic?: string; boldItalic?: string }>) => {
  if (!fonts || typeof fonts !== 'object') {
    return;
  }

  Object.entries(fonts).forEach(([fontFamily, fontSources]) => {
    if (!fontFamily || !fontSources) {
      return;
    }

    // Collect valid font definitions
    const fontDefinitions = [];

    // Normal font
    if (fontSources.normal && typeof fontSources.normal === 'string') {
      fontDefinitions.push({
        src: fontSources.normal,
        fontWeight: 'normal' as FontWeight,
        fontStyle: 'normal' as FontStyle,
      });
    }

    // Bold font
    if (fontSources.bold && typeof fontSources.bold === 'string') {
      fontDefinitions.push({
        src: fontSources.bold,
        fontWeight: 'bold' as FontWeight,
        fontStyle: 'normal' as FontStyle,
      });
    }

    // Italic font
    if (fontSources.italic && typeof fontSources.italic === 'string') {
      fontDefinitions.push({
        src: fontSources.italic,
        fontWeight: 'normal' as FontWeight,
        fontStyle: 'italic' as FontStyle,
      });
    }

    // Bold Italic font
    if (fontSources.boldItalic && typeof fontSources.boldItalic === 'string') {
      fontDefinitions.push({
        src: fontSources.boldItalic,
        fontWeight: 'bold' as FontWeight,
        fontStyle: 'italic' as FontStyle
      });
    }

    // Register fonts if we have valid definitions
    if (fontDefinitions.length === 1) {
      // Use SingleLoad format for a single font
      Font.register({
        family: fontFamily,
        src: fontDefinitions[0].src,
        fontWeight: fontDefinitions[0].fontWeight || 'normal',
        fontStyle: fontDefinitions[0].fontStyle || 'normal' as FontStyle // Type assertion to FontStyle for SingleLoad forma
      });
    } else if (fontDefinitions.length > 1) {
      // Use BulkLoad format for multiple fonts
      Font.register({
        family: fontFamily,
        fonts: fontDefinitions.map(def => ({
          src: def.src,
          fontWeight: def.fontWeight || 'normal',
          fontStyle: def.fontStyle || 'normal'
        }))
      });
    }
  });
};

/**
 * Converte unidades CSS para pontos (pt) usados no React-PDF
 * @param value Valor CSS com unidade (px, rem, em, etc.)
 * @param baseFontSize Tamanho base da fonte em px (padrão: 16)
 * @returns Valor em pontos (pt)
 */
export const convertToPt = (value: string | number, baseFontSize: number = 16): number => {
  if (typeof value === 'number') {
    return value;
  }
  
  // Handle empty strings
  if (!value) {
    return 0;
  }
  
  // Handle percentage values specifically
  if (value.endsWith('%')) {
    const percentValue = parseFloat(value.replace('%', ''));
    return (percentValue / 100) * baseFontSize * 0.75;
  }
  
  // Check if the string is just a number without units
  if (!isNaN(Number(value))) {
    return Number(value);
  }
  
  const match = value.match(/^([\d.]+)(\w+)$/);
  if (!match) {
    return parseFloat(value) || 0;
  }
  
  const [, num, unit] = match;
  const numValue = parseFloat(num);
  
  switch (unit) {
    case 'px':
      return numValue * 0.75; // 1px = 0.75pt
    case 'pt':
      return numValue;
    case 'rem':
      return numValue * baseFontSize * 0.75;
    case 'em':
      return numValue * baseFontSize * 0.75;
    default:
      return numValue;
  }
};

/**
 * Calcula a altura de um texto com base no tamanho da fonte e no número de linhas
 * @param fontSize Tamanho da fonte em pt
 * @param lineHeight Altura da linha (padrão: 1.2)
 * @param lines Número de linhas (padrão: 1)
 * @returns Altura do texto em pt
 */
export const calculateTextHeight = (fontSize: number, lineHeight: number = 1.2, lines: number = 1): number => {
  return fontSize * lineHeight * lines;
};
