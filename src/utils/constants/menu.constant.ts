export type MENU_ITEM_TYPE = {
  title: string
  path: string
  subMenu?: MENU_ITEM_TYPE[]
}

export const MENU: MENU_ITEM_TYPE[] = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'About me',
    path: '/about-me',
  },
  {
    title: 'Travel',
    path: '/travel',
    subMenu: [
      {
        title: 'Vietnam',
        path: '/travel/vietnam',
      },
      {
        title: 'World',
        path: '/travel/world',
      },
    ],
  },
  {
    title: 'Photography',
    path: '/photography',
    subMenu: [
      {
        title: 'Interior',
        path: '/photography/interior',
      },
      {
        title: 'Product',
        path: '/photography/product',
      },
      {
        title: 'Review',
        path: '/photography/review',
      },
    ],
  },
  {
    title: 'Videography',
    path: '/videography',
    subMenu: [
      {
        title: 'Cinematic',
        path: '/videography/cinematic',
      },
      {
        title: 'Commercial',
        path: '/videography/commercial',
      },
    ],
  },
  {
    title: 'Lifestyle',
    path: '/lifestyle',
  },
  {
    title: 'Food',
    path: '/food',
  },
  {
    title: 'Personal Projects',
    path: '/personal-projects',
  },
  {
    title: 'Design',
    path: '/design',
  },
  {
    title: 'Pricing',
    path: '/pricing',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
]

export type ADMIN_MENU_TYPE = {
  title: string
  path: string
}

export const ADMIN_MENU = [
  {
    title: 'Banner',
    path: '/banner',
  },
  {
    title: 'Category',
    path: '/category',
  },
  {
    title: 'Article',
    path: '/article',
  },
]
