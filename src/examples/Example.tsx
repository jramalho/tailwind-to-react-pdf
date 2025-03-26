import React from 'react';
import { Document, Page, PDFViewer } from '@react-pdf/renderer';
import { TailwindView, TailwindText, createTailwindStyles } from '../index';

// Exemplo de uso com classes Tailwind
const ExamplePDF = () => (
  <Document>
    <Page size="A4">
      <TailwindView className="flex flex-col items-center">
        <TailwindText className="text-2xl font-bold text-blue-500 mb-4">
          Documento PDF com Tailwind
        </TailwindText>
        
        <TailwindView className="border border-gray-300 rounded p-4 mb-4 w-full">
          <TailwindText className="text-lg font-medium mb-2">
            Seção com Borda
          </TailwindText>
          <TailwindText className="text-gray-700">
            Este é um exemplo de texto dentro de uma seção com borda.
            As classes Tailwind são convertidas para estilos React-PDF.
          </TailwindText>
        </TailwindView>
        
        <TailwindView className="flex flex-row justify-between w-full mb-4">
          <TailwindView className="bg-gray-100 p-3 rounded w-1/2 mr-2">
            <TailwindText className="text-center">Coluna 1</TailwindText>
          </TailwindView>
          <TailwindView className="bg-gray-200 p-3 rounded w-1/2 ml-2">
            <TailwindText className="text-center">Coluna 2</TailwindText>
          </TailwindView>
        </TailwindView>
        
        <TailwindText className="text-sm text-gray-500 mt-4">
          Criado com tailwind-to-react-pdf
        </TailwindText>
      </TailwindView>
    </Page>
  </Document>
);

// Exemplo de uso com StyleSheet
const styles = createTailwindStyles({
  container: 'flex flex-col items-center p-10',
  title: 'text-2xl font-bold text-blue-500 mb-4',
  section: 'border border-gray-300 rounded p-4 mb-4 w-full',
  sectionTitle: 'text-lg font-medium mb-2',
  text: 'text-gray-700',
  footer: 'text-sm text-gray-500 mt-4'
});

const ExamplePDFWithStyles = () => (
  <Document>
    <Page size="A4">
      <TailwindView style={styles.container}>
        <TailwindText style={styles.title}>
          Documento PDF com Tailwind StyleSheet
        </TailwindText>
        
        <TailwindView style={styles.section}>
          <TailwindText style={styles.sectionTitle}>
            Seção com Borda
          </TailwindText>
          <TailwindText style={styles.text}>
            Este é um exemplo de texto dentro de uma seção com borda.
            As classes Tailwind são convertidas para estilos React-PDF.
          </TailwindText>
        </TailwindView>
        
        <TailwindText style={styles.footer}>
          Criado com tailwind-to-react-pdf
        </TailwindText>
      </TailwindView>
    </Page>
  </Document>
);

// Componente para visualizar o PDF
export const PDFExample = () => (
  <PDFViewer width="100%" height="600px">
    <ExamplePDF />
  </PDFViewer>
);

export const PDFExampleWithStyles = () => (
  <PDFViewer width="100%" height="600px">
    <ExamplePDFWithStyles />
  </PDFViewer>
);