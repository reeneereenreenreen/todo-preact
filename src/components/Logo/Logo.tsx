import { FunctionComponent } from 'preact'
import './Logo.css'
// import { Icon } from '../Icon'

const Logo: FunctionComponent = () => {
    return (
        <h1 class="logo">
            <span class="logo__the">The</span>
            <span class="logo__todo">TODO</span>
            <span class="logo__list">List</span>

                            {/* <span class="real-logo">
                                <Icon name="check" size="lg" />
                            </span> */}
        </h1>
    )
}

export default Logo