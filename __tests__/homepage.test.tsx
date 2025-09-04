import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';

// Mock Next.js components
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('next/image', () => {
  return ({ src, alt, width, height, className }: any) => {
    return <img src={src} alt={alt} width={width} height={height} className={className} />;
  };
});

describe('Homepage', () => {
  it('renders without crashing', () => {
    render(<Home />);
  });

  it('displays the ProxGrid branding', () => {
    render(<Home />);
    expect(screen.getAllByText('ProxGrid').length).toBeGreaterThan(0);
  });

  it('displays the main headline', () => {
    render(<Home />);
    expect(screen.getByText(/Monitor Methane Emissions/)).toBeInTheDocument();
  });

  it('displays the Sign In button', () => {
    render(<Home />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('displays the Start Monitoring CTA', () => {
    render(<Home />);
    expect(screen.getByText('Start Monitoring')).toBeInTheDocument();
  });

  it('displays feature cards', () => {
    render(<Home />);
    expect(screen.getByText('Advanced Sensors')).toBeInTheDocument();
    expect(screen.getByText('AI Analytics')).toBeInTheDocument();
    expect(screen.getByText('Secure Cloud')).toBeInTheDocument();
  });
});