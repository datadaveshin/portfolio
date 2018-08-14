console.log("in the main.js file");

new Vue(
    el: "main",
    data: {
      projects: {
        JavaScript: [
          {
            title: "name here",
            url: "link here",
            git: "link here"
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
    }
);
