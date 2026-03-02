import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

const menuItems = [
    { key: '/', label: 'About' },
    { key: '/resume', label: 'Resume' },
    { key: '/portfolio', label: 'Portfolio' },
    { key: '/blog', label: 'Blog' },
    { key: '/contact', label: 'Contact' },
]

function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            style={{ flex: 1 }}
        />
    )
}

export default Navbar
