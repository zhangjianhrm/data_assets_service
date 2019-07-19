import Layout from "@/components/Layout/Index";

const ModulesRouter = {
  path: "/info_standard",
  component: Layout,
  // redirect: '/info_standard',
  children: [
    // 信息标准首页
    {
      name: "InfoStandard",
      path: "/",
      component: () => import("@/views/InfoStandard/Index"),
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
          component: () => import("@/views/InfoStandard/components/SubClass"),
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
              component: () => import("@/views/InfoStandard/components/SubClassDetails"),
              meta: {
                title: "信息标准三级"
              }
            },
            // 四级页面内容
            {
              name: "sijiyemian",
              path: "sijiyemian",
              component: () => import("@/views/InfoStandard/components/sijiyemian"),
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
      path: "rate/name=:name&year=:year&month=:month",
      component: () => import("@/views/InfoStandard/components/Rate"),
      meta: {
        title: "采标率"
      }
    }
  ]
};

export default ModulesRouter;
