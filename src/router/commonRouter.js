import Profile from '@/pages/Profile/components/ProfileComponent'
import Main from '@/pages/Main/Main'
import Terms from '@/pages/Terms/Terms'
import Policy from '@/pages/Policy/Policy'
import Rank from '@/pages/Rank/Rank'
import E404 from '@/pages/404/E404'
import Helpdesk from '@/pages/Helpdesk/Helpdesk'
import Faq from '@/pages/Helpdesk/Faq'
import Affilate from '@/pages/Affilate/Affilate'

export const commonRouter = [
  { path: '/', redirect: '/main' },
  { name: 'D - Not Found', path: '*', component: E404 },
  { name: 'D - Main', path: '/main', component: Main },
  {
    name: 'D - Settings',
    meta: { auth: true },
    path: '/settings',
    component: Profile
  },
  {
    name: 'D - Rank System',
    meta: { auth: true },
    path: '/rank-system',
    component: Rank
  },
  {
    name: 'D - Affilate',
    meta: { auth: true },
    path: '/affilate',
    component: Affilate
  },
  {
    name: 'D - Helpdesk',
    path: '/helpdesk',
    redirect: '/helpdesk/faq',
    meta: { auth: 'false' },
    component: Helpdesk,
    children: [
      {
        name: 'D - FAQ',
        path: '/helpdesk/faq',
        component: Faq
      },
      {
        name: 'D - Policy',
        path: '/helpdesk/policy',
        component: Policy
      },
      {
        name: 'D - Terms of Use',
        path: '/helpdesk/terms',
        component: Terms
      }
    ]
  }
]
