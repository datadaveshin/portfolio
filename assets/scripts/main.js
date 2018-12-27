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
      },  //End of hoverstyle

      activeModals: "Vanilla",
      counter: 0,
      modalDisplay: "none",

      projects: [
        {
          key: 1,
          title: "listMe.xyz",
          url: "http://listme.xyz",
          git: "https://github.com/papostolopoulos/listme",
          code_url: "",
          code: "var express = require(\'express\');\nvar router = express.Router();\nvar bcrypt = require(\'bcrypt\');\nvar knex = require(\'../db/knex\');\n\n//Log In POST\nrouter.post(\'/login\', function(req, res, next) {\n  console.log(req.body);\n\n  knex(\'users\')\n  .select()\n  .where(\'email\', req.body.email)\n  .returning(\'*\')\n  .then(function (existingUsers) {\n    var user = existingUsers[0];\n    if (existingUsers.length === 0) {\n      console.log(user);\n      res.render(\'error\', {\n        message: \'User does not exist\',\n        status: 400,\n        description: \'Sorry but the email you entered does not exist in the database. Please try to log in with a different email or try to sign up.\',\n        user: req.session.user || \'guest\'\n      });\n    } else {\n      if (bcrypt.compareSync(req.body.password, user.hashed_password) === true) {\n        console.log(\'Hoorah!!!\');\n        req.session.user = req.body.email;\n        req.session.cookie.maxAge = 24 * 60 * 60 * 10;\n        knex\n        .select(\'list.name\', \'list.id\', \'users.id\', \'users.email\')\n        .table(\'list\')\n        .innerJoin(\'users\', \'list.user_id\', \'users.id\')\n        .where({email: req.session.user})\n        .returning(\'*\')\n        .then(function (listTitles) {\n          res.render(\'lists\',{\n            listTitles: listTitles,\n            email: listTitles.email,\n            user: req.session.user || \'guest\'\n          })\n        })\n      }\n      else {\n        console.log(\'POOP!\');\n        res.render(\'error\', {\n          message: \'Incorrect Login Credentials\',\n          status: 400,\n          description: \'You have entered incorrect login credentials\',\n          user: req.session.user || \'guest\'\n        })\n      }\n\n\n    }\n  });\n}); //End of router.post\n\n\n//Sing up POST\nrouter.post(\'/signup\', function(req, res, next) {\n  console.log(req.body);\n\n  knex(\'users\')\n  .select()\n  .where(\'email\', req.body.email)\n  .returning(\'*\')\n  .then(function (existingUsers) {\n    if (existingUsers.length &gt; 0) {\n      var existingUser = existingUsers[0];\n      console.log(existingUser);\n      res.render(\'error\', {\n        message: \'User already exists\',\n        status: 400,\n        description: \'Sorry but the email you entered exists already in the database. Please try siging up with a different email or try to login.\',\n        user: req.session.user || \'guest\'\n      });\n    }\n  })\n\n  var hashedPassword = new Promise(function (resolve, reject) {\n    resolve(saltPassword(req.body.password));\n  })\n\n  hashedPassword\n  .then(function(pwd){\n    var newUserObj = {\n      email: req.body.email,\n      hashed_password: pwd\n    }\n    return newUserObj;\n  })\n  .then(function (newUser) {\n\n    knex(\'users\')\n    .insert(newUser)\n    .returning(\'email\')\n    .then(function(newUserEmails){\n      var newUserEmail = newUserEmails[0];\n      req.session.user = newUserEmail;\n      req.session.cookie.maxAge = 24 * 60 * 60 * 10;\n      res.render(\'lists\', {\n        user: req.session.user\n      });\n    })\n  })\n\n});\n\n//LOGOUT BUTTON\nrouter.get(\'/logout\', (req, res, next) =&gt; {\n  console.log(\'LOGOUT: req session before logout\');\n  console.log(req.session);\n  req.session.destroy(function (err) {\n      res.render(\'index\', {\n        title: \'listMe.xyz\',\n        user: \'guest\'\n      });\n  });\n  console.log(\'LOGOUT: req session after logout\');\n  console.log(req.session);\n});\n\n\n\n/* GET home page. */\nrouter.get(\'/\', function(req, res, next) {\n  res.render(\'index\', {\n    title: \'listMe.xyz\',\n    user: req.session.user || \'guest\'\n  });\n});\n\n//FUNCTIONS FOR PASSWORD HASHING\n\n//Salt of password\nfunction saltPassword(passwordEntry) {\n  var salt = bcrypt.genSaltSync(10);\n  console.log(\'The salt is:\', salt);\n  return hashPassword(passwordEntry, salt);\n}\n\nfunction hashPassword(passwordEntry, salt) {\n  var hash = bcrypt.hashSync(passwordEntry, salt);\n  console.log(\'The hash is:\', hash);\n  return hash;\n}\n\nmodule.exports = router;",
          description: [
            {bullet: "Full stack CRUD to-do list."},
            {bullet: "Create, read, update and delete lists of todo items."},
            {bullet: "Create, update or delete user account."},
            {bullet: "Node, Express, knex, psql, JQuery, handlebars, CSS."}
          ],
          highlights: [
            {fact: "Higlhlight 1"},
            {fact: "Higlhlight 2"},
            {fact: "Higlhlight 3"},
          ],
          language: "jQuery",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
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
          code: "$.cloudinary.config({ cloud_name: \'writeit\', api_key: \'957122638812785\'});\n\n\n\n//VARIABLE DECLARATIONS\nlet richTextField = document.getElementById(\'richTextField\');\nlet buttonBold = document.getElementById(\'buttonBold\');\nlet buttonItalic = document.getElementById(\'buttonItalic\');\nlet buttonUnderline = document.getElementById(\'buttonUnderline\');\nlet buttonStrikethrough = document.getElementById(\'buttonStrikethrough\');\nlet buttonSubscript = document.getElementById(\'buttonSubscript\');\nlet buttonSuperscript = document.getElementById(\'buttonSuperscript\');\nlet buttonUndo = document.getElementById(\'buttonUndo\');\nlet buttonRedo = document.getElementById(\'buttonRedo\');\nlet buttonCut = document.getElementById(\'buttonCut\');\nlet buttonCopy = document.getElementById(\'buttonCopy\');\nlet buttonPaste = document.getElementById(\'buttonPaste\');\nlet buttonSelectAll = document.getElementById(\'buttonSelectAll\');\nlet buttonJustifyLeft = document.getElementById(\'buttonJustifyLeft\');\nlet buttonJustifyCenter = document.getElementById(\'buttonJustifyCenter\');\nlet buttonJustifyRight = document.getElementById(\'buttonJustifyRight\');\nlet buttonJustifyFull = document.getElementById(\'buttonJustifyFull\');\nlet buttonIndent = document.getElementById(\'buttonIndent\');\nlet buttonOutdent = document.getElementById(\'buttonOutdent\');\nlet buttonInsertUnorderedList = document.getElementById(\'buttonInsertUnorderedList\');\nlet buttonInsertOrderedList = document.getElementById(\'buttonInsertOrderedList\');\nlet buttonInsertParagraph = document.getElementById(\'buttonInsertParagraph\');\nlet selectParagraphStyle = document.getElementById(\'selectParagraphStyle\')\nlet buttonHorizontalRule = document.getElementById(\'buttonHorizontalRule\')\nlet buttonInsertLink = document.getElementById(\'buttonInsertLink\');\nlet buttonRemoveLink = document.getElementById(\'buttonRemoveLink\');\nlet buttonInlineSourceCode = document.getElementById(\'buttonInlineSourceCode\');\nlet buttonSourceCode = document.getElementById(\'buttonSourceCode\');\nlet buttonToggleEdit = document.getElementById(\'buttonToggleEdit\');\nlet toggleIcon = document.getElementById(\'toggleIcon\');\nlet selectFontStyle = document.getElementById(\'selectFontStyle\');\nlet selectFontSize = document.getElementById(\'selectFontSize\');\nlet buttonFontColor = document.getElementById(\'buttonFontColor\');\nlet inputFontColor = document.getElementById(\'inputFontColor\');\n// let inputBackgroundColor = document.getElementById(\'inputBackgroundColor\');\nlet buttonHighlightColor = document.getElementById(\'buttonHighlightColor\');\nlet inputHighlightColor = document.getElementById(\'inputHighlightColor\');\nlet buttonClearColorSettings = document.getElementById(\'buttonClearColorSettings\');\nlet buttonInsertOnlineImage = document.getElementById(\'buttonInsertOnlineImage\');\nlet buttonInsertOnlineVideo = document.getElementById(\'buttonInsertOnlineVideo\');\nlet buttonInsertCloudImage = document.getElementById(\'buttonInsertCloudImage\');\nlet formImageUploadCloudinary = document.getElementById(\'formImageUploadCloudinary\');\nlet cloudinary_fileupload = document.getElementsByClassName(\'cloudinary_fileupload\');\n\n\n\nlet formNewArticle = document.getElementById(\'formNewArticle\');\nlet buttonSubmitNewArticle = document.getElementById(\'buttonSubmitNewArticle\');\nlet inputNewArticleTitleVisible = document.getElementById(\'inputNewArticleTitleVisible\');\nlet inputNewArticle = document.getElementById(\'inputNewArticle\')\n\n\n\n\n\n\n//EVENT LISTENERS\nbuttonBold.addEventListener(\'click\', ()=>{execCmd(\'bold\', false, null)});\nbuttonItalic.addEventListener(\'click\', ()=>{execCmd(\'italic\', false, null)});\nbuttonUnderline.addEventListener(\'click\', ()=>{execCmd(\'underline\', false, null)});\nbuttonStrikethrough.addEventListener(\'click\', ()=>{execCmd(\'strikethrough\', false, null)});\nbuttonJustifyLeft.addEventListener(\'click\', ()=>{execCmd(\'justifyLeft\', false, null)});\nbuttonJustifyCenter.addEventListener(\'click\', ()=>{execCmd(\'justifyCenter\', false, null)});\nbuttonJustifyRight.addEventListener(\'click\', ()=>{execCmd(\'justifyRight\', false, null)});\nbuttonJustifyFull.addEventListener(\'click\', ()=>{execCmd(\'justifyFull\', false, null)});\nbuttonCut.addEventListener(\'click\', ()=>{execCmd(\'cut\', false, null)});\nbuttonCopy.addEventListener(\'click\', ()=>{execCmd(\'copy\', false, null)});\nbuttonPaste.addEventListener(\'click\', ()=>{execCmd(\'paste\', false, null)}); //This has a problem\nbuttonIndent.addEventListener(\'click\', ()=>{execCmd(\'indent\', false, null)});\nbuttonOutdent.addEventListener(\'click\', ()=>{execCmd(\'outdent\', false, null)});\nbuttonSubscript.addEventListener(\'click\', ()=>{execCmd(\'subscript\', false, null)});\nbuttonSuperscript.addEventListener(\'click\', ()=>{execCmd(\'superscript\', false, null)});\nbuttonUndo.addEventListener(\'click\', ()=>{execCmd(\'undo\', false, null)});\nbuttonRedo.addEventListener(\'click\', ()=>{execCmd(\'redo\', false, null)});\nbuttonInsertUnorderedList.addEventListener(\'click\', ()=>{execCmd(\'insertUnorderedList\', false, null)});\nbuttonInsertOrderedList.addEventListener(\'click\', ()=>{execCmd(\'insertOrderedList\', false, null)});\nbuttonInsertParagraph.addEventListener(\'click\', ()=>{execCmd(\'insertParagraph\', false, null)});\nselectParagraphStyle.addEventListener(\'change\', ()=>{execCmd(\'formatBlock\', false, selectParagraphStyle[selectParagraphStyle.selectedIndex].getAttribute(\'value\'))});\nbuttonHorizontalRule.addEventListener(\'click\', ()=>{execCmd(\'insertHorizontalRule\'), false, null});\nbuttonInsertLink.addEventListener(\'click\', ()=>{execCmd(\'createLink\', false, prompt(\'Please enter a URL\', \'http://\'))});\nbuttonRemoveLink.addEventListener(\'click\', ()=>{execCmd(\'unlink\', false, null)});\nbuttonInlineSourceCode.addEventListener(\'click\', ()=>{execCmdPrompt(\'insertHTML\', false, prompt(\'Please insert the raw html here\', \'Example: <h1>writeIt rocks!</h1>\'))});\nbuttonSourceCode.addEventListener(\'click\', ()=>{toggleSource()});\nbuttonToggleEdit.addEventListener(\'click\', ()=>{toggleEdit()})\nselectFontStyle.addEventListener(\'change\', ()=>{execCmd(\'fontName\', false, selectFontStyle[selectFontStyle.selectedIndex].getAttribute(\'value\', \'value\'))});\nselectFontSize.addEventListener(\'change\', ()=>{execCmd(\'fontSize\', false, selectFontSize[selectFontSize.selectedIndex].getAttribute(\'value\'))});\nbuttonFontColor.addEventListener(\'click\', ()=>{clickInputInsert(inputFontColor)});\ninputFontColor.addEventListener(\'change\', ()=>{execCmd(\'foreColor\', false, inputFontColor.value)}); //Not sure why the getAttribute(\'value\')  does not work\n// inputBackgroundColor.addEventListener(\'change\', ()=>{execCmd(\'backColor\', false, inputBackgroundColor.value)}); //Need to work on this. Will this come in the function through a form?\nbuttonHighlightColor.addEventListener(\'click\', ()=>{clickInputInsert(inputHighlightColor)});\ninputHighlightColor.addEventListener(\'change\', ()=>{execCmd(\'hiliteColor\', false, inputHighlightColor.value)});\nbuttonClearColorSettings.addEventListener(\'click\', clearColorSettings);\nbuttonInsertOnlineImage.addEventListener(\'click\', ()=>{execCmdPrompt(\'insertImage\', false, prompt(\'Please enter the image url\', \'http://\'))});\nbuttonInsertOnlineVideo.addEventListener(\'click\', ()=>{uploadOnlineVideo(prompt(\'Please enter the video url\', \'http://\'))})\nbuttonSelectAll.addEventListener(\'click\', ()=>{execCmd(\'selectAll\')});\nbuttonInsertCloudImage.addEventListener(\'click\', ()=>{clickInputInsert(cloudinary_fileupload[1])})\n\n\nbuttonSubmitNewArticle.addEventListener(\'mouseover\', ()=>{registerIframeInfo()});\ninputNewArticleTitleVisible.addEventListener(\'keyup\', inputUpdateTitle);\n\n\n\n\n\n\n\n// ----------FUNCTION DECLARATIONS=========================\n//ENABLE EDIT MODE FOR THE IFRAME AREA\nfunction enableEditMode() {\n  richTextField.contentDocument.designMode = \'On\';\n  richTextField.contentDocument.body.focus();\n}\n\n\n//EXECCOMMAND - ALLOWS US TO RUN COMMANDS TO MANIPULATE THE CONTENTS OF THE EDITABLE REGION\nfunction execCmd(command, bool, value) {\n  console.log(command);\n  event.preventDefault();\n  richTextField.contentDocument.execCommand(command, bool, value)\n  richTextField.contentDocument.body.focus();\n}\n\n\n//EXECCOMMAND FOR PROMPT USER INFO\nfunction execCmdPrompt(command, bool, value) {\n  if (value !== null) {\n    event.preventDefault();\n    richTextField.contentDocument.execCommand(command, bool, value)\n    richTextField.contentDocument.body.focus();\n  }\n}\n\n\n\n//SWITCH FROM TEXT EDITOR TO RAW HTML\nlet showingSourceCode = false; //A variable that defines if the view should be turned on or off\nfunction toggleSource() {\n  if (showingSourceCode) {\n    richTextField.contentDocument.getElementsByTagName(\'body\')[0].innerHTML = richTextField.contentDocument.getElementsByTagName(\'body\')[0].textContent;\n    showingSourceCode = false;\n  }\n  else {\n    richTextField.contentDocument.getElementsByTagName(\'body\')[0].textContent = richTextField.contentDocument.getElementsByTagName(\'body\')[0].innerHTML;\n    showingSourceCode = true;\n  }\n}\n// The textContent property sets or returns the textual content of the specified node, and all its descendants.\n// If you set the textContent property, any child nodes are removed and replaced by a single Text node containing the specified string.\n\n\n\n//SWITCH EDITOR ON AND OFF\nlet isInEditMode = true;\nfunction toggleEdit() {\n  if (isInEditMode) {\n    //Change the icon\n    event.preventDefault();\n    toggleIcon.classList.add(\'fa-toggle-off\');\n    toggleIcon.classList.remove(\'fa-toggle-on\');\n    //switch off the editor\n    richTextField.contentDocument.designMode = \'Off\';\n    isInEditMode = false;\n  }\n  else {\n    //Change the icon\n    event.preventDefault();\n    toggleIcon.classList.add(\'fa-toggle-on\');\n    toggleIcon.classList.remove(\'fa-toggle-off\');\n    //Switch on the editor\n    richTextField.contentDocument.designMode = \'On\';\n    richTextField.contentDocument.body.focus();\n    isInEditMode = true;\n  }\n}\n\n\n//CONNECT IFRAME TO THE TEXTAREA IN ORDER TO SUBMIT THE DATA TO DATABASE\nfunction registerIframeInfo(){\n  document.getElementById(\'textAreaNewArticle\').value = document.getElementById(\'richTextField\').contentDocument.body.innerHTML;\n}\n\n\n//CLEAR THE COLOR SETTINGS FOR FONT, HIGHLIGHT AND BACKGROUND\nfunction clearColorSettings() {\n  console.log(inputFontColor);\n  execCmd(\'foreColor\', false, \'#000000\');\n  execCmd(\'hiliteColor\', false, \'#ffffff\');\n  richTextField.contentDocument.body.focus();\n}\n\n\n//UPDATE THE TITLE IN THE HIDDEN INPUT FROM ENTRY IN THE VISIBLE INPUT\nfunction inputUpdateTitle() {\n  inputNewArticleTitle.value = inputNewArticleTitleVisible.value\n}\n\n\n//ACTIVATE INPUT TYPE=FILE TAGS BY CLICKING AT DIFFERENT BUTTONS\nfunction clickInputInsert(inputTag){\n  inputTag.click();\n}\n\n\n//UPLOAD AND RENDER IMAGE FROM HARD DRIVE\nfunction previewImageFile(source) {\n  let newImage = document.createElement(\'img\');\n\n  var file = source.files[0];\n  var reader = new FileReader(); //reads contents of files in the hard drive\n  reader.addEventListener(\'load\', function () {\n    newImage.src = reader.result;\n  }, false);\n\n\n  if (file) {\n    reader.readAsDataURL(file); //read contents of file and transform into base 64\n  }\n  console.log(newImage);\n  newImage.style.width = \'640px\';\n  // newImage.style.resize = \'both\';\n  // newImage.style.overflow = \'auto\';\n  // newImage.className = \'newImage\'\n\n  //Find the right position for image to be inserted\n  let cursorText = richTextField.contentDocument.getSelection().getRangeAt(0).endContainer.data; //returns a Selection object representing the text currently selected in the document.\n  let iframeChildren = richTextField.contentDocument.body.children;\n  for (let i = 0; i < iframeChildren.length; i++) {\n    console.log(\'innerHTML for position\' + i + \':\' + iframeChildren[i].textContent.replace(/&nbsp;/g, \'\').trim());\n    // console.log(\'CursorText: \' + cursorText.trim());\n    if (iframeChildren[i].textContent.replace(/&nbsp;/g, \'\').trim() === cursorText.trim()) {\n      console.log(\'IN THE FIRST IF STATEMENT\');\n      // richTextField.contentDocument.body.insertBefore(newImage, iframeChildren[i]);\n      iframeChildren[i].appendChild(newImage);\n\n      return;\n    }\n  }\n  if (richTextField.contentDocument.body.innerHTML === \'\') {\n    richTextField.contentDocument.body.appendChild(newImage);\n  }\n  else if (richTextField.contentDocument.body.innerHTML !== \'\') {\n    console.log(\'Got in the else statement\');\n    richTextField.contentDocument.body.insertBefore(newImage, iframeChildren[0]);\n  }\n  //Focus the document\n  richTextField.contentDocument.body.focus();\n}\n\n\n\n//UPLOAD AND RENDER VIDEO FROM HARD DRIVE\n//preview the information coming from the source\nfunction previewFile(dataSource, sourceTagSrcAttribute) {\n  var file = dataSource.files[0];\n  var reader = new FileReader(); //reads contents of files in the hard drive\n\n  reader.addEventListener(\'load\', ()=>{\n    sourceTagSrcAttribute.src = reader.result;\n    console.log(\'inside event listener\');\n\n    var dataURL = reader.result; //Get the information about the type of the file being imported\n    var mimeType = dataURL.split(\',\')[0].split(\':\')[1].split(\';\')[0];\n    sourceTagSrcAttribute.setAttribute(\'type\', mimeType);\n    console.log(sourceTagSrcAttribute.getAttribute(\'type\'));\n  }, false);\n\n  if (file) {\n    reader.readAsDataURL(file); //read contents of file and transform into base 64\n    console.log(file);\n  }\n}\n\n\n// find position in document and upload media file\nfunction findPositionAndUploadVideo(source) {\n\n  let newVideo = document.createElement(\'video\');\n  let newVideoSource = document.createElement(\'source\');\n  let cursorText = richTextField.contentDocument.getSelection().getRangeAt(0).endContainer.data; //returns a Selection object representing the text currently selected in the document.\n  let iframeChildren = richTextField.contentDocument.body.children;\n\n  newVideo.setAttribute(\'controls\', \'controls\');\n  newVideo.setAttribute(\'allowfullscreen\', \'allowfullscreen\');\n  newVideo.style.width = \'640px\';\n  newVideo.className = \'newVideo\';\n  newVideo.appendChild(newVideoSource);\n\n  if (richTextField.contentDocument.body.textContent === \'\') { //If the iframe is empty\n    console.log(\'first if statement\');\n    previewFile(source, newVideoSource);\n    setTimeout(function(){\n      richTextField.contentDocument.body.appendChild(newVideo);\n      richTextField.contentDocument.body.append(\'.\');\n      richTextField.contentDocument.body.focus();\n    }, 1000);\n  }\n  else if (richTextField.contentDocument.body.textContent !== \'\' && richTextField.contentDocument.body.children.length === 0) {//If the iframe has text but no html children\n    previewFile(source, newVideoSource);\n    setTimeout(function(){\n      richTextField.contentDocument.body.appendChild(newVideo);\n      richTextField.contentDocument.body.append(\'.\');\n      richTextField.contentDocument.body.focus();\n    }, 1000);\n  }\n  else if (richTextField.contentDocument.body.textContent !== \'\' && richTextField.contentDocument.body.children.length !== 0) {//The iframe has both content and html childrean\n    for (let i = 0; i < iframeChildren.length; i++) {\n      console.log(\'innerHTML for position\' + i + \':\' + iframeChildren[i].innerHTML.replace(/&nbsp;/g, \'\').trim());\n      console.log(cursorText);\n      console.log(iframeChildren[i].textContent);\n      // console.log(\'CursorText: \' + cursorText.trim());\n      if (cursorText === undefined && iframeChildren[i].textContent.replace(/&nbsp;/g, \'\').trim() === \'\') {\n        console.log(\'IN THE IF OF THE ELSE\');\n        previewFile(source, newVideoSource);\n        setTimeout(function(){\n          iframeChildren[i].appendChild(newVideo);\n          richTextField.contentDocument.body.append(\'.\');\n          richTextField.contentDocument.body.focus();\n        }, 1000);\n        return;\n      }\n      else if (iframeChildren[i].textContent.replace(/&nbsp;/g, \'\').trim() === cursorText.trim()) {\n        console.log(\'IN THE ELSE IF OF THE ELSE\');\n        // richTextField.contentDocument.body.insertBefore(newVideo, iframeChildren[i]);\n        previewFile(source, newVideoSource);\n        setTimeout(function(){\n          iframeChildren[i].appendChild(newVideo);\n          richTextField.contentDocument.body.append(\'.\');\n          richTextField.contentDocument.body.focus();\n        }, 1000);\n        return;\n      }\n    }\n  }\n}\n\n\n\n//UPLOAD IMAGES OR VIDEOS FROM HARD DRIVE\n$(\'.cloudinary_fileupload\').append($.cloudinary.unsigned_upload_tag(\'z2mez0vj\',\n{ cloud_name: \'writeit\' })\n  .bind(\'fileuploadprogress\', function(e, data) {\n    $(\'.progress_bar\').css(\'width\', Math.round((data.loaded * 100.0) / data.total) + \'%\');\n  })\n  .bind(\'cloudinarydone\', function(e, data) {\n    console.log(e);\n    console.log(data.result);\n      console.log(data.result.path);\n      console.log(data.result.path.slice(data.result.path.length - 3));\n\n      if (data.result.path.slice(data.result.path.length - 3) === \'jpg\' || data.result.path.slice(data.result.path.length - 3) === \'png\' || data.result.path.slice(data.result.path.length - 3) === \'bmp\') {\n        let newImageSource = \'https://res.cloudinary.com/writeit/image/upload/w_640,q_80,f_auto/\' + data.result.path.slice(0, data.result.path.length - 3) + \'jpg\';\n        let newImage = document.createElement(\'img\');\n        newImage.src = newImageSource;\n        newImage.className = \'newImage\';\n        execCmdPrompt(\'insertImage\', false, newImageSource);\n      }\n      else if (data.result.path.slice(data.result.path.length - 3) === \'mp4\' || data.result.path.slice(data.result.path.length - 3) === \'mov\') {\n        let newVideoSource = \'https://res.cloudinary.com/writeit/video/upload/w_640,q_80/\' + data.result.path.slice(0, data.result.path.length - 3);\n        console.log(\'https://res.cloudinary.com/writeit/video/upload/w_640,q_80/\' + data.result.path.slice(0, data.result.path.length - 3) + \'mp4\');\n        let htmlVideoTag = \'<video poster=\' + newVideoSource + \'jpg controls><source src=\\'\' + newVideoSource + \'mp4\\'/></video>\'\n        execCmdPrompt(\'insertHTML\', false, htmlVideoTag);\n      }\n      else if (data.result.path.slice(data.result.path.length - 3) === \'gif\') {\n        let newGifSource = \'https://res.cloudinary.com/writeit/image/upload/w_320,q_80/\' + data.result.path.slice(0, data.result.path.length - 3);\n        let htmlGifVideoTag = \'<video poster=\' + newGifSource + \'jpg autoplay loop><source src=\\'\' + newGifSource + \'mp4\\'/></video>\'\n        execCmdPrompt(\'insertHTML\', false, htmlGifVideoTag);\n      }\n      else {\n        alert(\'The file you are trying to upload is not supported\');\n      }\n  })\n);\n\n\n// UPLOAD ONLINE VIDEOS\n  function uploadOnlineVideo(url){\n    var uploadParameter = \'<iframe width=\\'640\\' height=\\'360\\' src=\\'\' + url + \'\\' frameborder=\\'0\\' allowfullscreen></iframe>\'\n    execCmdPrompt(\'insertHTML\', false, uploadParameter)\n  }\n\n\n\n\n//FUNCTION CALLS\nenableEditMode();",
          description:
          [
            {bullet: "Full stack blog."},
            {bullet: "WYSIWYG text editor."},
            {bullet: "Image, video upload."},
            {bullet: "Responsive / mobile."},
            {bullet: "Node, Express, psql, JavaScript, handlebars, html, CSS"}
          ],
          highlights: [
            {fact: "Higlhlight 1"},
            {fact: "Higlhlight 2"},
            {fact: "Higlhlight 3"},
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
          id: "writeItVanilla",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 3,
          title: "CSS Tutorial",
          url: "https://papostolopoulos.github.io/css-exploration/index.html",
          git: "https://github.com/papostolopoulos/css-exploration",
          code_url: "",
          code: "/*\n  ========================================\n  006 Responsive design\n  ========================================\n*/\n\n@media screen and (max-width: 768px) {\n\n	body {\n		width: 100vw;\n		display: block;\n	}\n\n	h1 {\n		font-size: 180%;\n		line-height: 45px;\n	}\n\n	h2 {\n		font-size: 150%;\n	}\n\n	h3 {\n		font-size: 140%;\n		margin-top: -10px;\n	}\n\n	p {\n		font-size: 100%;\n	}\n\n	li {\n		font-size: 100%;\n	}\n\n	code {\n		font-size: 120%;\n	}\n\n	#container {\n		display: block;\n	}\n\n	aside {\n		width: 100%;\n		display: block;\n		height: 65px;\n		margin: -65px 0 0 0;\n		padding: 0 0 0 10px;\n		position: fixed;\n		right: 0px;\n		left: 0px;\n		background-color: rgba(35, 57, 91, .9);\n	}\n\n	header {\n		position: absolute;\n		width: 100%;\n	}\n\n	#logoDiv {\n		position: absolute;\n		margin: 5px 0 0 80%;\n		display: block;\n	}\n\n	#burger {\n		float: left;\n		width: 50%;\n		display: block;\n	}\n\n	.images {\n		width: 100%;\n	}\n\n	.boxModelsImages {\n		width: 100%;\n	}\n\n	nav {\n		padding: 15px;\n		margin-left: -12px;\n		margin-top: -10px;\n		width: 200px;\n	}\n\n	#menuBarUl {\n		border: 2px solid rgb(107, 247, 237);\n		padding-left: 30px;\n		margin-left: -12px;\n	}\n\n	nav ol, nav:active ol {\n		display: none;\n		z-index: 1000;\n	}\n\n	nav:hover, nav:hover ol {\n		display: block;\n		position: absolute;\n	}\n\n	nav:hover ol {\n		margin: 40px 0 0 0;\n		background-color: rgb(35, 57, 91);\n		padding: 0 10px;\n	}\n\n\n/*MAIN SECTION*/\n		section {\n			display: block;\n			width: 100%;\n			text-align: justify;\n		}\n\n		#mainSectionId {\n			width: 100%;\n			margin-top: 65px;\n		}\n\n		#interactiveSectionId {\n			width: 100%;\n			padding: 0 20px 10px 0;\n		}\n\n\n/*FOOTER*/\n		footer {\n			width: 100%;\n			height: 100%;\n			padding: 10px;\n			font-size: 120%;\n			line-height: 30px;\n		}\n\n} /*End of mobile design*/",
          description: [
            {bullet: "CSS tutorial with basic aspects of CSS."},
            {bullet: "Reset, Specificity, the Box Model, Positioning, Typography, Backgrounds, Responsive Design."},
            {bullet: "Responsive, mobile."},
            {bullet: "HTML, Vanilla CSS."}
          ],
          highlights: [
            {fact: "Higlhlight 1"},
            {fact: "Higlhlight 2"},
            {fact: "Higlhlight 3"},
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
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
          code: "window.onload = function(){\n  var artistSearchForm = document.getElementById(\'artistSearchForm\');\n  var artistNameEntry = document.getElementById(\'artistNameEntry\');\n  var submitButton = document.getElementById(\'submitButton\');\n\n  artistSearchForm.addEventListener(\'submit\', function (event) {\n    //Clear up the main content and prevent default\n    event.preventDefault();\n\n\n    var articlesDiv = document.getElementById(\'articlesDiv\');\n    articlesDiv.innerHTML = \'\';\n    var nameEntryValue = artistNameEntry.value.replace(/\s/g, \'+\');\n\n    fetch(\'https://api.spotify.com/v1/search?q=\\'\' + nameEntryValue + \'\\'&type=artist&limit=1\',\n    {\n      method: \'GET\',\n      headers: {\n        \'Authorization\': \'Basic *&lt;base64 encoded d0acac994f0e4947b5eacdc3c480e31d:c5fe231aa97a41b29bef006c193a8a1c&gt;*\',\n        \'Accept\': \'application/json\',\n        \'Content-Type\': \'application/json\'\n      }\n    })\n    .then(function (response) {\n      return response.json();\n    })\n    .then(function (json) {\n      console.log(\'JSON is\', json);\n      if (json.artists.items[0] === undefined) {\n        var errorMessage = document.createElement(\'h3\');\n        errorMessage.innerHTML = \'Sorry but your search did not return any results\';\n        articlesDiv.appendChild(errorMessage);\n        artistSearchForm.reset();\n      }\n      console.log(\'json.artists is\', json.artists);\n      var artistId = json.artists.items[0].id;\n      console.log(\'artistId is\', artistId);\n      return artistId\n    })\n    .then(function (artistId) {\n      fetch(\'https://api.spotify.com/v1/artists/\' + artistId + \'/albums\',\n      {\n        method: \'GET\',\n        headers: {\n          \'Authorization\': \'Basic base64 encoded d0acac994f0e4947b5eacdc3c480e31d:c5fe231aa97a41b29bef006c193a8a1c\',\n          \'Accept\': \'application/json\',\n          \'Content-Type\': \'application/json\'\n        }\n      })\n      .then(function(response) {\n        return response.json();\n      })\n      .then(function (json) {\n        var jsonItems = json.items;\n        console.log(\'json items is\', jsonItems);\n        var albums = [];\n        for (let i = 0; i &lt; jsonItems.length; i++) {\n          var albumItem = {}\n          albumItem.artistName = artistNameEntry.value\n          albumItem.albumName = jsonItems[i].name;\n          albumItem.albumID = jsonItems[i].id;\n          albumItem.tracks = {};\n          albumItem.images = jsonItems[i].images;\n          albums.push(albumItem);\n        }\n        return albums;\n      })\n      .then(function(albums) {\n        var trackPromises = [];\n        for (let j = 0; j &lt; albums.length; j++) {\n          let trackPromise = fetch(\'https://api.spotify.com/v1/albums/\' + albums[j].albumID + \'/tracks\',\n          {\n            method: \'GET\',\n            headers: {\n              \'Authorization\': \'Bearer BQBd97aViKgz3QrJQQ8KNh-bc5r8ZEEYYIXrz7fdsaSyQRD_lAHVSGNHfWzuXlrwKyqrPXYWQTM6sQAHw6NHql1q4TFWP9sxqK83bhja_jzpOkLairz61aADXU9Se85RdRd7ZPeWg_142GEB6Q\',\n              \'Accept\': \'application/json\',\n              \'Content-Type\': \'application/json\'\n            }\n          })\n          .then(function (response) {\n            return response.json();\n          })\n          .then(function (json) {\n            var albumTracks = json.items;\n            for (let k = 0; k &lt; albumTracks.length; k++) {\n              albums[j].tracks[\'song\'+(k+1)] = albumTracks[k].name;\n            }\n            return albums[j];\n          });\n          trackPromises.push(trackPromise);\n        } //End of the for loop\n        return Promise.all(trackPromises);\n      })//good up to here. put parenthesis if it does not work\n      .then(function(albums) {\n        // var articlesDiv = document.getElementById(\'articlesDiv\');\n\n        var articleH1 = document.createElement(\'h1\');\n        // var h1Value = artistNameEntry.value.slice(0,1).toUpperCase() + artistNameEntry.value.slice(1).toLowerCase() + \' Discography\';\n        var h1Value = artistNameEntry.value[0].toUpperCase();\n        for (let o = 1; o &lt; artistNameEntry.value.length; o++) {\n          if (artistNameEntry.value[o-1] === \' \') {\n            h1Value += artistNameEntry.value[o].toUpperCase();\n          }\n          else {\n            h1Value += artistNameEntry.value[o].toLowerCase();\n          }\n        }\n\n        h1Value += \' Discography\'\n        articleH1.innerHTML = h1Value;\n        articlesDiv.appendChild(articleH1)\n\n        var articleH1 = document.createElement(\'h1\');\n        articleH1.innerHTML = artistNameEntry;\n\n        for (let l = 0; l &lt; albums.length; l++) {\n          var albumTitle = document.createElement(\'h3\');\n          albumTitle.innerHTML = albums[l].albumName\n          // console.log(albums[l].images[0].height);\n\n          let albumSongs = albums[l].tracks;\n\n          var albumOl = document.createElement(\'ol\');\n          var counter = 1\n          for (let key in albumSongs) {\n            var albumLi = document.createElement(\'li\');\n            albumLi.innerHTML = counter + \'. \' + albumSongs[key];\n            albumOl.appendChild(albumLi);\n            counter++\n          }\n\n          var backgroundImageURL = albums[l].images[1].url;\n          console.log(backgroundImageURL);\n          // var image = document.createElement(\'img\');\n          // image.src = backgroundImageURL;\n          var textDiv = document.createElement(\'div\');\n\n          var article = document.createElement(\'article\');\n          article.className += \'albumSlot\';\n          article.style.background = \'url(\' + backgroundImageURL + \')\';\n          // article.appendChild(image);\n          textDiv.appendChild(albumTitle);\n          textDiv.appendChild(albumOl);\n          article.appendChild(textDiv);\n\n\n          // var articlesDiv = document.getElementById(\'articlesDiv\');\n          articlesDiv.appendChild(article);\n        }\n        console.log(albums);\n      });\n    });\n    // artistSearchForm.reset();\n  }); //End of submit Event Listener\n\n}; //End of window.onload",
          description: [
            {bullet: "API calls to the Spotify API."},
            {bullet: "Search for artists' discographies."},
            {bullet: "Review the song titles and album covers"},
            {bullet: "JavaScript, Ajax calls, CSS, HTML"}
          ],
          highlights: [
            {fact: "Higlhlight 1"},
            {fact: "Higlhlight 2"},
            {fact: "Higlhlight 3"},
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
          code: "window.onload = function () {\n\n  var fileMenu = document.getElementById(\'fileMenu\');\n  var fileSubMenu = document.getElementById(\'fileSubMenu\');\n  fileMenu.subMenu = fileSubMenu;\n\n  var editMenu = document.getElementById(\'editMenu\');\n  var editSubMenu = document.getElementById(\'editSubMenu\');\n  editMenu.subMenu = editSubMenu;\n\n  var imageMenu = document.getElementById(\'imageMenu\');\n  var imageSubMenu = document.getElementById(\'imageSubMenu\');\n  imageMenu.subMenu = imageSubMenu;\n\n  var layerMenu = document.getElementById(\'layerMenu\');\n  var layerSubMenu = document.getElementById(\'layerSubMenu\');\n  layerMenu.subMenu = layerSubMenu;\n\n  var adjustmentMenu = document.getElementById(\'adjustmentMenu\');\n  var adjustmentSubMenu = document.getElementById(\'adjustmentSubMenu\');\n  adjustmentMenu.subMenu = adjustmentSubMenu;\n\n  var filterMenu = document.getElementById(\'filterMenu\');\n  var filterSubMenu = document.getElementById(\'filterSubMenu\');\n  filterMenu.subMenu = filterSubMenu;\n\n  var viewMenu = document.getElementById(\'viewMenu\');\n  var viewSubMenu = document.getElementById(\'viewSubMenu\');\n  viewMenu.subMenu = viewSubMenu;\n\n  var fractalsMenu = document.getElementById(\'fractalsMenu\');\n  var fractalsSubMenu = document.getElementById(\'fractalsSubMenu\');\n  fractalsMenu.subMenu = fractalsSubMenu;\n\n  var helpMenu = document.getElementById(\'helpMenu\');\n  var helpSubMenu = document.getElementById(\'helpSubMenu\');\n  helpMenu.subMenu = helpSubMenu;\n\n  var verticalMenus = document.getElementsByClassName(\'menuVertical\');\n\n  fileMenu.addEventListener(\'click\', showFileMenu);\n  editMenu.addEventListener(\'click\', showEditMenu);\n  imageMenu.addEventListener(\'click\', showImageMenu);\n  layerMenu.addEventListener(\'click\', showLayerMenu);\n  adjustmentMenu.addEventListener(\'click\', showAdjustmentMenu);\n  filterMenu.addEventListener(\'click\', showFilterMenu);\n  viewMenu.addEventListener(\'click\', showViewMenu);\n  fractalsMenu.addEventListener(\'click\', showFractalsMenu);\n  helpMenu.addEventListener(\'click\', showHelpMenu);\n\n  function showFileMenu() {\n    fileSubMenu.style.visibility === \'\' || fileSubMenu.style.visibility === \'hidden\' ? fileSubMenu.style.visibility = \'visible\' : fileSubMenu.style.visibility = \'hidden\';\n  }\n  function showEditMenu() {\n    editSubMenu.style.visibility === \'\' || editSubMenu.style.visibility === \'hidden\' ? editSubMenu.style.visibility = \'visible\' : editSubMenu.style.visibility = \'hidden\';\n  }\n  function showImageMenu() {\n    imageSubMenu.style.visibility === \'\' || imageSubMenu.style.visibility === \'hidden\' ? imageSubMenu.style.visibility = \'visible\' : imageSubMenu.style.visibility = \'hidden\';\n  }\n  function showLayerMenu() {\n    layerSubMenu.style.visibility === \'\' || layerSubMenu.style.visibility === \'hidden\' ? layerSubMenu.style.visibility = \'visible\' : layerSubMenu.style.visibility = \'hidden\';\n  }\n  function showAdjustmentMenu() {\n    adjustmentSubMenu.style.visibility === \'\' || adjustmentSubMenu.style.visibility === \'hidden\' ? adjustmentSubMenu.style.visibility = \'visible\' : adjustmentSubMenu.style.visibility = \'hidden\';\n  }\n  function showFilterMenu() {\n    filterSubMenu.style.visibility === \'\' || filterSubMenu.style.visibility === \'hidden\' ? filterSubMenu.style.visibility = \'visible\' : filterSubMenu.style.visibility = \'hidden\';\n  }\n  function showViewMenu() {\n    viewSubMenu.style.visibility === \'\' || viewSubMenu.style.visibility === \'hidden\' ? viewSubMenu.style.visibility = \'visible\' : viewSubMenu.style.visibility = \'hidden\';\n  }\n  function showFractalsMenu() {\n    fractalsSubMenu.style.visibility === \'\' || fractalsSubMenu.style.visibility === \'hidden\' ? fractalsSubMenu.style.visibility = \'visible\' : fractalsSubMenu.style.visibility = \'hidden\';\n  }\n  function showHelpMenu() {\n    helpSubMenu.style.visibility === \'\' || helpSubMenu.style.visibility === \'hidden\' ? helpSubMenu.style.visibility = \'visible\' : helpSubMenu.style.visibility = \'hidden\';\n  }\n\n  // helpMenu.addEventListener(\'mouseover\', showHelpMenuMouseOver);\n\n\n  fileMenu.addEventListener(\'mouseover\', showMenuMouseOver);\n  editMenu.addEventListener(\'mouseover\', showMenuMouseOver);\n  imageMenu.addEventListener(\'mouseover\', showMenuMouseOver);\n  layerMenu.addEventListener(\'mouseover\', showMenuMouseOver);\n  adjustmentMenu.addEventListener(\'mouseover\', showMenuMouseOver);\n  filterMenu.addEventListener(\'mouseover\', showMenuMouseOver);\n  viewMenu.addEventListener(\'mouseover\', showMenuMouseOver);\n  fractalsMenu.addEventListener(\'mouseover\', showMenuMouseOver);\n  helpMenu.addEventListener(\'mouseover\', showMenuMouseOver);\n  //\n  function showMenuMouseOver() {\n    if (this.subMenu.style.visibility === \'visible\') {\n      return;\n    }\n    //This is the primary code\n    this.subMenu.style.visibility = \'hidden\'\n    for (var i = 0; i &lt; verticalMenus.length; i++) {\n      if (verticalMenus[i].style.visibility === \'visible\' && this.subMenu.style.visibility === \'hidden\') {\n        verticalMenus[i].style.visibility = \'hidden\';\n        this.subMenu.style.visibility = \'visible\';\n      }\n    }\n  }\n\n\n\n  function hideMenus() {\n    for (var i = 0; i &lt; verticalMenus.length; i++) {\n      verticalMenus[i].addEventListener(\'click\', hideIt);\n    }\n\n    function hideIt() {\n      if (this.style.visibility === \'visible\') {\n        this.style.visibility = \'hidden\';\n      }\n    }\n  }\n\n  hideMenus();\n\n};",
          description: [
            {bullet: "Image editing and filters application."},
            {bullet: "Open images from the hard drive or online sources."},
            {bullet: "Filters for brightness, contrast, transparency, grayscale, blur etc."},
            {bullet: "Save in a different image formats."},
            {bullet: "Node, JavaScript, CSS, HTML"}
          ],
          highlights: [
            {fact: "Higlhlight 1"},
            {fact: "Higlhlight 2"},
            {fact: "Higlhlight 3"},
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
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
          code: "var sourcesArr = [\n  {\n    source: \'ESPN\',\n    url: \'https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=909efd3e931c4e16bde5565b8d10f113\'\n  },\n  {\n    source: \'ESPN Cric Info\',\n    url: \'https://newsapi.org/v1/articles?source=espn-cric-info&sortBy=latest&apiKey=909efd3e931c4e16bde5565b8d10f113\',\n  },\n  {\n    source: \'Fox Sports\',\n    url: \'https://newsapi.org/v1/articles?source=fox-sports&sortBy=latest&apiKey=909efd3e931c4e16bde5565b8d10f113\'\n  },\n  {\n    source: \'NFL News\',\n    url: \'https://newsapi.org/v1/articles?source=nfl-news&sortBy=latest&apiKey=909efd3e931c4e16bde5565b8d10f113\'\n  },\n  {\n    source: \'SKY Sports News\',\n    url: \'https://newsapi.org/v1/articles?source=sky-sports-news&sortBy=latest&apiKey=909efd3e931c4e16bde5565b8d10f113\'\n  },\n  {\n  source: \'BBC Sports\',\n  url: \'https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=909efd3e931c4e16bde5565b8d10f113\'\n  },\n  {\n    source: \'FourFourTwo\',\n    url: \'https://newsapi.org/v1/articles?source=four-four-two&sortBy=latest&apiKey=909efd3e931c4e16bde5565b8d10f113\'\n  },\n  {\n    source: \'talkSport\',\n    url: \'https://newsapi.org/v1/articles?source=talksport&sortBy=latest&apiKey=909efd3e931c4e16bde5565b8d10f113\'\n  },\n  {\n    source: \'TheSPORTbible\',\n    url: \'https://newsapi.org/v1/articles?source=the-sport-bible&sortBy=latest&apiKey=909efd3e931c4e16bde5565b8d10f113\'\n  },\n  {\n    source: \'Football Italia\',\n    url: \'https://newsapi.org/v1/articles?source=football-italia&sortBy=latest&apiKey=909efd3e931c4e16bde5565b8d10f113\'\n  }\n];\nvar expandedSourcesArr = [];\n//shuffle the array\nfunction shuffleArray(array) {\n    for (var i = array.length - 1; i &gt; 0; i--) {\n        var j = Math.floor(Math.random() * (i + 1));\n        var temp = array[i];\n        array[i] = array[j];\n        array[j] = temp;\n    }\n    return array;\n  }\n\n//reload the page\nfunction pageReload(time) {\n  setTimeout(reloadFun, time);\n}\n//callback for reloading the page\nfunction reloadFun() {\n  window.location.reload(true);\n}\n\nwindow.onload = function() {\n  shuffleArray(sourcesArr);\n  heroSectionArticles(sourcesArr);\n  sportsSectionArticles(sourcesArr);\n\n  toggleHeroClass();\n  toggleArticleClasses();\n  pageReload(600000);\n};//End of onload function\n\n\nfunction expandSources(arrWithSources, endArr) {\n  for (var i = 0; i &lt; arrWithSources.length; i++) {\n    let sourcesUrl = arrWithSources[i].url;\n    $.getJSON(sourcesUrl, function (result) {\n      endArr.push(result);\n      // console.log(result);\n    });\n  }\n}\nexpandSources(sourcesArr, expandedSourcesArr);\n// console.log(expandedSourcesArr);\n//---------------------HERO CONTENT CREATION------------------------------\n//creation and append of the article tags in the main Grid\nfunction heroSectionArticles(arrWithSources) {\n  let heroSection = document.getElementById(\'heroSection\');\n  let sourcesUrl = arrWithSources[0].url;\n  let heroArticle = document.createElement(\'article\');\n  heroArticle.className += \'heroArticleClass\';\n  // heroArticle.className += \' transform\'; Not needed because I am not applying special effect\n  arrWithSources[0] = heroArticle;\n  apiData(0, sourcesUrl);\n  heroSection.appendChild(heroArticle);\n}\n\n\n//------------------MAIN GRID CONTENT CREATION----------------------------\n//creation and append of the article tags in the main Grid\nfunction sportsSectionArticles(arrWithSources) {\n  let sportsSection = document.getElementById(\'sportsSection\');\n  for (let i = 1; i &lt; arrWithSources.length; i++) {\n    let sourcesUrl = arrWithSources[i].url;\n\n    function jSonArr(url) {\n      $.getJSON(url, function (result) {\n        // console.log(result);\n      });\n    }\n    jSonArr(sourcesUrl);\n\n    let sportsArticle = document.createElement(\'article\');\n    sportsArticle.className += \'sportsArticleClass\';\n    // sportsArticle.className += \' transform\'; //not needed because I am not applying special effect\n    arrWithSources[i] = sportsArticle;\n    apiData(i, sourcesUrl);\n    sportsSection.appendChild(sportsArticle);\n  }\n}\n\n//api Data retrieval\nfunction apiData(idxForSourcesArr, url) {\n  // console.log(\'The url is: \' + url);\n  $.ajax({\n    url: url,\n    method: \'GET\',\n    success: sportsNewsResult\n    // error: bbcNewsError\n  });\n\n  // Inner function in order to close over idxForSourcesArr\n  function sportsNewsResult(data) {\n    //articles\n    let resultTitle = document.createElement(\'h3\');\n    let resultSource = document.createElement(\'h4\');\n    let imageDiv = document.createElement(\'div\');\n    let heroImageDiv = document.createElement(\'div\');//////////////////////////////\n    let resultImage = document.createElement(\'img\');\n    let resultArticle = document.createElement(\'p\');\n    let articleSourceAnchor = document.createElement(\'a\');\n\n    let moreButtonDiv = document.createElement(\'div\');\n    let moreButtonAnchor = document.createElement(\'a\');\n\n    resultTitle.textContent = data.articles[0].title;\n    imageDiv.className += \'imageDiv\';\n    heroImageDiv.className += \'heroImageDiv\';/////////////////////////////////\n    moreButtonDiv.className += \'moreButtonDiv\';\n\n    articleSourceAnchor.setAttribute(\'href\', data.articles[0].url);\n    articleSourceAnchor.setAttribute(\'target\', \'_blank\');\n    resultImage.setAttribute(\'alt\', \'Sorry, there is no image provided by the source\');\n    articleSourceAnchor.innerText = \'Source: \' + data.source + \' via newsapi.org \';\n    resultImage.src = data.articles[0].urlToImage;\n    resultArticle.textContent = data.articles[0].description;\n    moreButtonAnchor.innerText = \'More\';\n\n    //\n    imageDiv.appendChild(resultImage);\n    resultSource.appendChild(articleSourceAnchor);\n    moreButtonDiv.appendChild(moreButtonAnchor);\n    sourcesArr[idxForSourcesArr].appendChild(imageDiv);\n    sourcesArr[idxForSourcesArr].appendChild(resultTitle);\n    sourcesArr[idxForSourcesArr].appendChild(resultSource);\n    sourcesArr[idxForSourcesArr].appendChild(resultArticle);\n    sourcesArr[idxForSourcesArr].appendChild(moreButtonDiv);\n\n  }\n} //End of apiData function\n\n// function bbcNewsError {\n//\n// }\n\n//-------------------TOGGLES------------------------------\n//toggle between classes for expanding the hero article content\nfunction toggleHeroClass() {\n  $(\'.heroArticleClass\').on(\'click\', function(){\n    $(this).toggleClass(\'heroArticleExpanded\');\n    $(this).children(\'div\').toggleClass(\'heroImageDivExpanded\');\n    $(this).children(\'div\').toggleClass(\'imageDiv\');\n    $(this).children(\'.moreButtonDiv\').removeClass(\'imageDiv\');\n\n    $(\'.sportsArticleExpanded\').removeClass(\'sportsArticleExpanded\');\n    $(\'.imageDivExpanded\').removeClass(\'imageDivExpanded\');\n  });\n}\n\n//toggle between classes for expanding the article content\nfunction toggleArticleClasses() {\n  $(\'.sportsArticleClass\').on(\'click\', function(){\n    $(this).toggleClass(\'sportsArticleExpanded\');\n    $(this).children(\'.imageDiv\').toggleClass(\'imageDivExpanded\');\n\n    $(this).siblings().removeClass(\'sportsArticleExpanded\');\n    $(\'.heroArticleExpanded\').removeClass(\'heroArticleExpanded\');\n    $(\'.heroImageDivExpanded\').addClass(\'heroImageDiv\');\n    $(\'.heroImageDivExpanded\').removeClass(\'heroImageDivExpanded\');\n    $(this).siblings().children(\'div\').removeClass(\'imageDivExpanded\');\n  });\n}",
          description: [
            {bullet: "Sports news aggregator."},
            {bullet: "News API calls"},
            {bullet: "JavaScript, AJAX, CSS, HTML"}
          ],
          highlights: [
            {fact: "Higlhlight 1"},
            {fact: "Higlhlight 2"},
            {fact: "Higlhlight 3"},
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
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
          code: "$(document).ready(function(){\n  var alphabet = [\'a\', \'b\', \'c\', \'d\', \'e\', \'f\', \'g\', \'h\', \'i\', \'j\', \'k\', \'l\', \'m\', \'n\', \'o\', \'p\', \'q\', \'r\', \'s\', \'t\', \'u\', \'v\', \'w\', \'x\', \'y\', \'z\', \' \', \'\'\', \'-\'];\n  var imageChanger = 1;\n\n  //FUNCTIONS\n  //1. New random word\n  function newRandomWord(){\n    var url = \'https://wordsapiv1.p.mashape.com/words/?random=true\';\n    fetch(url, {\n      method: \'GET\',\n      headers: {\n        \'X-Mashape-Key\': \'N5TPAl6S0Dmsh231cDKa7vKInQxwp1iMvEWjsniJfs7d8e0C86\',\n        \'Accept\': \'application/json\',\n        \'Content-Type\': \'application/json\'\n      }\n    })\n    .then(function(response) {\n      return response.json();\n    })\n    .then(function(data) {\n      return data.word;\n    })\n    .then(function(word) {\n      var randomWord = word.toLowerCase();\n      var newRow = $(\'tr\');\n      console.log(\'The new random word is: \' + randomWord);\n      for (var i = 0; i &lt; randomWord.length; i++) {\n        newRow.append($(\'&lt;td class=\'randomWordTd randomWordTdWhite\'&gt;\' + randomWord[i] + \'&lt;/td&gt;\'));\n      }\n      $(\'#randomWordTable\').append(function(){\n          $(newRow).show(2000);\n      });\n      $(\'.remainingLetters\').html(\'&lt;h3&gt;You have \' + randomWord.length + \' letters remaining for guessing&lt;/h3&gt;\');\n      $(\'#usedLetters\').empty();\n      $(\'#wordSubmit\').off(); //You can move this in the \'new game action\'. Also put and elseif statement in the event the user clicks on wordSubmit but has not entered a word\n      $(\'#wordSubmit\').click(function(){\n        var $wordGuess = $(\'#iKnowTheWord\').val().toLowerCase();\n        if ($wordGuess === randomWord) {\n          $(\'#infoMessage\').html(\'&lt;h3&gt;That is great! You have guessed the word. YOU WON!&lt;/h3&gt;\');\n          $(\'#imageArea\').html(\'&lt;img class=\'finalImage\' src=\'assets/images/escape.gif\'&gt;\');\n          $(\'#iKnowTheWord\').val(\'\');\n        }\n        else {\n          console.log(\'word guess is: \', $wordGuess, \'the random word is\', randomWord);\n          $(\'#infoMessage\').html(\'&lt;h3&gt;Sorry, the right word is \' + randomWord + \'. You lost :-(&lt;/h3&gt;\');\n          $(\'#imageArea\').html(\'&lt;img src=\'assets/images/12.jpg\'&gt;\');\n          $(\'#iKnowTheWord\').val(\'\');\n        }\n      });\n    });\n  }\n\n  //2. New letter entry\n\n  function newLetterEntry() {\n    var $letterGuess = $(\'#newLetter\').val().toLowerCase();\n    // alert($letterGuess);\n    var counter = 0;\n    var $wordToGuess = $(\'td[class=\'randomWordTd randomWordTdWhite\']\').text();\n    var $guessedLetters = $(\'td[class=\'randomWordTd randomWordTdBlack\']\').text();\n    var wordLength = $wordToGuess.length;\n    // console.log(\'The remaining letters are: \' + $wordToGuess);\n    // console.log(\'The found letters are: \' + $guessedLetters);\n    var usedLettersString = $(\'#usedLetters\').text()\n    if (usedLettersString.indexOf($letterGuess) !== -1 || $guessedLetters.indexOf($letterGuess) !== -1) {\n      $(\'#infoMessage\').html(\'&lt;h3&gt;You have already tried to guess this letter. Try again.\');\n    }\n    else {\n      for (var i = 0; i &lt; wordLength; i++) {\n        // console.log(\'checking on position \' + i + \' for the element \' + $wordToGuess[i] + \' and with image changer \' + imageChanger);\n        if ($letterGuess === $wordToGuess[i]) {\n          // console.log(\'Inside the if statement. $letterGuess is \' + $letterGuess + \' and $wordToGuess is \' + $wordToGuess[i] + \' for position \' + i);\n          $(\'#infoMessage\').html(\'&lt;h3&gt;That is correct! The letter \'\' + $letterGuess + \'\' is included in the secret word&lt;/h3&gt;\');\n          $($(\'td[class=\'randomWordTd randomWordTdWhite\']\')[i - counter]).removeClass(\'randomWordTdWhite\').addClass(\'randomWordTdBlack\');\n          counter +=1;\n          $(\'.remainingLetters\').html(\'&lt;h3&gt;You have \' + ($wordToGuess.length - counter) + \' letters remaining for guessing&lt;/h3&gt;\');\n          // console.log(\'counter is \' + counter + \' and word length is \' + wordLength);\n          if (wordLength - counter === 0) {\n            $(\'#infoMessage\').html(\'&lt;h3&gt;That is great! You have guessed the word. YOU WON!&lt;/h3&gt;\');\n            $(\'#imageArea\').html(\'&lt;img class=\'finalImage\' src=\'assets/images/escape.gif\'&gt;\');\n          }\n        }\n        else if ($wordToGuess.indexOf($letterGuess) !== -1 && $letterGuess !== $wordToGuess[i]) {\n          continue;\n        }\n        else {\n          imageChanger += 1;\n          // console.log(\'imageChanger is \' + imageChanger);\n          if (imageChanger &gt;= 12) {\n            $(\'#infoMessage\').html(\'&lt;h3&gt;Sorry, you lost. The word is \'\' + $(\'td\').text() + \'\'. Better luck next time.\');\n            $(\'#imageArea\').html(\'&lt;img src=\'assets/images/12.jpg\'&gt;\');\n            break;\n          }\n          else {\n            $(\'#infoMessage\').html(\'&lt;h3&gt;Bummer. The letter \'\' + $letterGuess + \'\' is not included in the secret word.&lt;/h3&gt;\');\n            $(\'#imageArea\').html(\'&lt;img src=\'assets/images/\' + imageChanger + \'.jpg\'&gt;\');\n            $(\'#usedLetters\').append($letterGuess + \' \');\n            break;\n          }\n        } //else if the letter is not matching\n      } //End of for loop for evaluating the letter matching\n    } //else if the letter has not been evaluated already\n\n  } //End of newLetterEntry function\n\n  //GAME FLOW\n  $(\'.startButton\').click(function(){\n    $(\'tr\').empty();\n    $(\'#infoMessage\').empty();\n    $(\'#newLetter\').val(\'\');\n    $(\'#imageArea\').html(\'&lt;img src=\'assets/images/1.jpg\'&gt;\');\n    imageChanger = 1;\n    newRandomWord();\n  });  //End of $(\'.startButton\').click\n\n  $(\'#letterSubmit\').click(function(){\n    var $newLetter = $(\'#newLetter\').val().toLowerCase();\n    if ($newLetter.length === 0 || alphabet.indexOf($newLetter) === -1) {\n      $(\'#infoMessage\').html(\'&lt;h3&gt;Please enter a valid alphabet letter&lt;/h3&gt;\');\n    }\n    else {\n      newLetterEntry();\n    }\n    $(\'#newLetter\').val(\'\');\n  });\n\n});",
          description: [
            {bullet: "Game of hangman."},
            {bullet: "Random word pick and play."},
            {bullet: "JQuery, AJAX, CSS, HTML"}
          ],
          highlights: [
            {fact: "Higlhlight 1"},
            {fact: "Higlhlight 2"},
            {fact: "Higlhlight 3"},
          ],
          language: "jQuery",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
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
          code: "<!DOCTYPE html>\n<html lang=\"en\" dir=\"ltr\">\n  <head>\n    <meta charset=\"utf-8\">\n    <title>Clock - vanilla JS</title>\n\n    <style media=\"screen\">\n      body{\n        background-image: url(clock-vanilla.jpg);\n        background-size: cover;\n        box-sizing: border-box;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        height: 100vh;\n        font-family: verdana, helvetica, serif;\n        margin: 0;\n        padding: 0;\n        font-weight: bold;\n        font-size: 8vh;\n      }\n      h1{\n        padding: 0;\n        margin: 0;\n        font-size: 8vh;\n      }\n      .clock-body {\n        width: 50vh;\n        height: 50vh;\n        border-radius: 50%;\n        border: 3vh solid red;\n        padding: 2px;\n        position: relative;\n      }\n      .clock-face {\n        width: 100%;\n        height: 100%;\n        position: relative;\n      }\n      .clock-overlay {\n        width: 100%;\n        height: 100%;\n        z-index: -1;\n        background-color: rgba(255, 255, 255, .8);\n        border-radius: 50%;\n        position: absolute;\n        top: 0;\n        left: 0;\n      }\n      .top_third, .middle_third, .bottom_third {\n        width: 100%;\n        height: 33.33%;\n      }\n      .top_third {\n        text-align: center;\n      }\n      .middle_third {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n      .middle1, .middle2, .middle3{\n        width: 33.33%;\n        height: 100%;\n      }\n      .middle1 {\n        display: flex;\n        align-items: center;\n        justify-content: flex-start;\n      }\n      .middle2{\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n      .middle3{\n        display: flex;\n        align-items: center;\n        justify-content: flex-end;\n      }\n      .bottom_third{\n        position: relative;\n        text-align: center;\n      }\n      .bottom_third span{\n        position: absolute;\n        bottom: 0;\n        left: 0;\n        width: 100%;\n      }\n      .center_dot {\n        width: 30%;\n        height: 30%;\n        background-color: black;\n        border-radius: 50%;\n        z-index: 1;\n      }\n      #hours{\n        height: 45%;\n        background-color: black;\n        width: 5%;\n        position: absolute;\n        left: 47.5%;\n        top: 5%;\n        transform-origin: bottom;\n      }\n      #minutes{\n        height: 50%;\n        background-color: black;\n        width: 3%;\n        position: absolute;\n        left: 48.5%;\n        transform-origin: bottom;\n      }\n      #seconds{\n        height: 50%;\n        background-color: black;\n        width: 1%;\n        position: absolute;\n        left: 49.5%;\n        transform-origin: bottom;\n      }\n    </style>\n  </head>\n  <body>\n    <div class=\"clock-body\">\n\n      <div class=\"clock-face\">\n        <div id=\"hours\"></div>\n        <div id=\"minutes\"></div>\n        <div id=\"seconds\"></div>\n      </div>\n\n      <div class=\"clock-overlay\">\n        <div class=\"top_third\">12</div>\n        <div class=\"middle_third\">\n          <div class=\"middle1\">9</div>\n          <div class=\"middle2\">\n            <div class=\"center_dot\"></div>\n          </div>\n          <div class=\"middle3\">3</div>\n        </div>\n        <div class=\"bottom_third\">\n          <span>6</span>\n        </div>\n      </div>\n    </div>\n\n\n\n\n\n    <script>\n      var hoursPointer = document.getElementById(\"hours\");\n      var minutesPointer = document.getElementById(\"minutes\");\n      var secondsPointer = document.getElementById(\"seconds\");\n      function playTime() {\n        var newDate = new Date();\n        var getTheHours = newDate.getHours();\n        var getTheMinutes = newDate.getMinutes();\n        var getTheSeconds = newDate.getSeconds();\n        var secondsTurn = (360 / 60) * getTheSeconds;\n        var minutesTurn = (360 / 60) * getTheMinutes + (secondsTurn / 60);\n        var hoursTurn = (360 / 12) * getTheHours + (minutesTurn / 12);\n        secondsPointer.style.transform = `rotate(${secondsTurn}deg)`\n        minutesPointer.style.transform = `rotate(${minutesTurn}deg)`\n        hoursPointer.style.transform = `rotate(${hoursTurn}deg)`\n      }\n      setInterval(playTime, 1000);\n      playTime();\n    </script>\n\n  </body>\n</html>",
          description: [
            {bullet: "A clock."},
            {bullet: "Updates automatically by firing interval calls."},
            {bullet: "JavaScript, CSS, HTML."}
          ],
          highlights: [
            {fact: "Higlhlight 1"},
            {fact: "Higlhlight 2"},
            {fact: "Higlhlight 3"},
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
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
          code: "<!DOCTYPE html>\n<html lang=\'en\'>\n<head>\n  <meta charset=\'UTF-8\'>\n  <title>JS Drum Kit - Paris Apostolopoulos version</title>\n  <link href=\'https://fonts.googleapis.com/css?family=Raleway\' rel=\'stylesheet\'>\n  <link rel=\'stylesheet\' href=\'style-vanilla.css\'>\n</head>\n<body>\n\n\n  <div class=\'keys\'>\n    <div data-key=\'65\' class=\'key\'>\n      <kbd>A</kbd>\n      <span class=\'sound\'>clap</span>\n    </div>\n    <div data-key=\'83\' class=\'key\'>\n      <kbd>S</kbd>\n      <span class=\'sound\'>hihat</span>\n    </div>\n    <div data-key=\'68\' class=\'key\'>\n      <kbd>D</kbd>\n      <span class=\'sound\'>kick</span>\n    </div>\n    <div data-key=\'70\' class=\'key\'>\n      <kbd>F</kbd>\n      <span class=\'sound\'>openhat</span>\n    </div>\n    <div data-key=\'71\' class=\'key\'>\n      <kbd>G</kbd>\n      <span class=\'sound\'>boom</span>\n    </div>\n    <div data-key=\'72\' class=\'key\'>\n      <kbd>H</kbd>\n      <span class=\'sound\'>ride</span>\n    </div>\n    <div data-key=\'74\' class=\'key\'>\n      <kbd>J</kbd>\n      <span class=\'sound\'>snare</span>\n    </div>\n    <div data-key=\'75\' class=\'key\'>\n      <kbd>K</kbd>\n      <span class=\'sound\'>tom</span>\n    </div>\n    <div data-key=\'76\' class=\'key\'>\n      <kbd>L</kbd>\n      <span class=\'sound\'>tink</span>\n    </div>\n  </div>\n\n  <audio data-key=\'65\' src=\'sounds/clap.wav\'></audio>\n  <audio data-key=\'83\' src=\'sounds/hihat.wav\'></audio>\n  <audio data-key=\'68\' src=\'sounds/kick.wav\'></audio>\n  <audio data-key=\'70\' src=\'sounds/openhat.wav\'></audio>\n  <audio data-key=\'71\' src=\'sounds/boom.wav\'></audio>\n  <audio data-key=\'72\' src=\'sounds/ride.wav\'></audio>\n  <audio data-key=\'74\' src=\'sounds/snare.wav\'></audio>\n  <audio data-key=\'75\' src=\'sounds/tom.wav\'></audio>\n  <audio data-key=\'76\' src=\'sounds/tink.wav\'></audio>\n\n<script>\n  let divKey = document.getElementsByClassName(\'key\');\n  function addEffect(letter){\n    for(el of divKey){\n      let elLetter = el.firstElementChild.textContent.toLowerCase();\n      let elSound = el.lastElementChild.textContent;\n      let selectSound = document.querySelector(`audio[src=\'sounds/${elSound}.wav\']`);\n      if(elLetter === letter) {\n        el.classList.add(\'playing\');\n        selectSound.currentTime = 0;\n        selectSound.play();\n        setTimeout(() => removeEffect(letter), 70);\n      }\n    }\n  }\n  function removeEffect(letter) {\n    for(el of divKey){\n      let elLetter = el.firstElementChild.textContent.toLowerCase();\n      if(elLetter === letter) el.classList.remove(\'playing\');\n    }\n  }\n  window.onkeydown = event => addEffect(event.key.toLowerCase());\n</script>\n\n\n</body>\n</html>",
          description: [
            {bullet: "Drum Kit. Press the keys and hear the drums playing."},
            {bullet: "Vanilla JavaScript, CSS, HTML."},
            {bullet: "Similar project in the Vue section."}
          ],
          highlights: [
            {fact: "Higlhlight 1"},
            {fact: "Higlhlight 2"},
            {fact: "Higlhlight 3"},
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
          id: "drumKitVanilla",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 10,
          title: "addEventListener.xyz",
          url: "http://addEventListener.xyz",
          code_url: "YOU NEED TO ADD A COPY OF THE CODE. YOU NEED TO ADD IMAGES. YOU NEED TO ADD VIDEO FOOTAGE",
          git: "https://github.com/papostolopoulos/portfolio",
          code: "",
          description: [
            {bullet: "Single page application"},
            {bullet: "A Personal web page with a list of all the coding projects"},
            {bullet: "Multiple class transitions, CSS transformations and interactive display through a single Vue instance."},
            {bullet: "Vue, CSS, HTML."}
          ],
          highlights: [
            {fact: "Higlhlight 1"},
            {fact: "Higlhlight 2"},
            {fact: "Higlhlight 3"},
          ],
          language: "Vue",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
          id: "addEventListenerVue",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
        },

        {
          key: 11,
          title: "JSON files copy-paste viewer",
          url: "https://papostolopoulos.github.io/tutorials/work/copypaste/copypaste4.html",
          code_url: "",
          git: "https://github.com/papostolopoulos/tutorials/tree/master/work/copypaste",
          code: "You need to add the description, code, images and video footage",
          description: [
            {bullet: "This is a project that was done for internal company work. It doesn't work with random files."},
            {bullet: "The user can paste a JSON file from an internal work tool and view the results as per array element."},
            {bullet: "He can filter the results as needed."},
            {bullet: "Vue, HTML, CSS."}
          ],
          highlights: [
            {fact: "Higlhlight 1"},
            {fact: "Higlhlight 2"},
            {fact: "Higlhlight 3"},
          ],
          language: "Vue",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
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
          code: "Need to add the code, description, images and video footage",
          description: [
            {bullet: "Drum Kit. Press the keys and hear the drums playing."},
            {bullet: "Vue, CSS, HTML."},
            {bullet: "Similar project in the Vanilla section."}
          ],
          highlights: [
            {fact: "Higlhlight 1"},
            {fact: "Higlhlight 2"},
            {fact: "Higlhlight 3"},
          ],
          language: "Vue",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
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
          code: "<!DOCTYPE html>\n<html lang=\'en\' dir=\'ltr\'>\n  <head>\n    <meta charset=\'utf-8\'>\n    <title>Drum kit in Vue.js</title>\n    <script src=\'vue.js\'></script>\n\n    <style media=\'screen\'>\n      html {\n        margin: 0;\n        padding: 0;\n        font-family: arial;\n        font-size: 150%;\n        background: url(./drummer-vue.jpg);\n        background-size: cover;\n      }\n      h1 {\n        margin: auto;\n      }\n      .units {\n        display: inline-block;\n        border: 5px solid black;\n        background-color: rgba(255, 0, 0, .5);\n        margin: 10px;\n        padding: 5px;\n        min-width: 90px;\n        width: 12vh;\n        text-align: center;\n        transition: all 0.07s ease;\n      }\n      .units_play {\n        transform: scale(1.3);\n        border-color: rgb(255, 0, 0);\n        color: rgb(255, 0, 0);\n        background-color: rgba(0, 0, 0, .5);\n      }\n      #boxes{\n        /* This is from the tutorial */\n        /* display: flex;\n        flex: 1;\n        min-height: 100vh;\n        align-items: center;\n        justify-content: center; */\n        width: 100%;\n        margin: auto;\n        text-align: center;\n        position: absolute;\n        transform: translate(-50%, -50%);\n        top: 50%;\n        left: 50%;\n      }\n    </style>\n\n  </head>\n  <body>\n\n    <div id=\'boxes\'>\n\n      <unit\n      v-for=\'el in letters\'\n      :letter=\'el\'\n      :key=\'el.id\'\n      :class=\'[\'units\' , {units_play: playing}]\'>\n      </unit>\n\n\n      <sound\n      v-for=\'el in letters\'\n      :drum=\'el\' :key=\'el.id\'\n      :data-key=\'el.dataKey\'\n      :src=\'\'sounds/\'+el.sound+\'.wav\'\'>\n      </sound>\n    </div>\n\n\n\n\n\n    <script>\n      Vue.component(\'unit\', {\n        props: [\'letter\'],\n        template:\n        `<div :data-key=\'letter.dataKey\'>\n          <h1>\n            {{letter.text}}\n          </h1>\n          <span>{{letter.sound}}</span>\n          </div>\n        `\n      });\n      Vue.component(\'sound\', {\n        props: [\'drum\'],\n        template: `<audio></audio>`\n      });\n      new Vue({\n        el: \'#boxes\',\n        data: {\n          letters: [\n            {\n              text: \'A\',\n              dataKey: 65,\n              sound: \'clap\'\n            },\n            {\n              text: \'S\',\n              dataKey: 83,\n              sound: \'hihat\'\n            },\n            {\n              text: \'D\',\n              dataKey: 68,\n              sound: \'kick\'\n            },\n            {\n              text: \'F\',\n              dataKey: 70,\n              sound: \'openhat\'\n            },\n            {\n              text: \'G\',\n              dataKey: 71,\n              sound: \'boom\'\n            },\n            {\n              text: \'H\',\n              dataKey: 72,\n              sound: \'ride\'\n            },\n            {\n              text: \'J\',\n              dataKey: 74,\n              sound: \'snare\'\n            },\n            {\n              text: \'K\',\n              dataKey: 75,\n              sound: \'tom\'\n            },\n            {\n              text: \'L\',\n              dataKey: 76,\n              sound: \'tink\'\n            }\n          ],\n          playing: false\n        },\n        mounted: function() {\n           //Create array with keys\' numeric value\n          var vm = this;\n          var dataKeys = vm.letters.map((el)=>el.dataKey);\n          // Add an event listener at the global level to monitor the key presses\n          window.addEventListener(\'keydown\', function(e) {\n            if (dataKeys.includes(e.keyCode)) {\n              //Animation\n              var animDiv = document.querySelector(`div[data-key=\'${e.keyCode}\']`);\n              setTimeout(function() {\n                animDiv.classList.remove(\'units_play\');\n              }, 50);\n              //Sound play\n              var playSound = document.querySelector(`audio[data-key=\'${e.keyCode}\']`);\n              animDiv.classList.add(\'units_play\');\n              playSound.currentTime = 0;\n              playSound.play();\n            }\n          });\n        }\n      });\n    </script>\n\n  </body>\n</html>",
          description: [
            {bullet: "Drum Kit. Press the keys and hear the drums playing."},
            {bullet: "Vue, CSS, HTML."},
            {bullet: "Similar project in the Vanilla section."}
          ],
          highlights: [
            {fact: "Higlhlight 1"},
            {fact: "Higlhlight 2"},
            {fact: "Higlhlight 3"},
          ],
          language: "Vue",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
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
          code: "// LIST OF VARIABLES USED\nvar buttonCoordinates = document.getElementById(\'buttonCoordinates\');\nvar buttonCoordinatesModal = document.getElementById(\'buttonCoordinatesModal\');\nvar inputCoordinates = document.getElementById(\'inputCoordinates\');\nvar inputCoordinatesModal = document.getElementById(\'inputCoordinatesModal\');\nvar divIdModal = document.getElementById(\'divIdModal\');\nvar spanIdModalClose = document.getElementById(\'spanIdModalClose\');\nvar imgIdModalPhoto = document.getElementById(\'imgIdModalPhoto\');\nvar imageSrc = {\n  lat: 37.482882,\n  lon: -122.150222,\n  fov: 90,\n  heading: 35,\n  pitch: 10,\n  apiKey: \'AIzaSyCByGoevYZ0kuKlll1voldyKUZZ3gQ4mD8\',\n  url: function() {\n    return `https://maps.googleapis.com/maps/api/streetview?size=800x800\n    &location=${this.lat},${this.lon}\n    &fov=${this.fov}\n    &heading=${this.heading}\n    &pitch=${this.pitch}\n    &key=${this.apiKey}`.match(/\S/g).join(\'\');\n  }\n};\nvar iIdUpIcon = document.getElementById(\'iIdUpIcon\');\nvar idDownIcon = document.getElementById(\'iIdDownIcon\');\nvar idLeftIcon = document.getElementById(\'iIdLeftIcon\');\nvar idRightIcon = document.getElementById(\'iIdRightIcon\');\nvar idPlusIcon = document.getElementById(\'iIdPlusIcon\');\nvar idMinusIcon = document.getElementById(\'iIdMinusIcon\');\n\n\n// FUNCTIONS\nfunction updateImage(event) {\n  event.preventDefault();\n  var coordinatesArr = divIdModal.style.display === \'block\' ? inputCoordinatesModal.value.split(\',\') : inputCoordinates.value.split(\',\');\n  imageSrc.lat = coordinatesArr[0].trim();\n  imageSrc.lon = coordinatesArr[1].trim();\n\n  imgIdModalPhoto.src = imageSrc.url();\n  divIdModal.style.display = \'block\';\n}\n\n//DISPLAY MODAL ON CLICK OF SUBMIT BUTTON\nbuttonCoordinates.onclick = updateImage;\nbuttonCoordinatesModal.onclick = updateImage;\n\n//CLOSE MODAL WINDOW WHEN CLICKING AROUND CONTENT\nwindow.onclick = ()=&gt;{\n  if (event.target === divIdModal) divIdModal.style.display = \'none\';\n};\n\n//CLOSE MODAL WINDOW WHEN CLICKING ON X\nspanIdModalClose.onclick = () =&gt; divIdModal.style.display = \'none\';\n\n// CLOSE MODAL WINDOW WHEN HITING ESCAPE\nwindow.onkeyup = (event)=&gt;{\n  if (divIdModal.style.display === \'block\' && event.key === \'Escape\') divIdModal.style.display = \'none\';\n  // if (divIdModal.style.display === \'none\' &&\n  //  event.key === \'Enter\' &&\n  //  inputCoordinates.value.length !==0) updateImage;\n}\n\n// ADJUST IMAGE BASED ON KEY PRESSES\nwindow.onkeydown = (event)=&gt;{\n  // console.log(event);\n  // console.log(event.key);\n  if (event.key === \'ArrowRight\' && divIdModal.style.display === \'block\') imageSrc.heading += 5;\n  if (event.key === \'ArrowLeft\' && divIdModal.style.display === \'block\') imageSrc.heading -= 5;\n  if (event.key === \'ArrowUp\' && divIdModal.style.display === \'block\') imageSrc.pitch += 5;\n  if (event.key === \'ArrowDown\' && divIdModal.style.display === \'block\') imageSrc.pitch -= 5;\n  if (event.key === \'z\' && divIdModal.style.display === \'block\') imageSrc.fov -= 5;\n  if (event.key === \'x\' && divIdModal.style.display === \'block\') imageSrc.fov += 5;\n\n  imgIdModalPhoto.src = imageSrc.url();\n  console.log(imgIdModalPhoto.src);\n};\n\n// ADJUST IMAGE BASED ON ICON CLICK\niIdRightIcon.onclick = ()=&gt;{imageSrc.heading += 5; imgIdModalPhoto.src = imageSrc.url();}\niIdLeftIcon.onclick = ()=&gt; {imageSrc.heading -= 5; imgIdModalPhoto.src = imageSrc.url();}\niIdUpIcon.onclick = ()=&gt; {imageSrc.pitch += 5; imgIdModalPhoto.src = imageSrc.url();}\niIdDownIcon.onclick = ()=&gt; {imageSrc.pitch -=5; imgIdModalPhoto.src = imageSrc.url();}\niIdPlusIcon.onclick = ()=&gt; {imageSrc.fov -=5; imgIdModalPhoto.src = imageSrc.url();}\niIdMinusIcon.onclick = ()=&gt; {imageSrc.fov +=5; imgIdModalPhoto.src = imageSrc.url();}",
          description: [
            {bullet: "Modal that displays static Google Street View image."},
            {bullet: "Camera rotation and zooming."},
            {bullet: "Google maps API call."},
            {bullet: "Vanilla JavaScript, Vanilla CSS."}
          ],
          highlights: [
            {fact: "Higlhlight 1"},
            {fact: "Higlhlight 2"},
            {fact: "Higlhlight 3"},
          ],
          language: "Vanilla",
          images: [
            {image: ""},
            {image: ""},
            {image: ""},
          ],
          video_url: "",
          id: "streetViewModalVanilla",
          bgImage: {
            backgroundImage: "",
            boxShadow: ""
          }
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

        //This is for changing the active class of the <divTransform> tag
        this.activeModals = attr;
      },


      // EFFECT THAT ACTIVATES THE TRANSITION WHEN MOUSING OVER
      classTransitionOver(event) {
        let attr = event.target.getAttribute("name");
        let targetDiv = window["divTransform"];
        this.addStyle(targetDiv, this.hoverStyle[attr]);
      },


      // EFFECT THAT DEACTIVATES THE TRANSITION WHEN THE MOUSE LEAVES
      classTransitionLeave(event) {
        let targetDiv = window["divTransform"];
        this.addStyle(targetDiv, this.hoverStyle.clean);
      },


      // LOOP THAT UPDATES THE INLINE STYLE OF THE ELEMENT THAT IS MOUSED OVER (FOR TRANSITION)
      addStyle(el, styles) {
        for (let key in styles){
          el.style[key] = styles[key];
        }
      },


      pathCreate() {
        //CREATES THE PATHS FOR ALL THE IMAGES IN THE PROJECTS ARRAY INSIDE "DATA"
        //ADDS THE BACKGROUND IMAGE IN MODALS
        //ADDS THE BOX SHADOW IN MODALS
        //CREATES THE PATHS FOR ALL THE VIDEOS IN THE PROJECTS ARRAY INSIDE DATA
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


          // Add path in projects[i].video_url
          el.video_url = self.videoPath + el.id + ".mp4";


          //Add path in projects[i].code_url textPath: "assets/txt_files/code-"
          el.code_url = self.textPath + el.id + ".json";
        });
      },

      //OPEN THE MODAL
      modalOpen() {
        var getModalId = event.target.id.replace("aModalOpen", "modal");
        window[getModalId].style.display = "flex";


        this.modalDisplay = "flex";
        this.changeCounterValue();
      },

      //CLOSE THE MODAL
      modalClose(event) {
        var getModalId = event.path[1].id.replace("divCloseModal", "modal");
        window[getModalId].style.display = "none";


        this.modalDisplay = "none";
        this.counter = 0;
      },

      imageModalOpen(event){
        //Get the id from the "imageScreenshot". Change the name to match that of the modal
        let divImageId = event.target.id.replace("imageScreenshot", "divImageModal");
        //Change the display from "none" to "flex"
        window[divImageId].style.display="flex";
      },

      imageModalClose(event){
        event.path[2].style.display = "none";
      },

      //EXPAND THE CODE MODAL TO FULL SCREEN
      expandCodeModal(event){
        event.path[3].style.position = "fixed";
        event.path[3].style.zIndex = 2;
        event.path[3].style.left = 0;
        event.path[3].style.top = 0;
        event.path[3].style.width = "100vw";
        event.path[3].style.height = "100vh";
        event.path[3].children[1].style.display = "block";
        // event.path[3].style.transition = "all 2s"; //Deactivated because it is not visually pleasing
        //This is what you need to do if you decide to transfer the above in a new object.
        // let targetDiv = document.getElementById("divTransform");
        // this.addStyle(targetDiv, this.hoverStyle.clean);
      },

      //MINIMIZE THE CODE MODAL TO THE LEFT SIDE OF THE SCREEN
      codeModalClose(event){
        event.path[2].style.position = "static";
        event.path[2].style.zIndex = 1;
        event.path[2].style.width = "32vw";
        event.path[2].style.height = "96vh";
        event.path[1].style.display = "none";
        // event.path[3].style.transition = "all 2s"; //Deactivated because it is not visually pleasing
      },

      closeCodeModal(event){ //In case I want to have it close on click anywhere in the area of the modal
        console.log(event.path[0]);
      },

      modalbackImage() {
        console.log("I am creating classes");
      },

      //CREATE  CAROUSEL
      carouselCreate() {
        console.log("carousel created");
      },

      //CREATE ALL MODALS
      modalCreateClass() {
        console.log("modal create fired");
      },

      //CHANGE THE VALUE OF THE COUNTER SO THAT THE IMAGES CHANGE IN THE MODAL DISPLAY
      changeCounterValue() {
        let self = this;
        let intervalId = setInterval(function(){
          if (self.modalDisplay !== "flex") clearInterval(intervalId);
          self.counter < 2 ? self.counter++ : self.counter = 0;
          console.log(self.counter);
        }, 3000);
      }
    }, //End of methods
    beforeMount(){
      this.pathCreate();
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
*/
