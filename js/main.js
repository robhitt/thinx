 window.onload = function () {
   /********** Build out page structure from API **********/
   let productDataURL = "https://robhitt.github.io/thinx/product-data.json";

   let productDataRequest = new XMLHttpRequest();
   productDataRequest.open("GET", productDataURL);
   productDataRequest.onload = function () {
     if (productDataRequest.status >= 200 && productDataRequest.status < 400) {
       let productData = JSON.parse(productDataRequest.responseText);
       renderHTML(productData);
     } else {
       console.log("Connected to server but returned an error");
     }
   }

   productDataRequest.onerror = function () {
     console.log("Data not received.");
   }

   productDataRequest.send();

   // Build webpage dynamically based off JSON data
   function renderHTML(data) {
     // Render product price
     const price = document.querySelector(".price");
     let priceNode = document.createTextNode(data.product.price);
     price.appendChild(priceNode);

     // Render size menu for dropdown
     const sizeSelector = document.querySelector(".size-selector");
     const availableSizes = data.product.availableSizes;

     availableSizes.forEach(size => {
       const option = document.createElement("option");
       let sizeNode = document.createTextNode(size);
       option.appendChild(sizeNode);
       sizeSelector.appendChild(option);
     });

     // Render images for mobile product carousel
     const carouselImageContainer = document.querySelector(".carousel-inner");
     const carouselIndicators = document.querySelector(".carousel-indicators");
     const productImages = data.product.productImages;
     let individualPhoto,
         carouselIndicator;

     productImages.forEach((imageContent, index) => {
       const dataImagePosition = index + 1;

       if (index === 0) {
         individualPhoto = `
          <div class="carousel-item active">
            <img data-img="${dataImagePosition}" class="d-block w-100 product-img zoom-in" src="${imageContent.img}" alt="${imageContent.alt}">
          </div>
          `;

         carouselIndicator = `
          <li data-target="#mobile-carousel" data-slide-to="${index}" class="active">
            <div class="carousel-dot"></div>
          </li>
          `;

         carouselImageContainer.insertAdjacentHTML("beforeend", individualPhoto);
         carouselIndicators.insertAdjacentHTML("beforeend", carouselIndicator);
       } else {
         individualPhoto = `
        <div class="carousel-item">
        <img data-img="${dataImagePosition}" class="d-block w-100 product-img zoom-in" src="${imageContent.img}" alt="${imageContent.alt}">
        </div>
        `;

         carouselIndicator = `
          <li data-target="#mobile-carousel" data-slide-to="${index}">
            <div class="carousel-dot"></div>
          </li>
          `;

         carouselImageContainer.insertAdjacentHTML("beforeend", individualPhoto);
         carouselIndicators.insertAdjacentHTML("beforeend", carouselIndicator);
       }
     });

     // Render images for desktop product image scroller
     const heroDesktop = document.querySelector(".hero-desktop");
     let desktopPhoto;

     productImages.forEach((imageContent, index) => {
       const dataImagePosition = index + 1;

       desktopPhoto = `
        <div class="hero-full-height">
          <img data-img="${dataImagePosition}" src="${imageContent.img}" alt="${imageContent.alt}" class="img-desktop product-img">
          </div>
        `;

       heroDesktop.insertAdjacentHTML("beforeend", desktopPhoto);
     });

     // Render images for modal
     const customModal = document.querySelector(".custom-modal");
     let modalPhoto;

     productImages.forEach((imageContent, index) => {
       const dataImagePosition = index + 1;

       modalPhoto = `
        <div class="modal-${dataImagePosition}">
          <img src="${imageContent.img}" alt="${imageContent.alt}" class="product-img-modal">
        </div>
      `;

       customModal.insertAdjacentHTML("beforeend", modalPhoto);
     });

     const productImg = document.querySelectorAll(".product-img");
     const productImgModal = document.querySelectorAll(".product-img-modal");
     productImg.forEach(image => image.addEventListener("click", toggleModal));
     productImgModal.forEach(image => image.addEventListener("click", toggleModal));

     // Hack to hide below the fold view to prevent 
     // page glitch on page load while product content is built
     const belowTheFold = document.querySelector(".below-the-fold");
     belowTheFold.style.display = "block";
     belowTheFoldChecker();
   }

   /********** Page Logic **********/
   onResize();
   thankYou();

   window.addEventListener("resize", onResize);

   function onResize() {
     // Set height of hero container at any
     // point the user changes browser dimensions
     const heroContainer = document.querySelector(".hero-container");
     let windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
     heroContainer.style.height = windowHeight;
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

   // Toggle modal logic allowing zooming 
   // in and out on any product image
   let modalIsOpen = false;
   let heightToSelectedImage;

   function toggleModal(event) {
     const mainContainer = document.querySelector(".main-container");
     const modal = document.querySelector(".custom-modal");

     if (!modalIsOpen) heightToSelectedImage = window.scrollY;
     
     modalIsOpen = !modalIsOpen;

     if (mainContainer.style.display === "none") {
       mainContainer.style.display = "block";
       modal.style.display = "none";
       window.scrollTo(0, (window.innerWidth > 1024 ? heightToSelectedImage : 0));
     } else {
       mainContainer.style.display = "none";
       modal.style.display = "block";
       let targetImage = event.currentTarget.dataset.img;
       const modalFocus = document.querySelector(`.modal-${targetImage}`);
       modalFocus.scrollIntoView();
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

   function thankYou() {
     console.log("*********");
     console.log("Thank you for including me in this code challenge, I appreciate the opportunity to be in consideration! -Rob");
     console.log("*********");
   }
 };