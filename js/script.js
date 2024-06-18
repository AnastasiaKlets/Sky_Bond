//функция для хедера (липкий)
let header = $('.header'),
    scrollPrev = 0;
$(window).scroll(function() {
    let scrolled = $(window).scrollTop();
    if ( scrolled > 100 && scrolled > scrollPrev ) {
        header.addClass('out');
    } else {
        header.removeClass('out');
    }
    scrollPrev = scrolled;
});


//маска для номера
$('input[name="phone"]').mask("+375(99)999-99-99");


//метки
let utms_names = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
utms_names.forEach(name => {
    let utm_inputs = document.querySelectorAll(`.${name}`);
    utm_inputs.forEach(input => {
        input.value = new URL(window.location.href).searchParams.get(`${name}`);
    });
});

//функция бургер меню
function burgerMenu(selector) {
    let menu = $(selector);
    let button = menu.find('.burger-menu_button', '.burger-menu_lines');
    let links = menu.find('.burger-menu_link');
    let overlay = menu.find('.burger-menu_overlay');
    button.on('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });
    links.on('click', () => toggleMenu());
    overlay.on('click', () => toggleMenu());
    function toggleMenu(){
        menu.toggleClass('burger-menu_active');
        if (menu.hasClass('burger-menu_active')) {
            $('body').css('overlow', 'hidden');
        } else {
            $('body').css('overlow', 'visible');
        }
    }
}
burgerMenu('.burger-menu');


//для слайдера
if (document.querySelector('.documents_field') != null) {
    slider({
        containerSelector: '.documents_container',
        slideSelector: '.documents_slide',
        prevSlideSelector: '.documents_prev',
        nextSlideSelector: '.documents_next',
        wrapperSelector: '.documents_wrapper',
        fieldSelector: '.documents_field',
        elementsPerPage: 4,
        elementsPerPageMobile: 1,
        indicatorsClass: `documents_indicators`,
        columnGap: 30,
        swipe: true,
    })
}



//функция для табов
function openCity(cityName) {
    let i;
    let x = document.getElementsByClassName("city");
    let y = cityName.length
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(cityName).style.display = "block";
}

//модалки
function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    console.log(modal)
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, closeSelector, modalSelector) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute(closeSelector) == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
}

if (document.querySelector('.consult') != null) {
    modal('[data-consult]', 'data-close', '.consult');
    modal('[data-thanks]', 'data-close', '.thanks');
}

// отправка формы
$("form").submit(function (event) {
    event.preventDefault();
    let name = event.target.classList.value.slice(0, -5);
    let formData = new FormData(document.querySelector(`.${name}_form`));
    sendPhp(name, formData);
});
function sendPhp(name, data) {
    $.ajax({
        url: `./php/send_${name}.php`,
        type: 'POST',
        cache: false,
        data: data,
        dataType: 'html',
        processData: false,
        contentType: false,
        success: function (data) {
            $(`.${name}_form`).trigger('reset');
            if (name == 'survey' || name == 'consult' || name == 'team') {
                closeModal(`.${name}`)
            }
            console.log(222)
            openModal('.thanks');
            setTimeout(function(){
                closeModal('.thanks');
            }, 6000)
        }
    });
}