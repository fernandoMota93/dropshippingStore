import { appFire } from '../../../assets/js/firebase-config.js';
import {
  getFirestore,
  collection,
  onSnapshot,
  updateDoc,
  doc,
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';

export const SliderComponent = {
  template: `
<div class="container mt-4">
  <div class="p-4 mb-3" style="background-color: #FFF; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
    <h1 class="text-uppercase">Slider principal & destaques</h1>
    <p>
      Configure aqui os items do slider principal do site e da seção de destaque
      abaixo do slider.
    </p>
  </div>
  
  <div class="p-4 mb-3" style="background-color: #FFF; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
    <h2>Gerenciar Slider principal</h2>
      <div class="alert alert-warning" role="alert">
        Procura usar mídias com proporção 1:1. Exemplo: 800 x 800 px
      </div>
      <form id="carouselForm">
        <div class="accordion mb-3" id="carouselAccordion">
          <!-- Section 1 -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="carouselHeadingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#carouselCollapseOne"
                aria-expanded="false"
                aria-controls="carouselCollapseOne"
              >
                Primeiro Slide
              </button>
            </h2>
            <div
              id="carouselCollapseOne"
              class="accordion-collapse collapse"
              aria-labelledby="carouselHeadingOne"
              data-bs-parent="#carouselAccordion"
              style="width: inherit"
            >
              <div class="accordion-body">
                <div class="mb-3">
                  <label for="sliderImage1" class="form-label"
                    >URL da Imagem 1</label
                  >
                  <input
                    type="text"
                    v-model="slider.sliderImage1"
                    class="form-control"
                    placeholder="Insira a URL da imagem"
                  />
                </div>
                <div class="mb-3">
                  <label for="title1" class="form-label">Título da imagem</label>
                  <input
                    type="text"
                    v-model="slider.title1"
                    class="form-control"
                    placeholder="Escreva um título para a imagem 1"
                  />
                </div>
                <div class="mb-3">
                  <label for="description1" class="form-label"
                    >Descrição de marketing</label
                  >
                  <input
                    type="text"
                    v-model="slider.description1"
                    class="form-control"
                    placeholder="Escreva uma descrição"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Section 2 -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="carouselHeadingTwo">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#carouselCollapseTwo"
                aria-expanded="false"
                aria-controls="carouselCollapseTwo"
              >
                Segundo Slide
              </button>
            </h2>
            <div
              id="carouselCollapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="carouselHeadingTwo"
              data-bs-parent="#carouselAccordion"
              style="width: inherit"
            >
              <div class="accordion-body">
                <div class="mb-3">
                  <label for="sliderImage2" class="form-label"
                    >URL da Imagem 2</label
                  >
                  <input
                    type="text"
                    v-model="slider.sliderImage2"
                    class="form-control"
                    placeholder="Insira a URL da imagem"
                  />
                </div>
                <div class="mb-3">
                  <label for="title2" class="form-label">Título da imagem</label>
                  <input
                    type="text"
                    v-model="slider.title2"
                    class="form-control"
                    placeholder="Escreva um título para a imagem 2"
                  />
                </div>
                <div class="mb-3">
                  <label for="description2" class="form-label"
                    >Descrição de marketing</label
                  >
                  <input
                    type="text"
                    v-model="slider.description2"
                    class="form-control"
                    placeholder="Escreva uma descrição"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Section 3 -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="carouselHeadingThree">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#carouselCollapseThree"
                aria-expanded="false"
                aria-controls="carouselCollapseThree"
              >
                Terceiro Slide
              </button>
            </h2>
            <div
              id="carouselCollapseThree"
              class="accordion-collapse collapse"
              aria-labelledby="carouselHeadingThree"
              data-bs-parent="#carouselAccordion"
              style="width: inherit"
            >
              <div class="accordion-body">
                <div class="mb-3">
                  <label for="sliderImage3" class="form-label"
                    >URL da Imagem 3</label
                  >
                  <input
                    type="text"
                    v-model="slider.sliderImage3"
                    class="form-control"
                    placeholder="Insira a URL da imagem"
                  />
                </div>
                <div class="mb-3">
                  <label for="title3" class="form-label">Título da imagem</label>
                  <input
                    type="text"
                    v-model="slider.title3"
                    class="form-control"
                    placeholder="Escreva um título para a imagem 3"
                  />
                </div>
                <div class="mb-3">
                  <label for="description3" class="form-label"
                    >Descrição de marketing</label
                  >
                  <input
                    type="text"
                    v-model="slider.description3"
                    class="form-control"
                    placeholder="Escreva uma descrição"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="loading"
          @click="addSliderImages"
        >
          {{ loading ? 'Atualizando...' : 'Atualizar Slider' }}
        </button>
      </form>
  </div>
  

  <hr />
  <div class="p-4 mb-3" style="background-color: #FFF; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
    <h2>Gerenciar "Destaques"</h2>
    <form id="productForm">
      <div class="accordion" id="productAccordion">
        <!--Section 1-->
        <div class="accordion-item">
          <h2 class="accordion-header" id="productHeadingOne">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#productCollapseOne"
              aria-expanded="false"
              aria-controls="productCollapseOne"
            >
              Destaque 1
            </button>
          </h2>
          <div
            id="productCollapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="productHeadingOne"
            data-bs-parent="#productAccordion"
            style="width: inherit"
          >
            <div class="accordion-body">
              <div class="mb-3">
                <label for="productName1" class="form-label"
                  >Nome do Produto</label
                >
                <input
                  type="text"
                  v-model="highlights.name1"
                  class="form-control"
                  placeholder="Nome do produto"
                />
              </div>
              <div class="mb-3">
                <label for="productImage1" class="form-label"
                  >URL da Imagem</label
                >
                <input
                  type="text"
                  v-model="highlights.image1"
                  class="form-control"
                  placeholder="URL da imagem"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="productDescription1" class="form-label"
                  >Descrição do produto</label
                >
                <input
                  type="text"
                  v-model="highlights.description1"
                  class="form-control"
                  placeholder="Descreva o produto"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <!--Section 2-->
        <div class="accordion-item">
          <h2 class="accordion-header" id="productHeadingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#productCollapseTwo"
              aria-expanded="false"
              aria-controls="productCollapseTwo"
            >
              Destaque 2
            </button>
          </h2>
          <div
            id="productCollapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="productHeadingTwo"
            data-bs-parent="#productAccordion"
            style="width: inherit"
          >
            <div class="accordion-body">
              <div class="mb-3">
                <label for="productName2" class="form-label"
                  >Nome do Produto</label
                >
                <input
                  type="text"
                  v-model="highlights.name2"
                  class="form-control"
                  placeholder="Nome do produto"
                />
              </div>
              <div class="mb-3">
                <label for="productImage2" class="form-label"
                  >URL da Imagem</label
                >
                <input
                  type="text"
                  v-model="highlights.image2"
                  class="form-control"
                  placeholder="URL da imagem"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="productDescription2" class="form-label"
                  >Descrição do produto</label
                >
                <input
                  type="text"
                  v-model="highlights.description2"
                  class="form-control"
                  placeholder="Descreva o produto"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <!--Section 3-->
        <div class="accordion-item">
          <h2 class="accordion-header" id="productHeadingThree">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#productCollapseThree"
              aria-expanded="false"
              aria-controls="productCollapseThree"
            >
              Destaque 3
            </button>
          </h2>
          <div
            id="productCollapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="productHeadingThree"
            data-bs-parent="#productAccordion"
            style="width: inherit"
          >
            <div class="accordion-body">
              <div class="mb-3">
                <label for="productName3" class="form-label"
                  >Nome do Produto</label
                >
                <input
                  type="text"
                  v-model="highlights.name3"
                  class="form-control"
                  placeholder="Nome do produto"
                />
              </div>
              <div class="mb-3">
                <label for="productImage3" class="form-label"
                  >URL da Imagem</label
                >
                <input
                  type="text"
                  v-model="highlights.image3"
                  class="form-control"
                  placeholder="URL da imagem"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="productDescription3" class="form-label"
                  >Descrição do produto</label
                >
                <input
                  type="text"
                  v-model="highlights.description3"
                  class="form-control"
                  placeholder="Descreva o produto"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="btn btn-success mt-3"
        :disabled="loading"
        @click="addHighlights"
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
      slider: {},
      highlights: {},
      sliderIds: ['slider1', 'slider2', 'slider3'],
      highlightsIds: ['highlight1', 'highlight2', 'highlight3'],
      loading: false
    };
  },
  async mounted() {
    await this.getDocs();
  },
  methods: {
    async getDocs() {
      try {
        onSnapshot(collection(this.db, 'carousel'), (snapshot) => {
        let index = 0
          snapshot.forEach((doc) => {
            const data = doc.data();
            console.log('data', data);
            this.slider[`title${index + 1}`] = data.title

          });
          index++
        });
      } catch (error) {
        console.log('erro', error);
      }
    },
    async addSliderImages() {
      this.loading = true;
      try {
        for (let i = 0; i < this.sliderIds.length; i++) {
          await updateDoc(doc(this.db, 'carousel', this.sliderIds[i]), {
            image: this.slider[`sliderImage${i + 1}`],
            title: this.slider[`title${i + 1}`],
            description: this.slider[`description${i + 1}`],
          });
        }
        Swal.fire({
          icon: "success",
          title: "Slider atualizado",
          text: "Recarregue a página para visualizar.",
        });
        this.loading = false;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erro ao atualizar slider",
          text: error.message,
        });
        this.loading = false;
      }
    },
    async addHighlights() {
        this.loading = true;
        try {
          for (let i = 0; i < this.highlightsIds.length; i++) {
            await updateDoc(doc(this.db, 'highlights', this.highlightsIds[i]), {
              image: this.highlights[`image${i + 1}`],
              name: this.highlights[`name${i + 1}`],
              description: this.highlights[`description${i + 1}`],
            });
          }
          Swal.fire({
            icon: "success",
            title: "Destaques atualizados",
            text: "Recarregue a página para visualizar.",
          });
          this.loading = false;
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Erro ao atualizar Destaques",
            text: error.message,
          });
          this.loading = false;
        }
      },
  },
};
