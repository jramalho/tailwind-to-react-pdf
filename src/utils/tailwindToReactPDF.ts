// Mapeamento de classes Tailwind para estilos React-PDF
const tailwindToReactPDFMap: Record<string, any> = {
  // Cores de texto
  'text-black': { color: '#000000' },
  'text-white': { color: '#ffffff' },
  'text-gray-100': { color: '#f7fafc' },
  'text-gray-200': { color: '#edf2f7' },
  'text-gray-300': { color: '#e2e8f0' },
  'text-gray-400': { color: '#cbd5e0' },
  'text-gray-500': { color: '#a0aec0' },
  'text-gray-600': { color: '#718096' },
  'text-gray-700': { color: '#4a5568' },
  'text-gray-800': { color: '#2d3748' },
  'text-gray-900': { color: '#1a202c' },
  'text-red-500': { color: '#f56565' },
  'text-blue-500': { color: '#4299e1' },
  'text-green-500': { color: '#48bb78' },
  
  // Tamanhos de fonte
  'text-xs': { fontSize: 12 },
  'text-sm': { fontSize: 14 },
  'text-base': { fontSize: 16 },
  'text-lg': { fontSize: 18 },
  'text-xl': { fontSize: 20 },
  'text-2xl': { fontSize: 24 },
  'text-3xl': { fontSize: 30 },
  'text-4xl': { fontSize: 36 },
  
  // Peso da fonte
  'font-thin': { fontWeight: 100 },
  'font-extralight': { fontWeight: 200 },
  'font-light': { fontWeight: 300 },
  'font-normal': { fontWeight: 400 },
  'font-medium': { fontWeight: 500 },
  'font-semibold': { fontWeight: 600 },
  'font-bold': { fontWeight: 700 },
  'font-extrabold': { fontWeight: 800 },
  'font-black': { fontWeight: 900 },
  
  // Alinhamento de texto
  'text-left': { textAlign: 'left' },
  'text-center': { textAlign: 'center' },
  'text-right': { textAlign: 'right' },
  'text-justify': { textAlign: 'justify' },
  
  // Margens
  'm-0': { margin: 0 },
  'm-1': { margin: 4 },
  'm-2': { margin: 8 },
  'm-3': { margin: 12 },
  'm-4': { margin: 16 },
  'm-5': { margin: 20 },
  
  'mt-0': { marginTop: 0 },
  'mt-1': { marginTop: 4 },
  'mt-2': { marginTop: 8 },
  'mt-3': { marginTop: 12 },
  'mt-4': { marginTop: 16 },
  'mt-5': { marginTop: 20 },
  
  'mr-0': { marginRight: 0 },
  'mr-1': { marginRight: 4 },
  'mr-2': { marginRight: 8 },
  'mr-3': { marginRight: 12 },
  'mr-4': { marginRight: 16 },
  'mr-5': { marginRight: 20 },
  
  'mb-0': { marginBottom: 0 },
  'mb-1': { marginBottom: 4 },
  'mb-2': { marginBottom: 8 },
  'mb-3': { marginBottom: 12 },
  'mb-4': { marginBottom: 16 },
  'mb-5': { marginBottom: 20 },
  
  'ml-0': { marginLeft: 0 },
  'ml-1': { marginLeft: 4 },
  'ml-2': { marginLeft: 8 },
  'ml-3': { marginLeft: 12 },
  'ml-4': { marginLeft: 16 },
  'ml-5': { marginLeft: 20 },
  
  // Padding
  'p-0': { padding: 0 },
  'p-1': { padding: 4 },
  'p-2': { padding: 8 },
  'p-3': { padding: 12 },
  'p-4': { padding: 16 },
  'p-5': { padding: 20 },
  
  'pt-0': { paddingTop: 0 },
  'pt-1': { paddingTop: 4 },
  'pt-2': { paddingTop: 8 },
  'pt-3': { paddingTop: 12 },
  'pt-4': { paddingTop: 16 },
  'pt-5': { paddingTop: 20 },
  
  'pr-0': { paddingRight: 0 },
  'pr-1': { paddingRight: 4 },
  'pr-2': { paddingRight: 8 },
  'pr-3': { paddingRight: 12 },
  'pr-4': { paddingRight: 16 },
  'pr-5': { paddingRight: 20 },
  
  'pb-0': { paddingBottom: 0 },
  'pb-1': { paddingBottom: 4 },
  'pb-2': { paddingBottom: 8 },
  'pb-3': { paddingBottom: 12 },
  'pb-4': { paddingBottom: 16 },
  'pb-5': { paddingBottom: 20 },
  
  'pl-0': { paddingLeft: 0 },
  'pl-1': { paddingLeft: 4 },
  'pl-2': { paddingLeft: 8 },
  'pl-3': { paddingLeft: 12 },
  'pl-4': { paddingLeft: 16 },
  'pl-5': { paddingLeft: 20 },
  
  // Flexbox
  'flex': { display: 'flex' },
  'flex-row': { flexDirection: 'row' },
  'flex-col': { flexDirection: 'column' },
  'flex-wrap': { flexWrap: 'wrap' },
  'flex-nowrap': { flexWrap: 'nowrap' },
  'flex-1': { flex: 1 },
  'flex-auto': { flex: 'auto' },
  'flex-initial': { flex: 'initial' },
  'flex-none': { flex: 'none' },
  
  // Alinhamento Flex
  'items-start': { alignItems: 'flex-start' },
  'items-end': { alignItems: 'flex-end' },
  'items-center': { alignItems: 'center' },
  'items-baseline': { alignItems: 'baseline' },
  'items-stretch': { alignItems: 'stretch' },
  
  'justify-start': { justifyContent: 'flex-start' },
  'justify-end': { justifyContent: 'flex-end' },
  'justify-center': { justifyContent: 'center' },
  'justify-between': { justifyContent: 'space-between' },
  'justify-around': { justifyContent: 'space-around' },
  'justify-evenly': { justifyContent: 'space-evenly' },
  
  // Bordas
  'border': { borderWidth: 1, borderStyle: 'solid', borderColor: '#e2e8f0' },
  'border-0': { borderWidth: 0 },
  'border-2': { borderWidth: 2 },
  'border-4': { borderWidth: 4 },
  'border-8': { borderWidth: 8 },
  
  'border-t': { borderTopWidth: 1, borderStyle: 'solid', borderColor: '#e2e8f0' },
  'border-r': { borderRightWidth: 1, borderStyle: 'solid', borderColor: '#e2e8f0' },
  'border-b': { borderBottomWidth: 1, borderStyle: 'solid', borderColor: '#e2e8f0' },
  'border-l': { borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#e2e8f0' },
  
  'border-black': { borderColor: '#000000' },
  'border-white': { borderColor: '#ffffff' },
  'border-gray-300': { borderColor: '#e2e8f0' },
  'border-gray-500': { borderColor: '#a0aec0' },
  
  // Arredondamento de bordas
  'rounded-none': { borderRadius: 0 },
  'rounded-sm': { borderRadius: 2 },
  'rounded': { borderRadius: 4 },
  'rounded-md': { borderRadius: 6 },
  'rounded-lg': { borderRadius: 8 },
  'rounded-xl': { borderRadius: 12 },
  'rounded-2xl': { borderRadius: 16 },
  'rounded-3xl': { borderRadius: 24 },
  'rounded-full': { borderRadius: 9999 },
  
  // Cores de fundo
  'bg-transparent': { backgroundColor: 'transparent' },
  'bg-black': { backgroundColor: '#000000' },
  'bg-white': { backgroundColor: '#ffffff' },
  'bg-gray-100': { backgroundColor: '#f7fafc' },
  'bg-gray-200': { backgroundColor: '#edf2f7' },
  'bg-gray-300': { backgroundColor: '#e2e8f0' },
  'bg-gray-400': { backgroundColor: '#cbd5e0' },
  'bg-gray-500': { backgroundColor: '#a0aec0' },
  'bg-gray-600': { backgroundColor: '#718096' },
  'bg-gray-700': { backgroundColor: '#4a5568' },
  'bg-gray-800': { backgroundColor: '#2d3748' },
  'bg-gray-900': { backgroundColor: '#1a202c' },
  'bg-red-500': { backgroundColor: '#f56565' },
  'bg-blue-500': { backgroundColor: '#4299e1' },
  'bg-green-500': { backgroundColor: '#48bb78' },
  
  // Largura e altura
  'w-full': { width: '100%' },
  'w-auto': { width: 'auto' },
  'w-1/2': { width: '50%' },
  'w-1/3': { width: '33.333333%' },
  'w-2/3': { width: '66.666667%' },
  'w-1/4': { width: '25%' },
  'w-3/4': { width: '75%' },
  
  'h-full': { height: '100%' },
  'h-auto': { height: 'auto' },
  'h-1/2': { height: '50%' },
  'h-1/3': { height: '33.333333%' },
  'h-2/3': { height: '66.666667%' },
  'h-1/4': { height: '25%' },
  'h-3/4': { height: '75%' },
};

/**
 * Converte classes Tailwind para estilos compatíveis com React-PDF
 * @param className String de classes Tailwind separadas por espaço
 * @returns Objeto de estilo compatível com React-PDF
 */
export const tailwindToReactPDF = (className: string): Record<string, any> => {
  if (!className) return {};
  
  const classes = className.split(' ').filter(Boolean);
  let styles = {};
  
  for (const cls of classes) {
    if (tailwindToReactPDFMap[cls]) {
      styles = { ...styles, ...tailwindToReactPDFMap[cls] };
    } else {
      console.warn(`Classe Tailwind não mapeada: ${cls}`);
    }
  }
  
  return styles;
};

/**
 * Analisa um objeto de estilo React e converte para formato compatível com React-PDF
 * @param style Objeto de estilo React
 * @returns Objeto de estilo compatível com React-PDF
 */
export const reactStyleToReactPDF = (style: Record<string, any> = {}): Record<string, any> => {
  // Converte propriedades CSS para formato React-PDF
  const pdfStyle: Record<string, any> = {};
  
  // Mapeamento de propriedades CSS para React-PDF
  const propertyMap: Record<string, string> = {
    backgroundColor: 'backgroundColor',
    color: 'color',
    fontSize: 'fontSize',
    fontWeight: 'fontWeight',
    textAlign: 'textAlign',
    margin: 'margin',
    marginTop: 'marginTop',
    marginRight: 'marginRight',
    marginBottom: 'marginBottom',
    marginLeft: 'marginLeft',
    padding: 'padding',
    paddingTop: 'paddingTop',
    paddingRight: 'paddingRight',
    paddingBottom: 'paddingBottom',
    paddingLeft: 'paddingLeft',
    display: 'display',
    flexDirection: 'flexDirection',
    flexWrap: 'flexWrap',
    flex: 'flex',
    alignItems: 'alignItems',
    justifyContent: 'justifyContent',
    borderWidth: 'borderWidth',
    borderStyle: 'borderStyle',
    borderColor: 'borderColor',
    borderRadius: 'borderRadius',
    width: 'width',
    height: 'height',
  };
  
  for (const [key, value] of Object.entries(style)) {
    if (propertyMap[key]) {
      pdfStyle[propertyMap[key]] = value;
    }
  }
  
  return pdfStyle;
};