import { ArrowRightOutlined, DownloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PAGE_METADATA } from '../../core/constants/metadata'
import { downloadFile } from '../../core/utils/downloadFile'
import { useResume } from '../../application/hooks/useResume'
import { useProjects } from '../../application/hooks/useProjects'
import { SEO } from '../components/SEO'
import { Reveal } from '../components/motion/Reveal'

function getExperienceYears(experienceCount: number): number {
  return Math.max(1, experienceCount)
}

export default function HomePage() {
  const navigate = useNavigate()
  const { profile, experiences } = useResume()
  const { projects } = useProjects('all')
  const isAvailable = profile?.isAvailable ?? false
  const cvUrl = profile?.cvUrl || '/assets/regis-cv.txt'

  const stats = [
    { label: 'Exp. Years', value: `${getExperienceYears(experiences.length).toString().padStart(2, '0')}+` },
    { label: 'Projects', value: String(projects.length) },
  ]

  return (
    <>
      <SEO title={PAGE_METADATA['/'].title} description={PAGE_METADATA['/'].description} />

      <section className="page-wrap">
        <Reveal>
          <article className="hero-card">
            <div className="hero-media">
              <a
                href={profile?.realProfileImageUrl ?? profile?.image ?? '/projects/app1.png'}
                target="_blank"
                rel="noreferrer"
                className="profile-image-link profile-image-link-block"
                aria-label="Open full profile image"
              >
                <img src={profile?.image ?? '/projects/app1.png'} alt={profile?.name ?? 'Profile'} />
              </a>
              <div className="hero-media-overlay">
                <span className="cyber-label">{isAvailable ? 'Available' : 'Unavailable'}</span>
                <h3 style={{ marginTop: 10, fontSize: 38 }}>{profile?.name ?? 'John Doe'}</h3>
                <p style={{ marginTop: 4, color: 'var(--text-secondary)' }}>{profile?.title ?? 'Software Engineer'}</p>
              </div>
            </div>

            <div className="hero-body">
              <div>
                <span className="cyber-label">Software Engineer</span>
                <h1 style={{ marginTop: 16, fontSize: 'clamp(2.6rem, 4.5vw, 4.3rem)', lineHeight: 1.05 }}>
                  Hello, I&apos;m <span style={{ color: 'var(--accent)' }}>{profile?.name ?? 'John Doe'}</span>
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
                  onClick={() => downloadFile(cvUrl, 'regis-cv.txt')}
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
