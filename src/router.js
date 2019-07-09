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
          path: "code_subclass",
          component: {
            render(h) {
              return h("router-view");
            }
          },
          // redirect: '/subpage',
          children: [
            // 二级页面内容
            {
              name: "CodeSubclass",
              path: "type=:type&id=:id&name=:name",
              component: () => import("./views/InfoStandard/components/SubClass"),
              meta: {
                title: "代码子类"
              }
            },
            // 三级页面
            {
              path: "subclass_details",
              component: {
                render(h) {
                  return h("router-view");
                }
              },
              // redirect: '/sanjiyemian',
              children: [
                // 三级页面内容
                {
                  name: "SubclassDetails",
                  path: "type=:type&id=:id&name=:name",
                  component: () => import("./views/InfoStandard/components/SubClassDetails"),
                  meta: {
                    title: "信息标准三级"
                  }
                },
                // 四级页面内容
                {
                  name: "sijiyemian",
                  path: "sijiyemian",
                  component: () => import("./views/InfoStandard/components/sijiyemian"),
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
              name: "DataCatalogCard",
              path: "",
              component: () => import("./views/DataCatalog/components/DataCatalogCard"),
              meta: {
                title: "数据目录详情"
              }
            },
            // 三级页面
            {
              path: "details",
              component: {
                render(h) {
                  return h("router-view");
                }
              },
              // redirect: '/sanjiyemian',
              children: [
                // 三级页面内容
                {
                  name: "DataCatalogDetails",
                  path: "id=:id&name=:name",
                  component: () => import("./views/DataCatalog/components/DataCatalogDetails"),
                  meta: {
                    title: "信息标准三级"
                  }
                },
                // 四级页面内容
                {
                  name: "None",
                  path: "sijiyemian",
                  component: () => import("./views/InfoStandard/components/sijiyemian"),
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
    // 数据管理
    {
      path: "/data_management",
      component: Layout,
      children: [
        // 数据管理首页
        {
          name: "DataManagement",
          path: "/",
          component: () => import("./views/DataManagement/Index"),
          meta: {
            title: "数据管理"
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
          children: [
            // 二级页面内容
            {
              name: "Subpage",
              path: "/",
              component: () => import("./views/DataManagement/components/Subpage"),
              meta: {
                title: "学生基本信息子类"
              }
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
