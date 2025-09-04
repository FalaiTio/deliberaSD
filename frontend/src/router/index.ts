import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import Urna from '@/views/Urna.vue';
import Resultado from '@/views/Resultado.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home, // Ou redirecione para /votacao se Home for desnecessário
    },
    {
        path: '/votacao',
        name: 'Votacao',
        component: Urna,
    },
    {
        path: '/resultado',
        name: 'Resultado',
        component: Resultado,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;