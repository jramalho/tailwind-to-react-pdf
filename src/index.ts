// Exporta os componentes
export {
  TailwindText,
  TailwindView,
  TailwindImage,
  TailwindPage,
  TailwindDocument,
  createTailwindStyles
} from './components/TailwindPDF';

// Exporta o HOC
export { withTailwindPDF } from './components/withTailwindPDF';

// Exporta os utilitários
export {
  tailwindToReactPDF,
  reactStyleToReactPDF
} from './utils/tailwindToReactPDF';

// Exporta os utilitários de PDF
export {
  registerFonts,
  convertToPt,
  calculateTextHeight
} from './utils/pdfHelpers';

// Exporta os plugins
export {
  tailwindPDFPlugin,
  extractTailwindTheme
} from './plugins/tailwindPlugin';

export { ReactToReactPDF } from './components/ReactToReactPDF';