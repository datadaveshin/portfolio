var data = {
  imagePath: "./assets/images/img-",
  projects: [
    {
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
        {image: this.imageStr + "listMejQuery1.jpg"},
        {image: this.imageStr + "listMejQuery2.jpg"},
        {image: this.imageStr + "listMejQuery3.jpg"},
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
      url: " ",
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
  ], //end of projects
  setImageUrl: function() {
    var self = this;
    let projectsArr = this.projects;
    projectsArr.forEach(function(el) {
      el.images.forEach(function(ele, idx) {
        ele.image = self.imagePath + el.id + (idx+1) + ".jpg";

      });

    }); //end of projectsArr.forEach
  }
}
