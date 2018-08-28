Vue.component('nav-tags', {
  props: ['section'],
  template: `
    <nav>
      <ul>
        <li
        v-for="section in sections"
        v-bind:key="section.id"
        v-bind:name="section.text"
        v-on:click="styleChange($event)">
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
  },
  methods: {
    styleChange: function(event) {
      console.log(event.target.getAttribute("name"));
      let attr = event.target.getAttribute("name");
      let activeTag = app.$data.active;
      activeTag.forEach(function(el) {
        for (let key in el){
          console.log("key is", key, "and attr is", attr);
          key === attr ? el[key] = true : el[key] = false;
        }
      });
    }
  }
});


let app = new Vue({
    el: "#divContainer",
    data: {
      active: [
          {Vanilla: false},
          {Vue: false},
          {jQuery: true}
      ],
      sections: [
        {text: "Vanilla"},
        {text: "Vue"},
        {text: "jQuery"}
      ],


      projects: {
        Vanilla: [
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
