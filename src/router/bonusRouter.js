import Bonus from '@/pages/Bonus/Bonus'
import Periodical from '@/pages/Bonus/Crane'
import Promocode from '@/pages/Bonus/Promocode'
import ReferalBonus from '@/pages/Bonus/Referal'

export const bonusRouter = [
  {
    name: 'D - Bonus',
    meta: { auth: true },
    path: '/bonus/',
    component: Bonus,
    children: [
      {
        name: 'D - Periodical',
        path: 'periodical',
        component: Periodical
      },
      {
        name: 'D - Promocode',
        path: 'promocode',
        component: Promocode
      },
      {
        name: 'D - Referal Bonus',
        path: 'referal',
        component: ReferalBonus
      }
    ]
  }
]
