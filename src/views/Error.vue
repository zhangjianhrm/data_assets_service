<template>
  <div>
    <sw-fliter
      :normalSearchName="'accountAndUserName'"
      :searchQuery="searchQuery"
      :placeholder="'搜索人员'"
      @search="searchHandle"
      @normalSearch="normalSearchHandle"
    ></sw-fliter>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // filter
      searchQuery: {
        accountAndUserName: {
          value: "",
          label: "根据账号和用户姓名查询",
          type: "input"
        },
        organizationId: {
          name: "组织机构",
          type: "cascader",
          value: [],
          label: "请选择组织结构",
          options: [
            {
              parentId: null,
              code: "1",
              value: "1",
              label: "树维大学",
              id: "1",
              children: [
                {
                  parentId: "1",
                  code: "2",
                  value: "2",
                  label: "学院交流",
                  id: "2",
                  children: [
                    {
                      parentId: "2",
                      code: "9996",
                      value: "b1e829f070b311e9892638fdb4bde1bc",
                      label: "嘻嘻哈哈",
                      id: "b1e829f070b311e9892638fdb4bde1bc"
                    },
                    {
                      parentId: "2",
                      code: "111112",
                      value: "04e76d10504211e9e29fc4a8db7e2f71",
                      label: "设计交流团",
                      id: "04e76d10504211e9e29fc4a8db7e2f71",
                      children: [
                        {
                          parentId: "04e76d10504211e9e29fc4a8db7e2f71",
                          code: "522",
                          value: "dc38be505f4111e9aaace1d16b7e54c1",
                          label: "视觉传达系",
                          id: "dc38be505f4111e9aaace1d16b7e54c1",
                          children: [
                            {
                              parentId: "dc38be505f4111e9aaace1d16b7e54c1",
                              code: "266333",
                              value: "39200e9060da11e965246f4c3d10b7e2",
                              label: "视觉传达专业",
                              id: "39200e9060da11e965246f4c3d10b7e2",
                              children: [
                                {
                                  parentId: "39200e9060da11e965246f4c3d10b7e2",
                                  code: "dakdak12",
                                  value: "d98d11f0699711e9f6759f222d1bb4c0",
                                  label: "视觉教研室",
                                  id: "d98d11f0699711e9f6759f222d1bb4c0"
                                },
                                {
                                  parentId: "39200e9060da11e965246f4c3d10b7e2",
                                  code: "262626",
                                  value: "6748330060db11e965246f4c3d10b7e2",
                                  label: "秘书处",
                                  id: "6748330060db11e965246f4c3d10b7e2",
                                  children: [
                                    {
                                      parentId:
                                        "6748330060db11e965246f4c3d10b7e2",
                                      code: "116561",
                                      value: "3ec88fc0628311e9f6759f222d1bb4c0",
                                      label: "测试人员",
                                      id: "3ec88fc0628311e9f6759f222d1bb4c0",
                                      children: [
                                        {
                                          parentId:
                                            "3ec88fc0628311e9f6759f222d1bb4c0",
                                          code: "116516",
                                          value:
                                            "8d1c7eb060db11e965246f4c3d10b7e2",
                                          label: "打印科",
                                          id:
                                            "8d1c7eb060db11e965246f4c3d10b7e2",
                                          children: [
                                            {
                                              parentId:
                                                "8d1c7eb060db11e965246f4c3d10b7e2",
                                              code: "141212",
                                              value:
                                                "af3940a060db11e965246f4c3d10b7e2",
                                              label: "派送组",
                                              id:
                                                "af3940a060db11e965246f4c3d10b7e2"
                                            }
                                          ]
                                        }
                                      ]
                                    },
                                    {
                                      parentId:
                                        "6748330060db11e965246f4c3d10b7e2",
                                      code: "256623",
                                      value: "77fdb21060db11e965246f4c3d10b7e2",
                                      label: "文档管理",
                                      id: "77fdb21060db11e965246f4c3d10b7e2"
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              parentId: "dc38be505f4111e9aaace1d16b7e54c1",
                              code: "2566",
                              value: "151e871060da11e965246f4c3d10b7e2",
                              label: "平面设计专业",
                              id: "151e871060da11e965246f4c3d10b7e2",
                              children: [
                                {
                                  parentId: "151e871060da11e965246f4c3d10b7e2",
                                  code: "121212d",
                                  value: "58732610628311e9f6759f222d1bb4c0",
                                  label: "测试2",
                                  id: "58732610628311e9f6759f222d1bb4c0"
                                }
                              ]
                            }
                          ]
                        },
                        {
                          parentId: "04e76d10504211e9e29fc4a8db7e2f71",
                          code: "1231",
                          value: "f0b9d5e0504f11e9e29fc4a8db7e2f71",
                          label: "环境艺术系",
                          id: "f0b9d5e0504f11e9e29fc4a8db7e2f71",
                          children: [
                            {
                              parentId: "f0b9d5e0504f11e9e29fc4a8db7e2f71",
                              code: "1212",
                              value: "79779a30628311e9f6759f222d1bb4c0",
                              label: "大爱的",
                              id: "79779a30628311e9f6759f222d1bb4c0"
                            }
                          ]
                        },
                        {
                          parentId: "04e76d10504211e9e29fc4a8db7e2f71",
                          code: "12314123",
                          value: "1851abe0504211e9e29fc4a8db7e2f71",
                          label: "印刷包装系",
                          id: "1851abe0504211e9e29fc4a8db7e2f71",
                          children: [
                            {
                              parentId: "1851abe0504211e9e29fc4a8db7e2f71",
                              code: "52123",
                              value: "96ef0af0504311e9e29fc4a8db7e2f71",
                              label: "包装设计专业",
                              id: "96ef0af0504311e9e29fc4a8db7e2f71"
                            },
                            {
                              parentId: "1851abe0504211e9e29fc4a8db7e2f71",
                              code: "124124",
                              value: "921129a0504311e9e29fc4a8db7e2f71",
                              label: "包装工艺专业",
                              id: "921129a0504311e9e29fc4a8db7e2f71",
                              children: [
                                {
                                  parentId: "921129a0504311e9e29fc4a8db7e2f71",
                                  code: "123213123123",
                                  value: "53a299c0673a11e9124552a3f3914386",
                                  label: "312312312",
                                  id: "53a299c0673a11e9124552a3f3914386"
                                }
                              ]
                            }
                          ]
                        },
                        {
                          parentId: "04e76d10504211e9e29fc4a8db7e2f71",
                          code: "32423532",
                          value: "1091e050504211e9e29fc4a8db7e2f71",
                          label: "设计艺术系",
                          id: "1091e050504211e9e29fc4a8db7e2f71"
                        }
                      ]
                    },
                    {
                      parentId: "2",
                      code: "123123123",
                      value: "45a295b04b0a11e99619bf17141b39ef",
                      label: "科研交流团",
                      id: "45a295b04b0a11e99619bf17141b39ef",
                      children: [
                        {
                          parentId: "45a295b04b0a11e99619bf17141b39ef",
                          code: "213213123213213",
                          value: "a49476204ba911e9ed950c4118585013",
                          label: "社会科学",
                          id: "a49476204ba911e9ed950c4118585013"
                        },
                        {
                          parentId: "45a295b04b0a11e99619bf17141b39ef",
                          code: "132132312321",
                          value: "dea3e3004b9a11e9ed950c4118585013",
                          label: "天文学",
                          id: "dea3e3004b9a11e9ed950c4118585013",
                          children: [
                            {
                              parentId: "dea3e3004b9a11e9ed950c4118585013",
                              code: "123123312312",
                              value: "6c7725004ba711e9ed950c4118585013",
                              label: "天文望远镜",
                              id: "6c7725004ba711e9ed950c4118585013"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      parentId: "2",
                      code: "123",
                      value: "ed97f1504afd11e99619bf17141b39ef",
                      label: "交流会",
                      id: "ed97f1504afd11e99619bf17141b39ef",
                      children: [
                        {
                          parentId: "ed97f1504afd11e99619bf17141b39ef",
                          code: "123123321",
                          value: "d6cbf9b05b3f11e98ffcd8ff5ed699d6",
                          label: "岁数大多多多所",
                          id: "d6cbf9b05b3f11e98ffcd8ff5ed699d6"
                        },
                        {
                          parentId: "ed97f1504afd11e99619bf17141b39ef",
                          code: "123213231",
                          value: "7a0be9d04bac11e9ed950c4118585013",
                          label: "粉丝都是我家人",
                          id: "7a0be9d04bac11e9ed950c4118585013",
                          children: [
                            {
                              parentId: "7a0be9d04bac11e9ed950c4118585013",
                              code: "312321321321321",
                              value: "7e6875d0673a11e9124552a3f3914386",
                              label: "312312312",
                              id: "7e6875d0673a11e9124552a3f3914386"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        state: {
          name: "账号状态",
          type: "select",
          value: "",
          label: "请选择账户状态",
          options: []
        },
        activation: {
          name: "激活状态",
          type: "select",
          value: "",
          label: "请选择激活状态",
          options: [
            { label: "未激活", value: "0" },
            { label: "激活", value: "1" },
            { label: "默认激活", value: "2" }
          ]
        },
        certificateTypeId: {
          name: "证件类型",
          type: "select",
          value: "",
          label: "请选择证件类型",
          options: []
        },
        genderId: {
          name: "性别",
          type: "select",
          value: "",
          label: "请选择性别",
          options: []
        },
        nationId: {
          name: "民族",
          type: "select",
          value: "",
          label: "请选择民族",
          options: []
        },
        countryId: {
          name: "国家",
          type: "select",
          value: "",
          label: "请选择国家",
          options: []
        }
      },

      isFilterShow: false
    };
  },
  methods: {
    // filter 的方法
    searchHandle(val) {
      this.$alert(val);
    },
    searchInputHandle() {
      this.$alert(this.searchQuery.accountAndUserName.value);
    },
    normalSearchHandle(val) {
      this.$alert(val);
    }
  }
};
</script>