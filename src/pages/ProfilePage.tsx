import { CircleCheck, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import '../styles/pages/ProfilePage.css'
import { ProfileMenuList } from '../components/profile/ProfileMenuList'
import { profile } from '../mocks/profile'
import { useAppStore } from '../store/useAppStore'
import { useTranslation } from '../i18n/useTranslation'
import userAvatar from '../assets/userAvatar.png'

const profileAvatar = userAvatar

export function ProfilePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const logout = useAppStore((s) => s.logout)

  const onUnbind = () => {
    logout()
    navigate('/connect')
  }

  return (
    <div className="page with-tabs">
      <section className="card-row" style={{alignItems:'start', gap:'1.6rem'}}>
        <img alt="" className="avatar" src={profileAvatar} style={{width:'5.6rem', height:'5.6rem'}} />
        <div className="profile-name-email">
          <h2 style={{fontSize:'1.6rem', fontWeight:'500'}}>{profile.name}</h2>
          <p className="muted">{t('profile.email')}: {profile.email}</p>
          <p className="linked">
            <CircleCheck color="#00A65A" size={14} /> {t('profile.wechatLinked')}
          </p>
        </div>
      </section>
      <ProfileMenuList />
      <button className="logout-btn" onClick={onUnbind} type="button">
        <LogOut size={16} /> {t('profile.unbindLogout')}
      </button>
    </div>
  )
}
