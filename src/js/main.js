// document.addEventListener("DOMContentLoaded", function(){
//   // Handler when the DOM is fully loaded
// });

window.onload = function() {
    onResize();

    // Event Listener on window resize
    // don't forget to add a debounce function
    window.addEventListener("resize", onResize);

    function onResize() {
        // console.log(this);
        // var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        // console.log("Height", this.innerHeight);
        // console.log("Width", this.innerWidth);

        // grab middle container height to allow scrolling with overflow
        let heroCenter = document.querySelector(".hero-center");
        console.log(this.innerHeight);
        
        heroCenter.style.height = this.innerHeight;
    }

    
};
