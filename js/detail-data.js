const detailData = () => {
    const preloder = document.querySelector('.preloder');

    const renderGanreList = (ganres) => {
        const dropdownBlock = document.querySelector('.header__menu .dropdown');

        ganres.forEach(ganre => {
            dropdownBlock.insertAdjacentHTML('beforeend', `
                <li><a href="/anime/categories.html?ganre=${ganre}">${ganre}</a></li>
            `)
        })
    }

    const renderAnimeDetails = (array, itemId) => {
        const animeObj = array.find(item => item.id == itemId);
        const imageBlock = document.querySelector('.anime__details__pic');
        const viewsBlock = imageBlock.querySelector('.view');
        const titleBlock = document.querySelector('.anime__details__title h3');
        const subtitleBlock = document.querySelector('.anime__details__title span');
        const descriptionBlock = document.querySelector('.anime__details__text p');
        const widgetList = document.querySelectorAll('.anime__details__widget ul li');
        const breadcrumb = document.querySelector('.breadcrumb__links span');

        if (animeObj) {
            breadcrumb.textContent = animeObj.ganre;

            imageBlock.dataset.setbg = animeObj.image;

            viewsBlock.insertAdjacentHTML('beforeend', `
                <i class="fa fa-eye"></i> ${animeObj.views}
            `)

            titleBlock.textContent = animeObj.title;
            subtitleBlock.textContent = animeObj['original-title'];
            descriptionBlock.textContent = animeObj.description;

            widgetList[0].insertAdjacentHTML('beforeend', `
                <span>Date aired:</span>${animeObj.date}
            `)
            widgetList[1].insertAdjacentHTML('beforeend', `
                <span>Rating:</span>${animeObj.rating}
            `)
            widgetList[2].insertAdjacentHTML('beforeend', `
                <span>Genre:</span>${animeObj.tags.join(', ')}
            `)

            document.querySelectorAll('.set-bg').forEach((elem) => {
                elem.style.backgroundImage = `url(${elem.dataset.setbg})`
            })

            setTimeout(() => {
                preloder.classList.remove('active');
            }, 500)
        } else {
            console.log('Аниме отсутсвует!');
        }
    }

    fetch('https://anime-97035-default-rtdb.firebaseio.com/anime.json')
        .then((responce) => responce.json())
        .then((data) => {
            const ganres = new Set();
            const ganreParams = new URLSearchParams(window.location.search).get('itemId');

            data.forEach((item) => {
                ganres.add(item.ganre);
            })
            
            if (ganreParams) {
                renderAnimeDetails(data, ganreParams);
            } else {
                console.log('Аниме отсутсвует!');
            }

            renderGanreList(ganres);
        })
}

detailData();