<template>
  <div>
    <vui-header fixed>Picker</vui-header>
    <vui-picker :valueGroups="valueGroups" :optionGroups="optionGroups" @click="handleItemClick">
      <div className="weui_cell_bd weui_cell_primary">Hi, {valueGroups.title} {valueGroups.firstName} {valueGroups.secondName}</div>
    </vui-picker>
  </div>
</template>

<script>
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
        }
    }
  },

  methods: {
    handleChange(event) {
      // console.log(event);
    },
    handleItemClick(e,v) {
      console.log('value',v)
      console.log('event',e)
    }
  }
}
</script>
