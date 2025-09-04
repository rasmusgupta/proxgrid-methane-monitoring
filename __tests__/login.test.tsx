import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../src/app/login/page';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

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

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  it('renders login form correctly', () => {
    render(<LoginPage />);
    
    expect(screen.getByText('ProxGrid')).toBeInTheDocument();
    expect(screen.getByText('Methane Emissions Monitoring')).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('displays demo credentials', () => {
    render(<LoginPage />);
    
    expect(screen.getByText('Demo Credentials:')).toBeInTheDocument();
    expect(screen.getByText('demo@proxgrid.com')).toBeInTheDocument();
    expect(screen.getByText('demo123')).toBeInTheDocument();
  });

  it('handles form input correctly', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('shows loading state during authentication', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    // Wait for auth provider to initialize
    await waitFor(() => {
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    });
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    await user.type(emailInput, 'demo@proxgrid.com');
    await user.type(passwordInput, 'demo123');
    await user.click(submitButton);
    
    expect(screen.getByText('Signing in...')).toBeInTheDocument();
  });

  it('shows error message for invalid credentials', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    // Wait for auth provider to initialize
    await waitFor(() => {
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    });
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    await user.type(emailInput, 'invalid@example.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });
  });

  it('successfully authenticates with valid credentials', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    // Wait for auth provider to initialize
    await waitFor(() => {
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    });
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    await user.type(emailInput, 'demo@proxgrid.com');
    await user.type(passwordInput, 'demo123');
    await user.click(submitButton);
    
    // Wait for authentication to complete
    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'proxgrid-user',
        expect.stringContaining('demo@proxgrid.com')
      );
    }, { timeout: 2000 });
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/app');
    }, { timeout: 2000 });
  });
});