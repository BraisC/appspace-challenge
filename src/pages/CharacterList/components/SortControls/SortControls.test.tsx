import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { SortControls } from './SortControls';

afterEach(cleanup);

describe('SortControls', () => {
  it('renders all options', () => {
    render(<SortControls value="none" onChange={() => {}} />);
    expect(screen.getByRole('option', { name: 'Default' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Species' })).toBeInTheDocument();
  });

  it('shows current value as selected', () => {
    render(<SortControls value="name" onChange={() => {}} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('name');
  });

  it('calls onChange with correct value when selection changes', () => {
    const handleChange = vi.fn();
    render(<SortControls value="none" onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'species' } });

    expect(handleChange).toHaveBeenCalledWith('species');
  });
});
