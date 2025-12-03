import { FunctionComponent } from 'preact'
import './Footer.css'

const Footer: FunctionComponent = () => {
    return (
        <footer class="footer">
            © {new Date().getFullYear()} - Made with ♥ by René Opitz
        </footer>
    )
}

export default Footer