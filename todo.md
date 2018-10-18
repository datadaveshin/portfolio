------MODALS--------
* [] Create modal COMPONENT
  * [X] Create the function that creates the images names
  * [X] Add background images in modals
    * [X] Street View Modal image is not loading
  * [X] Fix positioning of images
  * [] Add transition of background images in modals
  * [] create blocks for:
    * [X] Title
    * [X] description
    * [] code
      * [] Should this be a call for .json, .txt .xml or an <iframe> that includes html copies?
    * [X] images?
    * [X] perhaps video?
    * [] Should images and video (or even the code) be included in a separate link or
    should they be included in the page?
    * [X] Add icons and links for github, page project


-------CAROUSEL------
* [] Match carousel with modals
* [] See if you should transfer the images in online service If so,
  * [] Change code so the background images feed from the online service.
* [X] See if I want to keep the projects in app or if I should transfer them in the component.
* [X] Decide how you are going to format the variables that represent the Vue instance

------VARIOUS------
* [X] Perhaps make an if statement in the imagesPathCreate method in order to have the transparent
layer for box-shadow adjust its color depending on if we are in a vue, vanilla or jquery environment
* [X] Change name of imagesPathCreate to pathCreate
* [] Code files
  * [] .json or .txt?
  * [] Create the txt files
  * [] Modify the files format
    * [] Escape the single and double quote characters
    * [] change the angled brackets to &alt; and &gt;
    * [] Put breaks at the end of every line
    * [] Create an object property that includes all the text
