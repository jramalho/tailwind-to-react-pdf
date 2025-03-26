import React from 'react';
import { PDFViewer, StyleSheet } from '@react-pdf/renderer';
import { 
  TailwindDocument, 
  TailwindPage, 
  TailwindView, 
  TailwindText, 
  TailwindImage,
  registerFonts,
  createTailwindStyles
} from '../index';

// Registra fontes personalizadas
registerFonts({
  'Roboto': {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
    italic: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-italic-webfont.ttf',
    boldItalic: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-italic-webfont.ttf'
  }
});

// Cria estilos a partir de classes Tailwind
const styles = createTailwindStyles({
  page: 'p-10 bg-white',
  header: 'flex flex-row justify-between items-center mb-10',
  headerTitle: 'text-2xl font-bold text-blue-700',
  headerDate: 'text-sm text-gray-500',
  section: 'mb-6',
  sectionTitle: 'text-xl font-bold text-blue-600 mb-3 border-b border-gray-300 pb-1',
  paragraph: 'text-base text-gray-800 mb-2',
  table: 'w-full border border-gray-300',
  tableHeader: 'bg-gray-100 border-b border-gray-300',
  tableHeaderCell: 'text-sm font-bold text-gray-700 p-2',
  tableRow: 'border-b border-gray-300',
  tableCell: 'text-sm p-2 text-gray-800',
  footer: 'mt-10 text-xs text-gray-500 text-center'
});

// Dados de exemplo
const invoiceData = {
  invoiceNumber: 'INV-2023-001',
  date: '2023-05-15',
  dueDate: '2023-06-15',
  customer: {
    name: 'Empresa ABC Ltda',
    address: 'Rua Exemplo, 123',
    city: 'São Paulo, SP',
    email: 'contato@empresaabc.com'
  },
  items: [
    { id: 1, description: 'Serviço de Consultoria', quantity: 10, unitPrice: 150, total: 1500 },
    { id: 2, description: 'Desenvolvimento de Website', quantity: 1, unitPrice: 3000, total: 3000 },
    { id: 3, description: 'Manutenção Mensal', quantity: 3, unitPrice: 500, total: 1500 }
  ],
  subtotal: 6000,
  tax: 600,
  total: 6600
};

// Componente de Fatura
const InvoicePDF = () => (
  <TailwindDocument>
    <TailwindPage size="A4" style={styles.page}>
      {/* Cabeçalho */}
      <TailwindView style={styles.header}>
        <TailwindView>
          <TailwindText style={styles.headerTitle}>FATURA</TailwindText>
          <TailwindText className="text-sm text-gray-600">
            #{invoiceData.invoiceNumber}
          </TailwindText>
        </TailwindView>
        <TailwindView>
          <TailwindText style={styles.headerDate}>
            Data: {invoiceData.date}
          </TailwindText>
          <TailwindText className="text-sm text-gray-600">
            Vencimento: {invoiceData.dueDate}
          </TailwindText>
        </TailwindView>
      </TailwindView>
      
      {/* Informações do Cliente */}
      <TailwindView style={styles.section}>
        <TailwindText style={styles.sectionTitle}>Cliente</TailwindText>
        <TailwindText style={styles.paragraph}>
          {invoiceData.customer.name}
        </TailwindText>
        <TailwindText style={styles.paragraph}>
          {invoiceData.customer.address}
        </TailwindText>
        <TailwindText style={styles.paragraph}>
          {invoiceData.customer.city}
        </TailwindText>
        <TailwindText style={styles.paragraph}>
          {invoiceData.customer.email}
        </TailwindText>
      </TailwindView>
      
      {/* Itens da Fatura */}
      <TailwindView style={styles.section}>
        <TailwindText style={styles.sectionTitle}>Itens</TailwindText>
        
        {/* Tabela */}
        <TailwindView style={styles.table}>
          {/* Cabeçalho da Tabela */}
          <TailwindView style={styles.tableHeader}>
            <TailwindView className="flex flex-row">
              <TailwindText style={styles.tableHeaderCell} className="w-1/2">Descrição</TailwindText>
              <TailwindText style={styles.tableHeaderCell} className="w-1/6 text-center">Qtd</TailwindText>
              <TailwindText style={styles.tableHeaderCell} className="w-1/6 text-right">Preço Unit.</TailwindText>
              <TailwindText style={styles.tableHeaderCell} className="w-1/6 text-right">Total</TailwindText>
            </TailwindView>
          </TailwindView>
          
          {/* Linhas da Tabela */}
          {invoiceData.items.map((item) => (
            <TailwindView key={item.id} style={styles.tableRow}>
              <TailwindView className="flex flex-row">
                <TailwindText style={styles.tableCell} className="w-1/2">{item.description}</TailwindText>
                <TailwindText style={styles.tableCell} className="w-1/6 text-center">{item.quantity}</TailwindText>
                <TailwindText style={styles.tableCell} className="w-1/6 text-right">R$ {item.unitPrice.toFixed(2)}</TailwindText>
                <TailwindText style={styles.tableCell} className="w-1/6 text-right">R$ {item.total.toFixed(2)}</TailwindText>
              </TailwindView>
            </TailwindView>
          ))}
        </TailwindView>
      </TailwindView>
      
      {/* Resumo */}
      <TailwindView className="flex flex-row justify-end">
        <TailwindView className="w-1/3">
          <TailwindView className="flex flex-row justify-between mb-1">
            <TailwindText className="text-sm font-medium">Subtotal:</TailwindText>
            <TailwindText className="text-sm">R$ {invoiceData.subtotal.toFixed(2)}</TailwindText>
          </TailwindView>
          <TailwindView className="flex flex-row justify-between mb-1">
            <TailwindText className="text-sm font-medium">Impostos (10%):</TailwindText>
            <TailwindText className="text-sm">R$ {invoiceData.tax.toFixed(2)}</TailwindText>
          </TailwindView>
          <TailwindView className="flex flex-row justify-between border-t border-gray-300 pt-1">
            <TailwindText className="text-base font-bold">Total:</TailwindText>
            <TailwindText className="text-base font-bold">R$ {invoiceData.total.toFixed(2)}</TailwindText>
          </TailwindView>
        </TailwindView>
      </TailwindView>
      
      {/* Rodapé */}
      <TailwindText style={styles.footer}>
        Esta é uma fatura gerada automaticamente. Obrigado por fazer negócios conosco!
      </TailwindText>
    </TailwindPage>
  </TailwindDocument>
);

// Componente para visualizar o PDF
export const AdvancedPDFExample = () => (
  <PDFViewer width="100%" height="600px">
    <InvoicePDF />
  </PDFViewer>
);