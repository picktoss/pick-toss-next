import { Meta, StoryObj } from '@storybook/react'
import TermsAndConditionsDrawer from '.'

const meta: Meta<typeof TermsAndConditionsDrawer> = {
  title: 'inquiry/TermsAndConditionsDrawer',
  component: TermsAndConditionsDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    setIsAgreeChecked: {
      action: 'setIsAgreeChecked',
      description: '약관 동의 상태 변경 핸들러',
    },
  },
}

export default meta

type Story = StoryObj<typeof TermsAndConditionsDrawer>

export const Default: Story = {
  render: (args) => <TermsAndConditionsDrawer {...args} />,
}
