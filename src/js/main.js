window.onload = function () {
  onResize();

  // Event Listener on window resize
  // don't forget to add a debounce function
  window.addEventListener("resize", onResize);

  function onResize() {
    let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    // grab middle container height to allow scrolling with overflow
    const heroCenter = document.querySelector(".hero-center");
    console.log(height);
    heroCenter.style.height = height;
  }

  // Toggle Modal Logic
  const desktopImg = document.querySelectorAll(".img-desktop");
  const modalImg = document.querySelectorAll(".img-modal");
  desktopImg.forEach( image => image.addEventListener("click", toggleModal)); 
  modalImg.forEach( image => image.addEventListener("click", toggleModal)); 

  function toggleModal(event) {
    const mainContainer = document.querySelector(".main-container");
    const modal = document.querySelector(".modal");
    
    if (mainContainer.style.display === "none") {
      mainContainer.style.display = "block";
      modal.style.display = "none";
      window.scrollTo(0, 0);
      
    } else {
      let targetImage = event.currentTarget.dataset.img;
      mainContainer.style.display = "none";
      modal.style.display = "block";
      const modalFocus = document.querySelector(`.modal-${targetImage}`);
      modalFocus.scrollIntoView();
    }
  }
  
  // Toggle product color picker
  const colorBoxBlack = document.querySelector('.color-box-black');
  const colorBoxBeige = document.querySelector('.color-box-beige');
  colorBoxBlack.addEventListener("click", toggleColorPickerBlack);
  colorBoxBeige.addEventListener("click", toggleColorPickerBeige);
  const blackCheck = document.querySelector(".color-box-black-check");
  const beigeCheck = document.querySelector(".color-box-beige-check");    

  function toggleColorPickerBlack() {
    blackCheck.classList.add("color-box-black-check-active");
    beigeCheck.classList.remove("color-box-beige-check-active");
  }

  function toggleColorPickerBeige() {
    blackCheck.classList.remove("color-box-black-check-active");
    beigeCheck.classList.add("color-box-beige-check-active");
  }

  // Product quantity counter
  let counter = 0;
  const reduceProduct = document.querySelector(".quantity-reduce-product");
  const addProduct = document.querySelector(".quantity-add-product");
  reduceProduct.addEventListener("click", reduceQuantity);
  addProduct.addEventListener("click", increaseQuantity);
  const quantityCounter = document.querySelector(".quantity-counter");

  function reduceQuantity() {
    if (counter > 0) { 
      counter -= 1 
      quantityCounter.textContent = counter;    
    }
  }

  function increaseQuantity() {
    counter += 1;
    quantityCounter.textContent = counter;    
  }

  
};