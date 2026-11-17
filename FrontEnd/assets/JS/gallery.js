
/** Sélection de la galerie */
const gallery = document.querySelector('.gallery');

/** Génération des projets dans la galerie */
const createFigures = (works) => {
    gallery.innerHTML = "";

    works.forEach((work) => {
        gallery.insertAdjacentHTML('beforeend', `
            <figure id="${work.id}">
                <img src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
            </figure>
        `);
    });
};

/** Chargement des projets */
const genererProjects = async () => {

    // Version GitHub Pages : données statiques
    if (window.isDemoMode) {
        const works = window.demoWorks;

        window.sessionStorage.setItem(
            'works',
            JSON.stringify(works)
        );

        createFigures(works);
        return;
    }

    // Version locale : récupération depuis l'API
    try {
        const works = await getWorks();

        window.sessionStorage.setItem(
            'works',
            JSON.stringify(works)
        );

        createFigures(works);

    } catch (error) {
        console.error(
            "Erreur lors du chargement des projets :",
            error
        );
    }
};

/** Lancement */
genererProjects();
