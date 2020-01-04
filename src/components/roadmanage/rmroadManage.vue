<template>
  <div>
    <h2>道路管理</h2>
    <el-row>

    </el-row>
    <el-row>
      <div class="grid-content bg-purple-light">
        <el-table
          :data="tableData.filter(data => !search || data.road_name.toLowerCase().includes(search.toLowerCase()))"
          :stripe="true"
          style="width: 100%"
          max-height="540">
          <el-table-column
            align="center"
            label="道路名称"
            width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.road_name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="道路起点"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.road_begin}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="道路终点"
            width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.road_end}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="道路状态"
            width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.road_state}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="check"
            label="是否需要检测"
            width="200"
            :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <span>{{ scope.row.ifneed}}</span>
            </template>
          </el-table-column>


          <el-table-column
            align="center">

            <template slot="header" slot-scope="scope" style="width: auto">
              <el-input
                v-model="search"
                size="mini"
                style="width: 200px"
                placeholder="输入关键字搜索"/>
            </template>

            <template slot-scope="scope" style="width: auto">
              <el-dropdown>
              <span class="el-dropdown-link">
                查看更多道路信息<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown" align="center">
                  <el-dropdown-item><el-button
                    size="mini"
                    type="info"
                    style="width: auto"
                    @click="handleEdit(scope.$index, scope.row)">巡查记录</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button
                    size="mini"
                    style="width: auto"
                    type="warning"
                    @click="handleAdd(scope.$index, scope.row)">添加预警</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button
                    size="mini"
                    style="width: auto"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">取消预警</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button
                      size="mini"
                      type="primary"
                      style="width: auto"
                      @click="rbtshow(scope.$index, scope.row)">道路基本信息</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button
                    size="mini"
                    type="info"
                    style="width: auto"
                    @click="rctshow(scope.$index, scope.row)">车行道</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button
                    size="mini"
                    type="success"
                    style="width: auto"
                    @click="sidewalk_tableshow(scope.$index, scope.row)">人行道</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button
                    size="mini"
                    type="warning"
                    style="width: auto"
                    @click="divider_band_tableshow(scope.$index, scope.row)">分隔带</el-button></el-dropdown-item>
                  <el-dropdown-item><el-button
                    type="primary"
                    size="mini"
                    style="width: auto"
                    @click="facilities_tableshow(scope.$index, scope.row)">附属设施</el-button></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>

          </el-table-column>
        </el-table>
      </div>
    </el-row>


    <el-form ref="addDfn" :rules="rules" :model="dfn" label-width="80px">
      <div>
        <el-dialog title="设施损害通知单"
                   :visible.sync="dialogTableVisible"
                   width="70%"
                   :close-on-click-modal="false"
                   :destroy-on-close = 'true'>
          <el-row>
            <el-col :span="8"><div>
              <el-form-item label="通知单号：" label-width="100px">
                <el-input v-model.number="dfn.notice_code" :disabled="true"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="16"><div>
              <el-form-item label="设施名称：" label-width="100px" prop="facilities_name">
                <el-input v-model="dfn.facilities_name"></el-input>
              </el-form-item>
            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">
              <el-form-item label="整修时间：" label-width="100px" prop="repair_time">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="dfn.repair_time" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">
              <el-form-item label="损坏部位：" label-width="100px" prop="damage_position">
                <el-input v-model="dfn.damage_position"></el-input>
              </el-form-item>
            </div></el-col>
          </el-row>
          <el-form-item label="损坏原因：" label-width="100px">
            <el-input type="textarea" v-model="dfn.damage_reason"></el-input>
          </el-form-item>
          <el-form-item label="处理意见：" label-width="100px">
            <el-input type="textarea" v-model="dfn.opinions"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="技术员：" label-width="100px" align="center" prop="technical_person_name">
                <el-input v-model="dfn.technical_person_name"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">
              <el-form-item label="巡视员：" label-width="100px" align="center" prop="check_person_name">
                <el-input v-model="dfn.check_person_name"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
              <el-form-item label="班长：" label-width="100px" align="center" prop="monitor">
                <el-input v-model="dfn.monitor"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">
              <el-form-item label="时间：" label-width="100px" align="center">
                <el-date-picker :disabled="true" type="date" value-format="yyyy-MM-dd HH:mm:ss" v-model="dfn.notice_date" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </div></el-col>
          </el-row>
          <el-form-item>
            <el-button :plain="true" type="primary" @click="onSubmitC1R('addDfn')" :loading="loadingDialog">立即创建</el-button>
            <el-button @click="cl">取消</el-button>
          </el-form-item>
        </el-dialog>
      </div>
    </el-form>



    <el-form :model="rbt">
      <div>
        <el-dialog
          title="道路基本信息"
          :visible.sync="dialogForm1Visible"
          width="80%"
          :close-on-click-modal="false"
          :destroy-on-close = 'true'>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="道路名称" label-width="100px">
                  <el-input v-model="rbt.road_name" ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="设计单位" label-width="100px">
                  <el-input v-model="rbt.design_unite" ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="路幅宽度范围" label-width="100px">
                  <el-input v-model="rbt.road_width_range"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="所属乡镇" label-width="100px">
                  <el-input v-model="rbt.town" ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="道路编号" label-width="100px">
                  <el-input v-model="rbt.road_code" ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="建造单位" label-width="100px">
                  <el-input v-model="rbt.construction_unite" ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="道路长度" label-width="100px">
                  <el-input v-model="rbt.road_length"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="管理分类" label-width="100px">
                  <el-input v-model="rbt.manage_sort" ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="道路走向" label-width="100px">
                  <el-input v-model="rbt.road_trend" ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="道路等级" label-width="100px">
                  <el-input v-model="rbt.road_class" ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="道路面积" label-width="100px">
                  <el-input v-model="rbt.road_area"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="管理单位" label-width="100px">
                  <el-input v-model="rbt.manage_unite" ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="道路起点" label-width="100px">
                  <el-input v-model="rbt.road_begin" ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="路面等级" label-width="100px">
                  <el-input v-model="rbt.pavement_class" ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="AADT" label-width="100px">
                  <el-input v-model="rbt.AADT"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="养护单位" label-width="100px">
                  <el-input v-model="rbt.maintenance_unite" ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="道路终点" label-width="100px">
                  <el-input v-model="rbt.road_end" ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="交通量等级" label-width="100px">
                  <el-input v-model="rbt.traffic_class"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="建造年月" label-width="100px">
                  <el-input v-model="rbt.build_date" ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="exitForm1()">确认修改</el-button>
            <el-button @click="exitForm1()">退出</el-button>
          </el-form-item>
        </el-dialog>
      </div>
    </el-form>




    <el-form :model="rct">
      <div>
      <el-dialog
        title="车行道"
        :visible.sync="dialogForm2Visible"
        width="60%"
        :close-on-click-modal="false"
        :destroy-on-close = 'true'>
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="路面基层类型" label-width="140px">
                <el-input v-model="rct.grassroots_type" ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="路面基层厚度" label-width="140px">
                <el-input v-model="rct.grassroots_thickness"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="路面类型" label-width="140px">
                <el-input v-model="rct.pavement_type" ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="路面厚度" label-width="140px">
                <el-input v-model="rct.pavement_thickness"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="车道数" label-width="140px">
                <el-input v-model="rct.lanes" ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="通行方向" label-width="140px">
                <el-input v-model="rct.direction" ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="左侧非机动车道宽度范围" label-width="140px">
                <el-input v-model="rct.l_m_w_r" ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="右侧非机动车道宽度范围" label-width="140px">
                <el-input v-model="rct.r_m_w_r" ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="车行道面积" label-width="140px">
                <el-input v-model="rct.lane_areas" ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="有无公交车专用道" label-width="140px">
                <el-input v-model="rct.name" ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="侧石类型" label-width="140px">
                <el-input v-model="rct.lateral_rock_type" ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="侧石长度" label-width="140px">
                <el-input v-model="rct.lateral_rock_length" ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="平石类型" label-width="140px">
                <el-input v-model="rct.flat_rock_type" ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="平石长度" label-width="140px">
                <el-input v-model="rct.flat_rock_length" ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="机动车道宽度范围" label-width="140px">
                <el-input v-model="rct.motorway_width_range"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="exitForm2()">确认修改</el-button>
          <el-button @click="exitForm2()">退出</el-button>
        </el-form-item>
      </el-dialog>
      </div>
    </el-form>



    <el-form :model="sidewalk_table">
      <div>
      <el-dialog
        title="人行道"
        :visible.sync="dialogForm3Visible"
        width="60%"
        :close-on-click-modal="false"
        :destroy-on-close = 'true'>
          <el-row :gutter="10">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="铺面类型" label-width="140px">
                  <el-input v-model="sidewalk_table.pavement_type" ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="人行道长度" label-width="140px">
                  <el-input v-model="sidewalk_table.sidewalk_length"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>


          <el-row :gutter="10">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="人行道宽度范围" label-width="140px">
                  <el-input v-model="sidewalk_table.sidewalk_width_range" ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="直线面积" label-width="140px">
                  <el-input v-model="sidewalk_table.sidewalk_areas"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="交叉口面积" label-width="140px">
                  <el-input v-model="sidewalk_table.intersection_areas" ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="盲道长度" label-width="140px">
                  <el-input v-model="sidewalk_table.blind_length" ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="无障碍宽度面积" label-width="140px">
                  <el-input v-model="sidewalk_table.accessibility_areas" ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="绿化带面积" label-width="140px">
                  <el-input v-model="sidewalk_table.greenbelt_areas" ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="侧石类型" label-width="140px">
                  <el-input v-model="sidewalk_table.lateral_rock_type" ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item label="平石类型" label-width="140px">
                  <el-input v-model="sidewalk_table.flat_rock_areas" ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        <el-form-item>
          <el-button type="primary" @click="exitForm3()">确认修改</el-button>
          <el-button @click="exitForm3()">退出</el-button>
        </el-form-item>
        </el-dialog>
      </div>
    </el-form>




    <el-form :model="divider_band_table">
      <div>
      <el-dialog
        title="分隔带"
        :visible.sync="dialogForm4Visible"
        width="60%"
        :close-on-click-modal="false"
        :destroy-on-close = 'true'>
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="分隔带类型" label-width="140px">
                <el-input v-model="divider_band_table.divider_type" ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="长度" label-width="140px">
                <el-input v-model="divider_band_table.length" ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="宽度" label-width="140px">
                <el-input v-model="divider_band_table.width"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="高度" label-width="140px">
                <el-input v-model="divider_band_table.height" ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="面积" label-width="140px">
                <el-input v-model="divider_band_table.areas" ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="exitForm4()">确认修改</el-button>
          <el-button @click="exitForm4()">退出</el-button>
        </el-form-item>
      </el-dialog>
      </div>
    </el-form>




    <el-form :model="facilities_table">
      <div>
      <el-dialog
        title="附属设施"
        :visible.sync="dialogForm5Visible"
        width="60%"
        :close-on-click-modal="false"
        :destroy-on-close = 'true'>
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="检查井口数量" label-width="140px">
                <el-input v-model="facilities_table.well_amount" ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="雨水口数量" label-width="140px">
                <el-input v-model="facilities_table.inlets_amount"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="路名牌数量" label-width="140px">
                <el-input v-model="facilities_table.nameplates_amount" ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="标致牌数量" label-width="140px">
                <el-input v-model="facilities_table.signboards_amount" ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="树池面积" label-width="140px">
                <el-input v-model="facilities_table.treepool_area" ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="其他" label-width="140px">
                <el-input v-model="facilities_table.other" ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="exitForm5()">确认修改</el-button>
          <el-button @click="exitForm5()">退出</el-button>
        </el-form-item>
      </el-dialog>
      </div>
    </el-form>






    <el-drawer :visible.sync="drawer"
               :with-header="false"
               size="30%"
               :destroy-on-close = 'true'>

      <div class="toptop">
        <el-form ref="addRp" :model="rp" label-width="200px" :rules="rules">
          <el-form-item label="巡查人员：" label-width="110px" align="center" prop="woker_code_name">
            <el-input v-model="rp.woker_code_name"></el-input>
          </el-form-item>
          <el-form-item label="损害类型：" label-width="110px" align="center" prop="d_type">
            <!--            <el-input v-model="rp.d_type"></el-input>-->
            <el-select v-model="rp.d_type" placeholder="请选择">
              <el-option
                v-for="item in d_type"
                :key="item.cement_type"
                :label="item.cement_type"
                :value="item.cement_type">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="位置及描述：" label-width="110px">
            <el-input type="textarea" v-model="rp.d_position_description"></el-input>
          </el-form-item>
          <el-form-item label="巡查日期：" label-width="110px" align="center">
            <el-date-picker :disabled="true" type="date" value-format="yyyy-MM-dd HH:mm:ss" v-model="rp.patrol_date" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="管理单位：" label-width="110px">
            <el-input v-model="rp.manage_unite"></el-input>
          </el-form-item>
          <el-form-item label="备注：" label-width="110px">
            <el-input type="textarea" v-model="rp.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitC2R('addRp')">提交</el-button>
            <el-button @click="dalycheck">取消</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-drawer>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        d_type : [],
        search: '',
        road_code : '',
        table_index: undefined,
        table_row: undefined,
        dialogTableVisible: false,
        dialogForm1Visible: false,
        dialogForm2Visible: false,
        dialogForm3Visible: false,
        dialogForm4Visible: false,
        dialogForm5Visible: false,
        drawer: false,
        dfn: {
          road_code: '',
          notice_code: '',
          facilities_name: '',
          repair_time: '',
          damage_position: '',
          damage_reason: '',
          opinions: '',
          technical_person_name: '',
          check_person_name: '',
          monitor: '',
          notice_date: ''
        },
        rbt: {
          road_name:'',
          design_unite:'',
          road_width_range:'',
          town:'',
          road_code:'',
          construction_unite:'',
          road_length:'',
          manage_sort:'',
          road_trend:'',
          road_class:'',
          road_area:'',
          manage_unite:'',
          road_begin:'',
          pavement_class:'',
          AADT:'',
          maintenance_unite:'',
          road_end:'',
          traffic_class:'',
          build_date:''
        },
        rct: {
          pavement_type: '',
          pavement_thickness: '',
          grassroots_thickness: '',
          grassroots_type: '',
          lanes: '',
          direction: '',
          motorway_width_range: '',
          r_m_w_r: '',
          l_m_w_r: '',
          lane_areas: '',
          lateral_rock_type: '',
          lateral_rock_length: '',
          flat_rock_type: '',
          flat_rock_length: ''
        },
        sidewalk_table: {
          pavement_type: '',
          sidewalk_length: '',
          sidewalk_width_range: '',
          sidewalk_areas: '',
          intersection_areas: '',
          blind_length: '',
          accessibility_areas: '',
          greenbelt_areas: '',
          lateral_rock_type: '',
          flat_rock_areas: ''
        },
        divider_band_table: {
          divider_type: '',
          length: '',
          width: '',
          height: '',
          areas: ''
        },
        facilities_table: {
          inlets_amount: '',
          well_amount: '',
          nameplates_amount: '',
          signboards_amount: '',
          treepool_area: '',
          other: ''
        },
        loadingDialog: false,
        loadingDraw: false,
        loadingDelete : false,
        rp: {
          patrol_code: '',
          road_code: '',
          woker_code_name: '',
          patrol_date: '',
          d_type: '',
          d_position_description: '',
          remark: '',
          manage_unite: ''
        },
        rules: {
          facilities_name: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          repair_time: [{ type: 'string', required: true, message: '请选择日期', trigger: 'change' }],
          damage_position: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          opinions: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          technical_person_name: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          check_person_name: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          monitor: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          woker_code_name: [{required: true, message: '内容不能为空', trigger: 'blur'}],
          d_type : [{required: true, message: '内容不能为空', trigger: 'blur'}]
        }
      }
    },
    mounted:function () {
      this.loadTableData(); //初始化数据
    },
    methods: {
      handleEdit(index, row) {  //添加巡逻信息抽屉显示
        var _this = this;
        _this.table_index = index;
        _this.table_row = row;
        var MyDate = new Date();
        _this.rp.patrol_date = this.formattingDate(MyDate.toLocaleDateString());
        this.rp.patrol_code = parseInt((MyDate.getFullYear()%1000) + "" + (MyDate.getMonth()+1) + "" +  MyDate.getDate() + "" + MyDate.getHours() + "" + MyDate.getMinutes());
        _this.drawer = true;
        console.log(index, row);
      },
      handleDelete(index, row) {  //删除道路预警信息
        this.table_index = index;
        this.table_row = row;
        var id = this.tableData[this.table_index].road_code;
        var _this = this;
        _this.loadingDelete = true;
        this.$confirm('此操作将移除对当前道路预警, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          _this.loadingDelete = false;
          this.postRequest('/rc/dp/cr/deleteDFN', {
            id,
          }).then(resp=> {
            _this.loadingDelete = false;
            if (resp && resp.status == 200) {
              this.loadTableData();
              this.$message({
                message: '预警已解除',
                type: 'success'
              });
            }else if (resp && (resp.status == 504 || resp.status == 404)) {
              this.$message.error({message: '服务器被吃了⊙﹏⊙∥'});
            }else {
              this.$message.error({message: '未知错误'});
            }
          });
        }).catch(() => {
        });
      },
      handleAdd(index, row){  //添加道路预警弹窗显示
        console.log(index, row);
        this.table_index = index;
        this.table_row = row;
        var MyDate = new Date();
        this.dfn.notice_date = new Date(this.formattingDate(MyDate.toLocaleDateString()));
        this.dfn.notice_code = parseInt((MyDate.getFullYear()%1000) + "" + (MyDate.getMonth()+1) + "" +  MyDate.getDate() + "" + MyDate.getHours() + "" + MyDate.getMinutes());
        this.dialogTableVisible = true;
      },
      rbtshow(index, row){
        console.log(index, row);
        this.table_index = index;
        this.table_row = row;
        var _this = this;

        this.postRequest("/road/getRBTbyroad" ,{
            "road_code" : this.table_row.road_code
        }).then(resp =>{
          if (resp && resp.status == 200){
            var data = resp.data;
            _this.rbt = data.tabledata[0];
          }
        });
        this.dialogForm1Visible = true;
      },
      rctshow(index, row){
        console.log(index, row);
        this.table_index = index;
        this.table_row = row;
        var _this = this;

        this.postRequest("/road/getRoad_car" ,{
          "road_code" : this.table_row.road_code
        }).then(resp =>{
          if (resp && resp.status == 200){
            var data = resp.data;
            _this.rct = data.tabledata[0];
          }
        });
        this.dialogForm2Visible = true;
      },
      sidewalk_tableshow(index, row){
        console.log(index, row);
        this.table_index = index;
        this.table_row = row;
        var _this = this;

        this.postRequest("/road/getRoad_sidewalk" ,{
          "road_code" : this.table_row.road_code
        }).then(resp =>{
          if (resp && resp.status == 200){
            var data = resp.data;
            _this.sidewalk_table = data.tabledata[0];
          }
        });
        this.dialogForm3Visible = true;
      },
      divider_band_tableshow(index, row){
        console.log(index, row);
        this.table_index = index;
        this.table_row = row;
        var _this = this;

        this.postRequest("/road/getRoad_divider" ,{
          "road_code" : this.table_row.road_code
        }).then(resp =>{
          if (resp && resp.status == 200){
            var data = resp.data;
            _this.divider_band_table = data.tabledata[0];
          }
        });
        this.dialogForm4Visible = true;
      },
      facilities_tableshow(index, row){
        console.log(index, row);
        this.table_index = index;
        this.table_row = row;
        var _this = this;

        this.postRequest("/road/getRoad_faclities" ,{
          "road_code" : this.table_row.road_code
        }).then(resp =>{
          if (resp && resp.status == 200){
            var data = resp.data;
            _this.facilities_table = data.tabledata[0];
          }
        });
        this.dialogForm5Visible = true;
      },
      cl(){
        this.dialogTableVisible = false;
      },
      dalycheck(){
        this.drawer = false;
      },
      loadTableData(){
        var _this = this;
        this.getRequest("/rc/dp/c1r").then(resp =>{
          if (resp && resp.status == 200){
            var data = resp.data;
            _this.tableData = data.tableData;
            _this.d_type = data.d_type;
          }
        });
      },
      filterTag(value, row) {
        return row.whether === value;
      },
      onSubmitC1R(form) {  //添加预警方法
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.loadingDialog = true;
            this.dfn.road_code = this.tableData[this.table_index].road_code;
            this.dfn.repair_time = new Date(this.formattingDate(this.dfn.repair_time));
            console.log(this.dfn);
            this.postRequest('/rc/dp/cr/addDFN', this.dfn).then(resp=> {
              this.loadingDialog = false;
              if (resp && resp.status == 200) {
                this.loadTableData();
                this.$message({
                  message: '添加预警成功',
                  type: 'success'
                });
              }else if (resp && (resp.status == 504 || resp.status == 404)) {
                this.$message.error({message: '服务器被吃了⊙﹏⊙∥'});
              }else {
                this.$message.error({message: '未知错误'});
              }
            });
            this.empDfn();
            this.dialogTableVisible = false;
          } else {
            return false;
          }
        });
      },
      onSubmitC2R(form) {  //添加巡逻方法
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.loadingDialog = true;
            this.rp.road_code = this.tableData[this.table_index].road_code;
            this.rp.patrol_date = new Date(this.formattingDate(this.rp.patrol_date));
            console.log(this.rp);
            this.postRequest('/rc/dp/cr/addPR', this.rp).then(resp=> {
              this.loadingDialog = false;
              if (resp && resp.status == 200) {
                this.loadTableData();
                this.$message({
                  message: '本次巡查完毕',
                  type: 'success'
                });
              }else if (resp && (resp.status == 504 || resp.status == 404)) {
                this.$message.error({message: '服务器被吃了⊙﹏⊙∥'});
              }else {
                this.$message.error({message: '未知错误'});
              }
            });
            this.drawer = false;
            this.empRp();
          } else {
            return false;
          }
        });
      },
      exitForm1(){
        this.empRbt();
        this.dialogForm1Visible=false;
      },
      exitForm2(){
        this.empRct();
        this.dialogForm2Visible=false;
      },
      exitForm3(){
        this.empSidewalk_table();
        this.dialogForm3Visible=false;
      },
      exitForm4(){
        this.empDivider_band_table();
        this.dialogForm4Visible=false;
      },
      exitForm5(){
        this.empFacilities_table();
        this.dialogForm5Visible=false;
      },
      empDfn() {
        this.dfn = {
          road_code: '',
          notice_code: '',
          facilities_name: '',
          repair_time: '',
          damage_position: '',
          damage_reason: '',
          opinions: '',
          technical_person_name: '',
          check_person_name: '',
          monitor: '',
          notice_date: ''
        }
      },
      empRp() {
        this.rp = {
          road_code: '',
          woker_code_name: '',
          patrol_date: '',
          d_type: '',
          d_position_description: '',
          remark: '',
          manage_unite: ''
        }
      },
      empRbt(){
        this.rbt = {
          road_name:'',
            design_unite:'',
            road_width_range:'',
            town:'',
            road_code:'',
            construction_unite:'',
            road_length:'',
            manage_sort:'',
            road_trend:'',
            road_class:'',
            road_area:'',
            manage_unite:'',
            road_begin:'',
            pavement_class:'',
            AADT:'',
            maintenance_unite:'',
            road_end:'',
            traffic_class:'',
            build_date:''
        }
      },
      empRct(){
        this.rct = {
          pavement_type: '',
          pavement_thickness: '',
          grassroots_thickness: '',
          grassroots_type: '',
          lanes: '',
          direction: '',
          motorway_width_range: '',
          r_m_w_r: '',
          l_m_w_r: '',
          lane_areas: '',
          lateral_rock_type: '',
          lateral_rock_length: '',
          flat_rock_type: '',
          flat_rock_length: ''
        }
      },
      empSidewalk_table(){
        this.sidewalk_table = {
            pavement_type: '',
            sidewalk_length: '',
            sidewalk_width_range: '',
            sidewalk_areas: '',
            intersection_areas: '',
            blind_length: '',
            accessibility_areas: '',
            greenbelt_areas: '',
            lateral_rock_type: '',
            flat_rock_areas: ''
        }
      },
      empDivider_band_table(){
        this.divider_band_table = {
            divider_type: '',
            length: '',
            width: '',
            height: '',
            areas: ''
        }
      },
      empFacilities_table(){
        this.facilities_table = {
            inlets_amount: '',
            well_amount: '',
            nameplates_amount: '',
            signboards_amount: '',
            treepool_area: '',
            other: ''
        }
      },
      formattingDate(date){
        date= new Date(Date.parse(date));
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        return y+'-'+m+'-'+d;
      }
    }
  }
</script>

<style scoped>
  .toptop {
    position:fixed;
    top: 130px;
    margin-right: -40px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
