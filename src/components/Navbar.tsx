import { BulbFilled, BulbOutlined } from '@ant-design/icons'
import { Button, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../services/themeContext'

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
    const { theme, toggleTheme } = useTheme()
    const toggleColor = theme === 'light' ? '#fadb14' : '#ffffff'

    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Menu
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={({ key }) => navigate(key)}
                style={{ flex: 1 }}
            />
            <Button
                type="text"
                onClick={toggleTheme}
                icon={theme === 'dark' ? <BulbFilled /> : <BulbOutlined />}
                aria-label="Toggle theme"
                style={{ color: toggleColor }}
            />
        </div>
    )
}

export default Navbar
