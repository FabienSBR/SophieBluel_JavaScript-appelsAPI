
const filters = document.getElementById('filters');

// Création des boutons de filtres
const generateBtn = async () => {
    let categories;

    if (window.isDemoMode) {
        categories = window.demoCategories;
    } else {
        categories = await getCategories();
    }

    window.sessionStorage.setItem(
        'categories',
        JSON.stringify(categories)
    );

    // Bouton Tous
    if (!document.getElementById('0')) {
        filters.insertAdjacentHTML(
            'afterbegin',
            '<button id="0" class="filter">Tous</button>'
        );
    }

    // Boutons des catégories
    categories.forEach(category => {
        const btn = `
            <button id="${category.id}" class="filter">
                ${category.name}
            </button>
        `;

        filters.insertAdjacentHTML('beforeend', btn);
    });
};

// Gestion du filtrage
const sortWorks = () => {
    const sortButtons = document.querySelectorAll('.filter');

    sortButtons.forEach(sortButton => {
        sortButton.addEventListener('click', (event) => {
            const localWorks = JSON.parse(
                window.sessionStorage.getItem('works')
            ) || [];

            const selectedId = event.currentTarget.id;

            if (selectedId === '0') {
                createFigures(localWorks);
                return;
            }

            const selectedWorks = localWorks.filter(
                work => work.categoryId == selectedId
            );

            createFigures(selectedWorks);
        });
    });
};

// Initialisation
const manageCategories = async () => {
    await generateBtn();
    sortWorks();
};

manageCategories();
