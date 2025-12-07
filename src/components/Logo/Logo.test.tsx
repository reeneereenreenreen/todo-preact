import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import Logo from './Logo'

describe('Logo component', () => {
	it('renders the logo with correct class', () => {
		render(<Logo />)
		const logoElement = screen.getByRole('heading', { level: 1 })
		expect(logoElement).toHaveClass('logo')
	})

	it('renders the TO and DO text', () => {
		render(<Logo />)
		expect(screen.getByText('TO')).toBeInTheDocument()
		expect(screen.getByText('DO')).toBeInTheDocument()
	})

	it('contains the logo__todo span', () => {
		render(<Logo />)
		const todoSpan = screen.getByText('TO').parentElement
		expect(todoSpan).toHaveClass('logo__todo')
	})
})