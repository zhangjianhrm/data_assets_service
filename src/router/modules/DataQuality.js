import Layout from "@/components/Layout/Index";

const ModulesRouter = {
  path: "/data_quality",
  component: Layout,
  children: [
    // 数据管理首页
    {
      name: "DataQuality",
      path: "/",
      component: () => import("@/views/DataQuality/Index"),
      meta: {
        title: "数据质量"
      }
    },
    // 二级页面
    {
      path: "report",
      component: {
        render(h) {
          return h("router-view");
        }
      },
      children: [
        // 二级页面内容
        {
          name: "DataQualityReport",
          path: "/",
          component: () => import("@/views/DataQuality/components/DataQualityReport"),
          meta: {
            title: "数据质量报告"
          }
        }
      ]
    }
  ]
};

export default ModulesRouter;
