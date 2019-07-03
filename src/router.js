import Vue from "vue";
import Router from "vue-router";

import Layout from "./components/Layout/Index";
import HeaderNav from "./components/Layout/HeaderNav";

Vue.use(Router);

const router = new Router({
  routes: [
    // 首页
    // {
    //   name: "Home",
    //   path: "/V1",
    //   component: () => import("./views/Home/Index"),
    //   meta: {
    //     title: "数据资产服务平台"
    //   }
    // },
    // 首页
    {
      name: "NewHome",
      path: "/",
      component: () => import("./views/Home/NewHome"),
      meta: {
        title: "数据资产服务平台"
      }
    },
    // 信息标准
    {
      path: "/info_standard",
      component: Layout,
      // redirect: '/info_standard',
      children: [
        // 信息标准首页
        {
          name: "InfoStandard",
          path: "/",
          component: () => import("./views/InfoStandard/Index"),
          meta: {
            title: "信息标准"
          }
        },
        // 二级页面
        {
          path: "subpage",
          component: {
            render(h) {
              return h("router-view");
            }
          },
          // redirect: '/subpage',
          children: [
            // 二级页面内容
            {
              name: "Subpage",
              path: "/",
              component: () =>
                import("./views/InfoStandard/components/Subpage"),
              meta: {
                title: "信息标准二级"
              }
            },
            // 三级页面
            {
              path: "sanjiyemian",
              component: {
                render(h) {
                  return h("router-view");
                }
              },
              // redirect: '/sanjiyemian',
              children: [
                // 三级页面内容
                {
                  name: "sanjiyemian",
                  path: "/",
                  component: () =>
                    import("./views/InfoStandard/components/sanjiyemian"),
                  meta: {
                    title: "信息标准三级"
                  }
                },
                // 四级页面内容
                {
                  name: "sijiyemian",
                  path: "sijiyemian",
                  component: () =>
                    import("./views/InfoStandard/components/sijiyemian"),
                  meta: {
                    title: "信息标准四级"
                  }
                }
              ]
            }
          ]
        },
        // 采标率
        {
          name: "RatePage",
          path: "rate/:name/:month/:year",
          component: () => import("./views/InfoStandard/components/Rate"),
          meta: {
            title: "采标率"
          }
        }
      ]
    },
    // 数据目录
    {
      path: "/data_catalog",
      component: Layout,
      children: [
        // 数据目录首页
        {
          name: "DataCatalog",
          path: "/",
          component: () => import("./views/DataCatalog/Index"),
          meta: {
            title: "数据目录"
          }
        },
        // 二级页面
        {
          path: "catalog",
          component: {
            render(h) {
              return h("router-view");
            }
          },
          // redirect: '/subpage',
          children: [
            // 二级页面内容
            {
              name: "Catalog",
              path: "/",
              component: () =>
                import("./views/DataCatalog/components/DataCatalogCard"),
              meta: {
                title: "信息标准二级"
              }
            },
            // 三级页面
            {
              path: "sanjiyemian",
              component: {
                render(h) {
                  return h("router-view");
                }
              },
              // redirect: '/sanjiyemian',
              children: [
                // 三级页面内容
                {
                  name: "sanjiyemian",
                  path: "/",
                  component: () =>
                    import("./views/InfoStandard/components/sanjiyemian"),
                  meta: {
                    title: "信息标准三级"
                  }
                },
                // 四级页面内容
                {
                  name: "sijiyemian",
                  path: "sijiyemian",
                  component: () =>
                    import("./views/InfoStandard/components/sijiyemian"),
                  meta: {
                    title: "信息标准四级"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "DataMap",
      path: "/data_map",
      components: {
        default: () => import("./views/DataMap"),
        "header-nav": HeaderNav
      },
      meta: {
        title: "圆形分布"
      }
    },
    {
      // 404
      path: "*",
      components: {
        default: () => import("./views/Error.vue"),
        "header-nav": HeaderNav
      },
      meta: {
        title: "未找到页面"
      }
    }
  ]
});
// 路由守卫
router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
