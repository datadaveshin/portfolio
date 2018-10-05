// MAIN VUE INSTANCE
let app = new Vue({
    el: "#divContainer",
    data: {
      active: [ //defines which page to render - see div with it divTransform in html
          {Vanilla: true},
          {Vue: false},
          {jQuery: false}
      ],
      imagePath: "./assets/images/img-",

      sections: [
        {id: 1, text: "Vanilla", active: true},
        {id:2, text: "Vue", active: false},
        {id: 3, text: "jQuery", active: false}
      ],
      activePage: "Vanilla",
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
      },  //End of hoverstyle

      modalStyle: {
        backgroundColor: "red",
        fontWeight: "bold"
      },

      projects: [
        {
          key: 1,
          title: "listMe.xyz",
          url: "http://listme.xyz",
          git: "https://github.com/papostolopoulos/listme",
          code: "code in script? or iframe? or scrape off the code from page and present?",
          description: [
            {bullet: "Full stack CRUD todo list."},
            {bullet: "Create, read, update and delete lists of todo items"},
            {bullet: "Node, Express, knex, psql, JQuery, handlebars, CSS"}
          ],
          language: "jQuery",
          images: [
            {image: this.imagePath + "listMejQuery1.jpg"},
            {image: this.imagePath + "listMejQuery2.jpg"},
            {image: this.imagePath + "listMejQuery3.jpg"},
          ],
          video_url: "",
          id: "listMejQuery",
          modalId: {
            background: "red";
          }
        },

        {
          key: 2,
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
            {image: this.imagePath + "writeItVanilla1.jpg"},
            {image: this.imagePath + "writeItVanilla2.jpg"},
            {image: this.imagePath + "writeItVanilla3.jpg"},
          ],
          video_url: "",
          id: "writeItVanilla"
        },

        {
          key: 3,
          title: "CSS Tutorial",
          url: "https://papostolopoulos.github.io/css-exploration/index.html",
          git: "https://github.com/papostolopoulos/css-exploration",
          code: "",
          description: [
            {bullet: "CSS tutorial for the users interested learning basic aspects of CSS"},
            {bullet: "Analyzed Reset, Specificity, the Box Model, Positioning, Typography, Backgrounds, Responsive Design"},
            {bullet: "HTML, Vanilla CSS"}
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
          id: "cssTutorialVanilla"
        },

        {
          key: 4,
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
            {image: ""},
            {image: ""},
          ],
          video_url: "",
          id: "spotifyDiscographyVanilla"
        },

        {
          key: 5,
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
            {image: ""},
            {image: ""},
          ],
          video_url: "",
          id: "imageEditingVanilla"
        },

        {
          key: 6,
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
          key: 7,
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
          key: 8,
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
          key: 9,
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
          key: 10,
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
          key: 11,
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

    ], //end of projects


    }, //End of data
    methods: {

      // CHANGE THE CLASS OF THE BACKGROUND AND THE SELECTED NAV ELEMENT
      classChange(event) {
        let attr = event.target.getAttribute("name");
        //Change the activePage property. This one will define which images will be
        //displayed in the carousel
        this.activePage = attr;

        //Change the property "active" for each object element in the "sections" array
        this.sections.forEach((el) => el.text === attr ? el.active = true : el.active = false);

        //Change the properties in the "active" array (within data in the Vue instance)
        this.active.forEach((el) => {
          for (let key in el) key === attr ? el[key] = true : el[key] = false;
        });
      },

      // EFFECT THAT ACTIVATES THE TRANSITION WHEN MOUSING OVER
      classTransitionOver(event) {
        let attr = event.target.getAttribute("name");
        let targetDiv = document.getElementById("divTransform");
        this.addStyle(targetDiv, this.hoverStyle[attr]);
      },

      // EFFECT THAT DEACTIVATES THE TRANSITION WHEN THE MOUSE LEAVES
      classTransitionLeave(event) {
        let targetDiv = document.getElementById("divTransform");
        this.addStyle(targetDiv, this.hoverStyle.clean);
      },

      // LOOP THAT UPDATES THE INLINE STYLE OF THE ELEMENT THAT IS MOUSED OVER (FOR TRANSITION)
      addStyle(el, styles) {
        for (let key in styles){
          el.style[key] = styles[key];
        }
      },

      imagesPathCreate() {
        let self = this;
        let projectsArr = this.projects;
        projectsArr.forEach((el) => {
          el.images.forEach((ele, idx) => ele.image = self.imagePath + el.id + (idx+1) + ".jpg");
        }); //end of projectsArr.forEach
      },

      modalbackImage(){
        console.log("I am creating classes");
      },

      //CREAT CAROUSEL
      carouselCreate() {
        console.log("carousel created");
      },

      //CREATE ALL MODALS
      modalCreateClass() {
        console.log("modal create fired");
      },

      //OPEN THE MODAL
      modalOpen() {
        console.log("Modal should open");
      }
    }, //End of methods
    beforeMount(){
      this.imagesPathCreate();
      this.modalbackImage();
    },
    computed: {

    }
  }
);


// Create image paths for the Vue instance
// ((vueInstance) => {
//   let projectsArr = vueInstance.projects;
//   projectsArr.forEach((el) => {
//     el.images.forEach((ele, idx) => ele.image = vueInstance.imagePath + el.id + (idx+1) + ".jpg");
//   }); //end of projectsArr.forEach
// })(app);
