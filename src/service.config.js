const MOCKURL = "https://easy-mock.com/mock/5cece354191d1b55805a1434/data_assets_service/";

const SERVERURL = "http://60.174.249.83:8057";
// const SERVERURL = "http://60.174.249.83:8057/api/code/downloadFile?fileName=1562224241959.xls&clientFileName=1562224241959.xls;

const URL = {
  //
  server: SERVERURL,
  // Home
  getNews: MOCKURL + "home_news", // 实时消息

  // FooterLink
  getFooter: MOCKURL + "footer",

  // 信息标准
  infoStandard: {
    // 代码标准
    codeStandard: {
      // 学校执行代码
      getExecutionCode: SERVERURL + "/api/service/code/execute/class/list", // 学校执行代码列表
      getExecutionCodeCount: SERVERURL + "/api/service/code/execute/manage/count", // 国家标准代码数量
      downloadExecutionCode: SERVERURL + "/api/service/code/execute/class/export?type=word", // 下载国家标准代码
      getExecutionCodeSubClass: SERVERURL + "/api/service/code/execute/subclass/page?", // 获取代码子类
      downloadExecutionCodeSubClass: SERVERURL + "/api/service/code/execute/subclass/export?type=word", // 下载代码子类

      // 国家标准代码
      getNationalStandardCode: SERVERURL + "/api/service/code/refer/class/list", // 国家标准代码列表
      getNationalStandardCodeCount: SERVERURL + "/api/service/code/refer/manage/count", // 国家标准代码数量
      downloadNationalStandardCode: SERVERURL + "/api/service/code/refer/class/export?type=word", // 下载国家标准代码
      getNationalStandardCodeSubClass: SERVERURL + "/api/service/code/refer/subclass/page?", // 获取代码子类 b5a9b6f0995111e9780b57374dba8ba3
      downloadSubClass: SERVERURL + "/api/service/code/refer/subclass/export?type=word" // 下载代码子类 b5a9b6f0995111e9780b57374dba8ba3
    },
    // 模型标准
    modelStandard: {},
    // 信息标准管理规范
    managementNorms: {}
  },

  // 采标率
  getInfoStandard: MOCKURL + "info_standard",

  // Card
  getCard: MOCKURL + "card",
  getCardMedium: MOCKURL + "card_medium"
};

export default URL;
