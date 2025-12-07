import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import Badge from './Badge'

describe('Badge', () => {
  it('renders the label', () => {
    render(<Badge label="Test Label" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })
})