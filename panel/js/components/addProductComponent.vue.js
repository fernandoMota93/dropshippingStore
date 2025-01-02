import { appFire } from '../../../assets/js/firebase-config.js';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';

export const addProductModal = {
  template: `
    <!-- Modal Structure -->
    <div class="modal fade" id="inputProductModal" tabindex="-1" aria-labelledby="inputProductModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="inputProductModalLabel">Editar Produto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitProductForm" id="submitForm">
              <div class="mb-3">
                <label for="brand" class="form-label">Marca</label>
                <input type="text" class="form-control" id="brand" v-model="product.brand" required>
              </div>
    
              <div class="mb-3">
                <label for="image1" class="form-label">Imagem 1</label>
                <input type="url" class="form-control" id="image1" v-model="product.image1" required>
              </div>
    
              <div class="mb-3">
                <label for="image2" class="form-label">Imagem 2</label>
                <input type="url" class="form-control" id="image2" v-model="product.image2" required>
              </div>
    
              <div class="mb-3">
                <label for="image3" class="form-label">Imagem 3</label>
                <input type="url" class="form-control" id="image3" v-model="product.image3" required>
              </div>
    
              <div class="mb-3">
                <label for="image4" class="form-label">Imagem 4</label>
                <input type="url" class="form-control" id="image4" v-model="product.image4" required>
              </div>
    
              <div class="mb-3">
                <label for="name" class="form-label">Nome do Produto</label>
                <input type="text" class="form-control" id="name" v-model="product.name" required>
              </div>
    
              <div class="mb-3">
                <label for="description" class="form-label">Descrição</label>
                <textarea class="form-control" id="description" rows="3" v-model="product.description" required></textarea>
              </div>
    
              <div class="mb-3">
                <label for="details" class="form-label">Detalhes</label>
                <textarea class="form-control" id="details" rows="3" v-model="product.details" required></textarea>
              </div>
    
              <div class="mb-3">
                <label for="category" class="form-label">Categoria</label>
                <select class="form-select" v-model="product.category" aria-label="Default select example">
                    <option selected disabled>Categoria</option>
                    <option>Tudo</option>
                    <option v-for="(category, index) in categoriesOptions" :key="index" :value="category">
                    {{ category }}
                    </option>
                </select>
              </div>
    
              <div class="mb-3">
                <label for="value" class="form-label">Valor $</label>
                <input type="text" step="0.01" class="form-control" id="value" v-money="{ decimal: ',', thousands: '.' }" v-model="product.value" required>
              </div>

              <div class="mb-3">
                <label for="value" class="form-label">Link de venda</label>
                <input type="text" step="0.01" class="form-control" id="link" v-model="product.link" required>
              </div>
    
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="createProduct">Salvar</button>

                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
        `,
  props: {
    categoriesOptions: {
      type: Array,
    },
    productId: {
      type: String,
      required: false
    },
  },
  data() {
    return {
      product: {},
      db: getFirestore(appFire),
    };
  },
  async mounted() {
    const brandField = document.getElementById('brand').value;

    console.log(brandField)
  },
  methods: {
    async createProduct() {

      try {
        this.product.value = parseInt(
          this.product.value.replace(/[.,]/g, ''),
          10
        );
        const docRef = await addDoc(
          collection(this.db, 'products'),
          this.product
        );

        console.log('Produto adicionado com sucesso:', docRef.id);
        const modal = new bootstrap.Modal(
          document.getElementById('inputProductModal')
        );
        const form = document.getElementById('submitForm');

        modal.hide();
        submitForm.reset();
      } catch (error) {
        console.error('Erro ao adicionar o produto:', error);
      }
    },
  },
};
