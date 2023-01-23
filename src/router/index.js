import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView";
import AdministrationView from "@/views/AdministrationView";
import TradingView from "@/views/TradingView";

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin',
    name: 'administration',
    component: AdministrationView
  },
  {
    path: '/trade',
    name: 'trading',
    component: TradingView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
