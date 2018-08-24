// I need to work on the component. Understand how the props work
Vue.component('nav-tags', {
  props: ['section'],
  template: `
    <nav>
      <ul>
        <li v-for="section in sections" v-bind:key="section.id">{{section.text}}</li>
      </ul>
    </nav>
  `,
  data() {
    return {
      sections: [
        {id: 1, text: "Vanilla JS"},
        {id:2, text: "jQuery"},
        {id: 3, text: "Vue"}
      ]
    }
  }
});


let instnc = new Vue({
    el: "#divContainer",
    data: {
      sections: [
        {text: "Vanilla JS"},
        {text: "jQuery"},
        {text: "Vue"}
      ],

      projects: {
        JavaScript: [
          {
            title: "name here",
            url: "link here",
            git: "link here",
            description: [
              {bullet: "content here"},
              {bullet: "content here"},
              {bullet: "content here"},
              {bullet: "content here"}
            ],
            image1: "link here",
            image2: "link here",
            image3: "link here",
            video: "link here",
            code: "code in script? or iframe? or scrape off the code from page and present?"
          }
        ],
        jQuery: [

        ],
        Vue: [

        ]
      } //End of projects
    }, //End of data
    methods: {
      doSomething: function () {
        console.log("clicked!");
      }
    }
  }
);
