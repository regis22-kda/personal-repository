import {
  AppstoreOutlined,
  FileTextOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
} from '@ant-design/icons'
import type { NavItem } from '../../domain/entities/navigation'

export const NAV_ITEMS: NavItem[] = [
  { key: '/', label: 'Home', icon: HomeOutlined },
  { key: '/about', label: 'About', icon: InfoCircleOutlined },
  { key: '/portfolio', label: 'Portfolio', icon: AppstoreOutlined },
  { key: '/resume', label: 'Resume', icon: FileTextOutlined },
  { key: '/contact', label: 'Contact', icon: MailOutlined },
]
