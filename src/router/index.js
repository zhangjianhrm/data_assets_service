import Vue from "vue";
import Router from "vue-router";

// import Layout from "@/components/Layout/Index";
import HeaderNav from "@/components/Layout/HeaderNav";

// 子路由
import InfoStandard from "./modules/InfoStandard";
import DataCatalog from "./modules/DataCatalog";
import DataQuality from "./modules/DataQuality";
import DataManagement from "./modules/DataManagement";
import DataMonitor from "./modules/DataMonitor";

Vue.use(Router);

const router = new Router({
  routes: [
    // 首页
    // {
    //   name: "Home",
    //   path: "/V1",
    //   component: () => import("@/views/Home/Index"),
    //   meta: {
    //     title: "数据资产服务平台"
    //   }
    // },
    // 首页
    {
      name: "NewHome",
      path: "/",
      component: () => import("@/views/Home/NewHome"),
      meta: {
        title: "数据资产服务平台"
      }
    },
    // 信息标准
    InfoStandard,
    // 数据目录
    DataCatalog,
    // 数据管理
    DataManagement,
    // 数据质量
    DataQuality,
    // 数据监控与统计
    DataMonitor,
    // 数据地图
    {
      name: "DataMap",
      path: "/data_map",
      components: {
        default: () => import("@/views/DataMap"),
        "header-nav": HeaderNav
      },
      meta: {
        title: "圆形分布"
      }
    },
    // 404
    {
      // 404
      path: "*",
      components: {
        default: () => import("@/views/Error.vue"),
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
