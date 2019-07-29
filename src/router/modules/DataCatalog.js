import Layout from "@/components/Layout/Index";

const ModulesRouter = {
  path: "/data_catalog",
  component: Layout,
  children: [
    // 数据目录首页
    {
      name: "DataCatalog",
      path: "/",
      component: () => import("@/views/DataCatalog/Index"),
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
          name: "DataCatalogList",
          path: "",
          component: () => import("@/views/DataCatalog/components/DataCatalogList"),
          meta: {
            title: "数据目录列表"
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
              component: () => import("@/views/DataCatalog/components/DataCatalogDetails"),
              meta: {
                title: "信息标准三级"
              }
            },
            // 四级页面内容
            {
              name: "None",
              path: "sijiyemian",
              component: () => import("@/views/InfoStandard/components/sijiyemian"),
              meta: {
                title: "信息标准四级"
              }
            }
          ]
        },
        {
          path: "apply",
          component: {
            render(h) {
              return h("router-view");
            }
          },
          // redirect: '/sanjiyemian',
          children: [
            // 三级页面内容
            {
              name: "DataCatalogApply",
              path: "",
              component: () => import("@/views/DataCatalog/components/DataCatalogApply"),
              meta: {
                title: "数据目录申请"
              }
            },
            // 四级页面内容
            {
              name: "N",
              path: "sijiyemian",
              component: () => import("@/views/InfoStandard/components/sijiyemian"),
              meta: {
                title: "信息标准四级"
              }
            }
          ]
        }
      ]
    }
  ]
};
export default ModulesRouter;
