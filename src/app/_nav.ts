interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Users and related'
  },
  {
    name: 'Group',
    url: '/group/',
    icon: 'icon-drop',
    children: [
      {
        name: 'Create',
        url: '/group/create',
        icon: 'icon-cursor'
      },
      {
        name: 'List',
        url: '/group/list',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'User',
    url: '/user',
    icon: 'icon-drop',
    children: [
      {
        name: 'Create',
        url: '/user/create',
        icon: 'icon-cursor'
      },
      {
        name: 'List',
        url: '/user/list',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Projects and related'
  },
  {
    name: 'Clients',
    url: '/client',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Create',
        url: '/client/create',
        icon: 'icon-cursor'
      },
      {
        name: 'List',
        url: '/client/list',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Projects',
    url: '/project',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Create',
        url: '/project/create',
        icon: 'icon-cursor'
      },
      {
        name: 'List',
        url: '/project/list',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Frameworks',
    url: '/framework',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Create',
        url: '/framework/create',
        icon: 'icon-cursor'
      },
      {
        name: 'List',
        url: '/framework/list',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Accounts',
    url: '/account',
    icon: 'icon-star',
    children: [
      {
        name: 'Create',
        url: '/account/create',
        icon: 'icon-cursor'
      },
      {
        name: 'List',
        url: '/account/list',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Diaries',
    url: '/diary',
    icon: 'icon-star',
    children: [
      {
        name: 'Create',
        url: '/diary/create',
        icon: 'icon-cursor'
      },
      {
        name: 'List',
        url: '/diary/list',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Finances',
    url: '/finance',
    icon: 'icon-star',
    children: [
      {
        name: 'Create',
        url: '/finance/create',
        icon: 'icon-cursor'
      },
      {
        name: 'List',
        url: '/finance/list',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Music',
    url: '/music',
    icon: 'icon-star',
    children: [
      {
        name: 'Create',
        url: '/music/create',
        icon: 'icon-cursor'
      },
      {
        name: 'List',
        url: '/music/list',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Tools',
    url: '/tool',
    icon: 'icon-star',
    children: [
      {
        name: 'Create',
        url: '/tool/create',
        icon: 'icon-cursor'
      },
      {
        name: 'List',
        url: '/tool/list',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Videos',
    url: '/video',
    icon: 'icon-star',
    children: [
      {
        name: 'Create',
        url: '/video/create',
        icon: 'icon-cursor'
      },
      {
        name: 'List',
        url: '/video/list',
        icon: 'icon-cursor'
      }
    ]
  }
];
