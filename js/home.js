document.addEventListener("DOMContentLoaded", () => {
    // Dropdowns for menu
    const dropdowns = [
        { toggle: "map-toggle", menu: "map-menu" },
        { toggle: "overview-toggle", menu: "overview-menu" },
        { toggle: "service-toggle", menu: "service-menu" },
        { toggle: "worker-toggle", menu: "worker-menu" },
    ];

    // Skjul alle dropdown-menuer ved indlæsning
    dropdowns.forEach(({ menu }) => {
        const menuElement = document.getElementById(menu);
        menuElement.style.display = "none";
    });

    // Tilføj klik-event for hver dropdown
    dropdowns.forEach(({ toggle, menu }) => {
        const toggleElement = document.getElementById(toggle);
        const menuElement = document.getElementById(menu);

        toggleElement.addEventListener("click", (event) => {
            event.preventDefault();
            const isVisible = menuElement.style.display === "block";

            // Skjul alle dropdowns, før vi viser den valgte
            dropdowns.forEach(({ menu }) => {
                document.getElementById(menu).style.display = "none";
            });

            // Skift synlighed for den valgte dropdown
            menuElement.style.display = isVisible ? "none" : "block";
        });
    });

    // Luk dropdowns, hvis brugeren klikker udenfor
    document.addEventListener("click", (event) => {
        dropdowns.forEach(({ toggle, menu }) => {
            const toggleElement = document.getElementById(toggle);
            const menuElement = document.getElementById(menu);

            if (
                !toggleElement.contains(event.target) &&
                !menuElement.contains(event.target)
            ) {
                menuElement.style.display = "none";
            }
        });
    });

    // Åben og luk menuen når menuikonet klikkes
    function toggleMenu() {
        const slideMenu = document.getElementById('slide-menu');
        slideMenu.classList.toggle('open');
    }

    // Find menuikonet og tilføj event listener
    const menuIcon = document.getElementById('menu-icon');
    if (menuIcon) {
        menuIcon.addEventListener('click', toggleMenu);
    }

    // Luk menuen, hvis der klikkes udenfor
    document.addEventListener('click', (event) => {
        const slideMenu = document.getElementById('slide-menu');
        if (
            !slideMenu.contains(event.target) && 
            !event.target.closest('#menu-icon') && 
            slideMenu.classList.contains('open')
        ) {
            slideMenu.classList.remove('open');
        }
    });

    // Tilføj klik-event til luk-knappen
    const closeBtn = document.getElementById('close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
    }

    // Dropdowns for slide-menu
    const slideDropdowns = [
        { toggle: "slide-map-toggle", menu: "slide-map-menu" },
        { toggle: "slide-overview-toggle", menu: "slide-overview-menu" },
        { toggle: "slide-service-toggle", menu: "slide-service-menu" },
        { toggle: "slide-worker-toggle", menu: "slide-worker-menu" },
    ];

    // Skjul alle dropdown-menuer ved indlæsning i slide-menu
    slideDropdowns.forEach(({ menu }) => {
        const menuElement = document.getElementById(menu);
        if (menuElement) {
            menuElement.style.display = "none";
        }
    });

    // Tilføj klik-event for hver dropdown i slide-menu
    slideDropdowns.forEach(({ toggle, menu }) => {
        const toggleElement = document.getElementById(toggle);
        const menuElement = document.getElementById(menu);

        if (toggleElement && menuElement) {
            toggleElement.addEventListener("click", (event) => {
                event.preventDefault();
                const isVisible = menuElement.style.display === "block";

                // Skjul alle dropdowns i slide-menu, før vi viser den valgte
                slideDropdowns.forEach(({ menu }) => {
                    const otherMenu = document.getElementById(menu);
                    if (otherMenu) {
                        otherMenu.style.display = "none";
                    }
                });

                // Skift synlighed for den valgte dropdown i slide-menu
                menuElement.style.display = isVisible ? "none" : "block";
            });
        }
    });

    // Luk dropdowns i slide-menu, hvis brugeren klikker udenfor
    document.addEventListener("click", (event) => {
        slideDropdowns.forEach(({ toggle, menu }) => {
            const toggleElement = document.getElementById(toggle);
            const menuElement = document.getElementById(menu);

            if (
                menuElement &&
                !menuElement.contains(event.target) &&
                toggleElement &&
                !toggleElement.contains(event.target)
            ) {
                menuElement.style.display = "none";
            }
        });
    });
});
