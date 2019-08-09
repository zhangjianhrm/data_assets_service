<template>
  <div class="data-map__details" @click="closeAllSelect">
    <data-monitor-nav></data-monitor-nav>
    <div class="data-map__details_bg"></div>
    <div class="data-map__details_title"></div>
    <div class="data-map__details_effect">
      <div class="data-map__details_effect_top"></div>
      <div class="data-map__details_effect_center"></div>
      <div class="data-map__details_effect_bottom"></div>
      <div class="data-map__details_effect_title">表影响力排行</div>
      <div class="data-map__details_effect_content">
        <el-row>
          <el-col :span="4">排名</el-col>
          <el-col :span="8">表名</el-col>
          <el-col :span="8">数据库</el-col>
          <el-col :span="4">关联数</el-col>
        </el-row>
        <el-row v-for="(item,index) in effectTable" :key="index">
          <el-col :span="4" style="font-size:18px;font-style:italic;">{{index + 1}}</el-col>
          <el-col :span="8">{{item.name}}</el-col>
          <el-col :span="8">{{item.db}}</el-col>
          <el-col :span="4">{{item.r}}</el-col>
        </el-row>
      </div>
    </div>
    <div class="data-map__details_metadata">
      <div class="data-map__details_metadata_top"></div>
      <div class="data-map__details_metadata_center"></div>
      <div class="data-map__details_metadata_bottom"></div>
      <div class="data-map__details_metadata_title">24小时元数据变化占比</div>
      <div class="data-map__details_metadata_pie"></div>
      <div class="data-map__details_metadata_title">影响列表</div>
      <div class="data-map__details_metadata_content">
        <el-row>
          <el-col :span="4">序号</el-col>
          <el-col :span="7">作业</el-col>
          <el-col :span="6">流向</el-col>
          <el-col :span="7">下次执行时间</el-col>
        </el-row>
        <el-row v-for="(item,index) in workTable" :key="index">
          <el-col :span="4">{{index + 1}}</el-col>
          <el-col :span="7">{{item.name}}</el-col>
          <el-col :span="6">{{item.db}}</el-col>
          <el-col :span="7">{{item.time}}</el-col>
        </el-row>
      </div>
    </div>
    <scroll-card></scroll-card>
    <div class="data-map__details_cover" v-if="RsGVisible" @click="RsGVisible = false"></div>
    <div class="data-map__details_select">
      <div class="data-map__details_select_top"></div>
      <div class="data-map__details_select_center"></div>
      <div class="data-map__details_select_bottom"></div>
      <div class="data-map__details_select_db">
        <span class="data-map__details_select_db_name">数据库</span>
        <b v-show="!selectDBvisible">{{currentDB}}</b>
        <i class="data-map__details_select_db_arrow el-icon-arrow-down" @click.stop="selectDB()"></i>
        <i
          v-show="!selectDBvisible & currentDB != ''"
          class="data-map__details_select_table_clear el-icon-circle-close"
          @click="currentDB = ''"
        ></i>
        <div class="data-map__details_select_db_items" v-show="selectDBvisible">
          <div
            v-for="(item,index) in DBList"
            :key="index"
            @click.stop="selectDB(item.label)"
          >{{item.label}}</div>
        </div>
      </div>
      <div class="data-map__details_select_table">
        <span class="data-map__details_select_table_name">元数据表</span>
        <b v-show="!selectTableVisible">{{currentTable}}</b>
        <i
          class="data-map__details_select_table_arrow el-icon-arrow-down"
          @click.stop="selectTable()"
        ></i>
        <i
          v-show="!selectTableVisible & currentTable != ''"
          class="data-map__details_select_table_clear el-icon-circle-close"
          @click="currentTable = ''"
        ></i>
        <div class="data-map__details_select_table_items" v-show="selectTableVisible">
          <div
            v-for="(item,index) in tableList"
            :key="index"
            @click.stop="selectTable(item.label)"
          >{{item.label}}</div>
        </div>
      </div>
      <div class="data-map__details_select_field">
        <span class="data-map__details_select_field_name">元数据字段</span>
        <b v-show="!selectFieldVisible">{{currentField}}</b>
        <i
          class="data-map__details_select_field_arrow el-icon-arrow-down"
          @click.stop="selectField()"
        ></i>
        <i
          v-show="!selectFieldVisible & currentField != ''"
          class="data-map__details_select_table_clear el-icon-circle-close"
          @click="currentField = ''"
        ></i>
        <div class="data-map__details_select_field_items" v-show="selectFieldVisible">
          <div
            v-for="(item,index) in fieldList"
            :key="index"
            @click.stop="selectField(item.label)"
          >{{item.label}}</div>
        </div>
      </div>
      <div class="data-map__details_select_divider"></div>
      <div class="data-map__details_select_btn">
        <div
          v-for="(item,index) in RsGType"
          :key="index"
          :class="RsGVisible & currentRsGType == item.type ? 'activeRsGType':''"
          :style="currentTable != '' ? 'cursor:pointer':''"
          @click="showRsG(item)"
        >
          <div></div>
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <d-map></d-map>
    <transition name="slide-fade">
      <rs-graph ref="rsgraph" v-if="RsGVisible" :RsGData="RsGData"></rs-graph>
    </transition>
  </div>
</template>
<script>
import load from "@/utils/load.js"; // 加载 Js
export default {
  name: "DataMapDetails",
  components: {
    DataMonitorNav: () => import("./Nav"),
    ScrollCard: () => import("./ScrollCard"),
    DMap: () => import("./DataMapWhole"),
    RsGraph: () => import("./RsGraph")
  },
  data() {
    return {
      // 影响力排行
      effectTable: [
        { name: "学生信息表", db: "全量库", r: 45 },
        { name: "教职工信息表", db: "人事系统", r: 35 },
        { name: "一卡通信息表", db: "财务系统", r: 25 },
        { name: "奖学金", db: "财务系统", r: 15 },
        { name: "图书基本信息", db: "图书馆系统", r: 5 }
      ],
      // 元数据变化
      pieData: [
        { value: 40, name: "人事部", icon: "circle" },
        { value: 35, name: "教务部", icon: "circle" },
        { value: 40, name: "很长的学工部", icon: "circle" },
        { value: 30, name: "财务部", icon: "circle" },
        { value: 40, name: "后勤部", icon: "circle" },
        { value: 30, name: "宣传部", icon: "circle" }
      ],
      // 影响列表
      workTable: [
        { name: "学生信息表", db: "全量库", time: "19/07/26" },
        { name: "教职工信息表", db: "人事系统", time: "19/07/26" },
        { name: "一卡通信息表", db: "财务系统", time: "19/07/26" },
        { name: "奖学金", db: "财务系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" }
      ],
      // 数据库
      selectDBvisible: false,
      DBList: [
        {
          value: "选项1",
          label: "全量库"
        },
        {
          value: "选项2",
          label: "人事系统"
        },
        {
          value: "选项3",
          label: "财务系统"
        },
        {
          value: "选项4",
          label: "财务系统"
        },
        {
          value: "选项5",
          label: "图书馆系统"
        }
      ],
      currentDB: "",
      // 元数据表
      selectTableVisible: false,
      tableList: [
        {
          value: "选项1",
          label: "全量库"
        },
        {
          value: "选项2",
          label: "人事系统"
        },
        {
          value: "选项3",
          label: "财务系统"
        },
        {
          value: "选项4",
          label: "财务系统"
        },
        {
          value: "选项5",
          label: "图书馆系统"
        }
      ],
      currentTable: "",
      // 元数据字段
      selectFieldVisible: false,
      fieldList: [
        {
          value: "选项1",
          label: "全量库"
        },
        {
          value: "选项2",
          label: "人事系统"
        },
        {
          value: "选项3",
          label: "财务系统"
        },
        {
          value: "选项4",
          label: "财务系统"
        },
        {
          value: "选项5",
          label: "图书馆系统"
        }
      ],
      currentField: "",
      // 分析图类型
      RsGType: [
        { name: "血缘分析", type: "blood" },
        { name: "影响分析", type: "effect" },
        { name: "全链分析", type: "all" }
      ],
      currentRsGType: "blood",
      // 分析图开关
      RsGVisible: false,
      // 分析图数据
      // nodeData: [],
      // linkData: [],
      RsGData: {},
      pie: null
    };
  },
  async created() {
    await load(
      "https://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"
    );
    this.createPie();
  },
  mounted() {},
  beforeDestroy() {
    this.pie.dispose();
    this.pie = null;
  },
  methods: {
    createPie() {
      let dom = document.querySelector(".data-map__details_metadata_pie");
      this.pie = echarts.init(dom);
      this.pie.setOption({
        title: {
          show: false,
          text: "严重程度",
          left: 10,
          textStyle: {
            color: "#fff",
            fontSize: "12"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{c}"
        },
        legend: {
          right: 0,
          y: "center",
          orient: "vertical",
          itemWidth: 8,
          itemHeight: 8,
          // borderRadius: 20,
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          data: this.pieData
        },
        calculable: true,
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: [0, 60],
            center: ["40%", "50%"],
            color: [
              "#992E2E",
              "#B36C36",
              "#B39C36",
              "#2E997C",
              "#3F64D1",
              "#6B36B3"
            ],
            roseType: "radius",
            label: {
              show: false,
              color: "#fff",
              formatter: "{c} 条"
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: this.pieData
          }
        ]
      });
    },
    selectDB(item) {
      this.selectDBvisible = !this.selectDBvisible;
      if (item) {
        this.currentDB = item;
      }
    },
    selectTable(item) {
      this.selectTableVisible = !this.selectTableVisible;
      if (item) {
        this.currentTable = item;
      }
    },
    selectField(item) {
      this.selectFieldVisible = !this.selectFieldVisible;
      if (item) {
        this.currentField = item;
      }
    },
    closeAllSelect() {
      this.selectDBvisible = false;
      this.selectTableVisible = false;
      this.selectFieldVisible = false;
    },
    // 打开分析图
    showRsG(item) {
      if (this.currentTable != "") {
        this.currentRsGType = item.type;
        this.RsGVisible = true;
        switch (item.type) {
          case "blood":
            this.RsGData = {
              nodeData: [
                {
                  key: 1,
                  ancestors: true,
                  header: "全量库",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 4,
                  ancestors: true,
                  header: "测试4",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 5,
                  ancestors: true,
                  header: "测试5",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 7,
                  ancestors: true,
                  header: "测试7",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 10,
                  ancestors: true,
                  header: "测试10",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 11,
                  ancestors: true,
                  header: "测试11",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                }
              ],
              linkData: [
                { from: 5, to: 1 },
                { from: 10, to: 1 },
                { from: 4, to: 5 },
                { from: 7, to: 5 },
                { from: 11, to: 10 }
              ]
            };
            break;
          case "effect":
            this.RsGData = {
              nodeData: [
                {
                  key: 1,
                  ancestors: true,
                  header: "全量库",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 2,
                  header: "测试2",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 3,
                  header: "测试3",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 6,
                  header: "测试6",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 9,
                  header: "测试9",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                }
              ],
              linkData: [
                { from: 1, to: 2 },
                { from: 1, to: 9 },
                { from: 2, to: 3 },
                { from: 2, to: 6 }
              ]
            };
            break;
          case "all":
            this.RsGData = {
              nodeData: [
                {
                  key: 1,
                  ancestors: true,
                  header: "全量库",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 2,
                  header: "测试2",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 3,
                  header: "测试3",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 4,
                  ancestors: true,
                  header: "测试4",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 5,
                  ancestors: true,
                  header: "测试5",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 6,
                  header: "测试6",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 7,
                  ancestors: true,
                  header: "测试7",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 9,
                  header: "测试9",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "班级", type: "ancestors" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 10,
                  ancestors: true,
                  header: "测试10",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                },
                {
                  key: 11,
                  ancestors: true,
                  header: "测试11",
                  table: [
                    {
                      tableName: "Table_01",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" },
                        { name: "专业", type: "normal" }
                      ]
                    },
                    {
                      tableName: "Table_02",
                      tableField: [
                        { name: "年龄", type: "descendants" },
                        { name: "姓名", type: "normal" }
                      ]
                    }
                  ]
                }
              ],
              linkData: [
                { from: 1, to: 2 },
                { from: 5, to: 1 },
                { from: 1, to: 9 },
                { from: 10, to: 1 },
                { from: 4, to: 5 },
                { from: 7, to: 5 },
                { from: 11, to: 10 },
                { from: 2, to: 3 },
                { from: 2, to: 6 }
              ]
            };
            break;
        }
      }
    }
  },
  watch: {
    selectDBvisible(n, o) {
      let DBArrow = document.querySelector(
        ".data-map__details_select_db_arrow"
      );
      if (n) {
        DBArrow.classList.add("selectBtnTrans");
        this.selectTableVisible = false;
        this.selectFieldVisible = false;
      } else {
        DBArrow.classList.remove("selectBtnTrans");
      }
    },
    selectTableVisible(n, o) {
      let TableArrow = document.querySelector(
        ".data-map__details_select_table_arrow"
      );
      if (n) {
        TableArrow.classList.add("selectBtnTrans");
        this.selectDBvisible = false;
        this.selectFieldVisible = false;
      } else {
        TableArrow.classList.remove("selectBtnTrans");
      }
    },
    selectFieldVisible(n, o) {
      let fieldArrow = document.querySelector(
        ".data-map__details_select_field_arrow"
      );
      if (n) {
        fieldArrow.classList.add("selectBtnTrans");
        this.selectDBvisible = false;
        this.selectTableVisible = false;
      } else {
        fieldArrow.classList.remove("selectBtnTrans");
      }
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.data-map__details {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url(../../../assets/DataMonitor/grid.png);
  background-color: $color-footer;
  position: relative;
  &_bg {
    position: absolute;
    top: 90px;
    right: 400px;
    bottom: 0;
    left: 120px;
    background: url(../../../assets/Common/map.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  &_title {
    width: 100%;
    height: 100px;
    background: url(../../../assets/DataMonitor/data-map-details-title.png);
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 100%;
  }
  &_effect {
    position: absolute;
    top: 52px;
    right: 10px;
    width: 310px;
    height: 200px;
    &_top {
      position: absolute;
      top: 0;
      width: 100%;
      height: 50px;
      background-image: url(../../../assets/DataMonitor/right-top.png);
      background-repeat: no-repeat;
      background-position: top center;
      background-size: 100%;
    }
    &_center {
      position: absolute;
      top: 50px;
      right: 2px;
      bottom: 50px;
      left: 0;
      border-right: 1px solid rgba(39, 115, 230, 0.4);
      border-left: 1px solid rgba(39, 115, 230, 0.4);
      background-color: rgba(13, 29, 76, 0.4);
    }
    &_bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      background-image: url(../../../assets/DataMonitor/right-bottom.png);
      background-repeat: no-repeat;
      background-position: bottom center;
      background-size: 100%;
    }
    &_title {
      position: absolute;
      top: 0;
      width: 100%;
      height: 30px;
      background-image: url(../../../assets/DataMonitor/item-title.png);
      background-repeat: no-repeat;
      background-position: top center;
      // background-size: 100%;
      font-size: 12px;
      text-align: center;
      color: rgba(41, 193, 204, 1);
      line-height: 30px;
      font-weight: 600;
    }
    &_content {
      position: absolute;
      top: 30px;
      width: 100%;
      // height: 30px;
      font-size: 12px;
      text-align: center;
      color: rgba(41, 193, 204, 1);
      line-height: 30px;
      font-weight: 600;
      padding: 0 15px;
      box-sizing: border-box;
      .el-row {
        color: #fff;
        height: 26px;
        line-height: 26px;
        &:nth-child(2) {
          color: rgba(216, 64, 64, 1);
        }
        &:nth-child(3) {
          color: rgba(179, 108, 54, 1);
        }
        &:nth-child(4) {
          color: rgba(179, 156, 54, 1);
        }
        &:nth-child(2n-1) {
          background: rgba(63, 100, 209, 0.1);
        }
      }
    }
  }
  &_metadata {
    position: absolute;
    top: 260px;
    right: 10px;
    bottom: 15px;
    width: 310px;
    // height: 351px;
    overflow: hidden;
    &_top {
      position: absolute;
      top: 0;
      width: 100%;
      height: 50px;
      background-image: url(../../../assets/DataMonitor/right-top.png);
      background-repeat: no-repeat;
      background-position: top center;
      background-size: 100%;
    }
    &_center {
      position: absolute;
      top: 50px;
      right: 2px;
      bottom: 50px;
      left: 0;
      border-right: 1px solid rgba(39, 115, 230, 0.4);
      border-left: 1px solid rgba(39, 115, 230, 0.4);
      background-color: rgba(13, 29, 76, 0.4);
    }
    &_bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      background-image: url(../../../assets/DataMonitor/right-bottom.png);
      background-repeat: no-repeat;
      background-position: bottom center;
      background-size: 100%;
    }
    &_title {
      position: absolute;
      top: 0;
      width: 100%;
      height: 30px;
      background-image: url(../../../assets/DataMonitor/item-title.png);
      background-repeat: no-repeat;
      background-position: top center;
      font-size: 12px;
      text-align: center;
      color: rgba(41, 193, 204, 1);
      line-height: 30px;
      font-weight: 600;
    }
    &_pie {
      position: absolute;
      top: 40px;
      width: 100%;
      height: 150px;
    }
    &_title:nth-child(6) {
      top: 190px;
    }
    &_content {
      position: absolute;
      top: 230px;
      bottom: 15px;
      width: 100%;
      font-size: 12px;
      text-align: center;
      color: rgba(41, 193, 204, 1);
      line-height: 30px;
      font-weight: 600;
      padding: 0 15px;
      box-sizing: border-box;
      overflow: hidden;
      .el-row {
        color: #fff;
        height: 26px;
        line-height: 26px;
        &:nth-child(2) {
          color: rgba(216, 64, 64, 1);
        }
        &:nth-child(3) {
          color: rgba(179, 108, 54, 1);
        }
        &:nth-child(4) {
          color: rgba(179, 156, 54, 1);
        }
        &:nth-child(2n-1) {
          background: rgba(63, 100, 209, 0.1);
        }
      }
    }
  }
  &_scroll-card {
    position: absolute;
    top: 52px;
    right: 335px;
    bottom: 15px;
    z-index: 1;
  }
  &_cover {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }
  &_select {
    position: absolute;
    top: 27px;
    left: 11px;
    bottom: 15px;
    width: 240px;
    z-index: 2;
    &_top {
      position: absolute;
      top: 0;
      width: 100%;
      height: 70px;
      background: url(../../../assets/DataMonitor/left-top.png);
      background-repeat: no-repeat;
      background-position: top left;
    }
    &_center {
      position: absolute;
      top: 70px;
      right: 0;
      bottom: 70px;
      left: 2px;
      background: linear-gradient(
        90deg,
        rgba(0, 9, 77, 0.7) 0%,
        rgba(11, 2, 52, 0.33) 87%,
        rgba(0, 9, 77, 0.07) 99%
      );
    }
    &_bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 70px;
      background: url(../../../assets/DataMonitor/left-bottom.png);
      background-repeat: no-repeat;
      background-position: top left;
    }
    &_db {
      position: absolute;
      top: 40px;
      left: 15px;
      width: 214px;
      height: 38px;
      background: url(../../../assets/DataMonitor/select-small.png);
      cursor: pointer;
      &_name {
        color: rgba(41, 193, 204, 1);
        font-size: 12px;
        font-weight: bold;
        line-height: 38px;
        margin: 0 12px;
      }
      > b {
        color: #fff;
        font-size: 12px;
        margin: 0 12px;
      }
      &_clear {
        float: right;
        color: #fff;
        font-size: 14px;
        line-height: 38px;
      }
      &_arrow {
        float: right;
        color: #fff;
        font-size: 12px;
        font-weight: bold;
        line-height: 38px;
        text-align: center;
        width: 34px;
        position: relative;
        z-index: 2;
        transition: all 0.3s;
      }
      &_items {
        position: absolute;
        top: 2px;
        right: 16px;
        border: 1px solid rgba(39, 115, 230, 0.4);
        border-bottom: none;
        border-right: none;
        width: 140px;
        z-index: 1;
        > div {
          color: #fff;
          height: 33px;
          line-height: 33px;
          border-right: 1px solid rgba(39, 115, 230, 0.4);
          border-bottom: 1px solid rgba(39, 115, 230, 0.4);
          background-color: rgba(13, 29, 76, 0.4);
          text-indent: 12px;
          font-size: 12px;
          &:hover {
            background: rgba(31, 70, 144, 1);
          }
          &:nth-child(1) {
            border-right: none;
          }
        }
      }
    }
    &_table {
      position: absolute;
      top: 113px;
      left: 15px;
      width: 214px;
      height: 38px;
      background: url(../../../assets/DataMonitor/select-medium.png);
      cursor: pointer;
      &_name {
        color: rgba(41, 193, 204, 1);
        font-size: 12px;
        font-weight: bold;
        line-height: 38px;
        margin: 0 12px;
      }
      > b {
        color: #fff;
        font-size: 12px;
        margin: 0 12px;
      }
      &_clear {
        float: right;
        color: #fff;
        font-size: 14px;
        line-height: 38px;
      }
      &_arrow {
        float: right;
        color: #fff;
        font-size: 12px;
        font-weight: bold;
        line-height: 38px;
        text-align: center;
        width: 34px;
        position: relative;
        z-index: 2;
        transition: all 0.3s;
      }
      &_items {
        position: absolute;
        top: 2px;
        right: 16px;
        border: 1px solid rgba(39, 115, 230, 0.4);
        border-bottom: none;
        border-right: none;
        width: 129px;
        z-index: 1;
        > div {
          color: #fff;
          height: 33px;
          line-height: 33px;
          border-right: 1px solid rgba(39, 115, 230, 0.4);
          border-bottom: 1px solid rgba(39, 115, 230, 0.4);
          background-color: rgba(13, 29, 76, 0.4);
          text-indent: 12px;
          font-size: 12px;
          &:hover {
            background: rgba(31, 70, 144, 1);
          }
          &:nth-child(1) {
            border-right: none;
          }
        }
      }
    }
    &_field {
      position: absolute;
      top: 186px;
      left: 15px;
      width: 214px;
      height: 38px;
      background: url(../../../assets/DataMonitor/select.png);
      cursor: pointer;
      &_name {
        color: rgba(41, 193, 204, 1);
        font-size: 12px;
        font-weight: bold;
        line-height: 38px;
        margin: 0 12px;
      }
      > b {
        color: #fff;
        font-size: 12px;
        margin: 0 12px;
      }
      &_clear {
        float: right;
        color: #fff;
        font-size: 14px;
        line-height: 38px;
      }
      &_arrow {
        float: right;
        color: #fff;
        font-size: 12px;
        font-weight: bold;
        line-height: 38px;
        text-align: center;
        width: 34px;
        position: relative;
        z-index: 2;
        transition: all 0.3s;
      }
      &_items {
        position: absolute;
        top: 2px;
        right: 16px;
        border: 1px solid rgba(39, 115, 230, 0.4);
        border-bottom: none;
        border-right: none;
        width: 116px;
        z-index: 1;
        > div {
          color: #fff;
          height: 33px;
          line-height: 33px;
          border-right: 1px solid rgba(39, 115, 230, 0.4);
          border-bottom: 1px solid rgba(39, 115, 230, 0.4);
          background-color: rgba(13, 29, 76, 0.4);
          text-indent: 12px;
          font-size: 12px;
          &:hover {
            background: rgba(31, 70, 144, 1);
          }
          &:nth-child(1) {
            border-right: none;
          }
        }
      }
    }
    &_divider {
      position: absolute;
      top: 245px;
      left: 16px;
      width: 189px;
      height: 29px;
      background: url(../../../assets/DataMonitor/divider.png);
    }
    &_btn {
      position: absolute;
      top: 258px;
      width: 190px;
      bottom: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      > div {
        width: 110px;
        height: 110px;
        line-height: 110px;
        text-align: center;
        color: rgba(41, 193, 204, 1);
        position: relative;
        cursor: not-allowed;
        font-size: 14px;
        div {
          opacity: 0.3;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-image: url(../../../assets/DataMonitor/ring.png);
          background-size: 100%;
        }
        span {
          display: block;
          position: relative;
          z-index: 1;
        }
      }
    }
  }
  &_rsg {
    position: absolute;
    top: 27px;
    right: 20px;
    bottom: 15px;
    left: 240px;
    z-index: 2;
  }
  .selectBtnTrans {
    transform: rotate(180deg);
  }
  .activeRsGType {
    color: #fff;
    animation: clockwise 5s infinite linear;
    > div {
      opacity: 1;
    }
    > span {
      animation: anticlockwise 5s infinite linear;
    }
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(-500px);
    opacity: 0;
  }
  @keyframes clockwise {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes anticlockwise {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  @media only screen and (min-width: 1366px) and (max-width: 1599px) {
  }
  @media only screen and (min-width: 1600px) and (max-width: 1919px) {
  }
  @media only screen and (min-width: 1920px) {
    &_effect {
      top: 72px;
    }
    &_metadata {
      top: 280px;
    }
    &_scroll-card {
      top: 72px;
    }
    &_select {
      top: 37px;
      left: 16px;
    }
    &_rsg {
      top: 37px;
      left: 256px;
    }
  }
}
</style>
