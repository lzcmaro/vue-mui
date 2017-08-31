<template>
  <div>
    <vui-header fixed>Picker</vui-header>
    <page-content>
      <p style="margin-top: 0">在校时间：{{beginYear}} 至 {{endYear}}</p>

      <vui-picker @change="handleChangeYears">
        <vui-picker-column :activeKey="beginYear">
          <vui-picker-item v-for="(year, index) in years" :eventKey="year">
            {{year}}
          </vui-picker-item>
        </vui-picker-column>
        <vui-picker-column divider>至</vui-picker-column>
        <vui-picker-column :activeKey="endYear">
          <vui-picker-item v-for="(year, index) in years" :eventKey="year">
            {{year}}
          </vui-picker-item>
        </vui-picker-column>
      </vui-picker>

      <p>地址：{{cityGroups.province[provinceCode]}} - {{cityGroups.city[cityCode]}} - {{cityGroups.area[areaCode]}}</p>
      <vui-button size="small" @click="visibleActionSheet = true">点击选择地址</vui-button>

      <vui-action-sheet :show="visibleActionSheet" :cancelButton="false" @cancel="handleCloseActionSheet">
        <vui-picker :visible-item-count="5" @change="handleChangeAddress">
          <h3 slot="header">Header</h3>
          <vui-picker-column :activeKey="provinceCode">
            <vui-picker-item v-for="(value, key) in cityGroups.province" :eventKey="key">
              {{value}}
            </vui-picker-item>
          </vui-picker-column>
          <vui-picker-column :activeKey="cityCode">
            <vui-picker-item v-for="(value, key) in cityGroups.city" :eventKey="key">
              {{value}}
            </vui-picker-item>
          </vui-picker-column>
          <vui-picker-column :activeKey="areaCode">
            <vui-picker-item v-for="(value, key) in cityGroups.area" :eventKey="key">
              {{value}}
            </vui-picker-item>
          </vui-picker-column>
        </vui-picker>
      </vui-action-sheet>

    </page-content>
  </div>
</template>

<script>
import { cityList } from '../assets/city'
const years = ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017']

export default {
  data() {
    return {
      beginYear: '2008',
      endYear: '2012',
      years,
      visibleActionSheet: false,
      cityGroups: {
        province: cityList['86'],
        city: cityList['450000'],
        area: cityList['451300']
      },
      provinceCode: '450000',
      cityCode: '451300',
      areaCode: '451302'
    }
  },
  methods: {
    handleChangeYears(activeKeys) {
      this.beginYear = activeKeys[0]
      this.endYear = activeKeys[1]
    },
    handleChangeAddress(activeKeys) {
      let cityGroups = this.cityGroups
      // province变化，更新city, area数据
      if (this.provinceCode !== activeKeys[0]) {
        this.provinceCode = activeKeys[0]
        cityGroups.city = cityList[this.provinceCode] || {}
        this.cityCode = Object.keys(cityGroups.city)[0] || ''
        cityGroups.area = cityList[this.cityCode] || {}
        this.areaCode = Object.keys(cityGroups.area)[0] || ''
      }
      // city变化，更新area数据
      else if(this.cityCode !== activeKeys[1]) {
        this.cityCode = activeKeys[1]
        cityGroups.area = cityList[this.cityCode] || {}
        this.areaCode = Object.keys(cityGroups.area)[0] || ''
      }
      else if (this.areaCode !== activeKeys[2]) {
        this.areaCode = activeKeys[2]
      }
    },
    handleCloseActionSheet() {
      this.visibleActionSheet = false
    }
  }
}
</script>

<style lang="less" scoped>
  .picker-header,
  .picker-footer {
    h3 {
      margin: 0;
    }
  }
</style>
