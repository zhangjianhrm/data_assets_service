import Layout from "@/components/Layout/Index";

const ModulesRouter = {
  path: "/data_management",
  component: Layout,
  children: [
    // 数据管理首页
    {
      name: "DataManagement",
      path: "/",
      component: () => import("@/views/DataManagement/Index"),
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
          name: "DataManagementSubpage",
          path: "/",
          component: () => import("@/views/DataManagement/components/Subpage"),
          meta: {
            title: "学生基本信息子类"
          }
        }
      ]
    }
  ]
};

export default ModulesRouter;
