import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
// Remova esta linha: import '@testing-library/jest-dom';
import { Document, Page, pdf } from '@react-pdf/renderer';
import { ReactToReactPDF } from '../components/ReactToReactPDF';
import { RechartsToReactPDF } from '../components/RechartsToReactPDF';
import { Line, Pie } from 'react-chartjs-2';
import { saveAs } from 'file-saver';

// Mock the chart.js library
jest.mock('react-chartjs-2', () => ({
  Line: jest.fn(() => <div data-testid="line-chart">Line Chart Mock</div>),
  Pie: jest.fn(() => <div data-testid="pie-chart">Pie Chart Mock</div>)
}));

// Mock file-saver
jest.mock('file-saver', () => ({
  saveAs: jest.fn()
}));

// Modifique o mock do @react-pdf/renderer
jest.mock('@react-pdf/renderer', () => ({
  Document: ({ children }: { children: React.ReactNode }) => <div data-testid="pdf-document">{children}</div>,
  Page: ({ children }: { children: React.ReactNode }) => <div data-testid="pdf-page">{children}</div>,
  Svg: ({ children }: { children: React.ReactNode }) => <div data-testid="pdf-svg">{children}</div>,
  pdf: jest.fn().mockReturnValue({
    toBlob: jest.fn().mockResolvedValue(new Blob(['pdf content'], { type: 'application/pdf' }))
  })
}));

// Sample data for charts
const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales 2023',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }
  ],
};

const pieData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
    },
  ],
};

const funnelStages = [
  { name: 'Visitors', value: 5000, color: '#4299e1' },
  { name: 'Leads', value: 3500, color: '#48bb78' },
  { name: 'Prospects', value: 2200, color: '#ecc94b' },
  { name: 'Opportunities', value: 1100, color: '#ed8936' },
  { name: 'Customers', value: 550, color: '#e53e3e' },
];

const userRankings = [
  { name: 'John Doe', points: 1250, avatar: '👨' },
  { name: 'Jane Smith', points: 980, avatar: '👩' },
  { name: 'Bob Johnson', points: 820, avatar: '👨' },
  { name: 'Alice Brown', points: 750, avatar: '👩' },
  { name: 'Charlie Davis', points: 620, avatar: '👨' },
];

// Component to test
function ChartJsExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <button className="px-4 py-2 border rounded" onClick={downloadPDF}>
        Export to PDF
      </button>
      <div className="border rounded p-4">
        <div className="mb-2">
          <h3 className="text-lg font-bold">Line Chart</h3>
          <p className="text-sm text-gray-500">A simple line chart example using Chart.js</p>
        </div>
        <div className="h-80">
          <Line 
            options={{ 
              responsive: true, 
              maintainAspectRatio: false,
            }} 
            data={lineData} 
          />
        </div>
      </div>
      
      <div className="border rounded p-4">
        <div className="mb-2">
          <h3 className="text-lg font-bold">Pie Chart</h3>
          <p className="text-sm text-gray-500">A simple pie chart example using Chart.js</p>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="w-64 h-64">
            <Pie data={pieData} />
          </div>
        </div>
      </div>

      {/* Vertical Funnel Chart */}
      <div className="border rounded p-4">
        <div className="mb-2">
          <h3 className="text-lg font-bold">Funnel Chart</h3>
          <p className="text-sm text-gray-500">A vertical funnel chart with square segments</p>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            {funnelStages.map((stage, index) => {
              // Calculate width percentage based on value
              const maxValue = funnelStages[0].value;
              const widthPercentage = (stage.value / maxValue) * 100;
              
              return (
                <div key={index} className="w-full flex flex-col items-center">
                  <div 
                    style={{ 
                      width: `${widthPercentage}%`, 
                      backgroundColor: stage.color,
                      height: '40px',
                    }} 
                    className="rounded-md"
                  />
                  <div className="text-sm mt-1 flex justify-between w-full">
                    <span>{stage.name}</span>
                    <span className="font-semibold">{stage.value.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Rankings */}
      <div className="border rounded p-4">
        <div className="mb-2">
          <h3 className="text-lg font-bold">User Rankings</h3>
          <p className="text-sm text-gray-500">Top 5 users by points</p>
        </div>
        <div className="h-80">
          <div className="space-y-4">
            {userRankings.map((user, index) => {
              // Calculate percentage for progress bar
              const maxPoints = userRankings[0].points;
              const percentage = (user.points / maxPoints) * 100;
              
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full">
                    <span className="text-lg">{user.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{user.name}</span>
                      <span className="font-semibold">{user.points} pts</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-slate-200 rounded-full">
                    <span className="font-bold text-sm">{index + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Function to generate and download PDF
const downloadPDF = async () => {
  // Create a PDF document with the charts
  const pdfDoc = (
    <Document>
      <Page size="A4">
        <ReactToReactPDF>
          <ChartJsExample />
        </ReactToReactPDF>
      </Page>
    </Document>
  );

  try {
    // Generate PDF blob
    const blob = await pdf(pdfDoc).toBlob();
    // Save the PDF file
    saveAs(blob, 'charts-dashboard.pdf');
    console.log('PDF generated successfully');
  } catch (error) {
    console.error('Failed to generate PDF:', error);
  }
};

describe('ChartJsExample with ReactToReactPDF', () => {
  it('renders the component and generates PDF when button is clicked', async () => {
    render(<ChartJsExample />);
    
    // Verify charts are rendered
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    
    // Find and click the export button
    const exportButton = screen.getByText('Export to PDF');
    fireEvent.click(exportButton);
    
    // Verify PDF generation was attempted
    expect(pdf).toHaveBeenCalled();
    
    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // Verify saveAs was called with a blob
    expect(saveAs).toHaveBeenCalledWith(
      expect.any(Blob),
      'charts-dashboard.pdf'
    );
  });
});