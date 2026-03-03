import type { ThemeConfig } from 'antd'
import { colorTokens, radius } from './tokens'

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: colorTokens.accent,
    colorBgBase: colorTokens.background,
    colorBgContainer: colorTokens.panel,
    colorTextBase: colorTokens.textPrimary,
    colorTextSecondary: colorTokens.textSecondary,
    colorBorder: colorTokens.border,
    borderRadius: radius.md,
    fontFamily: "'Manrope', 'Segoe UI', sans-serif",
  },
}
