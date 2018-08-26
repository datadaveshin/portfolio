Vue.component('nav-tags', {
  props: ['section'],
  template: `
    <nav>
      <ul>
        <li
        v-for="section in sections"
        v-bind:key="section.id"
        v-bind:name="section.text">
          {{section.text}}
        </li>
      </ul>
    </nav>
  `,
  data() {
    return {
      sections: [
        {id: 1, text: "Vanilla"},
        {id:2, text: "Vue"},
        {id: 3, text: "jQuery"}
      ]
    }
  }
});


let instnc = new Vue({
    el: "#divContainer",
    data: {
      sections: [
        {text: "Vanilla"},
        {text: "Vue"},
        {text: "jQuery"}
      ],
      
      active: [
          {vanilla: true},
          {vue: false},
          {jQuery: false}
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
        Vue: [

        ],
        jQuery: [

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
