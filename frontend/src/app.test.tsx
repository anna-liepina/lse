import { render, screen } from '@testing-library/react';
import App from './app';

test('renders Stock Dashboard heading', () => {
  render(<App />);
  const heading = screen.getByText(/Stock Dashboard/i);
  expect(heading).toBeInTheDocument();
});

test('displays exchanges when in home menu', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue([
        { code: 'NYSE', name: 'New York Stock Exchange' },
        { code: 'LSE', name: 'London Stock Exchange' },
      ]),
    });
  
    render(<App />);
    
    const exchangeButton1 = await screen.findByText(/New York Stock Exchange/i);
    const exchangeButton2 = await screen.findByText(/London Stock Exchange/i);
  
    expect(exchangeButton1).toBeInTheDocument();
    expect(exchangeButton2).toBeInTheDocument();
  });
  