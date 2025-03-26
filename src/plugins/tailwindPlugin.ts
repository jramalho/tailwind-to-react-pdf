import { tailwindToReactPDF } from '../utils/tailwindToReactPDF';

/**
 * Função para criar um plugin Tailwind CSS que adiciona variantes para React-PDF
 * @returns Objeto de configuração do plugin Tailwind
 */
export const tailwindPDFPlugin = () => {
  return {
    name: 'tailwind-pdf',
    handler: ({ addVariant }: { addVariant: (name: string, definition: string) => void }) => {
      // Adiciona uma variante 'pdf' para estilos específicos do PDF
      addVariant('pdf', '&.pdf');
    }
  };
};

/**
 * Função para extrair estilos Tailwind de um tema e convertê-los para React-PDF
 * @param theme Tema Tailwind
 * @returns Objeto de estilos React-PDF
 */
export const extractTailwindTheme = (theme: any) => {
  const pdfTheme: Record<string, any> = {};
  
  // Extrai cores
  if (theme.colors) {
    pdfTheme.colors = theme.colors;
  }
  
  // Extrai tamanhos de fonte
  if (theme.fontSize) {
    pdfTheme.fontSizes = {};
    for (const [key, value] of Object.entries(theme.fontSize)) {
      if (Array.isArray(value) && value.length > 0) {
        pdfTheme.fontSizes[key] = value[0]
      } else if (typeof value === 'string' || typeof value === 'number') {
        pdfTheme.fontSizes[key] = value
      }
    }
  }
  
  // Extrai espaçamentos
  if (theme.spacing) {
    pdfTheme.spacing = theme.spacing;
  }

  return pdfTheme;
};
