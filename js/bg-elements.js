const bgElements = () => {
    const elements = document.querySelectorAll('.set-bg');

    elements.forEach(item => {
        item.style.backgroundImage = `url(${item.dataset.setbg})`;
    })
}

bgElements();