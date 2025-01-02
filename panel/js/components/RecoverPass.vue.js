import { appFire } from '../../../assets/js/firebase-config.js';
import {
  getAuth,
  sendPasswordResetEmail,
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';

export const recoverPass = {
  template: `
     <main class="container-recover">
      <div
        class="card animate__animated animate__fadeInDown content "
      >
        <div class="card-body ">
          <div class="container mt-5">
            <h3 class="login100-form-title">Recuperação de Senha</h3>
            <p>Insira o e-mail de acesso ao painel para recuperar a senha</p>
            <form id="resetPasswordForm" class="validate-form">
              <div class="mb-3">
                <div
                  class="wrap-input100 validate-input my-3"
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
                <div class="invalid-feedback">
                  Por favor, insira um email válido.
                </div>
              </div>
              <button
                type="button"
                class="my-5 login100-form-btn"
                id="submit-btn"
                @click="sendMail"
                :disabled="!email"
              >
                RECUPERAR SENHA
              </button>
            </form>
            <div id="statusMessage" class="mb-3"></div>
          </div>
        </div>
      </div>
    </main>
    `,

  data() {
    return {
      email: '',
      auth: getAuth(appFire),
    };
  },

  methods: {
    async sendMail() {
      try {
        await sendPasswordResetEmail(this.auth, this.email);
        Swal.fire(
          'Sucesso!',
          `Um e-mail para recuperação de senha foi enviado.`,
          'success'
        );
      } catch (error) {
        Swal.fire('Erro!', `${error}`, 'danger');
      }
      this.email = '';
    },
  },
};
