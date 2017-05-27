<template>
  <div style="padding-top:44px;">
      <vui-header fixed>Picker</vui-header>
      <div style="padding:8px 0;text-align:center;" @click="visibled = !visibled">选择城市: {{defaultCity.province.value}} - {{defaultCity.city.value}} - {{defaultCity.area.value}}</div>
      <vui-picker>
          <vui-picker-column @click="handleItemClick" :columnHeight="height" :itemHeight="itemHeight" :onChange="onChange" :options="optionGroups.firstName">
              <vui-picker-item :onChange="onChange" v-for="option in optionGroups.firstName" :option="option" :options="optionGroups.firstName" :itemHeight="itemHeight" :value='valueGroups.firstName'>
                  {{option}}
              </vui-picker-item>
          </vui-picker-column>
          <vui-picker-column @click="handleItemClick" :columnHeight="height" :itemHeight="itemHeight" :onChange="onChange" :options="optionGroups.firstName">
              <vui-picker-item :onChange="onChange" v-for="option in optionGroups.secondName" :option="option" :itemHeight="itemHeight" :value='valueGroups.secondName'>
                  {{option}}
              </vui-picker-item>
          </vui-picker-column>
      </vui-picker>
      <div style="text-align:center;padding:6px 0;">Hi, {{valueGroups.title}} {{valueGroups.firstName}} {{valueGroups.secondName}}</div>

      <vui-action-sheet :show="visibled" :cancelButton="true" cancelButtonText="Cancel" @cancel="handleCancel">
          <div style="width:100%;height:200px;z-index:100001;background:#fff;">
              <vui-picker @click="handleItemClick">
                  <vui-picker-column @click="handleItemClick" :columnHeight="height" :itemHeight="itemHeight" :onChange="onChange" :options="cityGroups.province">
                      <vui-picker-item :onChange="onChange" v-for="option in cityGroups.province" :option="option" :itemHeight="itemHeight" :value="defaultCity.province">
                          {{option.value}}
                      </vui-picker-item>
                  </vui-picker-column>
                  <vui-picker-column @click="handleItemClick" :columnHeight="height" :itemHeight="itemHeight" :onChange="onChange" :options="cityGroups.city">
                      <vui-picker-item :onChange="onChange" v-for="option in cityGroups.city" :option="option" :itemHeight="itemHeight" :value="defaultCity.city">
                          {{option.value}}
                      </vui-picker-item>
                  </vui-picker-column>
              </vui-picker>
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
        province: {
          key: '450000',
          value: '广西壮族自治区'
        },
        city: {
          key: '451300',
          value: '来宾市',
        },
        area: {
          key: '451302',
          value: '兴宾区'
        }
      },

      cityGroups: {
        province: this.generateKeyValueObj(cityList['86']),
        city: this.generateKeyValueObj(cityList['450000']),
        area: this.generateKeyValueObj(cityList['451300'])
      },
      itemHeight: 36,
      height: 216,
      visibled: false,
      provinceKey: null,
      cityKey: null,
      areaKey: null
    };
  },

  methods: {
    generateKeyValueObj(o) {
      var p = []
      for(var k in o){
        p.push({
          'key': k,
          'value': o[k]
        })
      }
      return p
    },

    onChange(e) {
      console.log('Index___________', e)
      // this.valueGroups.firstName = this.optionGroups.firstName[e]
      // this.valueGroups.secondName = this.optionGroups.secondName[e]
    },
    getKeybyValue(object, value) {
      if (object) {
        return Object.keys(object).find(key => object[key] === value);
      }
    },
    handleItemClick(event) {
      console.log('click event', event.target)

      //this._updateData(option, name);
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
