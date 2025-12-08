import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/preact'
import DarkmodeToggle from './DarkmodeToggle'

describe('DarkmodeToggle', () => {
    beforeEach(() => {
        localStorage.clear()
        document.documentElement.removeAttribute('data-theme')
        vi.resetAllMocks()
    })

    it('renders all theme options', () => {
        render(<DarkmodeToggle />)
        expect(screen.getByLabelText(/System/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Light/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Dark/i)).toBeInTheDocument()
    })

    it('sets theme to system by default', () => {
        render(<DarkmodeToggle />)
        const systemRadio = screen.getByLabelText(/System/i)
        expect(systemRadio).toBeChecked()
    })

    it('loads theme from localStorage', () => {
        localStorage.setItem('theme', 'dark')
        render(<DarkmodeToggle />)
        expect(screen.getByLabelText(/Dark/i)).toBeChecked()
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    })

    it('changes theme to light when selected', () => {
        render(<DarkmodeToggle />)
        const lightRadio = screen.getByLabelText(/Light/i)
        fireEvent.click(lightRadio)
        expect(lightRadio).toBeChecked()
        expect(localStorage.getItem('theme')).toBe('light')
        expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    })

    it('changes theme to dark when selected', () => {
        render(<DarkmodeToggle />)
        const darkRadio = screen.getByLabelText(/Dark/i)
        fireEvent.click(darkRadio)
        expect(darkRadio).toBeChecked()
        expect(localStorage.getItem('theme')).toBe('dark')
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    })

    it('removes theme from localStorage when system is selected', () => {
        localStorage.setItem('theme', 'light')
        render(<DarkmodeToggle />)
        const systemRadio = screen.getByLabelText(/System/i)
        fireEvent.click(systemRadio)
        expect(systemRadio).toBeChecked()
        expect(localStorage.getItem('theme')).toBeNull()
    })

    it('sets theme based on prefers-color-scheme when system is selected', () => {
        const matchMediaMock = vi.fn().mockReturnValue({ matches: true })
        vi.stubGlobal('window', { matchMedia: matchMediaMock })
        render(<DarkmodeToggle />)
        const systemRadio = screen.getByLabelText(/System/i)
        fireEvent.click(systemRadio)
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    })
})
