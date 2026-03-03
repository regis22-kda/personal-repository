import { ArrowRightOutlined, DownloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PAGE_METADATA } from '../../core/constants/metadata'
import { downloadFile } from '../../core/utils/downloadFile'
import { useResume } from '../../usecases/useResume'
import { SEO } from '../components/SEO'
import { Reveal } from '../components/motion/Reveal'

function getExperienceYears(experienceCount: number): number {
  return Math.max(1, experienceCount)
}

export default function HomePage() {
  const navigate = useNavigate()
  const { profile, experiences } = useResume()

  const stats = [
    { label: 'Exp. Years', value: `${getExperienceYears(experiences.length).toString().padStart(2, '0')}+` },
    { label: 'Projects', value: '12' },
  ]

  return (
    <>
      <SEO title={PAGE_METADATA['/'].title} description={PAGE_METADATA['/'].description} />

      <section className="page-wrap">
        <Reveal>
          <article className="hero-card">
            <div className="hero-media">
              <img src={profile?.image ?? '/projects/app1.png'} alt={profile?.name ?? 'Profile'} />
              <div className="hero-media-overlay">
                <span className="cyber-label">Available</span>
                <h3 style={{ marginTop: 10, fontSize: 38 }}>{profile?.name ?? 'Rheganandar Bagas'}</h3>
                <p style={{ marginTop: 4, color: 'var(--text-secondary)' }}>{profile?.title ?? 'Software Engineer'}</p>
              </div>
            </div>

            <div className="hero-body">
              <div>
                <span className="cyber-label">Software Engineer</span>
                <h1 style={{ marginTop: 16, fontSize: 'clamp(2.6rem, 4.5vw, 4.3rem)', lineHeight: 1.05 }}>
                  Hello, I&apos;m <span style={{ color: 'var(--accent)' }}>{profile?.name ?? 'Rheganandar Bagas'}</span>
                </h1>
                <p className="hero-copy" style={{ marginTop: 18 }}>
                  {profile?.title ?? 'Software Engineer'} specializing in building immersive interfaces, reliable software
                  systems, and scalable product experiences.
                </p>
              </div>

              <div className="stats-grid">
                {stats.map((stat) => (
                  <div className="stat-card" key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="button-row">
                <Button type="primary" icon={<ArrowRightOutlined />} iconPosition="end" onClick={() => navigate('/portfolio')}>
                  View My Work
                </Button>
                <Button
                  onClick={() => downloadFile('/assets/regis-cv.txt', 'regis-cv.txt')}
                  icon={<DownloadOutlined />}
                  style={{ background: 'rgba(18,35,52,.85)' }}
                >
                  Download Resume
                </Button>
              </div>
            </div>
          </article>
        </Reveal>
      </section>
    </>
  )
}
