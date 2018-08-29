let navTag = Vue.component('nav-tags', {
  props: ['section'],
  template: `
    <nav>
      <ul>
        <span v-for="section in sections">
          <li v-if="section.active" style="color: black;">{{section.text}}</li>
          <li
          v-else>
            <a
            v-bind:key="section.id"
            v-bind:name="section.text"
            v-on:click="styleChange($event)"
            >{{section.text}}</a>
          </li>
        </span>
      </ul>
    </nav>
  `,
  data: function() {
    return {
      sections: [
        {id: 1, text: "Vanilla", active: true},
        {id:2, text: "Vue", active: false},
        {id: 3, text: "jQuery", active: false}
      ]
    }
  },
  methods: {
    styleChange: function(event) {
      let sectionsActiveArr = this.sections;
      let attr = event.target.getAttribute("name");
      let activeTag = app.$data.active;

      //Change the property "active" in the "sections" array of the Vue component's data
      sectionsActiveArr.forEach(function(el) {
        el.text === attr ? el.active = true : el.active = false;
      });

      //Change the properties in the "active" array (within data in the Vue instance)
      activeTag.forEach(function(el) {
        for (let key in el){
          key === attr ? el[key] = true : el[key] = false;
        }
      });
    }
  }
});


let app = new Vue({
    el: "#divContainer",
    data: {
      active: [ //defines which page to render
          {Vanilla: true},
          {Vue: false},
          {jQuery: false}
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
