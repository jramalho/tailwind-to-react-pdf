import React from 'react';
import { render } from '@testing-library/react';
import { ReactToReactPDF } from './ReactToReactPDF';

// Define interfaces para as props dos componentes
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// Mock components para simular os componentes do shadcn/ui
const Card: React.FC<CardProps> = ({ children, className }) => 
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ''}`}>{children}</div>;
Card.displayName = 'Card';

const CardHeader: React.FC<CardProps> = ({ children, className }) => 
  <div className={`flex flex-col space-y-1.5 p-6 ${className || ''}`}>{children}</div>;
CardHeader.displayName = 'CardHeader';

const CardTitle: React.FC<CardProps> = ({ children, className }) => 
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className || ''}`}>{children}</h3>;
CardTitle.displayName = 'CardTitle';

const CardDescription: React.FC<CardProps> = ({ children, className }) => 
  <p className={`text-sm text-muted-foreground ${className || ''}`}>{children}</p>;
CardDescription.displayName = 'CardDescription';

const CardContent: React.FC<CardProps> = ({ children, className }) => 
  <div className={`p-6 pt-0 ${className || ''}`}>{children}</div>;
CardContent.displayName = 'CardContent';

// Mock dados para o teste
const userRankings = [
  { name: 'Jane Doe', points: 1250, avatar: '👩' },
  { name: 'Joe Smith', points: 980, avatar: '👨' },
  { name: 'Bob Johnson', points: 875, avatar: '🧔' },
  { name: 'Emily Davis', points: 720, avatar: '👧' },
  { name: 'Sarah Brown', points: 550, avatar: '👱‍♀️' }
];

// Mock Text e View do react-pdf
jest.mock('@react-pdf/renderer', () => ({
  Text: ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => 
    <span data-testid="pdf-text" style={style}>{children}</span>,
  View: ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => 
    <div data-testid="pdf-view" style={style}>{children}</div>
}));

describe('ReactToReactPDF', () => {
  it('transforms basic HTML elements correctly', () => {
    const { getByText } = render(
      <ReactToReactPDF>
        <div>
          <h1>Test Heading</h1>
          <p>Test paragraph</p>
        </div>
      </ReactToReactPDF>
    );
    
    expect(getByText('Test Heading')).toBeInTheDocument();
    expect(getByText('Test paragraph')).toBeInTheDocument();
  });
  
  it('transforms Card components correctly', () => {
    const { getByText, getAllByTestId } = render(
      <ReactToReactPDF>
        <Card>
          <CardHeader>
            <CardTitle>User Rankings</CardTitle>
            <CardDescription>Top 5 users by points</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
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
          </CardContent>
        </Card>
      </ReactToReactPDF>
    );
    
    // Verificar se os elementos principais foram renderizados
    expect(getByText('User Rankings')).toBeInTheDocument();
    expect(getByText('Top 5 users by points')).toBeInTheDocument();
    
    // Verificar se todos os usuários foram renderizados
    userRankings.forEach(user => {
      expect(getByText(user.name)).toBeInTheDocument();
      expect(getByText(`${user.points} pts`)).toBeInTheDocument();
      expect(getByText(user.avatar)).toBeInTheDocument();
    });
    
    // Verificar se os componentes View do react-pdf foram criados
    const viewComponents = getAllByTestId('pdf-view');
    expect(viewComponents.length).toBeGreaterThan(0);
    
    // Verificar se os componentes Text do react-pdf foram criados
    const textComponents = getAllByTestId('pdf-text');
    expect(textComponents.length).toBeGreaterThan(0);
  });
});