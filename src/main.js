import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/styles.scss';
import Notifications from '@kyvg/vue3-notification';

const app = createApp(App)

app.use(router)
app.use(store);
app.directive('click-outside', {
    mounted(el, binding) {
        el.clickOutsideEvent = function (event) {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event, el);
            } 
        };
        setTimeout(()=>{
            document.body.addEventListener('click', el.clickOutsideEvent);

        },0)
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
});
app.use(ElementPlus);
app.use(Notifications)


app.mount('#app')
