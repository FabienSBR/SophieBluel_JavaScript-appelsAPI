
const gallery = document.querySelector('.gallery');

const createFigures = (works) => {
    gallery.innerHTML = '';

    works.forEach((work) => {
        gallery.insertAdjacentHTML('beforeend', `
            <figure id="${work.id}">
                <img src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
            </figure>
        `);
    });
};

const stockWorks = async () => {
    const works = await getWorks();
    const worksList = JSON.stringify(works);
    window.sessionStorage.setItem('works', worksList);
};

const genererProjects = async () => {
    const isDemo = window.location.hostname.endsWith('github.io');

    if (isDemo) {
        createFigures(demoWorks);
        return;
    }

    await stockWorks();

    const works = JSON.parse(
        window.sessionStorage.getItem('works')
    );

    createFigures(works);
};

genererProjects();
