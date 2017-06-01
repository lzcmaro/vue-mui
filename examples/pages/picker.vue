<template>
  <div>
    <vui-header fixed>Picker</vui-header>
    <page-content>
      <vui-picker :visible-item-count="5" @change="handleChange">
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
      <p>在校时间：{{beginYear}} 至 {{endYear}}</p>
    </page-content>
  </div>
</template>

<script>
// import { cityList } from '../assets/city'
const years = ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017']

export default {
  data() {
    return {
      beginYear: '2008',
      endYear: '2012',
      years
    }
  },
  methods: {
    handleChange(activeKeys) {
      this.beginYear = activeKeys[0]
      this.endYear = activeKeys[1]
    }
  }
}
</script>
