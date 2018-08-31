let navTag = Vue.component('nav-tags', {
  props: ['section'],
  template: `
    <nav>
      <ul>
        <li v-for="section in sections"
        v-if="section.active"
        v-bind:name = "section.name"
        style="color: black;">
          {{section.text}}
        </li>

        <li
        v-else
        v-bind:name="section.text"
        v-on:mouseover="classTransitionOver($event)"
        v-on:mouseout="classTransitionLeave($event)"
        >
          <a
          v-bind:key="section.id"
          v-bind:name="section.text"
          v-on:click="classChange($event)"
          >
            {{section.text}}
          </a>
        </li>
      </ul>
    </nav>
  `,
  data: function() {
    return {
      sections: [
        {id: 1, text: "Vanilla", active: true},
        {id:2, text: "Vue", active: false},
        {id: 3, text: "jQuery", active: false}
      ],
      hoverStyle: {
        Vanilla: {
          backgroundColor: "rgb(250, 220, 52)",
          backgroundImage: 'url("assets/images/logo-javascript.png")',
          boxShadow: "inset 100vw 100vh rgba(250, 220, 52, .5)",
          transition: "all .3s"
        },
        Vue: {
          backgroundColor: "rgba(66, 184, 131, .0001)",
          backgroundImage: 'url("assets/images/logo-vue.png")',
          boxShadow: "inset 100vw 100vh rgba(66, 184, 131, .5)",
          transition: "all .3s"
        },
        jQuery: {
          backgroundColor: "rgba(18, 26, 38, .0001)",
          backgroundImage: 'url("assets/images/logo-jquery.png")',
          boxShadow: "inset 100vw 100vh rgba(18, 26, 38, .5)",
          transition: "all .3s"
        },
        clean: {
          backgroundColor: "",
          backgroundImage: '',
          boxShadow: "",
          transition: "all .3s"
        }
      }
    }
  },
  methods: {
    classChange: function(event) {
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
    },
    classTransitionOver: function(event) {
      let attr = event.target.getAttribute("name");
      let targetDiv = document.getElementById("divTransform");
      // targetDiv.className = `divHoverClass${attr}`;
      this.addStyle(targetDiv, this.hoverStyle[attr]);
    },
    classTransitionLeave: function(event) {
      console.log("leaving");
      console.log(event.target);
      let targetDiv = document.getElementById("divTransform");
      // targetDiv.style.transition = "all 2s";
      this.addStyle(targetDiv, this.hoverStyle.clean);
    },
    addStyle: function(el, styles) {
      for (let key in styles){
        console.log(key);
        console.log(el.style[key]);
        el.style[key] = styles[key];
      }
    }
  },
  computed: {

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
