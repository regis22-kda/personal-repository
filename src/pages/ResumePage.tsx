import { useEffect, useState } from 'react'
import { Button, Col, Row } from 'antd'
import { getResume } from '../services/resumeService'
import './resume.css'
import type { ResumeData } from '../services/resumeService'

function ResumePage() {
    const [resume, setResume] = useState<ResumeData | null>(null)

    useEffect(() => {
        let isMounted = true

        const loadResume = async () => {
            const data = await getResume()
            if (isMounted) {
                setResume(data)
            }
        }

        void loadResume()

        return () => {
            isMounted = false
        }
    }, [])

    return (
        <div className="resume-page">
            <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                <Button type="primary" onClick={() => window.print()}>
                    Download CV
                </Button>
            </div>
            <h1>Resume</h1>
            <Row gutter={[24, 24]}>
                <Col xs={24} md={8}>
                    <h2>{resume?.profile.name}</h2>
                    <p>{resume?.profile.title}</p>
                    <p>{resume?.profile.email}</p>

                    <h3>Skills</h3>
                    {resume?.skillGroups.map((group) => (
                        <div key={group.groupName}>
                            <h4>{group.groupName}</h4>
                            <ul>
                                {group.skills.map((skill) => (
                                    <li key={`${group.groupName}-${skill}`}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </Col>

                <Col xs={24} md={16}>
                    <h3>Summary</h3>
                    <p>
                        {resume?.profile.title} based in {resume?.profile.location}, focused on building clean,
                        practical interfaces with modern frontend tools.
                    </p>

                    <h3>Experiences</h3>
                    <ul>
                        {resume?.experiences.map((experience) => (
                            <li key={`${experience.title}-${experience.year}`}>
                                <h4>{experience.title}</h4>
                                <p>{experience.description}</p>
                                <p>{experience.year}</p>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </div>
    )
}

export default ResumePage
