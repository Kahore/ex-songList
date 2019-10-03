import Home from './components/Home.vue'
import Artists from './components/Artists.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/About.vue')
  },
  {
    path: '/artists',
    name: 'artists',
    component: Artists
  }
]
