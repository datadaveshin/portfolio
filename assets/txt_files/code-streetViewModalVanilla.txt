// LIST OF VARIABLES USED
var buttonCoordinates = document.getElementById("buttonCoordinates");
var buttonCoordinatesModal = document.getElementById("buttonCoordinatesModal");
var inputCoordinates = document.getElementById("inputCoordinates");
var inputCoordinatesModal = document.getElementById("inputCoordinatesModal");
var divIdModal = document.getElementById("divIdModal");
var spanIdModalClose = document.getElementById("spanIdModalClose");
var imgIdModalPhoto = document.getElementById("imgIdModalPhoto");
var imageSrc = {
  lat: 37.482882,
  lon: -122.150222,
  fov: 90,
  heading: 35,
  pitch: 10,
  apiKey: "AIzaSyCByGoevYZ0kuKlll1voldyKUZZ3gQ4mD8",
  url: function() {
    return `https://maps.googleapis.com/maps/api/streetview?size=800x800
    &location=${this.lat},${this.lon}
    &fov=${this.fov}
    &heading=${this.heading}
    &pitch=${this.pitch}
    &key=${this.apiKey}`.match(/\S/g).join('');
  }
};
var iIdUpIcon = document.getElementById("iIdUpIcon");
var idDownIcon = document.getElementById("iIdDownIcon");
var idLeftIcon = document.getElementById("iIdLeftIcon");
var idRightIcon = document.getElementById("iIdRightIcon");
var idPlusIcon = document.getElementById("iIdPlusIcon");
var idMinusIcon = document.getElementById("iIdMinusIcon");


// FUNCTIONS
function updateImage(event) {
  event.preventDefault();
  var coordinatesArr = divIdModal.style.display === "block" ? inputCoordinatesModal.value.split(",") : inputCoordinates.value.split(",");
  imageSrc.lat = coordinatesArr[0].trim();
  imageSrc.lon = coordinatesArr[1].trim();

  imgIdModalPhoto.src = imageSrc.url();
  divIdModal.style.display = "block";
}

//DISPLAY MODAL ON CLICK OF SUBMIT BUTTON
buttonCoordinates.onclick = updateImage;
buttonCoordinatesModal.onclick = updateImage;

//CLOSE MODAL WINDOW WHEN CLICKING AROUND CONTENT
window.onclick = ()=>{
  if (event.target === divIdModal) divIdModal.style.display = "none";
};

//CLOSE MODAL WINDOW WHEN CLICKING ON X
spanIdModalClose.onclick = () => divIdModal.style.display = "none";

// CLOSE MODAL WINDOW WHEN HITING ESCAPE
window.onkeyup = (event)=>{
  if (divIdModal.style.display === "block" && event.key === "Escape") divIdModal.style.display = "none";
  // if (divIdModal.style.display === "none" &&
  //  event.key === "Enter" &&
  //  inputCoordinates.value.length !==0) updateImage;
}

// ADJUST IMAGE BASED ON KEY PRESSES
window.onkeydown = (event)=>{
  // console.log(event);
  // console.log(event.key);
  if (event.key === "ArrowRight" && divIdModal.style.display === "block") imageSrc.heading += 5;
  if (event.key === "ArrowLeft" && divIdModal.style.display === "block") imageSrc.heading -= 5;
  if (event.key === "ArrowUp" && divIdModal.style.display === "block") imageSrc.pitch += 5;
  if (event.key === "ArrowDown" && divIdModal.style.display === "block") imageSrc.pitch -= 5;
  if (event.key === "z" && divIdModal.style.display === "block") imageSrc.fov -= 5;
  if (event.key === "x" && divIdModal.style.display === "block") imageSrc.fov += 5;

  imgIdModalPhoto.src = imageSrc.url();
  console.log(imgIdModalPhoto.src);
};

// ADJUST IMAGE BASED ON ICON CLICK
iIdRightIcon.onclick = ()=>{imageSrc.heading += 5; imgIdModalPhoto.src = imageSrc.url();}
iIdLeftIcon.onclick = ()=> {imageSrc.heading -= 5; imgIdModalPhoto.src = imageSrc.url();}
iIdUpIcon.onclick = ()=> {imageSrc.pitch += 5; imgIdModalPhoto.src = imageSrc.url();}
iIdDownIcon.onclick = ()=> {imageSrc.pitch -=5; imgIdModalPhoto.src = imageSrc.url();}
iIdPlusIcon.onclick = ()=> {imageSrc.fov -=5; imgIdModalPhoto.src = imageSrc.url();}
iIdMinusIcon.onclick = ()=> {imageSrc.fov +=5; imgIdModalPhoto.src = imageSrc.url();}
