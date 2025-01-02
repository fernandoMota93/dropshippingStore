import {
  getAuth,
  signInWithEmailAndPassword,
  
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';

export const HomeComponent = {
  template: `
      <div>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100" >
          <div class="login100-pic js-tilt" data-tilt>
            <img src="../assets/img/helm.png" alt="IMG" class="invert-image" />
          </div>

          <form class="login100-form validate-form" id="login-form">
            <span class="login100-form-title"> Acesso administrativo </span>

            <div
              class="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                class="input100"
                type="text"
                name="email"
                id="email"
                v-model="email"
                placeholder="Email"
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div
              class="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                class="input100"
                type="password"
                name="pass"
                id="pass"
                v-model="password"
                placeholder="Senha"
              />
              <span class="focus-input100"></span>
              <span class="symbol-input100">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div class="container-login100-form-btn">
              <button type="button" class="login100-form-btn" @click="login" id="login-button">Login</button>
            </div>

            <div class="text-center p-t-12">
              <span class="txt1"> Esqueceu </span>
              <button class="txt2" @click="recoverPass"> Email / Senha? </button>
            </div>

            <div class="text-center p-t-136">
              <!-- <a class="txt2" href="#">
                Create your Account
                <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
              </a> -->
            </div>
          </form>
        </div>
      </div>
    </div>
      </div>
    `,
  data() {
    return {
      email: '',
      password: '',
    };
  },
  mounted() {
    //this.login();
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.$router.push('/slider');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('dasd', errorMessage);
        });
    },
    recoverPass(){
      this.$router.push('/recover')
    }
  },
};
