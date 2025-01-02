import { appFire } from '../../../assets/js/firebase-config.js';
import {
  getFirestore,
  collection,
  onSnapshot,
  updateDoc,
  arrayUnion,
  doc,
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';

export const CategoriesComponent = {
  template: `
   <div class="container mt-4">
      <div class="p-4 mb-3" style="background-color: #FFF; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
        <h1>CATEGORIAS / DEPARTAMENTOS</h1>
          <p class="mb-5">
              Configure aqui os items do slider principal do site e da seção de destaque
              abaixo do slider.
          </p>
      </div>
        
       
        <div class="p-4" style="background-color: #FFF; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
         <p class="mb-2 fst-italic">Categorias atuais da loja</p>
            <div 
              v-for="(category, index) in categoriesName" 
              :key="index" 
              class="d-inline-block text-center me-3 mb-2"
              style="position: relative"
            >
                <!-- Botão para excluir -->
                <button 
                  @click="confirmRemoveCategory(category)" 
                  class="btn btn-sm btn-danger"
                  style="position: absolute; top: -10px; right: -10px; border-radius: 50%; font-size: 10px;"
                >
                  x
                </button>
                <!-- Badge -->
                <span 
                  class="badge"
                  style="background-color: var(--first-color); padding: 10px; font-size: 14px;"
                >
                  {{ category }}
                </span>
            </div>
        </div>
        <div class=" mt-3 p-4" style="background-color: #FFF; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);"" >
            <p class="mb-0 fst-italic">Adicionar nova categoria</p>
            <form class="m-5">
                <div class="mb-3">
                    <label for="name" class="form-label fw-bold">Nome da categoria</label>
                    <input v-model="newCategoryName" type="text" class="form-control" id="name" placeholder="Ex.: Moda Masculina" required>
                </div>
                <button
                    type="button"
                    class="btn btn-success mt-3"
                    :disabled="loading || !newCategoryName"
                    @click="addCategory"
                    >
                    {{ loading ? 'Atualizando...' : 'Atualizar Destaques' }}
                </button>
            </form>
        </div>
    </div>
    `,
  data() {
    return {
      db: getFirestore(appFire),
      collection: 'categories',
      categoriesName: [],
      newCategoryName: '',
      loading: false,
      documentId: 'category_names',
    };
  },

  async mounted() {
    await this.getCategories();
  },
  methods: {
    async getCategories() {
      try {
        onSnapshot(collection(this.db, this.collection), (snapshot) => {
          this.categoriesName = [];
          snapshot.forEach((doc) => {
            const data = doc.data();

            if (Array.isArray(data.name)) {
              this.categoriesName.push(...data.name);
            } else {
              this.categoriesName.push(data.name);
            }
          });
        });
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    },
    confirmRemoveCategory(category) {
      Swal.fire({
        title: `Remover a categoria "${category}"?`,
        text: 'Essa ação não pode ser desfeita!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, remover',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.removeCategory(category);
          Swal.fire(
            'Removido!',
            `A categoria "${category}" foi removida.`,
            'success'
          );
        }
      });
    },

    async removeCategory(categoryToRemove) {
      try {
        const categoryDoc = doc(this.db, 'categories', this.documentId);
        const currentData = this.categoriesName.filter(
          (category) => category !== categoryToRemove
        );

        await updateDoc(categoryDoc, { name: currentData });

        console.log(`Categoria "${categoryToRemove}" removida com sucesso.`);
      } catch (error) {
        console.error('Erro ao remover categoria:', error);
      }
    },

    async addCategory() {
      try {
        await updateDoc(doc(this.db, this.collection, this.documentId), {
          name: arrayUnion(this.newCategoryName),
        });
        Swal.fire(
          'Adicionado!',
          `A categoria "${this.newCategoryName}" foi inserida.`,
          'success'
        );
        this.newCategoryName = '';
      } catch (error) {
        Swal.fire('Atenção!', `Ocorreu um erro: ${error}`, 'error');
      }
    },
  },
};
