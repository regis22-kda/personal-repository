import { ClockCircleOutlined, DownloadOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { Button, Tag, Timeline } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PAGE_METADATA } from '../../core/constants/metadata'
import { getSkillTagColor, getTechnologyTagColor } from '../../core/constants/skillColors'
import { downloadFile } from '../../core/utils/downloadFile'
import { useResume } from '../../application/hooks/useResume'
import { SEO } from '../components/SEO'
import { Reveal } from '../components/motion/Reveal'

export default function ResumePage() {
  const navigate = useNavigate()
  const { profile, experiences, skillGroups } = useResume()
  const cvUrl = profile?.cvUrl || '/assets/regis-cv.txt'
  const isAvailable = profile?.isAvailable ?? false

  return (
    <>
      <SEO title={PAGE_METADATA['/resume'].title} description={PAGE_METADATA['/resume'].description} />

      <section className="page-wrap">
        <Reveal>
          <article className="resume-hero">
            <div className="resume-top">
              <a
                href={profile?.realProfileImageUrl ?? profile?.image ?? '/projects/app1.png'}
                target="_blank"
                rel="noreferrer"
                className="profile-image-link profile-image-link-block"
                aria-label="Open full profile image"
              >
                <img className="resume-photo" src={profile?.image ?? '/projects/app1.png'} alt={profile?.name ?? 'Profile'} />
              </a>

              <div>
                <h1 style={{ fontSize: 58 }}>{profile?.name ?? 'John Doe'}</h1>
                <p style={{ color: 'var(--accent)', fontSize: 36 }}>{profile?.title ?? 'Software Engineer'}</p>

                <div className="chips" style={{ marginTop: 16 }}>
                  <span className="chip">
                    <MailOutlined /> {profile?.email ?? '-'}
                  </span>
                  <span className="chip">
                    <PhoneOutlined /> {profile?.phone ?? '-'}
                  </span>
                  <span className="chip">
                    <EnvironmentOutlined /> {profile?.location ?? '-'}
                  </span>
                </div>

                <div className="button-row" style={{ marginTop: 16 }}>
                  <Button type="primary" icon={<DownloadOutlined />} onClick={() => downloadFile(cvUrl, 'regis-cv.txt')}>
                    Download CV
                  </Button>
                  <Button onClick={() => navigate('/contact')}>Contact Me</Button>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal className="delay-1">
          <div className="resume-grid">
            <article className="surface-card">
              <h2 style={{ marginBottom: 20, fontSize: 44 }}>
                <ClockCircleOutlined style={{ marginRight: 10, color: 'var(--accent)' }} /> Experience
              </h2>

              <Timeline
                items={experiences.map((experience) => ({
                  children: (
                    <div>
                      <h3 style={{ fontSize: 34 }}>{experience.title}</h3>
                      <p style={{ marginTop: 6 }}>{experience.description}</p>
                      <div className="tag-wrap" style={{ marginTop: 10 }}>
                        {experience.technologies.map((tech) => (
                          <Tag color={getTechnologyTagColor(tech)} key={`${experience.title}-${tech}`}>
                            {tech}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  ),
                  label: <span className="chip">{experience.year}</span>,
                }))}
              />
            </article>

            <article className="surface-card">
              <h2 style={{ marginBottom: 20, fontSize: 44 }}>Skills</h2>
              {skillGroups.map((group) => (
                <div key={group.groupName} style={{ marginBottom: 16 }}>
                  <h3 style={{ fontSize: 28 }}>{group.groupName}</h3>
                  <div className="tag-wrap" style={{ marginTop: 10 }}>
                    {group.skills.map((skill) => (
                      <Tag key={`${group.groupName}-${skill}`} color={getSkillTagColor(group.groupName)}>
                        {skill}
                      </Tag>
                    ))}
                  </div>
                </div>
              ))}
            </article>
          </div>
        </Reveal>

        <Reveal className="delay-2">
          <footer className="resume-footer-strip">
            <span>
              <span className={isAvailable ? 'dot' : 'dot dot-offline'} />{' '}
              {isAvailable ? 'Available for projects' : 'Currently unavailable'}
            </span>
            <div className="social-inline">
              {profile?.socials.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noreferrer">
                  {social.name}
                </a>
              ))}
            </div>
          </footer>
        </Reveal>
      </section>
    </>
  )
}
