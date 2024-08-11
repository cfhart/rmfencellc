const filterButtons = document.querySelectorAll(".filterButtons button");
const filterableCards = document.querySelectorAll(".filterCards .cardFilter");

const filterCards = e => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active"); 

    filterableCards.forEach(cardFilter => {
        cardFilter.classList.add("hide"); 

        if(cardFilter.dataset.names == e.target.dataset.name || e.target.dataset.name == "all") {
            cardFilter.classList.remove("hide"); 
        }
    }); 

}

filterButtons.forEach(button => button.addEventListener("click", filterCards)); 

let headerBackgrounds = document.querySelectorAll(".background"); 
let imageIndex = 0; 
let intervalId;

function changeBackground() {
    headerBackgrounds[imageIndex].classList.remove("showing"); 
    imageIndex++; 
    if (imageIndex >= headerBackgrounds.length) {
        imageIndex = 0; 
    }
    headerBackgrounds[imageIndex].classList.add("showing"); 
}

function startBackgroundChange() {
    intervalId = setInterval(changeBackground, 5000);
}

function stopBackgroundChange() {
    clearInterval(intervalId);
}

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        stopBackgroundChange();
    } else {
        startBackgroundChange();
    }
});

// Start changing the background when the page is loaded
startBackgroundChange();

const initSlider = () => {
}

/** script for  the menu/navbar in mobile view */
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

const header = document.querySelector("header"); 
const menuBtn = document.querySelector("#menu-btn"); 
const closeMenuBtn = document.querySelector("#close-menu-btn"); 

menuBtn.addEventListener("click", () => {
    header.classList.toggle("show-mobile-menu"); 
}); 

closeMenuBtn.addEventListener("click", () => {
    menuBtn.click();
}); 


// Create the lightbox element
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

// Create navigation symbols
const prevSymbol = document.createElement('div');
prevSymbol.id = 'prev';
prevSymbol.innerHTML = '&lt;';
lightbox.appendChild(prevSymbol);

const nextSymbol = document.createElement('div');
nextSymbol.id = 'next';
nextSymbol.innerHTML = '&gt;';
lightbox.appendChild(nextSymbol);

// Style the lightbox and navigation symbols

// Function to update lightbox with the correct image
const updateLightbox = (src) => {
  while (lightbox.firstChild && lightbox.firstChild.tagName === 'IMG') {
    lightbox.removeChild(lightbox.firstChild);
  }
  const img = document.createElement('img');
  img.src = src;
  lightbox.insertBefore(img, prevSymbol);
};

// Function to get the next or previous image index
const getImageIndex = (direction) => {
    const activeImageSrc = lightbox.querySelector('img').src;
    const images = Array.from(document.querySelectorAll('.gallery img'));
  
    // Find the index of the active image's src within the gallery
    let index = images.findIndex(img => img.src === activeImageSrc);
  
    if (direction === 'next') {
      index = (index + 1) % images.length;
    } else if (direction === 'prev') {
      index = (index - 1 + images.length) % images.length;
    }
  
    return index;
  };
  

// Add click event listeners to the gallery images
const images = document.querySelectorAll('.gallery img');
images.forEach(image => {
  image.addEventListener('click', e => {
    lightbox.classList.add('active');
    updateLightbox(image.src);
  });
});

// Add click event listeners to navigation symbols
prevSymbol.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents event from bubbling up and closing lightbox
    const index = getImageIndex('prev');
    updateLightbox(images[index].src);
  });

  nextSymbol.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents event from bubbling up and closing lightbox
    const index = getImageIndex('next');
    updateLightbox(images[index].src);
  });

// Add click event listener to close the lightbox
lightbox.addEventListener('click', e => {
  if (e.target !== e.currentTarget && e.target !== prevSymbol && e.target !== nextSymbol) return;
  lightbox.classList.remove('active');
});

// Add keydown event listener for arrow keys
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') {
    const index = getImageIndex('prev');
    updateLightbox(images[index].src);
  } else if (e.key === 'ArrowRight') {
    const index = getImageIndex('next');
    updateLightbox(images[index].src);
  } else if (e.key === 'Escape') {
    lightbox.classList.remove('active');
  }
});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function toggleDropdown() {
    var dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.classList.toggle("show");
}

window.addEventListener("click", function(event) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show') && !event.target.closest('.dropdown')) {
            openDropdown.classList.remove('show');
        }
    }
});

// Add event listener to toggle dropdown on .dropbtn click

    // Prevent the click from affecting the hover color
    
    // Function to toggle dropdown on button click
    // Function to toggle dropdown visibility
function toggleDropdown(event) {
    var dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(function(dropdown) {
        var dropdownContent = dropdown.querySelector('.dropdown-content');
        var dropbtn = dropdown.querySelector('.dropbtn');

        // Close dropdown if clicking outside of it
        if (!dropdown.contains(event.target)) {
            dropdownContent.classList.remove('show-dropdown');
        }

        // Toggle dropdown visibility
        if (event.target === dropbtn && dropdownContent.classList.contains('show-dropdown')) {
            dropdownContent.classList.remove('show-dropdown');
        } else if (event.target === dropbtn) {
            closeAllDropdowns();
            dropdownContent.classList.add('show-dropdown');
        }
    });
}

// Function to close all dropdowns
function closeAllDropdowns() {
    var dropdownContents = document.querySelectorAll('.dropdown-content');
    dropdownContents.forEach(function(content) {
        content.classList.remove('show-dropdown');
    });
}

// Event listener for clicks
document.addEventListener('click', function(event) {
    toggleDropdown(event);
});

// Event listener to close dropdowns on window resize (optional)
window.addEventListener('resize', function() {
    closeAllDropdowns();
});

/**script for slides */
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

/** script for leaves slider */
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

/**script for slides */
let slideIndex2 = 1;
showSlides2(slideIndex2);

// Next/previous controls
function plusSlides2(n) {
  showSlides2(slideIndex2 += n);
}

/** script for leaves slider */
function showSlides2(n) {
  let i;
  let slides2 = document.getElementsByClassName("mySlides2");
  if (n > slides2.length) {slideIndex2 = 1}
  if (n < 1) {slideIndex2 = slides2.length}
  for (i = 0; i < slides2.length; i++) {
    slides2[i].style.display = "none";
  }
  slides2[slideIndex2-1].style.display = "block";
}

