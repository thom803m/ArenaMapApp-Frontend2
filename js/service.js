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
    
    // Håndterer plus/minus knapperne
    // Specifik funktionalitet for cart.html og order.html
    const minusButtons = document.querySelectorAll('.minus-btn');
    const plusButtons = document.querySelectorAll('.plus-btn');

    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const countSpan = this.nextElementSibling;
            let currentCount = parseInt(countSpan.textContent);
            if (currentCount > 0) {
                countSpan.textContent = currentCount - 1;
            }
        });
    });

    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const countSpan = this.previousElementSibling;
            let currentCount = parseInt(countSpan.textContent);
            countSpan.textContent = currentCount + 1;
        });
    });

    // Håndtering af ordreformularen
    document.getElementById("orderForm")?.addEventListener("submit", function(event) {
        event.preventDefault();

        // Hent værdier fra formularen
        const fullName = document.getElementById("fullName").value;
        const pickupLocation = document.getElementById("pickupLocation").value;
        const pickupTime = document.getElementById("pickupTime").value;
        const orderNote = document.getElementById("orderNote").value;

        // Hent varer fra kurven, som vi formoder er gemt i localStorage
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
        
        // Opret en ordrebekræftelse
        const order = {
            fullName,
            pickupLocation,
            pickupTime,
            orderNote,
            items: cartItems.map(item => item.name),
            totalPrice,
        };

        // Gem ordren i localStorage
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));

        // Simuler at gemme ordren og navigér til cart.html
        alert(`Ordre bekræftet for ${fullName}!\nHentested: ${pickupLocation}\nAfhentning: ${pickupTime}`);
        window.location.href = "cart.html"; // Gå til kurvsiden
    });

    // Annuller knap funktion
    document.getElementById("cancelButton")?.addEventListener("click", function() {
        alert("Informationen er blevet annulleret.");
        document.getElementById("orderForm")?.reset();  // Nulstiller formularen
    });

    // Ordreliste - vis ordrer og tilføj knapper til fjern og opdater
    const orderList = document.getElementById("order-list");
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        orderList.innerHTML = "<li class='list-group-item empty'>Ingen ordrer endnu.</li>";
    } else {
        orders.forEach((order, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item", "order-item");

            listItem.innerHTML = `
                <div class="order-info">
                    <div><strong>Navn:</strong><br> ${order.fullName}</div>
                    <div><strong>Bod:</strong><br> ${order.pickupLocation}</div>
                    <div><strong>Afhentningstid:</strong><br> ${order.pickupTime}</div>
                    <div><strong>Bestilte varer:</strong><br> ${order.items.join(", ")}</div>
                    <div><strong>Bemærkning:</strong><br> ${order.orderNote || "Ingen bemærkninger"}</div>
                </div>
            `;
            orderList.appendChild(listItem);
        });
    }
});
