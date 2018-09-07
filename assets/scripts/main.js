// NAVIGATION TAG AND ELEMENTS
let navTags = Vue.component('nav-tags', {
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
          transition: "all .5s"
        },
        Vue: {
          backgroundColor: "rgba(66, 184, 131, .0001)",
          backgroundImage: 'url("assets/images/logo-vue.png")',
          boxShadow: "inset 100vw 100vh rgba(66, 184, 131, .5)",
          transition: "all .5s"
        },
        jQuery: {
          backgroundColor: "rgba(18, 26, 38, .0001)",
          backgroundImage: 'url("assets/images/logo-jquery.png")',
          boxShadow: "inset 100vw 100vh rgba(18, 26, 38, .5)",
          transition: "all .5s"
        },
        clean: {
          backgroundColor: "",
          backgroundImage: '',
          boxShadow: "",
          transition: "all .5s"
        }
      }
    }
  },
  methods: {
    // CHANGE THE CLASS OF THE BACKGROUND AND THE SELECTED NAV ELEMENT
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

    // EFFECT THAT ACTIVATES THE TRANSITION WHEN MOUSING OVER
    classTransitionOver: function(event) {
      let attr = event.target.getAttribute("name");
      let targetDiv = document.getElementById("divTransform");
      this.addStyle(targetDiv, this.hoverStyle[attr]);
    },

    // EFFECT THAT DEACTIVATES THE TRANSITION WHEN THE MOUSE LEAVES
    classTransitionLeave: function(event) {
      let targetDiv = document.getElementById("divTransform");
      this.addStyle(targetDiv, this.hoverStyle.clean);
    },

    // LOOP THAT UPDATES THE INLINE STYLE OF THE ELEMENT THAT IS MOUSED OVER (FOR TRANSITION)
    addStyle: function(el, styles) {
      for (let key in styles){
        el.style[key] = styles[key];
      }
    }
  },
  computed: {

  }
});





let sectionTags = Vue.component("section-tags", {
  props: ["project"],
  template:
  `
    <section>
      Hello, there is some text here; {{nav}}.
    </section>
  `,
  data: function() {
    return {
      nav: navTags.extendOptions.data().sections
    }
  },
  methods: {

  }
});





// MAIN VUE INSTANCE
let app = new Vue({
    el: "#divContainer",
    data: {
      active: [ //defines which page to render
          {Vanilla: true},
          {Vue: false},
          {jQuery: false}
      ],


      projects: [
        {
          title: "listMe.xyz",
          url: "http://listme.xyz",
          git: "",
          code: "code in script? or iframe? or scrape off the code from page and present?",
          description: [
            {bullet: "Full stack CRUD todo list."},
            {bullet: "Create, read, update and delete lists of todo items"},
            {bullet: "Node, Express, knex, psql, JQuery, handlebars, CSS"}
          ],
          language: "jQuery",
          images: [
            {image: "link here"},
            {image: "link here"},
            {image: "link here"},
          ],
          video_url: "",
          id: "listMeVanilla"
        },

        {
          title: "writeit.pro",
          url: "http://writeit.pro",
          git: "https://github.com/papostolopoulos/writeit",
          code: "",
          description:
          [
            {bullet: "Full stack blog."},
            {bullet: "WYSIWYG text editor."},
            {bullet: "Image, video upload."},
            {bullet: "Responsive"},
            {bullet: "Node, Express, psql, JavaScript, handlebars, html, CSS"}
          ],
          language: "Vanilla",
          images: [
            {image: "./assets/images/writeit.jpg"},
            {image: "link here"},
            {image: "link here"},
          ],
          video_url: "",
          id: "writeItVanilla"
        },

        {
          title: "Simple CSS Tutorial",
          url: "https://git.io/vMM8C",
          git: "",
          code: "",
          description: [
            {bullet: "CSS tutorial for the users interested learning basic aspects of CSS"},
            {bullet: "Analyzed Reset, Specificity, the Box Model, Positioning, Typography, Backgrounds, Responsive Design"},
            {bullet: "HTML, Vanilla CSS"}
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: "link here"},
            {image: "link here"},
          ],
          video_url: "",
          id: "cssTutorialVanilla"
        },

        {
          title: "Spotify Discography Search",
          url: "https://git.io/vyfiO",
          git: "",
          code: "",
          description: [
            {bullet: "Search engine with API calls to the Spotify API."},
            {bullet: "The user can search for artists' discographies and review the song titles and album covers"},
            {bullet: "JavaScript, Ajax calls, CSS, HTML"}
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: "link here"},
            {image: "link here"},
          ],
          video_url: "",
          id: "spotifyDiscographyVanilla"
        },

        {
          title: "Image editing",
          url: "https://goo.gl/s9sHDS",
          git: "",
          code: "",
          description: [
            {bullet: "Image editing console."},
            {bullet: "This is a barebones image filtering environment. The user can open images from the hard drive or online sources and apply filters or save in a different image format"},
            {bullet: "Node, JavaScript, CSS, HTML"}
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: "link here"},
            {image: "link here"},
          ],
          video_url: "",
          id: "imageEditingVanilla"
        },

        {
          title: "SportyTourist",
          url: "http://sportytourist.com",
          git: "https://github.com/papostolopoulos/sportytourist",
          code: "",
          description: [
            {bullet: "Sports news aggregator."},
            {bullet: "News API calls"},
            {bullet: "JavaScript, AJAX, CSS, HTML"}
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: "link here"},
            {image: "link here"},
          ],
          video_url: "",
          id: "sportyTouristVanilla"
        },

        {
          title: "Hangman",
          url: "http://hangman.pro",
          git: "https://github.com/papostolopoulos/hangman",
          code: "",
          description: [
            {bullet: "Game of hangman."},
            {bullet: "Random word pick and play."},
            {bullet: "JQuery, AJAX, CSS, HTML"}
          ],
          language: "jQuery",
          images: [
            {image: ""},
            {image: "link here"},
            {image: "link here"},
          ],
          video_url: "",
          id: "hangmanjQuery"
        },

        {
          title: "Clock",
          url: "https://papostolopoulos.github.io/js30/02-clock/index-vanilla.html",
          git: "https://github.com/papostolopoulos/js30/tree/master/02-clock",
          code: "",
          description: [
            {bullet: "A clock that updates automatically by firing interval calls."}
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
          id: "clockVanilla"
        },

        {
          title: "Drum Kit",
          url: "https://papostolopoulos.github.io/js30/01-drum_kit/index-vanilla.html",
          git: "https://github.com/papostolopoulos/js30/tree/master/01-drum_kit",
          code: "",
          description: [
            {bullet: "Drum Kit. Press the keys and hear the drums playing."},
            {bullet: "Vanilla JavaScript, CSS, HTML."}
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
          id: "drumKitVanilla"
        },

        {
          title: "Drum Kit",
          url: "https://papostolopoulos.github.io/js30/01-drum_kit/index-vue.html",
          git: "https://github.com/papostolopoulos/js30/tree/master/01-drum_kit",
          code: "",
          description: [
            {bullet: "Drum Kit. Press the keys and hear the drums playing."},
            {bullet: "Vue, CSS, HTML."}
          ],
          language: "Vue",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
          id: "drumKitVue"
        },

        {
          title: "Street View Image Modal",
          url: "https://git.io/vppLs",
          git: "https://github.com/papostolopoulos/streetViewModal",
          code: "",
          description: [
            {bullet: "Modal that displays static Google Street View image."},
            {bullet: "Camera rotation and zooming"},
            {bullet: "Google maps API call"},
            {bullet: "Vanilla JavaScript, Vanilla CSS"}
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
          id: "streetViewModalVanilla"
        }

    ], //end of positions


    }, //End of data
    methods: {
      doSomething: function () {
        console.log("clicked!");
      }
    }
  }
);
