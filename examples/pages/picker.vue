<template>
  <div style="padding-top:44px;">
    <vui-header fixed>Picker</vui-header>
    <vui-picker :valueGroups="valueGroups" :optionGroups="optionGroups" @click="handleItemClick">
    </vui-picker>
    <div style="text-align:center;padding:6px 0;">Hi, {{valueGroups.title}} {{valueGroups.firstName}} {{valueGroups.secondName}}</div>
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
    };
  },

  methods: {
    handleItemClick(option, name) {
      this.valueGroups[name] = option;
      console.log('top parent option:', option);
      console.log('top parent name:', name);
    }
  }
};
</script>
