<template>
  <div style="padding-top:44px;">
    <vui-header fixed>Picker</vui-header>
    <div style="padding:8px 0;text-align:center;" @click="visibled = !visibled">选择城市: {{defaultCity.province}} - {{defaultCity.city}} - {{defaultCity.area}}</div>
    <vui-picker :valueGroups="valueGroups" :onChange="onChange" :optionGroups="optionGroups" @click="handleItemClick"></vui-picker>
    <div style="text-align:center;padding:6px 0;">Hi, {{valueGroups.title}} {{valueGroups.firstName}} {{valueGroups.secondName}}</div>
    <vui-action-sheet :show="visibled" :cancelButton="true" cancelButtonText="Cancel" @cancel="handleCancel">
      <div style="width:100%;height:200px;z-index:100001;background:#fff;">
        <vui-picker :valueGroups="defaultCity" :onChange="onChange" :optionGroups="cityGroups" @click="handleItemClick"></vui-picker>
      </div>
    </vui-action-sheet>
  </div>
</template>

<script>
import {cityList} from '../assets/city';
export default {
  data() {
    return {
      valueGroups: {
        title: 'Mr.',
        firstName: 'Micheal',
        secondName: 'Jordan'
      },

      optionGroups: {
        title: ['Mr.', 'Mrs.', 'Ms.', 'Dr.'],
        firstName: ['John', 'Micheal', 'Elizabeth'],
        secondName: ['Lennon', 'Jackson', 'Jordan', 'Legend', 'Taylor']
      },

      defaultCity: {
        province: '广西壮族自治区',
        city: '来宾市',
        area: '兴宾区'
      },

      cityGroups: {
        province: Object.values(cityList['86']),
        city: ["南宁市", "柳州市", "桂林市", "梧州市", "北海市", "防城港市", "钦州市", "贵港市", "玉林市", "百色市", "贺州市", "河池市", "来宾市", "崇左市"],
        area: ["兴宾区", "忻城县", "象州县", "武宣县", "金秀瑶族自治县", "合山市"]
      },

      visibled: false,
      provinceKey: null,
      cityKey: null,
      areaKey: null
    };
  },

  methods: {
    onChange(a, b) {
      console.log('city', a);
      console.log('name', b);
      this._updateData(a, b);
    },
    getKeybyValue(object, value) {
      if (object) {
        return Object.keys(object).find(key => object[key] === value);
      }
    },
    handleItemClick(option, name) {
      this._updateData(option, name);
    },
    handleCancel() {
      this.visibled = false;
    },

    _updateData(option, name) {
      this.valueGroups[name] = option;

      if (name === 'province') {
        var provinceKey = this.getKeybyValue(cityList['86'], option);
        this.provinceKey = provinceKey;
        this.cityGroups.city = [];
        if (cityList[provinceKey]) {
          this.cityGroups.city = this.getObjectValues(provinceKey);
          this.defaultCity.city = this.cityGroups.city[0];
          this.defaultCity.area = '';
        }
        this.cityGroups.area = [];
      } else if (name === 'city') {
        var cityKey = this.getKeybyValue(cityList[this.provinceKey], option);
        this.cityGroups.area = [];
        this.cityKey = cityKey;
        if (cityList[this.cityKey]) {
          this.cityGroups.area = this.getObjectValues(this.cityKey);
          this.defaultCity.area = this.cityGroups.area[0];
        }
      }
    },

    getObjectValues(key) {
      return Object.values(cityList[key])
    },

    getObjectKeyByVal(obj,value) {
       return this.getKeybyValue(obj, value)
    }
  }
};

</script>
