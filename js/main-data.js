const mainData = () => {
    fetch('https://anime-97035-default-rtdb.firebaseio.com/anime.json')
        .then((responce) => {
            return responce.json();
        })
        .then((data) => {
            console.log(data)
        })
};

mainData();