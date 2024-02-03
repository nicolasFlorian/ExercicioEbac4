// PopUp

const worktimeBtn = document.querySelector('.worktime-btn');
worktimeBtn.addEventListener('click', () => {
    document.querySelector('.popup-worktime').classList.add('show');
    document.body.classList.add('no-scroll');
})
const closeBtn = document.querySelector('.popup-worktime .icon-cancel');
closeBtn.addEventListener('click', () => {
    document.querySelector('.popup-worktime').classList.remove('show');
    document.body.classList.remove('no-scroll');
})

// Toggle button and Toggle Form

const toggleBtn = document.querySelector('.toggle-button');
toggleBtn.addEventListener('click', () => {
    let elements = Array.from(toggleBtn.children)
    if (elements[1].classList.contains('clicked')) {
        elements[1].classList.remove('clicked');
        elements[2].classList.add('clicked');
        elements[0].classList.add('clicked');
        document.querySelector('.form-quero-cotar').style.display = 'none';
        document.querySelector('.form-tenho-duvida').style.display = 'flex';
    }else{
        elements[2].classList.remove('clicked');
        elements[1].classList.add('clicked');
        elements[0].classList.remove('clicked');
        document.querySelector('.form-quero-cotar').style.display = 'flex';
        document.querySelector('.form-tenho-duvida').style.display = 'none';
    }
})

// Check Form

function checkForm() {


    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = Array.from(form.querySelectorAll('input'));
        $(inputs[2]).mask('(00) 00000-0000');
        $(inputs[3]).mask('000.000.000-00');
        $(inputs[7]).mask('00000-000');

        inputs.forEach(input => {
            input.addEventListener('change', (e) => {
                let currentInput = e.target;
                let inputErrorMessage = "Por favor preencha o campo corretamente.";
                console.log(currentInput);
                if (currentInput.value.trim() == '') {
                    input.parentElement.setAttribute('data-error', 'Por favor preencha o campo.');
                } else if (currentInput == inputs[0] && !currentInput.value.match(/^[a-zA-Z]+([',. -][a-zA-Z]+)* [a-zA-Z]+([',. -][a-zA-Z]+)*$/)) {
                    input.parentElement.setAttribute('data-error', 'Por favor preencha com seu nome completo.');
                } else if (currentInput == inputs[1] && !currentInput.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                    input.parentElement.setAttribute('data-error', inputErrorMessage);
                } else if (currentInput == inputs[2] && currentInput.value.length < 15) {
                    input.parentElement.setAttribute('data-error', inputErrorMessage);
                } else if (currentInput == inputs[3] && currentInput.value.length < 14) {
                    input.parentElement.setAttribute('data-error', inputErrorMessage);
                } else if (currentInput == inputs[7] && currentInput.value.length < 9) {
                    input.parentElement.setAttribute('data-error', inputErrorMessage);
                } else {
                    input.parentElement.removeAttribute('data-error');
                }
            });
        });
    });
}

checkForm();

// Select List

const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const inputVi = dropdown.querySelector('.input-vi-area input');
    const menuVi = dropdown.querySelector('.menu-vi');
    const options = dropdown.querySelectorAll('.menu-vi li');
    let inputViAreaElements = dropdown.querySelector('.input-vi-area').children;

    Array.from(inputViAreaElements).forEach(element => {
    element.addEventListener('click', () =>{
        menuVi.classList.toggle('show-menu');

        document.addEventListener('click', (event)=>{
            if (!event.target.matches('.input-vi-area span') && !event.target.matches('.input-vi-area input') && !event.target.matches('.vi-area ul')){
                if (menuVi.classList.contains('show-menu')) {
                    menuVi.classList.remove('show-menu');
                }}
            });

        });
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            inputVi.value = option.textContent;
            inputVi.classList.add('input-vi-text')
            menuVi.classList.remove('show-menu');

            options.forEach(option => {
                option.classList.remove('menu-option-selected');
            })

            option.classList.add('menu-option-selected');
        })
    })
})

// Submit Form

function submitForm() {
    const buttonsSubmit = Array.from(document.querySelectorAll('button[type="submit"]'));
    const inputVehicle = document.querySelector('input[name="vehicle"]');


    buttonsSubmit.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();


        let currentButton = e.target;
        let form = currentButton.closest('form');
        let currentInputs = Array.from(form.querySelectorAll('input'));
        const hasError = currentInputs.some(input => input.parentElement.hasAttribute('data-error') || (inputVehicle.parentElement).parentElement.hasAttribute('data-error'));
        const hasEmptyValue = currentInputs.some(input => input.value.trim() == '');
        console.log(hasError, hasEmptyValue);


        if (hasError || hasEmptyValue) {
            currentInputs.forEach(input => {
                if (input.value.trim() == '') {
                    input.parentElement.setAttribute('data-error', 'Por favor preencha o campo.');
                } else {
                    input.parentElement.removeAttribute('data-error');
                }
            });
        } else {
            currentButton.parentElement.removeAttribute('data-error');
            form.submit();
        }


        if (form.classList.contains('form-quero-cotar')) {
            inputVehicle.parentElement.removeAttribute('data-error');
            if (inputVehicle.value == '') {
                (inputVehicle.parentElement).parentElement.setAttribute('data-error', 'Por favor preencha o campo.');
                document.querySelector('.vi-area ul').style.bottom = '24px';
            }
            inputVehicle.addEventListener('blur', () => {
                console.log('deu blur');
                (inputVehicle.parentElement).parentElement.removeAttribute('data-error');
                document.querySelector('.vi-area ul').style.bottom = '0px';
            })
        }
    });
});
}

submitForm();


// Video Slider

const videoSlide = document.querySelector('.video-container video');
let currentVideoIndex = parseInt(videoSlide.getAttribute('data-index'), 10);
let contentVideos= [{model: 'BMW X3',
description: 'O BMW X3 combina luxo e desempenho, oferecendo um interior elegante, tecnologia avançada e uma condução dinâmica. Um SUV premium que impressiona.',
brand: 'BMW'},

{model: 'Tesla Model 3',
description: 'O Tesla Model 3 redefine a mobilidade elétrica, com autonomia excepcional, desempenho surpreendente e um design moderno. Uma escolha sustentável sem comprometer o estilo.',
brand: 'Tesla'},

{model: 'Porsche 911',
description: 'O Porsche 911 é uma obra-prima da engenharia, oferecendo um equilíbrio perfeito entre potência e elegância. Um ícone automotivo que proporciona uma experiência emocionante.',
brand: 'Porsche'},

{model: 'Mercedes-Benz E-Class',
description: 'A E-Class combina sofisticação e tecnologia de ponta. Com um interior luxuoso e características de segurança avançadas, é a escolha perfeita para quem busca conforto e inovação.',
brand: 'Mercedes-Benz'},

{model: 'Audi Q7',
description: 'O Audi Q7 é um SUV premium que oferece espaço, conforto e desempenho. Com um interior requintado e recursos avançados, é a escolha ideal para viagens sofisticadas.',
brand: 'Audi'}];

const videoPauseOrStartIcon = document.querySelector('span.pause-or-start');
videoPauseOrStartIcon.addEventListener('click', () => {
    if (videoSlide.paused) {
        videoSlide.play();
        videoPauseOrStartIcon.classList.remove('icon-start');
        videoPauseOrStartIcon.classList.add('icon-pause');
    } else {
        videoSlide.pause();
        videoPauseOrStartIcon.classList.remove('icon-pause');
        videoPauseOrStartIcon.classList.add('icon-start');
    }
})

function updateVideoAndInfo(index) {
    const descriptionVehicle = document.querySelector('.description-vehicle');
    const brandVehicle = document.querySelector('.vehicle-info-item p');
    const modelVehicle = document.querySelector('.vehicle-info-item h4');
    videoSlide.src = `Assets/Videos/${contentVideos[index].model}.webm`;
    descriptionVehicle.innerHTML = contentVideos[index].description;
    modelVehicle.innerHTML = contentVideos[index].model;
    brandVehicle.innerHTML = contentVideos[index].brand;
    videoSlide.play();
    videoPauseOrStartIcon.classList.remove('icon-start');
    videoPauseOrStartIcon.classList.add('icon-pause');
}

const slideIconRight = document.querySelector('.slide-icons .right');
slideIconRight.addEventListener('click', () => {
    currentVideoIndex++;

    if (currentVideoIndex >= contentVideos.length) {
        currentVideoIndex = 0;
    }

    updateVideoAndInfo(currentVideoIndex);
});

const slideIconLeft = document.querySelector('.slide-icons .left');
slideIconLeft.addEventListener('click', () => {
    currentVideoIndex--;

    if (currentVideoIndex < 0) {
        currentVideoIndex = contentVideos.length - 1;
    }

    updateVideoAndInfo(currentVideoIndex);
})

videoSlide.addEventListener('ended', () => {
    currentVideoIndex++;
    if (currentVideoIndex >= contentVideos.length) {
        currentVideoIndex = 0;
    }
    updateVideoAndInfo(currentVideoIndex);
});


// Interested Button

const interestedBtn = document.querySelector('.interested-btn');

interestedBtn.addEventListener('click', () => {
    let modelVehicle = document.querySelector('.vehicle-info-item h4');
    const liElements = document.querySelectorAll('.menu-vi li');
    const inputVehicle = document.querySelector('input[name="vehicle"]');
    const options = [];
    liElements.forEach(li => {
        options.push(li.textContent.trim());
    })


    if (options.includes(modelVehicle.textContent.trim())) {
        inputVehicle.value = modelVehicle.textContent.trim();
        inputVehicle.classList.add('input-vi-text')        
    }

    liElements.forEach(li => {
        if (li.textContent.trim() === modelVehicle.textContent.trim()) {
            li.classList.add('menu-option-selected');
        } else {
            li.classList.remove('menu-option-selected');
        }
    });
})