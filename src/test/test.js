
const constantSidebarMap = [
  {
    path: '/',
    name: '首页',
    hidden:false,
    meta: {title: '首页', icon: 'home'},

  },
  {
      path: 'pages/:manager',
      name: 'pages',
      meta: {title: '页面管理', icon: 'product-list'},
      hidden:false
    // ,
    //   children: [
    //   {
    //     path: 'cms/content/:pageName',
    //     name: 'content',
    //
    //     meta: {title: '页面一', icon: '-'},
    //     hidden:false
    //   }
    // ]
  }
]

/**
 * 不想改html，加一层把
 * */
const constantSidebarButMap = [
  { path: '',
    name: '',
    hidden:false,
    children: [
      {

        path: '/',
        name: '首页',
        hidden:false,
        meta: {title: '首页', icon: 'home'},

      }
      ]
  }
  ,
  {
    path: '',
    name: '',
    hidden:false,
    children: [
      {
        path: 'pgms/pages/:manager',
        name: 'pages',
        meta: {title: '页面管理', icon: 'product-list'},
        hidden:false
        // ,
        //   children: [
        //   {
        //     path: 'cms/content/:pageName',
        //     name: 'content',
        //
        //     meta: {title: '页面一', icon: '-'},
        //     hidden:false
        //   }
        // ]
      }
      ]
  }
]

/**
 * 对js语法真的是极度不熟悉，以及一些常用的库
 */
export function generateSidebarMap(manager){
  constantSidebarButMap[1].children[0].path = "pgms/pages/"+manager;
  return constantSidebarButMap;
}

