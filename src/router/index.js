import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import compView from '../views/compView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/comp:id?',
            name: 'comp',
            component: compView,
        },
        // {
        //     path: '/comp/emp/:id?',
        //     name: 'comp',
        //     component: compView,
        // },
        // {
        //     path: '/comp/dep/:id?',
        //     name: 'comp',
        //     component: compView,
        // },
    ],
});

export default router;
