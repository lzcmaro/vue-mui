# vue-mui
Mobile UI elements for Vue 2.0

## Installation
```bash
npm install v-mui --S
```

## Usage

Import all components.

```javascript
import Vue from 'vue';
import VueMUI from 'v-mui';

Vue.use(VueMUI);
```

Or import specified component. 

```javascript
import { Button, List } from 'v-mui';

Vue.component(Button.name, Button);
Vue.component(List.name, List);
```

Import CSS.

```javascript
import 'v-mui/dist/css/vue-mui.css';
```


## Development

 Clone or download this repository

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production with minification
npm run build
```
