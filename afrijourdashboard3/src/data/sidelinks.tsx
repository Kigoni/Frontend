import {
  // IconBarrierBlock,
  IconChartHistogram,
  // IconError404,
  // IconExclamationCircle,
  // IconHexagonNumber1,
  // IconHexagonNumber2,
  // IconHexagonNumber3,
  // IconHexagonNumber4,
  // IconHexagonNumber5,
  IconLayoutDashboard,
  // IconServerOff,
  IconSettings,
  // IconUserShield,
  // IconLock,
  IconBook,
  // IconMessage,
  IconNews,
  // IconList,
  // IconDatabase,
  IconHome,
} from '@tabler/icons-react'
import { IconWorldUpload } from '@tabler/icons-react';

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Home',
    label: '',
    href: '/',
    icon: <IconHome size={18} />,
  },
  {
    title: 'Upload Journal',
    label: '',
    href: '/upload',
    icon: <IconWorldUpload size={18} />,
  },
  {
    title: 'Dashboard',
    label: '',
    href: '/dashboard',
    icon: <IconLayoutDashboard size={18} />,
  },
  // {
  //   title: 'Tasks',
  //   label: '3',
  //   href: '/tasks',
  //   icon: <IconChecklist size={18} />,
  // },
  // {
  //   title: 'Chats',
  //   label: '9',
  //   href: '/chats',
  //   icon: <IconMessages size={18} />,
  // },
  // {
  //   title: 'Apps',
  //   label: '',
  //   href: '/apps',
  //   icon: <IconApps size={18} />,
  // },
  {
    title: 'Journal Filters',
    label: '',
    href: '/analytics',
    icon: <IconChartHistogram size={18} />,
  },
  {
    title: 'Articles',
    label: '',
    href: '/journals',
    icon: <IconBook size={18} />,
  },
  // {
  //   title: 'Indexes',
  //   label: '',
  //   href: '/indexes',
  //   icon: <IconList size={18} />,
  // },

  // {
  //   title: 'respositories',
  //   label: '',
  //   href: '/repositories',
  //   icon: <IconDatabase size={18} />,
  // },

  // {
  //   title: 'Reviewers',
  //   label: '',
  //   href: '/users',
  //   icon: <IconMessage size={18} />,
  // },
  // {
  //   title: 'Reports',
  //   label: '',
  //   href: '/users',
  //   icon: <IconChartHistogram size={18} />,
  // },
  {
    title: 'News & Updates',
    label: '',
    href: '/news',
    icon: <IconNews size={18} />,
  },


  // {
  //   title: 'Users',
  //   label: '',
  //   href: '/users',
  //   icon: <IconUsers size={18} />,
  // },
  // {
  //   title: 'Requests',
  //   label: '10',
  //   href: '/requests',
  //   icon: <IconRouteAltLeft size={18} />,
  //   sub: [
  //     {
  //       title: 'Trucks',
  //       label: '9',
  //       href: '/trucks',
  //       icon: <IconTruck size={18} />,
  //     },
  //     {
  //       title: 'Cargos',
  //       label: '',
  //       href: '/cargos',
  //       icon: <IconBoxSeam size={18} />,
  //     },
  //   ],
  // },

  // {
  //   title: 'Authentication',
  //   label: '',
  //   href: '',
  //   icon: <IconUserShield size={18} />,
  //   sub: [
  //     {
  //       title: 'Sign In (email + password)',
  //       label: '',
  //       href: '/sign-in',
  //       icon: <IconHexagonNumber1 size={18} />,
  //     },
  //     {
  //       title: 'Sign In (Box)',
  //       label: '',
  //       href: '/sign-in-2',
  //       icon: <IconHexagonNumber2 size={18} />,
  //     },
  //     {
  //       title: 'Sign Up',
  //       label: '',
  //       href: '/sign-up',
  //       icon: <IconHexagonNumber3 size={18} />,
  //     },
  //     {
  //       title: 'Forgot Password',
  //       label: '',
  //       href: '/forgot-password',
  //       icon: <IconHexagonNumber4 size={18} />,
  //     },
  //     {
  //       title: 'OTP',
  //       label: '',
  //       href: '/otp',
  //       icon: <IconHexagonNumber5 size={18} />,
  //     },
  //   ],
  // },

  // {
  //   title: 'Error Pages',
  //   label: '',
  //   href: '',
  //   icon: <IconExclamationCircle size={18} />,
  //   sub: [
  //     {
  //       title: 'Not Found',
  //       label: '',
  //       href: '/404',
  //       icon: <IconError404 size={18} />,
  //     },
  //     {
  //       title: 'Internal Server Error',
  //       label: '',
  //       href: '/500',
  //       icon: <IconServerOff size={18} />,
  //     },
  //     {
  //       title: 'Maintenance Error',
  //       label: '',
  //       href: '/503',
  //       icon: <IconBarrierBlock size={18} />,
  //     },
  //     {
  //       title: 'Unauthorised Error',
  //       label: '',
  //       href: '/401',
  //       icon: <IconLock size={18} />,
  //     },
  //   ],
  // },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
]
