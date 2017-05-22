import navs from './navs.json'

const registerRoute = (config) => {
  let routes = []
  config.forEach(nav =>
    nav.list.forEach(page => {
      try {
        routes.push({
          name: page.name,
          path: page.path,
          component: require(`./pages${page.path}`),
          meta: {
            title: page.title || page.name,
            description: page.description
          }
        })
      } catch (e) {}
    })
  )

  return routes
}

let routes = registerRoute(navs)

routes.push({
  path: '/',
  component: require('./home.vue')
})

export default routes
