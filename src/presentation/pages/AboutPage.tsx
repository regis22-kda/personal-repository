import { DownloadOutlined } from '@ant-design/icons'
import { Button, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PAGE_METADATA } from '../../core/constants/metadata'
import { getSkillTagColor } from '../../core/constants/skillColors'
import { downloadFile } from '../../core/utils/downloadFile'
import { useResume } from '../../application/hooks/useResume'
import { SEO } from '../components/SEO'
import { PageIntro } from '../components/common/PageIntro'
import { Reveal } from '../components/motion/Reveal'

const services = [
  {
    title: 'UI/UX Design',
    description: 'Crafting intuitive and immersive interfaces with clean interaction patterns.',
  },
  {
    title: 'Frontend Dev',
    description: 'Building responsive, high-performance web applications and design systems.',
  },
  {
    title: 'Mobile Dev',
    description: 'Building responsive, high-performance mobile applications and design systems.',
  },
  {
    title: 'Architecture',
    description: 'Structuring scalable frontend systems and predictable state flows.',
  },
  {
    title: 'Creative Coding',
    description: 'Prototyping expressive experiences and practical motion interactions.',
  },
]

export default function AboutPage() {
  const navigate = useNavigate()
  const { profile, skillGroups } = useResume()
  const cvUrl = profile?.cvUrl || '/assets/regis-cv.txt'

  return (
    <>
      <SEO title={PAGE_METADATA['/about'].title} description={PAGE_METADATA['/about'].description} />

      <section className="page-wrap">
        <Reveal>
          <PageIntro
            title="About Me"
            subtitle="Blending code and design in the digital frontier."
            badge="Professional Bio"
          />
        </Reveal>

        <Reveal className="delay-1">
          <article className="hero-card" style={{ gridTemplateColumns: '1fr 1.35fr' }}>
            <div className="hero-media" style={{ minHeight: 360 }}>
              <img src={profile?.image ?? '/projects/app1.png'} alt={profile?.name ?? 'Profile'} />
            </div>
            <div className="hero-body" style={{ gap: 18, padding: 34 }}>
              <h2 style={{ fontSize: 42 }}>Professional Bio</h2>
              <p className="hero-copy" style={{ margin: 0 }}>
                With practical product experience, I focus on turning complex requirements into clean interfaces and
                maintainable frontend architecture. My process balances technical precision with visual clarity.
              </p>
              <p className="hero-copy" style={{ margin: 0 }}>
                I work best at the intersection of system thinking and storytelling, where design and engineering should
                both serve real user outcomes.
              </p>
              <div className="button-row">
                <Button type="primary" icon={<DownloadOutlined />} onClick={() => downloadFile(cvUrl, 'regis-cv.txt')}>
                  Download CV
                </Button>
                <Button onClick={() => navigate('/portfolio')}>View Portfolio</Button>
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal className="delay-2">
          <div>
            <span className="cyber-label">What I Do</span>
            <div className="info-grid" style={{ marginTop: 20 }}>
              {services.map((service) => (
                <article key={service.title} className="surface-card">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="delay-3">
          <div className="info-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(240px, 1fr))' }}>
            <article className="surface-card">
              <h3>Core Skills</h3>
              <p style={{ marginBottom: 14 }}>Hands-on capabilities grouped by delivery focus.</p>
              {skillGroups.map((group) => (
                <div key={group.groupName} style={{ marginBottom: 12 }}>
                  <strong>{group.groupName}</strong>
                  <div className="tag-wrap" style={{ marginTop: 10 }}>
                    {group.skills.map((skill) => (
                      <Tag color={getSkillTagColor(group.groupName)} key={`${group.groupName}-${skill}`}>
                        {skill}
                      </Tag>
                    ))}
                  </div>
                </div>
              ))}
            </article>

            <article className="surface-card">
              <h3>Fun Facts</h3>
              <p>I enjoy refining component APIs, documenting design decisions, and building systems that stay fast over time.</p>
              <Button type="link" onClick={() => navigate('/contact')} style={{ paddingInline: 0, marginTop: 10 }}>
                Let&apos;s collaborate
              </Button>
            </article>
          </div>
        </Reveal>
      </section>
    </>
  )
}
