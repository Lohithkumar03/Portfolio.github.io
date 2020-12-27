window.addEventListener("load", function(){
  document.querySelector(".preloader").classList.add("opacity-0");

  setTimeout(function(){
    document.querySelector(".preloader").style.display="none";
  },1000)
})





// ------------------portfolio item filter

const filterContainer=document.querySelector(".portfolio-filter"),
      filterBtns=filterContainer.children,
      totalFilterBtn=filterBtns.length,
      portfolioItems=document.querySelectorAll(".portfolio-item"),
      totalPrtfolioItems=portfolioItems.length;
    //   console.log(totalPrtfolioItems)

      for(let i=0; i<totalFilterBtn; i++) {
        filterBtns[i].addEventListener("click",function(){
            filterContainer.querySelector(".active").classList.remove("active")
            this.classList.add("active")

            const filterValue=this.getAttribute("data-filter");
            // console.log(filterValue)
            for(let k=0; k<totalPrtfolioItems; k++){
                if(filterValue === portfolioItems[k].getAttribute("data-catagory")){
                    portfolioItems[k].classList.remove("hide");
                    portfolioItems[k].classList.add("show");
                }
                else {
                    portfolioItems[k].classList.remove("show");
                    portfolioItems[k].classList.add("hide");
                }
                if(filterValue === "all"){
                    portfolioItems[k].classList.remove("hide");
                    portfolioItems[k].classList.add("show")
                }
            }
        })
      }

    // portfolio lightbox---------------------


    const lightbox=document.querySelector(".lightbox"),
           lightboxImg=lightbox.querySelector(".lightbox-img"),
           lightboxClose=lightbox.querySelector(".lightbox-close"),
           lightboxText=lightbox.querySelector(".caption-text"),
           lightboxCounter=lightbox.querySelector(".caption-counter");
        let itemindex=0;

      for (let i=0; i<totalPrtfolioItems; i++) {
          portfolioItems[i].addEventListener("click",function(){
            itemindex=i;
            changeItem();
            toggleLightbox();
          })
      }

      function nextItem() {
          if(itemindex === totalPrtfolioItems-1) {
            itemindex=0;
          }
          else {
            itemindex++
          }
          changeItem();
      }

      function prevItem() {
        if(itemindex == 0) {
            itemindex= totalPrtfolioItems-1;
        }
        else {
          itemindex--;
        }
        changeItem();
    }

      function toggleLightbox(){
        lightbox.classList.toggle("open");
      }


      function changeItem(){
          imgSrc=portfolioItems[itemindex].querySelector(".portfolio-img img").getAttribute("src");
        //   console.log(imgSrc);
        lightboxImg.src=imgSrc;
        lightboxText.innerHTML=portfolioItems[itemindex].querySelector("h4").innerHTML;
        lightboxCounter.innerHTML= (itemindex+1) + "of" + totalPrtfolioItems;
      }

    //   close lightbox

    lightbox.addEventListener("click",function(event){
        if(event.target ===lightboxClose || event.target === lightbox){
            toggleLightbox();
        // console.log(event.target)
        }
    })



// Aside navbar

    const nav=document.querySelector(".nav"),
          navList=nav.querySelectorAll("li"),
          totalNavlist=navList.length,
          allSection=document.querySelectorAll(".section"),
          totalSection=allSection.length;

    for(let i=0; i<totalNavlist; i++) {
      const a=navList[i].querySelector("a");
      // console.log(a)
      a.addEventListener("click",function(){

                // remove back section class


        removeBackSectionClass();
        // for(let i=0; i<totalSection; i++) {
        //   allSection[i].classList.remove("back-section");
        // }

        // console.log(this);
        for(let j=0; j<totalNavlist; j++){
          if(navList[j].querySelector("a").classList.contains("active")){
            // console.log("back-section"+navList[j].querySelector("a"))

           addBackSectionClass(j)
         
          }
          navList[j].querySelector("a").classList.remove("active");
        }
      this.classList.add("active");

      showSection(this);

      if(window.innerWidth < 1200) {
        asideSectionTogglerBtn();
      }

      })
    }

    function removeBackSectionClass(){
      for(let i=0; i<totalSection; i++) {
          allSection[i].classList.remove("back-section");
        }
    }

    function addBackSectionClass(num) {
         allSection[num].classList.add("back-section");
    }

    function showSection(element){
      for(let i=0; i<totalSection; i++) {
        allSection[i].classList.remove("active");
      }
      const target=element.getAttribute("href").split("#")[1];
      document.querySelector("#"+target).classList.add("active")
    }

    function updateNav(element){
      for(let i=0; i<totalNavlist; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target=element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
          navList[i].querySelector("a").classList.add("active");
        }
      }
    }



    document.querySelector(".contact-me").addEventListener("click",function(){
      const sectionIndex=this.getAttribute("data-section-index");
      // console.log(sectionIndex)

      showSection(this);
      updateNav(this);
      removeBackSectionClass();
      addBackSectionClass(sectionIndex);
    })

    const navTogglerbtn = document.querySelector(".nav-toggler"),
          aside=document.querySelector(".aside");

    navTogglerbtn.addEventListener("click",asideSectionTogglerBtn)
      // asideSectionTogglerBtn();
  
    function asideSectionTogglerBtn(){
      aside.classList.toggle("open");
      navTogglerbtn.classList.toggle("open");
      for(let i=0; i<totalSection; i++) {
        allSection[i].classList.toggle("open");
      }
    }