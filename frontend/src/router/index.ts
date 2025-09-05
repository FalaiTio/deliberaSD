import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import Urna from '@/views/Urna.vue';
import Resultado from '@/views/Resultado.vue';

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/votacao', name: 'Votacao', component: Urna, meta: {requiresAuth: true}},
    {path: '/resultado', name: 'Resultado', component: Resultado},
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// Guardar rota (para exigir verificação)
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('cpfValido')) {
        next('/');
    } else {
        next();
    }
});

export default router;