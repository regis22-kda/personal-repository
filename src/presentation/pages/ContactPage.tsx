import { EnvironmentOutlined, MailOutlined, PhoneOutlined, SendOutlined } from '@ant-design/icons'
import { Alert, Button, Form, Input, Typography } from 'antd'
import type { Rule } from 'antd/es/form'
import { PAGE_METADATA } from '../../core/constants/metadata'
import type { ContactFormInput } from '../../domain/entities/contact'
import { useContactForm } from '../../usecases/useContactForm'
import { useResume } from '../../usecases/useResume'
import { SEO } from '../components/SEO'
import { PageIntro } from '../components/common/PageIntro'
import { Reveal } from '../components/motion/Reveal'

const requiredRule = (fieldName: string): Rule => ({ required: true, message: `${fieldName} is required` })

export default function ContactPage() {
  const [form] = Form.useForm<ContactFormInput>()
  const { submit, status, submitting, errorCode, errorMessage, requestId } = useContactForm()
  const { profile } = useResume()

  const handleSubmit = async (values: ContactFormInput) => {
    const isSuccess = await submit(values)

    if (isSuccess) {
      form.resetFields()
    }
  }

  return (
    <>
      <SEO title={PAGE_METADATA['/contact'].title} description={PAGE_METADATA['/contact'].description} />

      <section className="page-wrap">
        <Reveal>
          <PageIntro title="Get in Touch" subtitle="Have something in mind? Let's talk about it." />
        </Reveal>

        <Reveal className="delay-1">
          <article className="split-contact">
            <div className="contact-form-side">
              {status === 'success' ? (
                <Alert
                  message={requestId ? `Message sent successfully. Request ID: ${requestId}` : 'Message sent successfully.'}
                  type="success"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
              ) : null}
              {status === 'error' ? (
                <Alert
                  message={errorCode === 'rate_limited' ? 'Too many requests. Please wait and try again.' : errorMessage ?? 'Could not send message. Please try again.'}
                  type="error"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
              ) : null}

              <Form<ContactFormInput> form={form} layout="vertical" onFinish={handleSubmit} autoComplete="off" requiredMark={false}>
                <Form.Item<ContactFormInput> name="website" hidden>
                  <Input tabIndex={-1} autoComplete="off" />
                </Form.Item>
                <div className="contact-input-grid">
                  <Form.Item<ContactFormInput> label="Full Name" name="fullName" rules={[requiredRule('Full Name')]}>
                    <Input size="large" placeholder="John Doe" />
                  </Form.Item>

                  <Form.Item<ContactFormInput>
                    label="Email Address"
                    name="email"
                    rules={[
                      requiredRule('Email Address'),
                      { type: 'email', message: 'Please provide a valid email address' },
                    ]}
                  >
                    <Input size="large" placeholder="john@example.com" />
                  </Form.Item>
                </div>

                <Form.Item<ContactFormInput> label="Subject" name="subject" rules={[requiredRule('Subject')]}>
                  <Input size="large" placeholder="Inquiry" />
                </Form.Item>

                <Form.Item<ContactFormInput> label="Message" name="message" rules={[requiredRule('Message')]}>
                  <Input.TextArea rows={6} placeholder="Tell me about your idea..." />
                </Form.Item>

                <Button htmlType="submit" type="primary" size="large" loading={submitting} icon={<SendOutlined />} iconPosition="end" block>
                  Send Message
                </Button>
              </Form>
            </div>

            <aside className="contact-info-side">
              <h2 style={{ fontSize: 42, marginBottom: 20 }}>Contact Information</h2>
              <ul className="contact-list">
                <li>
                  <MailOutlined style={{ fontSize: 22, color: 'var(--accent)' }} />
                  <div>
                    <Typography.Text type="secondary">Email</Typography.Text>
                    <p>{profile?.email}</p>
                  </div>
                </li>
                <li>
                  <PhoneOutlined style={{ fontSize: 22, color: 'var(--accent)' }} />
                  <div>
                    <Typography.Text type="secondary">Call</Typography.Text>
                    <p>{profile?.phone}</p>
                  </div>
                </li>
                <li>
                  <EnvironmentOutlined style={{ fontSize: 22, color: 'var(--accent)' }} />
                  <div>
                    <Typography.Text type="secondary">Location</Typography.Text>
                    <p>{profile?.location}</p>
                  </div>
                </li>
              </ul>

              <div className="contact-map" aria-hidden="true" />
            </aside>
          </article>
        </Reveal>
      </section>
    </>
  )
}
