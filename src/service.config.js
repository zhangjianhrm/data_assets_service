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
      // getExecutionCode: SERVERURL + "/api/service/code/refer/class/list",
      getNationalStandardCode: SERVERURL + "/api/service/code/refer/class/list", // 国家标准代码列表
      getNationalStandardCodeCount: SERVERURL + "/api/service/code/refer/manage/count", // 国家标准代码数量
      downloadNationalStandardCode: SERVERURL + "/api/service/code/refer/class/export?type=word", // 下载国家标准代码
      // getSubClass: SERVERURL + "/api/service/code/refer/subclass/page?id=111&orderByType=update_time&orderByWay=desc&pageIndex=0&pageSize=15&queryCriteria=11" // 获取代码子类
      getSubClass: SERVERURL + "/api/service/code/refer/subclass/page?id=b5a9b6f0995111e9780b57374dba8ba3" // 获取代码子类
    },
    // 模型标准
    modelStandard: {}
  },

  // 采标率
  getInfoStandard: MOCKURL + "info_standard",

  // Card
  getCard: MOCKURL + "card",
  getCardMedium: MOCKURL + "card_medium"
};

export default URL;
