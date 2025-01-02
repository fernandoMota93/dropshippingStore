

export const AboutComponent = {
    template: `
      <div>
        <h1>About Component</h1>
        <p>{{ message }}</p>
        <input v-model="message" placeholder="Edit me">
      </div>
    `,
    data() {
      return {
        message: 'Hello, Vue!',
      };
    },
  };