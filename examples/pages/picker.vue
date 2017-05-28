<template>
  <div style="padding-top:44px;">
      <vui-header fixed>Picker</vui-header>
      <div style="padding:8px 0;text-align:center;" @click="visibled = !visibled">选择城市: {{defaultCity.province.value}} - {{defaultCity.city.value}} - {{defaultCity.area.value}}</div>
      <vui-picker>

        <vui-picker-column @click="handleItemClick" :name="Object.keys(optionGroups)[0]" :columnHeight="height" :itemHeight="itemHeight" :onChange="onChange" :value='valueGroups.title' :options="optionGroups.title">
            <vui-picker-item :onChange="onChange" :index="index" v-for="(option,index) in optionGroups.title" :option="option">
                {{option }}
           </vui-picker-item>
        </vui-picker-column>

          <vui-picker-column @click="handleItemClick" :name="Object.keys(optionGroups)[1]" :columnHeight="height" :itemHeight="itemHeight" :onChange="onChange" :value='valueGroups.firstName' :options="optionGroups.firstName">
              <vui-picker-item :onChange="onChange" :index="index" v-for="(option,index) in optionGroups.firstName" :option="option">
                  {{option}}
              </vui-picker-item>
          </vui-picker-column>
          <vui-picker-column @click="handleItemClick" :name="Object.keys(optionGroups)[2]" :columnHeight="height" :itemHeight="itemHeight" :value='valueGroups.secondName' :onChange="onChange" :options="optionGroups.secondName">
              <vui-picker-item :index="index" v-for="(option,index) in optionGroups.secondName" :option="option">
                  {{option}}
              </vui-picker-item>
          </vui-picker-column>
      </vui-picker>
      <div style="text-align:center;padding:6px 0;">Hi, {{valueGroups.title}} {{valueGroups.firstName}} {{valueGroups.secondName}}</div>

      <vui-action-sheet :show="visibled" :cancelButton="true" cancelButtonText="Cancel" @cancel="handleCancel">
          <div style="width:100%;height:200px;z-index:100001;background:#fff;">
              <vui-picker>
                  <vui-picker-column @click="handleItemClick" :name="Object.keys(cityGroups)[0]" :columnHeight="height" :itemHeight="itemHeight" :value="defaultCity.province" :onChange="onChange" :options="cityGroups.province">
                      <vui-picker-item v-for="(option,index) in cityGroups.province" :index="index" :option="option">
                          {{option.value}}
                      </vui-picker-item>
                  </vui-picker-column>
                  <vui-picker-column @click="handleItemClick" :columnHeight="height" :name="Object.keys(cityGroups)[1]" :itemHeight="itemHeight" :value="defaultCity.city" :onChange="onChange" :options="cityGroups.city">
                      <vui-picker-item v-for="(option,index) in cityGroups.city" :index="index" :option="option">
                          {{option.value}}
                      </vui-picker-item>
                  </vui-picker-column>
                  <vui-picker-column @click="handleItemClick" :columnHeight="height" :name="Object.keys(cityGroups)[2]" :itemHeight="itemHeight" :value="defaultCity.area" :onChange="onChange" :options="cityGroups.area">
                      <vui-picker-item v-for="(option,index) in cityGroups.area" :index="index" :option="option">
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
          value: '来宾市'
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
      var p = [];
      for (var k in o) {
        p.push({
          key: k,
          value: o[k]
        });
      }
      return p;
    },

    onChange(index, name) {
      this._updateData(index, name);
    },

    getKeybyValue(object, value) {
      if (object) {
        return Object.keys(object).find(key => object[key] === value);
      }
    },

    _updateData(index, name) {
      console.log('index:', index);
      console.log('name:', name);

      if (name === 'province' || name === 'city' || name === 'area') {
        this.defaultCity[name] = this.cityGroups[name][index];
        let key = this.cityGroups[name][index].key;
        let data = this.generateKeyValueObj(cityList[key]);

        if (name === 'province') {
          this.cityGroups.city = data;
          this.cityGroups.area = data.length
            ? this.generateKeyValueObj(cityList[data[0].key])
            : [
              {
                key: '',
                value: ''
              }
            ];

          this.defaultCity.area = this.cityGroups.area.length
            ? this.cityGroups.area[0]
            : {key: '', value: ''};
          this.defaultCity.city = data.length
            ? data[0]
            : {
              key: '',
              value: ''
            };
        }
        if (name === 'city') {
          this.cityGroups.area = data;
          this.defaultCity.area = data.length
            ? data[0]
            : {
              key: '',
              value: ''
            };
        }
      } else {
        this.valueGroups[name] = this.optionGroups[name][index];
      }
    },

    handleItemClick(event, name) {
      console.log('event:', event);
      console.log('name:', name);
      var index = event.target.getAttribute('index');
      this._updateData(index, name);
    },

    handleCancel() {
      this.visibled = false;
    }
  }
};
</script>
