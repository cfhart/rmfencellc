const initSlider = () => {
}

// Add click event listeners to the gallery images
const images = document.querySelectorAll('.filterCards img');
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

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');

    // Check if we are on index.html
    if (window.location.pathname.includes('index.html')) {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

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

