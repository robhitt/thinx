 window.onload = function () {
   let productDataURL = "https://robhitt.github.io/thinx/product-data.json";

   let ourRequest = new XMLHttpRequest();
   ourRequest.open("GET", productDataURL)
   ourRequest.onload = function () {
     let ourData = JSON.parse(ourRequest.responseText);
     renderHTML(ourData);
   }
   ourRequest.send();

   function renderHTML(data) {
     // Render product price
     const price = document.querySelector(".price");
     price.innerHTML = data.product.price;

     // Render size menu for dropdown
     const sizeSelector = document.querySelector(".size-selector");
     const availableSizes = data.product.availableSizes;

     availableSizes.forEach(size => {
       const optionEl = document.createElement("option");
       let sizeNode = document.createTextNode(size);
       optionEl.appendChild(sizeNode);
       sizeSelector.appendChild(optionEl);
     });

     // Render images for mobile product carousel
     const carouselImageContainer = document.querySelector(".carousel-inner");
     const carouselIndicators = document.querySelector(".carousel-indicators");
     const productImages = data.product.productImages;
     let individualPhoto,
         carouselIndicator;

     productImages.forEach((imageURL, index) => {
       const dataImagePosition = index + 1;

       if (index === 0) {
         individualPhoto = `
          <div class="carousel-item active">
            <img data-img="${dataImagePosition}" class="d-block w-100 product-img zoom-in" src="${imageURL}" alt="High Waist Black Back Underwear Front">
          </div>
          `
          
          carouselIndicator = `
          <li data-target="#mobile-carousel" data-slide-to="${index}" class="active">
            <div class="carousel-dot"></div>
          </li>
          `

         carouselImageContainer.insertAdjacentHTML('beforeend', individualPhoto);
         carouselIndicators.insertAdjacentHTML('beforeend', carouselIndicator);
       } else {
         individualPhoto = `
        <div class="carousel-item">
        <img data-img="${dataImagePosition}" class="d-block w-100 product-img zoom-in" src="${imageURL}" alt="High Waist Black Back Underwear Front">
        </div>
        `

        carouselIndicator = `
          <li data-target="#mobile-carousel" data-slide-to="${index}">
            <div class="carousel-dot"></div>
          </li>
          `
         carouselImageContainer.insertAdjacentHTML('beforeend', individualPhoto);
         carouselIndicators.insertAdjacentHTML('beforeend', carouselIndicator);
       }

       const productImg = document.querySelectorAll(".product-img");
       productImg.forEach(image => image.addEventListener("click", toggleModal));
     });

     // Render images for desktop product image scroller
     

   }

   onResize();
   //  thankYou();

   window.addEventListener("resize", onResize);

   function onResize() {
     // Set height of hero container at any
     // point the user changes browser dimensions
     let windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
     const heroContainer = document.querySelector(".hero-container");
     heroContainer.style.height = windowHeight;

     // This is necessary to call on initial load in the event the user refreshes
     // while already on the current page and is scrolled below the fold
     belowTheFoldChecker();
   }

   // Prevent fixed outer hero columns from scrolling below the fold
   window.addEventListener("scroll", belowTheFoldChecker);

   function belowTheFoldChecker(event) {
     const heroContainer = document.querySelector(".hero-container");
     const heightToHorizonLine = heroContainer.offsetHeight;
     const totalPixelsScrolled = window.scrollY + window.innerHeight;
     const heroLeft = document.querySelector(".hero-left");
     const heroRight = document.querySelector(".hero-right");

     if (totalPixelsScrolled < heightToHorizonLine) {
       heroLeft.classList.remove("sticky-bottom");
       heroRight.classList.remove("sticky-bottom");
     } else if (totalPixelsScrolled >= heightToHorizonLine) {
       heroLeft.classList.add("sticky-bottom");
       heroRight.classList.add("sticky-bottom");
     }
   }

   // Toggle modal logic for when a user clicks
   // a product image to allow zooming in and out 
   let modalIsOpen = false;
   let heightToSelectedImage;
   const productImg = document.querySelectorAll(".product-img");
   const productImgModal = document.querySelectorAll(".product-img-modal");
   productImg.forEach(image => image.addEventListener("click", toggleModal));
   productImgModal.forEach(image => image.addEventListener("click", toggleModal));

   function toggleModal(event) {
     const mainContainer = document.querySelector(".main-container");
     const modal = document.querySelector(".custom-modal");

     if (modalIsOpen) {
       modalIsOpen = !modalIsOpen;
     } else {
       modalIsOpen = !modalIsOpen;
       heightToSelectedImage = window.scrollY;
     }

     if (window.innerWidth > 1024) {
       if (mainContainer.style.display === "none") {
         mainContainer.style.display = "block";
         modal.style.display = "none";
         window.scrollTo(0, heightToSelectedImage);
       } else {
         mainContainer.style.display = "none";
         modal.style.display = "block";
         let targetImage = event.currentTarget.dataset.img;
         const modalFocus = document.querySelector(`.modal-${targetImage}`);
         modalFocus.scrollIntoView();
       }
     } else {
       if (mainContainer.style.display === "none") {
         mainContainer.style.display = "block";
         modal.style.display = "none";
         window.scrollTo(0, 0);
       } else {
         mainContainer.style.display = "none";
         modal.style.display = "block";
         let targetImage = event.currentTarget.dataset.img;
         const modalFocus = document.querySelector(`.modal-${targetImage}`);
         modalFocus.scrollIntoView();
       }
     }
   }

   // Toggle product color picker
   const colorBoxBlack = document.querySelector(".color-box-black");
   const colorBoxBeige = document.querySelector(".color-box-beige");
   const blackCheckMark = document.querySelector(".color-box-black-check");
   const beigeCheckMark = document.querySelector(".color-box-beige-check");
   colorBoxBlack.addEventListener("click", toggleColorPickerBlack);
   colorBoxBeige.addEventListener("click", toggleColorPickerBeige);

   function toggleColorPickerBlack() {
     blackCheckMark.classList.add("color-box-black-check-active");
     beigeCheckMark.classList.remove("color-box-beige-check-active");
   }

   function toggleColorPickerBeige() {
     blackCheckMark.classList.remove("color-box-black-check-active");
     beigeCheckMark.classList.add("color-box-beige-check-active");
   }

   // Product quantity counter
   let selectedQuantity = 1;
   const quantityCounter = document.querySelector(".quantity-counter");
   const reduceProductCount = document.querySelector(".quantity-reduce-product");
   const addProductCount = document.querySelector(".quantity-add-product");
   reduceProductCount.addEventListener("click", reduceQuantity);
   addProductCount.addEventListener("click", increaseQuantity);

   function reduceQuantity() {
     if (selectedQuantity > 1) {
       selectedQuantity -= 1;
       quantityCounter.textContent = selectedQuantity;
     }
   }

   function increaseQuantity() {
     selectedQuantity += 1;
     quantityCounter.textContent = selectedQuantity;
   }

   //  function thankYou() {
   //    console.log("*********");
   //    console.log("Thank you for including me in this code challenge, I appreciate the opportunity to be in consideration! -Rob");
   //    console.log("*********");
   //  }
 };