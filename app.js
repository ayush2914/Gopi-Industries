let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('section .navbar ul li a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop -150;
        let hight = sec.offsetHeight;
        let id = sec.getAttribute('id');   

        if(top >= offset && top < offset + hight){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('section .navbar ul li a[href*=' + id + ']').classList.add('active');
            });

            // sec.classList.add('show-animate');
        }
        // else {
        //     sec.classList.remove('show-animate');
        // };
    });
};

const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown-menu');

toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');

    toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' :'fa-solid fa-bars'
}

