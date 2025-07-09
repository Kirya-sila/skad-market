import { FC } from 'react'
import { InvisibleSmartCaptcha, InvisibleSmartCaptchaProps } from '@yandex/smart-captcha'
import { toast } from '@/helpers'

const sitekey = import.meta.env.VITE_YANDEX_CAPTCHA_KEY || 'ysc1_xhvL0DzvEgiMtJQyDgm7p1YY9N5XFGbgqk8VuzuOae72d490'

export const Captcha: FC<Omit<InvisibleSmartCaptchaProps, 'sitekey'>> = ({
  onSuccess,
  onChallengeHidden,
  visible,
  ...rest
}) => {
  const handleNetworkError = () => {
    toast.error('Произошла ошибка сети. Попробуйте еще раз позже')
  }

  const handleJavascriptError = () => {
    toast.error('Произошла ошибка. Перезагрузите страницу и попробуйте снова')
  }

  return (
    <div style={{ position: 'relative', zIndex: 150 }}>
      <InvisibleSmartCaptcha
        {...rest}
        // test={true}
        sitekey={sitekey}
        onSuccess={onSuccess}
        onChallengeHidden={onChallengeHidden}
        onJavascriptError={handleJavascriptError}
        onNetworkError={handleNetworkError}
        visible={visible}
        shieldPosition='center-right'
      />
    </div>
  )
}
