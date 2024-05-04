// const searchbtn = document.querySelector("#search")
// const sideBar = document.querySelector(".sidebar")
// const prevbtn = document.getElementsByClassName(".prev")
// const nextbtn = document.getElementsByClassName(".next")

// document.querySelector(".search-logo").addEventListener("click",function(){
// searchbtn.style.display ="block"
// })
// .document.querySelector(".profile").addEventListener("click",function(){
//     sideBar.style.display="block"
// })


// const serchFunction =searchbtn.addEventListener('click',{
//      // if (document.body.innerhtml == result ) {
//         // show.result
//      //}
//     // else {
//      //   alert('invalid input')
//     // }
// })


//slider
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector(".next-btn");
    const currentImage = document.querySelector(".current");
    const prevImage = document.querySelector(".prev");
    const nextImage = document.querySelector(".next");
    const title = document.querySelector(".title");
    const first = document.querySelector('#first-img');
    const mid = document.querySelector('#mid-img');
    const last = document.querySelector('#last-img');
    

    const images = [
        "/slider-beauty.png",
        "/slider-food.png",
        "/slider-repair.png"
    ];

    let currentIndex = 1;

    function updateImages() {
        currentImage.src = images[currentIndex];
        prevImage.src = images[(currentIndex - 1 + images.length) % images.length];
        nextImage.src = images[(currentIndex + 1) % images.length];

        if(currentIndex===1){
            first.src="/catering.jpg";
            mid.src="/food-ordering.jpg"
            last.src="/mess-service.jpg"
            title.innerHTML="Food services"
        }
        if(currentIndex===2){
            first.src="/car-repair.jpg"
            mid.src="/bike-repair.webp"
            last.src="/ac-repair.jpg"
            title.innerHTML="Repair Services"
        }
        if (currentIndex!=2 && currentIndex!=1){
            first.src="/makeup.jpg";
            mid.src="/spa&message.webp"
            last.src="/hair-stylist.jpg"
            title.innerHTML="Beauty Services"
        }

    }

    function nextButtonClick() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImages();
       
    }

    function prevButtonClick() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImages();

    }

    nextBtn.addEventListener("click",nextButtonClick);
    prevBtn.addEventListener("click", prevButtonClick);

    updateImages();

//for side bar 
function myFunction() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
  }
