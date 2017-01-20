var fs = require('fs');
var render = require('json-templater/string');
var uppercamelcase = require('uppercamelcase');
var path = require('path');

var OUTPUT_PATH = path.join(__dirname, '../../src/index.js');
var IMPORT_TEMPLATE = 'import {{name}} from \'./components/{{package}}\'';
var ISNTALL_COMPONENT_TEMPLATE = '  Vue.component({{name}}.name, {{name}})';
var MAIN_TEMPLATE = `import $ from './utils/NodeList.js'

{{include}}

const install = function(Vue) {
  if (install.installed) return

{{install}}
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = {
  $,
  install,
  version: '{{version}}',
{{list}}
}
`;


var getComponentNames = () => {
  var componentsPath = path.resolve(__dirname, '../../src/components')
  var stats = fs.statSync(componentsPath);
  var componentNames = [], extname;

  if (stats.isDirectory()) {
    fs.readdirSync(componentsPath).forEach(filename => {
      extname = path.extname( filename )
      
      if (fs.statSync(`${componentsPath}/${filename}`).isDirectory()) {
        componentNames.push( filename )
      } else if (extname === '.vue') {
        componentNames.push( filename.replace(extname, '') )
      }
    })
  }

  return componentNames
}

var componentNames = getComponentNames();

var includeComponentTemplate = [];
var installTemplate = [];
var listTemplate = [];

componentNames.forEach(name => {
  var componentName = uppercamelcase(name);

  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentName,
    package: name
  }));

  if ([
  ].indexOf(componentName) === -1) {
    installTemplate.push(render(ISNTALL_COMPONENT_TEMPLATE, {
      name: componentName,
      component: name
    }));
  }

  listTemplate.push(`  ${componentName}`);
});

var template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join('\n'),
  install: installTemplate.join('\n'),
  version: process.env.VERSION || require('../../package.json').version,
  list: listTemplate.join(',\n')
});

fs.writeFileSync(OUTPUT_PATH, template);
console.log('[build entry] DONE:', OUTPUT_PATH);

