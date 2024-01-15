/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

function setupCarousel(carouselContainer) {
  carouselContainer.querySelectorAll('.carousel-method-segment').forEach(segment => {
    segment.addEventListener('click', function() {
      const methodName = this.getAttribute('for');
      const carouselId = methodName.split('-')

      const imagePath = `./images/${methodName.toLowerCase()}-image.png`;
      const elementId = `selected-image-${carouselId[carouselId.length-1]}`;
      document.getElementById(elementId).src = imagePath;
      
      // Update the download link similarly if needed
      const downloadId = `download-link-${carouselId[carouselId.length-1]}`;
      const downloadLinkElement = document.getElementById(downloadId);
      downloadLinkElement.href = downloadLinks[methodName];
    });
  });
}

document.querySelectorAll('.work__image-box').forEach(setupCarousel);

const downloadLinks = {
  "Swin-S-tdn": "https://github.com/BoomStarcuc/Cell-Segmentation-Benchmark",
  "Swin-T-tdn": "https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll",
  "Cellpose-tdn": "https://pages-themes.github.io/minimal/",
  "Cascade Mask RCNN seesaw-tdn": "download-link-for-method4",
  "Centermask2-tdn": "download-link-for-method5",
  "SOLOv2-tdn": "download-link-for-method6",
  "ResNeSt-tdn": "download-link-for-method7",
  "Res2Net-tdn": "download-link-for-method8",
  "RF-Next-tdn": "download-link-for-method9",
  "StarDist-tdn": "download-link-for-method10",
  "HRNet-tdn": "download-link-for-method11",
  "Mask2former-tdn": "download-link-for-method12",
  "Mask RCNN-tdn": "download-link-for-method13",
  "Segment Anything-tdn": "download-link-for-method14",
  "RetinaMask-tdn": "download-link-for-method15",
  "Mesmer-tdn": "download-link-for-method16",
  "MS RCNN-tdn": "download-link-for-method17",
  "FeatureNet-tdn": "download-link-for-method18",
  "Swin-S-tnn": "",
  "Swin-T-tnn": "",
  "Cellpose-tnn": "",
  "Cascade Mask RCNN seesaw-tnn": "download-link-for-method4",
  "Centermask2-tnn": "download-link-for-method5",
  "SOLOv2-tnn": "download-link-for-method6",
  "ResNeSt-tnn": "download-link-for-method7",
  "Res2Net-tnn": "download-link-for-method8",
  "RF-Next-tnn": "download-link-for-method9",
  "StarDist-tnn": "download-link-for-method10",
  "HRNet-tnn": "download-link-for-method11",
  "Mask2former-tnn": "download-link-for-method12",
  "Mask RCNN-tnn": "download-link-for-method13",
  "Segment Anything-tnn": "download-link-for-method14",
  "RetinaMask-tnn": "download-link-for-method15",
  "Mesmer-tnn": "download-link-for-method16",
  "MS RCNN-tnn": "download-link-for-method17",
  "FeatureNet-tnn": "download-link-for-method18",
};

document.addEventListener("DOMContentLoaded", function() {
  // Select all carousel instances
  const carousels = document.querySelectorAll(".carousel-bar");

  carousels.forEach(carousel => {
      let isDown = false;
      let startX;
      let scrollLeft;

      carousel.addEventListener('mousedown', (e) => {
          isDown = true;
          carousel.classList.add('active');
          startX = e.pageX - carousel.offsetLeft;
          scrollLeft = carousel.scrollLeft;
      });
      carousel.addEventListener('mouseleave', () => {
          isDown = false;
          carousel.classList.remove('active');
      });
      carousel.addEventListener('mouseup', () => {
          isDown = false;
          carousel.classList.remove('active');
      });
      carousel.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - carousel.offsetLeft;
          const walk = (x - startX) * 3; //scroll-fast
          carousel.scrollLeft = scrollLeft - walk;
      });
  });
});





