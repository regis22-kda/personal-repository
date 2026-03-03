import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PAGE_METADATA } from '../../core/constants/metadata'
import { SEO } from '../components/SEO'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <>
      <SEO title={PAGE_METADATA['not-found'].title} description={PAGE_METADATA['not-found'].description} />

      <section className="page-wrap" style={{ minHeight: '100%', alignContent: 'center' }}>
        <article className="surface-card" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <span className="cyber-label">Error 404</span>
          <h1 style={{ marginTop: 16, fontSize: 62 }}>Page Not Found</h1>
          <p style={{ marginTop: 12 }}>
            The page you are trying to access is outside this navigation protocol.
          </p>
          <Button type="primary" icon={<ArrowLeftOutlined />} style={{ marginTop: 20 }} onClick={() => navigate('/')}>
            Back Home
          </Button>
        </article>
      </section>
    </>
  )
}
