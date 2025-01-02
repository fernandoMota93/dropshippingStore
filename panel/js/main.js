import { appFire } from '../../assets/js/firebase-config.js';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';

import { HomeComponent } from './components/Home.vue.js';
import { AboutComponent } from './components/About.vue.js';
import { SliderComponent } from './components/Slider.vue.js';
import { CategoriesComponent } from './components/Categories.vue.js';
import { productsComponent } from './components/Products.vue.js';
import { recoverPass } from './components/RecoverPass.vue.js';


// Definir rotas
const routes = [
  { path: '/', component: HomeComponent },
  { path: '/about', component: AboutComponent },
  { path: '/slider', component: SliderComponent },
  { path: '/categories', component: CategoriesComponent },
  { path: '/products', component: productsComponent },
  { path: '/recover', component: recoverPass },
];

// Configurar Vue Router
const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth(appFire);

  // Permitir acesso à rota '/recover' sem autenticação
  if (to.path === '/recover') {
    next();
  } 
  // Bloquear rotas protegidas para usuários não autenticados
  else if (!auth.currentUser && to.path !== '/') {
    next('/');
  } 
  // Permitir navegação para outras rotas
  else {
    next();
  }
});


// Instância principal do Vue
const app = new Vue({
  el: '#app',
  router,
  template: `
      <div>
        <div id="body-pd">
        <header class="header" id="header"  v-show="user">
          <div class="header_toggle">
            <i class="bx bx-menu" id="header-toggle"></i>
          </div>
          <div class="header_img">
            <img src="../../assets/img/avatar.jpg" alt="" />
          </div>
        </header>
        <div class="l-navbar" id="nav-bar"  v-show="user">
          <nav class="nav">
            <div>
              <a href="#" class="nav_logo">
                <i class="bx bx-layer nav_logo-icon"></i>
                <span class="nav_logo-name">Gambatte Shop</span>
              </a>
              <div class="nav_list">
                <router-link v-if="!user" to="/" class="nav_link active">
                  <i class="bx bx-home nav_icon"></i>
                  <span class="nav_name">Home</span>
                </router-link>
                <router-link to="/slider" class="nav_link">
                  <i class="bx bx-images nav_icon"></i>
                  <span class="nav_name">Slider/Destaques</span>
                </router-link>
                <router-link to="/categories" class="nav_link">
                  <i class="bx bx-grid-alt nav_icon"></i>
                  <span class="nav_name">Categorias</span>
                </router-link>
                <router-link to="/products" class="nav_link">
                  <i class='bx bxs-store-alt' ></i>
                  <span class="nav_name">Loja/Produtos</span>
                </router-link>
                <router-link to="/about" class="nav_link">
                  <i class="bx bx-message-square-detail nav_icon"></i>
                  <span class="nav_name">About</span>
                </router-link>
              </div>
            </div>
            <button @click="signOutEvent" class="nav_link" style="text-decorantion: none; background-color: #00000000; border: none" >
              <i class="bx bx-log-out nav_icon"></i>
              <span class="nav_name">SignOut</span>
            </button>
          </nav>
        </div>
        <router-view></router-view>
      </div>
      <footer class="footer">
        <div class="footer-content">
          <p>© 2024 Gambatte Shop. Todos os direitos reservados.</p>
          <p>Desenvolvido com ódio por Fernando Mota.</p>
        </div>
      </footer>
    </div>
  `,
  data() {
    return {
      user: null,
    };
  },

  async mounted() {
    await this.userState();
    console.log(this.user);
  },
  methods: {
    signOutEvent() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log('Sign-out successful.');
        })
        .catch((error) => {
          console.error('Sign-out error:', error);
        });
    },
    async userState() {
      const auth = await getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          const uid = user.uid;
          console.log('sdasds', uid);
         return this.$router.push('/slider');
        } else {
         return this.$router.push('/');
        }
      });
    },
  },
});
