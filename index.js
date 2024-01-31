// Submit Form

// PopUp

const worktimeBtn = document.querySelector('.worktime-btn');
worktimeBtn.addEventListener('click', () => {
    document.querySelector('.popup-worktime').classList.add('show');
})
const closeBtn = document.querySelector('.popup-worktime .icon-cancel');
closeBtn.addEventListener('click', () => {
    document.querySelector('.popup-worktime').classList.remove('show');
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

// Check Form

const formCotar = document.querySelector('.form-quero-cotar');

const inputs = Array.from(formCotar.querySelectorAll('input'));
inputs.forEach(input => {
        $(inputs[2]).mask('(00) 00000-0000');
        $(inputs[3]).mask('000.000.000-00');
        $(inputs[7]).mask('00000-000');
        input.addEventListener('change',()=>{
        if (input.value == '') {
            input.parentElement.setAttribute('data-error', 'Campo obrigatório');
        }else{
            input.parentElement.removeAttribute('data-error');
        }
        
    })
})

console.log(inputs);
