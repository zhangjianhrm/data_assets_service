// import Layout from "@/components/Layout/Index";

const ModulesRouter = {
  path: "/data_monitor",
  // component: Layout,
  component: {
    render(h) {
      return h("router-view");
    }
  },
  children: [
    // 数据管理首页
    {
      name: "DataMonitor",
      path: "/",
      component: () => import("@/views/DataMonitor/Index"),
      meta: {
        title: "数据监控与统计"
      }
    },
    // 二级页面
    {
      path: "data_map_details",
      component: {
        render(h) {
          return h("router-view");
        }
      },
      children: [
        // 二级页面内容
        {
          name: "DataMonitorSubpage",
          path: "/",
          component: () => import("@/views/DataMonitor/components/DataMapDetails"),
          meta: {
            title: "数据全景地图"
          }
        }
      ]
    },
    // 二级页面
    {
      path: "ISM",
      component: {
        render(h) {
          return h("router-view");
        }
      },
      children: [
        // 二级页面内容
        {
          name: "ISM",
          path: "/",
          component: () => import("@/views/DataMonitor/components/ISMonitor"),
          meta: {
            title: "信息标准监控"
          }
        }
      ]
    }
  ]
};

export default ModulesRouter;
