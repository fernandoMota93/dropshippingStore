import { appFire } from '../../../assets/js/firebase-config.js';
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';
import { addProductModal } from './addProductComponent.vue.js';

export const productsComponent = {
  template: `
    <div class="container mt-4">
    <div style="weight: 100%">
      <addProductModal :categoriesOptions="categoriesOptions"/>
    </div>
      <div class="p-4 mb-3" style="background-color: #FFF; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
        <h1>PRODUTOS</h1>
        <p>Defina os itens de acordo com as categorias da loja.</p>
      </div>

      <!-- FILTROS -->
      <div class="p-4 mb-3" style="background-color: #FFF; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
        <p class="fst-italic">Filtros</p>
        <div class="row">
         <div class="col-6">
          <select class="form-select" v-model="selectedCategory" @change="filterProduct" aria-label="Default select example">
            <option selected disabled>Categoria</option>
            <option>Tudo</option>
            <option v-for="(category, index) in categoriesOptions" :key="index" :value="category">
              {{ category }}
            </option>
          </select>
         </div>
          <div class="col-6">
            <select class="form-select" aria-label="Default select example">
              <option selected disabled>Tipo</option>
              <option value="1">Ativo</option>
              <option value="2">Inativo</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Tabela com Paginator -->
      <div class="p-4 mb-3" style="background-color: #FFF; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); overflow:auto">
        <div class="d-flex justify-content-end mb-2">
            <button class="btn btn-success"  @click="openAddProductModal" ><i class='bx bx-add-to-queue'></i> Adicionar produto</button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Ações</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Status</th>
              <th>Link da venda</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in paginatedProducts" :key="product.id">
              <td>{{ index + 1 }}</td>
              <td>
                <button class="btn-action warning" @click="emitProduct(product)"><i class='bx bxs-edit'></i></button>
                <button v-if="product.active" class="btn-action danger" @click="disableProduct(product)"><i class='bx bxs-trash'></i></button>
                <button v-else class="btn-action" style="color: green" @click="reactiveProduct(product)"><i class='bx bx-sync'></i></button>

              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.active ? 'Ativo' : 'Inativo' }}</td>
              <td><a :href="product.link" target="_blank" rel="noopener noreferrer">{{ product.link }}</a></td>
              <td>{{ (product.value / 100).toFixed(2) }}</td>
            </tr>
          </tbody>
         
        </table>
        <div v-if="isEmpty">
            <div class="alert alert-warning" role="alert">
              <h4 class="alert-heading">Atenção!</h4>
              <p>Não existe dados para a categoria selecionada.</p>
              <hr>
              <p class="mb-0">Escolha outra categoria.</p>
            </div>
        </div>
        <!-- Paginator -->
        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" @click="changePage(currentPage - 1)">Anterior</a>
            </li>
            <li v-for="n in totalPages" :key="n" class="page-item" :class="{ active: n === currentPage }">
              <a class="page-link" @click="changePage(n)">{{ n }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" @click="changePage(currentPage + 1)">Próxima</a>
            </li>
          </ul>
        </nav>
      </div>

    <!-- Modal Structure -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModal" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModal">Editar Produto</h5>
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
                <button type="button" class="btn btn-primary" @click="updateProduct">Atualizar</button>

                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>

   
  `,
  components: {
    addProductModal,
  },
  data() {
    return {
      db: getFirestore(appFire),
      collection: ['products', 'categories'],
      products: [],
      product: {},
      categoriesOptions: [],
      selectedCategory: 'Tudo',
      paginatedProducts: [],
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0,
      totalPages: 0,
      isEmpty: false,
      editModal: '',
    };
  },

  async mounted() {
    await this.fetchProducts();
    await this.getCategories();
  },
  methods: {
    async fetchProducts() {
      try {
        onSnapshot(collection(this.db, this.collection[0]), (snapshot) => {
          this.products = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log(this.products);
          this.totalItems = this.products.length;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.updatePagination();

          this.isEmpty = this.totalItems === 0;
        });
      } catch (error) {
        console.log('erro', error);
      }
    },
    updatePagination() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.paginatedProducts = this.products.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.updatePagination();
    },

    async getCategories() {
      try {
        onSnapshot(collection(this.db, this.collection[1]), (snapshot) => {
          this.categoriesOptions = snapshot.docs
            .map((doc) => doc.data().name)
            .flat();
          console.log(this.categoriesOptions);
        });
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    },

    async filterProduct() {
      if (this.selectedCategory == 'Tudo') {
        return this.fetchProducts();
      }
      try {
        this.products = [];
        const productsQuery = query(
          collection(this.db, this.collection[0]),
          where('category', '==', this.selectedCategory)
        );

        onSnapshot(productsQuery, (snapshot) => {
          this.products = snapshot.docs.map((doc) => doc.data());
          this.totalItems = this.products.length;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.updatePagination();

          this.isEmpty = this.totalItems === 0;
        });
      } catch (error) {
        console.log('Erro ao filtrar produtos:', error);
      }
    },
    async disableProduct(product) {
      Swal.fire({
        title: `Parar de anunciar "${product.name}"?`,
        text: 'Essa ação pode ser desfeita!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, parar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.setDisabled(product);
          Swal.fire(
            'Parado!',
            `O produto "${product.name}" está oculto agora.`,
            'success'
          );
        }
      });
    },
    async reactiveProduct(product) {
      console.log(product);
      Swal.fire({
        title: `Voltar a anunciar "${product.name}"?`,
        text: 'Essa ação pode ser desfeita!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.setEnabled(product);
          Swal.fire(
            'Ativo!',
            `O produto "${product.name}" está aparecendo agora.`,
            'success'
          );
        }
      });
    },
    async setEnabled(productToEnable) {
      try {
        const categoryDoc = doc(this.db, 'products', productToEnable.id);

        await updateDoc(categoryDoc, { active: true });

        console.log(`Produto "${productToEnable}" pausado com sucesso.`);
      } catch (error) {
        console.error('Erro ao remover produto:', error);
      }
    },
    async setDisabled(productToDisable) {
      try {
        const categoryDoc = doc(this.db, 'products', productToDisable.id);

        await updateDoc(categoryDoc, { active: false });

        console.log(`Produto "${productToDisable}" pausado com sucesso.`);
      } catch (error) {
        console.error('Erro ao remover produto:', error);
      }
    },
    openAddProductModal() {
      const modal = new bootstrap.Modal(
        document.getElementById('inputProductModal')
      );
      modal.show();
    },
    emitProduct(payload) {
      const modal = new bootstrap.Modal(document.getElementById('editModal'));
      this.editModal = modal
      this.editModal.show();


      this.product = payload;

      console.log(this.product);
    },
    async updateProduct() {
      try {
        this.product.value = parseInt(
          this.product.value.replace(/[.,]/g, ''),
          10
        );
        const categoryDoc = doc(this.db, 'products', this.product.id);

        await updateDoc(categoryDoc, this.product);
        Swal.fire(
          'Feito!',
          `O produto "${this.product.name}" foi atualizado.`,
          'success'
        );
        this.editModal.hide();

      } catch (error) {
        Swal.fire('Erro!', `${error}`, 'danger');
      }
    },
  },
};
