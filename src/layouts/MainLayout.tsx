import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const { Header, Content } = Layout

function MainLayout() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ width: '100%', padding: 0 }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px' }}>
                    <Navbar />
                </div>
            </Header>
            <Content style={{ width: '100%', maxWidth: 1100, margin: '0 auto', marginTop: 64, padding: '24px 16px' }}>
                <Outlet />
            </Content>
        </Layout>
    )
}

export default MainLayout
