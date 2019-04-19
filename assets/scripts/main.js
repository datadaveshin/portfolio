/*jshint esversion: 6 */
// MAIN VUE INSTANCE
let app = new Vue({
    el: "#divContainer",
    data: {
      active: [ //defines which page to render - see div with it divTransform in html
          {Vanilla: true},
          {Vue: false},
          {jQuery: false}
      ],
      imagePath: "assets/images/img-",
      videoPath: "assets/videos/vid-",
      textPath: "assets/txt_files/code-",

      sections: [
        {id: 1, text: "Vanilla", active: true},
        {id:2, text: "Vue", active: false},
        {id: 3, text: "jQuery", active: false}
      ],

      updateStyle: {
        Vanilla: { //This is for the hovering over the vanilla link
          backgroundColor: "rgb(250, 220, 52)",
          backgroundImage: 'url("assets/images/logo-javascript.png")',
          boxShadow: "inset 100vw 100vh rgba(250, 220, 52, .5)",
          transition: "all .3s"
        },
        Vue: { //This is for the hovering over the Vue link
          backgroundColor: "rgba(66, 184, 131, .0001)",
          backgroundImage: 'url("assets/images/logo-vue.png")',
          boxShadow: "inset 100vw 100vh rgba(66, 184, 131, .5)",
          transition: "all .3s"
        },
        jQuery: { //This is for the hovering over the jQuery link
          backgroundColor: "rgba(18, 26, 38, .0001)",
          backgroundImage: 'url("assets/images/logo-jquery.png")',
          boxShadow: "inset 100vw 100vh rgba(18, 26, 38, .5)",
          transition: "all .3s"
        },
        clean: { //This is for the mousing out of the Vanilla, Vue or jQuery links in header
          backgroundColor: "",
          backgroundImage: '',
          boxShadow: "",
          transition: "all .3s"
        },
        expandCodeModal: {
          position: "fixed",
          zIndex: 2,
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh"
        },
        codeModalClose: {
          position: "static",
          zIndex: 1,
          width: "32vw",
          height: "96vh"
        }
      },  //End of updateStyle

      activeModals: "Vanilla",
      counter: 0, //This is for the image and text transition inside each modal
      modalDisplay: "none", //This is for the image and text transition

      projects: [
        {
          key: 1,
          title: "listMe.xyz",
          url: "http://listme.xyz",
          git: "https://github.com/papostolopoulos/listme",
          code_url: "",
          code: "",
          description: [
            {bullet: "Full stack CRUD to-do list."},
            {bullet: "Create, read, update and delete lists of todo items."},
            {bullet: "Create, update or delete user account."},
            {bullet: "Node, Express, knex, psql, JQuery, handlebars, CSS."}
          ],
          highlights: [
            {fact: "Customized to-do lists. (2017-03)"},
            {fact: "Why was it built?\nI helped a colleague with his capstone project by creating the backend, database logic, backend - frontend connectivity"},
            {fact: "Interesting fact: The user can update and customize the lists."},
          ],
          language: "jQuery",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "https://youtube.com/embed/QI_-P_XE8fo",
          id: "listMejQuery",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 2,
          title: "writeit.pro",
          url: "http://writeit.pro",
          git: "https://github.com/papostolopoulos/writeit",
          code_url: "",
          code: "",
          description:
          [
            {bullet: "Full stack blog."},
            {bullet: "WYSIWYG text editor."},
            {bullet: "Image, video upload."},
            {bullet: "Responsive / mobile."},
            {bullet: "Node, Express, psql, JavaScript, handlebars, html, CSS"}
          ],
          highlights: [
            {fact: "Blog with a WYSIWYG editor. (2017-02)"},
            {fact: "Why was it built?\nIt was my capstone project. I liked the idea of creating something that would allow people to save thoughts"},
            {fact: "Interesting fact: Ability to upload images, video and modify the display of text"},
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "https://youtube.com/embed/DB0xETCAt4E",
          id: "writeItVanilla",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 3,
          title: "CSS Tutorial",
          url: "https://papostolopoulos.github.io/css-exploration/index-vanilla.html",
          git: "https://github.com/papostolopoulos/css-exploration",
          code_url: "",
          code: "",
          description: [
            {bullet: "CSS tutorial with basic aspects of CSS."},
            {bullet: "Reset, Specificity, the Box Model, Positioning, Typography, Backgrounds, Responsive Design."},
            {bullet: "Responsive, mobile."},
            {bullet: "HTML, Vanilla CSS."}
          ],
          highlights: [
            {fact: "Basic CSS tutorial. (2016-12)"},
            {fact: "Why was it built?\nIt was some kind of homework for my coding school"},
            {fact: "Interesting fact: As you progress through the pages, you will see more CSS being added."},
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "https://youtube.com/embed/k-3_nybOPAQ",
          id: "cssTutorialVanilla",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 4,
          title: "Spotify Discography Search",
          url: "https://git.io/vyfiO",
          git: "https://github.com/papostolopoulos/spotify",
          code_url: "",
          code: "",
          description: [
            {bullet: "API calls to the Spotify API."},
            {bullet: "Search for artists' discographies."},
            {bullet: "Review the song titles and album covers"},
            {bullet: "JavaScript, Ajax calls, CSS, HTML"}
          ],
          highlights: [
            {fact: "See the discography of your favorite artist. (2017-01)"},
            {fact: "Why was it built?\nIt was built as a school assignment. I wanted to learn on API calls"},
            {fact: "Interesting fact: Different API calls in spotify with promises."},
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
          id: "spotifyDiscographyVanilla",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 5,
          title: "Image filtering",
          url: "https://goo.gl/s9sHDS",
          git: "https://github.com/papostolopoulos/image_filtering",
          code_url: "",
          code: "",
          description: [
            {bullet: "Image editing and filters application."},
            {bullet: "Open images from the hard drive or online sources."},
            {bullet: "Filters for brightness, contrast, transparency, grayscale, blur etc."},
            {bullet: "Save in a different image formats."},
            {bullet: "Node, JavaScript, CSS, HTML"}
          ],
          highlights: [
            {fact: "Image filters through algo calculations. (2016-11)"},
            {fact: "Why was it built?\nClass project. I wanted to learn some techniques on loading and editing images online."},
            {fact: "Interesting fact: Images can be saved in different formats"},
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "https://youtube.com/embed/RYklsgi93uA",
          id: "imageEditingVanilla",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 6,
          title: "SportyTourist.com",
          url: "http://sportytourist.com",
          git: "https://github.com/papostolopoulos/sportytourist",
          code_url: "",
          code: "",
          description: [
            {bullet: "Sports news aggregator."},
            {bullet: "News API calls"},
            {bullet: "JavaScript, AJAX, CSS, HTML"}
          ],
          highlights: [
            {fact: "Sports news highlights from different sources. (2016-08)"},
            {fact: "Why was it built?\nI wanted to learn on api calls"},
            {fact: "Interesting fact: All the api calls are done from one source."},
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "https://youtube.com/embed/85MEVokytgs",
          id: "sportyTouristVanilla",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 7,
          title: "hangman.pro",
          url: "http://hangman.pro",
          git: "https://github.com/papostolopoulos/hangman",
          code_url: "",
          code: "",
          description: [
            {bullet: "Game of hangman."},
            {bullet: "Random word pick and play."},
            {bullet: "JQuery, AJAX, CSS, HTML"}
          ],
          highlights: [
            {fact: "Play hangman online. (2016-08)"},
            {fact: "Why was it built?\nThis was my first online project."},
            {fact: "Interesting fact: You can cheat by looking at the developer tools."},
          ],
          language: "jQuery",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "https://youtube.com/embed/hpI6RAwc0g0",
          id: "hangmanjQuery",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 8,
          title: "Clock",
          url: "https://papostolopoulos.github.io/js30/02-clock/index-vanilla.html",
          git: "https://github.com/papostolopoulos/js30/tree/master/02-clock",
          code_url: "",
          code: "",
          description: [
            {bullet: "A clock."},
            {bullet: "Updates automatically by firing interval calls."},
            {bullet: "JavaScript, CSS, HTML."}
          ],
          highlights: [
            {fact: "Working clock displaying computer time. (2018-09)"},
            {fact: "Why was it built?\nGood practice for CSS transforms and timeouts"},
            {fact: "Interesting fact: transforms happen through a timeout function"},
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "https://youtube.com/embed/qc0xtBvhYE8",
          id: "clockVanilla",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 9,
          title: "Drum Kit - Vanilla",
          url: "https://papostolopoulos.github.io/js30/01-drum_kit/index-vanilla.html",
          git: "https://github.com/papostolopoulos/js30/tree/master/01-drum_kit",
          code_url: "",
          code: "",
          description: [
            {bullet: "Drum Kit. Press the keys and hear the drums playing."},
            {bullet: "Vanilla JavaScript, CSS, HTML."},
            {bullet: "Similar project in the Vue section."}
          ],
          highlights: [
            {fact: "Play the drums from your keyboard. (2018-05)"},
            {fact: "Why was it built?\nGood practice for Javascript and CSS"},
            {fact: "Interesting fact: I built the same project in Vue.js too"},
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "https://youtube.com/embed/gHnogNy7aSk",
          id: "drumKitVanilla",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 10,
          title: "addEventListener.xyz",
          url: "",
          description: [
            {bullet: "Single page application"},
            {bullet: "A Personal web page with a list of all the coding projects"},
            {bullet: "Multiple class transitions, CSS transformations and interactive display through a single Vue instance."},
            {bullet: "Vue, CSS, HTML."}
          ],
          highlights: [
            {fact: "My coding projects list. (2019-01)"},
            {fact: "Why was it built?\nThis is the place where I am showcasing all of my coding work"},
            {fact: "Interesting fact: After building the core of this single page app, updating the content happens very easily."},
          ],
          language: "Vue",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "https://youtube.com/embed/X2GlA4nhJb4",
          id: "addEventListenerVue",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 11,
          title: "JSON files copy-paste viewer",
          url: "https://papostolopoulos.github.io/xPathDataExtraction/copypaste/copypaste4.html",
          code_url: "",
          git: "https://github.com/papostolopoulos/xPathDataExtraction/copypaste",
          code: "",
          description: [
            {bullet: "This is a project that was done for internal company work. It doesn't work with random files."},
            {bullet: "The user can paste a JSON file from an internal work tool and view the results as per array element."},
            {bullet: "He can filter the results as needed."},
            {bullet: "Vue, HTML, CSS."}
          ],
          highlights: [
            {fact: "JSON file viewer. (2018-12)"},
            {fact: "Why was it built?\nI wanted something that would help me confirm if strings of text were accurately matching with extracted images."},
            {fact: "Interesting fact: There is a lot of string manipulation in order to clean up a large JSON string and remain with the important components of it."},
          ],
          language: "Vue",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "https://youtube.com/embed/FEzatw3eGjk",
          id: "jsonCopyPasteVue",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 12,
          title: "A Vue tutorial",
          url: "https://papostolopoulos.github.io/tutorials/vue/vue_website_tutorial/000-vue_introduction.html",
          code_url: "",
          git: "https://github.com/papostolopoulos/tutorials/tree/master/vue/vue_website_tutorial",
          code: "",
          description: [
            {bullet: "Vue tutorial and exercises based on vuejs.org"},
            {bullet: "Vue, CSS, HTML."},
            {bullet: "Similar project in the Vanilla section."}
          ],
          highlights: [
            {fact: "Several practice exercises and coding examples. (2018-09)"},
            {fact: "Why was it built?\nIt has been useful for me to text my aquired knowledge by keeping my notes and by creating my own exercises"},
            {fact: "Interesting fact: New Vue instances are created for every section of the tutorial"},
          ],
          language: "Vue",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "https://youtube.com/embed/4PPgpb3XgfI",
          id: "vueTutorialVue",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 13,
          title: "Drum Kit - Vue",
          url: "https://papostolopoulos.github.io/js30/01-drum_kit/index-vue.html",
          code_url: "",
          git: "https://github.com/papostolopoulos/js30/tree/master/01-drum_kit",
          code: "",
          description: [
            {bullet: "Drum Kit. Press the keys and hear the drums playing."},
            {bullet: "Vue, CSS, HTML."},
            {bullet: "Similar project in the Vanilla section."}
          ],
          highlights: [
            {fact: "Play drums from your keyboard. (2018-07)"},
            {fact: "Why was it built?\nGood practice of vue and css skills"},
            {fact: "Interesting fact: There is a Vanilla js version for the same project"},
          ],
          language: "Vue",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "https://youtube.com/embed/HNRwOGbi2sU",
          id: "drumKitVue",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 14,
          title: "Street View Image Modal",
          url: "https://git.io/vppLs",
          git: "https://github.com/papostolopoulos/streetViewModal",
          code_url: "",
          code: "",
          description: [
            {bullet: "Modal that displays static Google Street View image."},
            {bullet: "Camera rotation and zooming."},
            {bullet: "Google maps API call."},
            {bullet: "Vanilla JavaScript, Vanilla CSS."}
          ],
          highlights: [
            {fact: "Enter coordinates, see Google Street View Image. (2018-06)"},
            {fact: "Why was it built?\nIt was interesting for me to see if I could make something that would be matched with the Open Street Maps project."},
            {fact: "Interesting fact: This was easier than I thought. the API call was straighforward but if a lot of users start using this, then there is a fee for getting data from Google."},
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "https://youtube.com/embed/Ce009inkFAA",
          id: "streetViewModalVanilla",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 15,
          title: "CSS Tutorial - Vue",
          url: "https://papostolopoulos.github.io/css-exploration/index.html",
          git: "https://github.com/papostolopoulos/css-exploration",
          code_url: "",
          code: "",
          description: [
            {bullet: "CSS tutorial built with Vue components."},
            {bullet: "Single page application with viewable content based on the user's browsing pattern."},
            {bullet: "The user can enter HTML and CSS in practice textareas and see the result of his code in real time"},
            {bullet: "Vue, Vanilla CSS."}
          ],
          highlights: [
            {fact: "Learn CSS and practice in a WYSIWYG environment. (2018-10)"},
            {fact: "Why was it built?\nIt helps me understand some CSS principles and ti can create my own examples that other folks can later use"},
            {fact: "Interesting fact: Reusable vue components make the process of building this project very interesting."},
          ],
          language: "Vue",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "https://youtube.com/embed/weG_SlyUaXM",
          id: "cssTutorialVue",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },


        {
          key: 16,
          title: "xPath Generator",
          url: "https://papostolopoulos.github.io/xPathDataExtraction/copypaste/xPathGenerator.html",
          git: "https://github.com/papostolopoulos/copypaste",
          code_url: "",
          code: "",
          description: [
            {bullet: "Single page application"},
            {bullet: "Allows the user to create and modify xPath rules"},
            {bullet: "The user has the option to update the rules even when they are created."},
            {bullet: "Different page components allow the user to modify the different rule components through the model updates."},
            {bullet: "Vue, Vanilla CSS."}
          ],
          highlights: [
            {fact: "Create xPath rules without the worry of spelling errors. (2019-04)"},
            {fact: "I thought it would be fun to build something that others can use."},
            {fact: "Interesting fact: The vue models make it easy to modify input data as the rule is being built."},
          ],
          language: "Vue",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "https://www.youtube.com/embed/YRh_VZG0TJ4",
          id: "xPathGeneratorVue",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },


    ], //end of projects


    }, //End of data
    methods: {

      // CHANGE THE CLASS OF THE BACKGROUND AND THE SELECTED NAV ELEMENT FROM HEADERS
      headersClassChange(event) {
        let attrName = event.target.getAttribute("name");
        this.classChange(attrName);
      },


      // CHANGE THE CLASS OF THE BACKGROUND AND THE SELECTED NAV ELEMENT
      classChange(attr){
        //Change the activePage property. This one will define which images will be
        //displayed in the carousel
        // this.activePage = attr;

        //Change the property "active" for each object element in the "sections" array
        this.sections.forEach((el) => el.text === attr ? el.active = true : el.active = false);

        //Change the properties in the "active" array (within data in the Vue instance)
        this.active.forEach((el) => {
          for (let key in el) key === attr ? el[key] = true : el[key] = false;
        });

        //This is for changing the active class of the <divTransform> tag
        this.activeModals = attr;
      },


      //CHANGE PAGES FROM ARROWS
      changePage(event){
        let targetDiv = window["divTransform"];
        let arrowId = event.target.id.replace(/(div)?Arrow/i, "").toLowerCase();
        let arr = this.sections;

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].active) {
            if (arr[i].id === 3 && arrowId === "right" && arr[i].active === true) {
              this.classChange(arr[0].text);
              this.addStyle(targetDiv, this.updateStyle[arr[0].text]);
              break;
            }
            else if (arr[i].id === 1 && arrowId === "left" && arr[i].active === true) {
              this.classChange(arr[2].text);
              this.addStyle(targetDiv, this.updateStyle[arr[2].text]);
              break;
            }
            else {
              arrowId === "right" ?
              (this.classChange(arr[i + 1].text), this.addStyle(targetDiv, this.updateStyle[arr[i + 1].text])) :
              (this.classChange(arr[i - 1].text), this.addStyle(targetDiv, this.updateStyle[arr[i - 1].text]));
              break;
            }
          }
        }

        this.sections.forEach((el, idx, arr)=>{

        });
      },


      // EFFECT THAT ACTIVATES THE TRANSITION WHEN MOUSING OVER
      classTransitionOver(event) {
        let attr = event.target.getAttribute("name");
        let targetDiv = window["divTransform"];
        this.addStyle(targetDiv, this.updateStyle[attr]);
      },


      // EFFECT THAT DEACTIVATES THE TRANSITION WHEN THE MOUSE LEAVES
      classTransitionOut(event) {
        let targetDiv = window["divTransform"];
        this.addStyle(targetDiv, this.updateStyle.clean);
      },


      // LOOP THAT UPDATES THE INLINE STYLE OF THE ELEMENT THAT IS MOUSED OVER (FOR TRANSITION)
      addStyle(el, styles) {
        for (let key in styles){
          el.style[key] = styles[key];
        }
      },


      //CREATES THE PATHS FOR ALL THE IMAGES IN THE PROJECTS ARRAY INSIDE "DATA"
      //ADDS THE BACKGROUND IMAGE IN MODALS
      //ADDS THE BOX SHADOW IN MODALS
      //CREATES THE PATHS FOR ALL THE VIDEOS IN THE PROJECTS ARRAY INSIDE DATA
      pathCreate() {
        let self = this;
        let projectsArr = this.projects;
        let codePath = "";

        projectsArr.forEach((el) => {


          //Add path in projects[i].images.image
          el.images.forEach((ele, idx) => ele.image = self.imagePath + el.id + (idx+1) + ".jpg");


          // DEACTIVATED IT - TRYING TO SEE IF IT LOOKS BETTER WITHOUT A BG IMAGE IN MODAL
          //Add path in projects[i].bgImage.backgroundImage
          // backgroundImage: 'url("assets/images/logo-vue.png")'
          // el.bgImage.backgroundImage = "url(" + el.images[0].image + ")"


          // DEACTIVATED IT. SEE ABOVE COMMENT
          //Add attribute value for boxShadow for each modal
          // el.language === "Vanilla" ? el.bgImage.boxShadow = "inset 100vw 100vh rgba(250, 220, 52, .5)" :
          // el.language === "Vue" ? el.bgImage.boxShadow = "inset 100vw 100vh rgba(66, 184, 131, .5)" :
          // el.language === "jQuery" ? el.bgImage.boxShadow = "inset 100vw 100vh rgba(18, 26, 38, .5)" :
          // null;


          //DEACTIVATED TO SEE IF THE YOUTUBE LINKS WORK BETTER
          // Add path in projects[i].video_url
          // el.video_url = self.videoPath + el.id + ".mp4";


          //Add path in projects[i].code_url textPath: "assets/txt_files/code-"
          el.code_url = self.textPath + el.id + ".json";
        });
      },

      //OPEN THE MODAL
      modalOpen() {
        var getModalId = event.target.id.replace("aModalOpen", "modal");
        window[getModalId].className += " activeModal";

        //This is for the image and the text in the modal
        this.modalDisplay = "flex";
        this.changeCounterValue(); //This is for toggling through the images
      },

      //CLOSE THE MODAL FROM THE X ICON
      modalClose(event) {
        console.log("Event composed path", event.composedPath());
        console.log("Event path:", event.path);
        var getModalId = event.composedPath()[1].id.replace("divCloseModal", "modal");
        window[getModalId].className = window[getModalId].className.replace(/ activeModal/, "");

        this.modalDisplay = "none";
        this.counter = 0;
      },

      imageModalOpen(event){
        //Get the id from the "imageScreenshot". Change the name to match that of the modal
        let divImageId = event.target.id.replace("imageScreenshot", "divImageModal");
        console.log(window[divImageId]);
        console.log(window[divImageId].firstElementChild);
        window[divImageId].className += " activeImageModal"
        //Change the display from "none" to "flex"
        // window[divImageId].firstElementChild.style.display="flex"
        // window[divImageId].style.display="flex";
      },

      imageModalClose(event){
        event.composedPath()[2].className = event.composedPath()[2].className.replace(" activeImageModal", "");
        // event.composedPath()[2].style.display = "none";
      },

      //EXPAND THE CODE MODAL TO FULL SCREEN
      expandCodeModal(event){
        if(event.composedPath()[3].className.includes("divModalLeftExpand")) return;

        event.composedPath()[3].className += " divModalLeftExpand"
        // this.addStyle(event.composedPath()[3], this.updateStyle.expandCodeModal);
        event.composedPath()[3].children[1].className += " divModalCloseVisible";
        console.log(event.composedPath()[3].children);
      },

      //MINIMIZE THE CODE MODAL TO THE LEFT SIDE OF THE SCREEN BY CLICKING THE X BUTTON
      codeModalClose(event){
        event.composedPath()[2].className = event.composedPath()[2].className.replace(" divModalLeftExpand", "");
        event.composedPath()[1].className = event.composedPath()[1].className.replace(/ divModalCloseVisible/, "");
        // this.addStyle(event.composedPath()[2], this.updateStyle.codeModalClose);
        // event.composedPath()[1].style.display = "none";
      },

      //MINIMIZE THE CODE MODAL BY CLICKING IN THE BODY OF THE SCREEN
      divCodeModalClose(event){
        if (event.target.localName === "pre" &&
            event.composedPath()[2].className === "divModalLeft" &&
            event.composedPath()[2].style.position === "fixed") {
              event.composedPath()[2].children[1].style.display = "none";
              this.addStyle(event.composedPath()[2], this.updateStyle.codeModalClose);
            }
      },

      //CHANGE THE VALUE OF THE COUNTER SO THAT THE IMAGES CHANGE IN THE MODAL DISPLAY
      changeCounterValue() {
        let self = this;
        let intervalId = setInterval(function(){
          if (self.modalDisplay !== "flex") clearInterval(intervalId);
          self.counter < 2 ? self.counter++ : self.counter = 0;
          console.log(self.counter);
        }, 5000);
      },

      parseJson(){
        //Source used:
        // https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
        let projectsArr = this.projects;

        projectsArr.forEach(el => {
          let txtObj = new XMLHttpRequest();
          txtObj.overrideMimeType("application/json");
          txtObj.open('GET', this.textPath + el.id + '.txt', true); // Replace 'my_data' with the path to your file
          txtObj.onreadystatechange = function () {
            if (txtObj.readyState === 4 && txtObj.status == "200") {
              // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
              el.code = txtObj.responseText;
            }
          };
          txtObj.send(null);

        });

  } //End of parseJson

    }, //End of methods
    beforeMount(){
      this.pathCreate();
      this.parseJson();
    },
    computed: {
    } //End of computed properties
  }
);

/* DO YOU NEED TO MODIFY THE HTML TAGS IN SOME OF THEM?
clockVanilla: https://github.com/papostolopoulos/js30/blob/master/02-clock/index-vanilla.html
cssTutorialVanilla: https://github.com/papostolopoulos/css-exploration/blob/master/assets/stylesheets/006.css
drumKitVanilla: https://github.com/papostolopoulos/js30/blob/master/01-drum_kit/index-vanilla.html
drumKitVue: https://github.com/papostolopoulos/js30/blob/master/01-drum_kit/index-vue.html
hangmanjQuary: https://papostolopoulos.github.io/hangman/assets/hangman_scripts.js
imageEditingVanilla: https://github.com/papostolopoulos/image_filtering/blob/master/public/js_files/menubar_script.js
listMejQuery: https://github.com/papostolopoulos/listme/blob/master/routes/index.js
writeItVanilla: https://github.com/papostolopoulos/writeit/blob/master/public/javascripts/wysiwyg.js
streetViewModalVanilla: https://github.com/papostolopoulos/streetViewModal/blob/master/assets/javascript/main.js
sportyTouristVanilla: https://github.com/papostolopoulos/sportytourist/blob/master/assets/jsfiles/index.js
spotifyDiscographyVanilla: https://github.com/papostolopoulos/spotify/blob/master/assets/js/script-new.js


vid addEventListenerVue https://youtu.be/X2GlA4nhJb4
vid clockVanilla https://youtu.be/qc0xtBvhYE8
vid cssTutorialVanilla https://youtu.be/k-3_nybOPAQ
vid cssTutorialVue https://youtu.be/weG_SlyUaXM
vid drumKitVanilla https://youtu.be/gHnogNy7aSk
vid drumKitVue https://youtu.be/HNRwOGbi2sU
vid hangmanjQuery https://youtu.be/hpI6RAwc0g0
vid imageEditingBVanilla https://youtu.be/g1mI6SIB9Pc
vid imageEditingVanilla https://youtu.be/RYklsgi93uA
vid jsonCopyPasteVue https://youtu.be/FEzatw3eGjk
vid listMejQuery https://youtu.be/QI_-P_XE8fo
vid sportyTouristVanilla https://youtu.be/85MEVokytgs
vid streetViewModalVanilla https://youtu.be/Ce009inkFAA
vid vueTutorialVue https://youtu.be/4PPgpb3XgfI
vid writeItVanilla https://youtu.be/DB0xETCAt4E
xPathGenerator https://youtu.be/YRh_VZG0TJ4
*/
