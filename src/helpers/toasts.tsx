import { Flex } from 'antd'
import { toast as defaultToast } from 'react-toastify'

const updateToList = (message: string) => (
  <Flex vertical>
    {message.split(',').map((item) => (
      <Flex key={item}>
        {item}
        <br />
      </Flex>
    ))}
  </Flex>
)

export const toast = {
  default: () => defaultToast('Default Notification !'),

  success: (message: string) =>
    defaultToast.success(message, {
      position: 'top-right',
    }),

  error: (message: string) => {
    if (!message) {
      return defaultToast.dismiss
    }
    return defaultToast.error(updateToList(message), {
      position: 'top-right',
      autoClose: 10000
    })
  },

  warning: (message: string) =>
    defaultToast.warn(message, {
      position: 'top-right',
    }),

  info: (message: string) =>
    defaultToast.info(message, {
      position: 'top-right',
    }),
}
