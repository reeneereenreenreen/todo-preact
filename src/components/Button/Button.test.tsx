import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/preact'
import Button from './Button'

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('renders with icon', () => {
    render(<Button icon="check" />)
    expect(screen.getByRole('button').querySelector('svg')).toBeTruthy()
  })

  it('applies variant and appearance classes', () => {
    render(<Button label="Test" variant="danger" appearance="ghost" />)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('button--danger')
    expect(btn.className).toContain('button--ghost')
  })

  it('sets aria-label', () => {
    render(<Button ariaLabel="Accessible label" />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Accessible label')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Disabled" disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button label="Click" onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('uses correct type attribute', () => {
    render(<Button label="Submit" type="submit" />)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })
})