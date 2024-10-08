// Array of captcha image URLs
const captchaImages = [
    './images/captcha1.jpg',
    './images/captcha2.jpg',
    './images/captcha3.jpg',
    // Add more captcha image URLs here
];

// Function to generate a random captcha image URL
function getRandomCaptchaImage() {
    const randomIndex = Math.floor(Math.random() * captchaImages.length);
    return captchaImages[randomIndex];
}

// Function to load and display the captcha image
function loadCaptchaImage() {
    const captchaImg = document.getElementById('captchaImg');
    const randomCaptchaImage = getRandomCaptchaImage();
    captchaImg.src = randomCaptchaImage;
}

// Function to validate the captcha
function ValidateCaptcha() {
    const capcthavalues = {
        'captcha1.jpg': 'RBSKW',
        'captcha2.jpg': '459CT',
        'captcha3.jpg': '6H3T8',
    };

    const captchaImgSrc = document.getElementById('captchaImg').src;
    const captchaInput = document.getElementById('captchaInput').value;

    // Extract the file name from the captchaImgSrc
    const captchaFileName = captchaImgSrc.substring(captchaImgSrc.lastIndexOf('/') + 1);

    if (capcthavalues[captchaFileName] === captchaInput) {
        window.location.href = './principal.html';
    } else {
        alert('Captcha incorrecto');
        loadCaptchaImage();
    }
}

// Call the loadCaptchaImage function when the page is loaded
window.addEventListener('DOMContentLoaded', loadCaptchaImage);
document.getElementById('submitCaptcha').addEventListener('click', ValidateCaptcha);
