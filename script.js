// ==========================================================
// ICT251 ACTIVITY 3 - INTERACTIVE FEATURES
// Author: Mainza Hachilensa
// Description: Adds interactivity to the portfolio website.
// ==========================================================

// We wrap everything in a 'DOMContentLoaded' event listener.
// This ensures the HTML is fully loaded before the script tries to find elements.
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // FEATURE 1: THEME SWITCH (Dark/Light Mode)
    // ==========================================================
    // This creates a button, toggles a 'light-mode' class on the body,
    // and saves the user's preference in their browser's localStorage.
   
    const themeButton = document.createElement('button');
    themeButton.textContent = '🌙 Dark/Light';
    themeButton.id = 'theme-toggle';
    // Append the button to the header
    document.querySelector('header').appendChild(themeButton);

    // Check if a theme was previously saved
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    // Add the click event to switch themes
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
       
        // Save the new preference
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });


    // ==========================================================
    // FEATURE 2: MOBILE NAVIGATION (Hamburger Menu)
    // ==========================================================
    // This creates a 'Menu' button. On small screens, clicking it toggles
    // a class that shows/hides the navigation links.
   
    const navList = document.querySelector('nav ul');
    const menuButton = document.createElement('button');
    menuButton.textContent = '☰ Menu';
    menuButton.id = 'menu-toggle';
    // Insert the button BEFORE the navigation list in the HTML
    navList.parentNode.insertBefore(menuButton, navList);

    menuButton.addEventListener('click', () => {
        navList.classList.toggle('active');
       
        // Change the button text based on state
        if (navList.classList.contains('active')) {
            menuButton.textContent = '✕ Close';
        } else {
            menuButton.textContent = '☰ Menu';
        }
    });

    // Optional UX improvement: close the menu when a link is clicked
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            menuButton.textContent = '☰ Menu';
        });
    });


    // ==========================================================
    // FEATURE 3: EXPANDABLE CONTENT (Project Details)
    // ==========================================================
    // This hides the project descriptions by default and adds a button
    // to reveal them one by one.
   
    const projectItems = document.querySelectorAll('.project-item');
   
    projectItems.forEach(item => {
        const paragraph = item.querySelector('p');
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Show Details';
        toggleBtn.classList.add('expand-btn');
       
        // Hide the paragraph initially
        paragraph.style.display = 'none';
       
        // Append the button inside the <h3> tag
        item.querySelector('h3').appendChild(toggleBtn);
       
        // Add the click event to show/hide
        toggleBtn.addEventListener('click', () => {
            if (paragraph.style.display === 'none') {
                paragraph.style.display = 'block';
                toggleBtn.textContent = 'Hide Details';
            } else {
                paragraph.style.display = 'none';
                toggleBtn.textContent = 'Show Details';
            }
        });
    });


    // ==========================================================
    // FEATURE 4 (COMPULSORY): CONTACT FORM VALIDATION & PREVIEW
    // ==========================================================
    // This validates the form, prevents the page from reloading,
    // and shows a preview of the data on the page.
   
    const contactForm = document.querySelector('form');
    const formFeedback = document.createElement('div');
    formFeedback.id = 'form-feedback';
    contactForm.appendChild(formFeedback); // Add a feedback box to the form

    contactForm.addEventListener('submit', (event) => {
        // 1. Prevent the form from actually submitting (reloading the page)
        event.preventDefault();

        // 2. Get the user input values and remove whitespace
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let errors = [];

        // 3. Validate Name (Reject whitespace only)
        if (name === '') {
            errors.push('Name cannot be empty or just spaces.');
        }

        // 4. Validate Email (Simple regex to check format)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Please enter a valid email address.');
        }

        // 5. Validate Message (Reject whitespace only)
        if (message === '') {
            errors.push('Message cannot be empty or just spaces.');
        }

        // 6. Display feedback
        if (errors.length > 0) {
            // Show errors
            formFeedback.style.color = '#ff4d4d'; // Red
            formFeedback.textContent = 'Errors: ' + errors.join(' ');
        } else {
            // Show preview (using textContent as requested)
            formFeedback.style.color = '#00ff88'; // Green
            // Note: The assignment says to say "validated", not "delivered".
            formFeedback.textContent = `Data Validated! Name: ${name}, Email: ${email}, Message: ${message}`;
           
            // Optionally clear the form
            contactForm.reset();
        }
    });
// ==========================================================
// MODIFICATION 1: TYPEWRITER HERO SUBTITLE
// ==========================================================
// This creates a looping effect that types out different phrases.

const typewriterElement = document.getElementById('typewriter');

// The phrases we want to cycle through
const phrases = [
    "Computer Science Student",
    "Future Software Engineer",
    "Martial Artist",
    "Web Developer",
    "Problem Solver"
];

let phraseIndex = 0; // Which phrase we are on
let charIndex = 0;   // Which letter of the phrase we are on
let isDeleting = false; // Are we typing or deleting?

function typeLoop() {
    const currentPhrase = phrases[phraseIndex];
   
    if (isDeleting) {
        // Remove a letter
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add a letter
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
   
    // Decide the speed of typing
    let typeSpeed = isDeleting ? 50 : 100; // Delete faster than typing
   
    // If the phrase is fully typed, pause before deleting
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause for 2 seconds
        isDeleting = true;
    }
    // If the phrase is fully deleted, move to the next one
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // Loop back to start
        typeSpeed = 500; // Pause before typing the next phrase
    }
   
    // Call the function again after the delay
    setTimeout(typeLoop, typeSpeed);
}

// Start the typewriter effect
typeLoop();

}); // End of DOMContentLoaded