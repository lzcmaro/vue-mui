import navs from './navs.json'

const registerRoute = (config) => {
  let routes = []
  config.forEach(nav =>
    nav.list.forEach(page =>
      routes.push({
        name: page.name,
        path: page.path,
        component: require(`./pages${page.path}`),
        meta: {
          title: page.title || page.name,
          description: page.description
        }
      })
    )
  )

  return routes
}

let routes = registerRoute(navs)

routes.push({
  path: '/',
  component: require('./home.vue')
})

export default routes
