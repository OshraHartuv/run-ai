import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CompView from '../views/compView.vue';
import EmpApp from '../components/emp/EmpApp.vue';
import DepApp from '../components/dep/DepApp.vue';
import EmpEdit from '../components/emp/EmpEdit.vue';
import DepEdit from '../components/dep/DepEdit.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/comp/:id',
            name: 'comp',
            component: CompView,
            children: [
                {
                    path: 'emp',
                    name: 'empApp',
                    component: EmpApp,
                    children: [
                        { path: 'edit', name: 'empEdit', component: EmpEdit },
                    ],
                },
                { path: 'dep', name: 'depApp', component: DepApp,
                children: [
                    { path: 'edit', name: 'depEdit', component: DepEdit },
                ], },
            ],
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
