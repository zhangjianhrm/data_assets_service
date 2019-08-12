const ModulesRouter = {
  path: "/",
  component: {
    render(h) {
      return h("router-view");
    }
  },
  children: [
    // 首页
    {
      name: "NewHome",
      path: "",
      component: () => import("@/views/Home/NewHome"),
      meta: {
        title: "首页 - 数据资产服务平台"
      }
    },
    // 搜索结果
    {
      path: "search_res",
      component: {
        render(h) {
          return h("router-view");
        }
      },
      children: [
        // 二级页面内容
        {
          name: "SearchRes",
          path: "keyword=:keyword",
          component: () => import("@/views/Home/components/SearchRes"),
          meta: {
            title: "搜索结果页"
          }
        }
      ]
    }
  ]
};

export default ModulesRouter;
