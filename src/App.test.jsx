import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from './App.jsx';

describe('HIVE & HUM editorial landing page contract', () => {
  it('renders the art-directed hero with CTAs and poster media', () => {
    render(<App />);
    expect(screen.getByLabelText(/HIVE & HUM Home/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Taste the place/i);
    expect(screen.getByRole('link', { name: /Find your flavor/i })).toHaveAttribute('href', '#flavors');
    expect(screen.getByRole('link', { name: /Meet the keepers/i })).toHaveAttribute('href', '#origin');
    expect(screen.getByAltText(/Amber honey flowing from a dipper/i)).toHaveAttribute('src', '/assets/hero-editorial.webp');
  });

  it('updates the flavor panel when a different tab is activated', async () => {
    const user = userEvent.setup();
    render(<App />);
    const lavenderTab = screen.getByRole('tab', { name: /Lavender/i });
    const heatherTab = screen.getByRole('tab', { name: /Heather/i });
    expect(lavenderTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { level: 3, name: 'Wild Lavender' })).toBeInTheDocument();
    expect(screen.getByAltText(/Wild Lavender honey jar/i)).toHaveAttribute('src', '/assets/flavor-lavender.webp');
    await user.click(heatherTab);
    expect(heatherTab).toHaveAttribute('aria-selected', 'true');
    expect(lavenderTab).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('heading', { level: 3, name: 'Highland Heather' })).toBeInTheDocument();
    expect(screen.getByText(/Toasted caramel, heather/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Highland Heather honey jar/i)).toHaveAttribute('src', '/assets/flavor-heather.webp');
  });


  it('handles empty newsletter submission with an accessible error', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /Subscribe/i }));
    expect(screen.getByRole('status')).toHaveTextContent(/Please enter your email address/i);
    expect(screen.getByPlaceholderText(/Your email address/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('handles malformed newsletter submission with clear guidance', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/Your email address/i);
    await user.type(input, 'not-an-email');
    await user.click(screen.getByRole('button', { name: /Subscribe/i }));
    expect(screen.getByRole('status')).toHaveTextContent(/Please enter a valid email address/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('handles valid newsletter submission with success confirmation', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/Your email address/i);
    await user.type(input, 'beekeeper@example.com');
    await user.click(screen.getByRole('button', { name: /Subscribe/i }));
    expect(screen.getByRole('status')).toHaveTextContent(/first rhythm note is on its way/i);
    expect(input).toHaveValue('');
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('clears newsletter validation feedback as the user corrects the email', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText(/Your email address/i);
    await user.click(screen.getByRole('button', { name: /Subscribe/i }));
    await user.type(input, 'b');
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(screen.getByRole('status')).toHaveTextContent('');
  });

  it('disables hero autoplay when reduced motion is preferred', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = () => ({ matches: true, addEventListener: () => {}, removeEventListener: () => {} });
    try {
      render(<App />);
      expect(document.querySelector('video')).toHaveProperty('autoplay', false);
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });

  it('opens and dismisses the mobile navigation drawer', async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole('button', { name: /Open navigation menu/i });
    await user.click(toggle);
    expect(screen.getByRole('dialog', { name: /Mobile menu/i })).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const drawer = screen.getByRole('dialog', { name: /Mobile menu/i });
    fireEvent.click(drawer.querySelector('a[href="#origin"]'));
    expect(screen.queryByRole('dialog', { name: /Mobile menu/i })).not.toBeInTheDocument();
  });

  it('provides semantic landmarks and skip navigation', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /Skip to main content/i })).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('contains no em dashes in visible copy', () => {
    const { container } = render(<App />);
    expect(container.textContent).not.toContain('—');
  });
});
