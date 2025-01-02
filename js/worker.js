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

    // Specifik funktionalitet for view.html
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
                    <div class="order-actions">
                        <button class="btn btn-success btn-sm" onclick="removeOrder(${index})">Godkend</button>
                    </div>
                </div>
            `;
            orderList.appendChild(listItem);
        });
    }
    
    // Funktion til at fjerne en ordre
    window.removeOrder = function(index) {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.splice(index, 1); 
        localStorage.setItem("orders", JSON.stringify(orders)); 
        location.reload(); 
    };


    // Det er koden til login.html
    // Denne kode nede under virker ikke, så der skal noget andet backend
    // Det vil være fedt, hvis man kunne log ind til at komme på product.html og view.html
    const express = require('express');
    const bodyParser = require('body-parser');
    const session = require('express-session');

    const app = express();
    const PORT = 3000;

    // Dumme data for demonstration
    const users = {
    worker1: 'password123', // username: password
    };

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
    secret: 'royal-arena-secret',
    resave: false,
    saveUninitialized: true,
    }));

    // Tjener static filer
    app.use(express.static('public'));

    // Login endpoint
    app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] && users[username] === password) {
        req.session.user = username;
        res.redirect('/product.html'); // Vendet tilbage til product.html efter login
    } else {
        res.send('<h1>Login failed</h1><a href="/login.html">Try again</a>');
    }
    });

    // Middleware to protect routes
    function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login.html');
    }

    // Sikre routen
    app.get('/product.html', isAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/public/product.html');
    });

    app.get('/view.html', isAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/public/view.html');
    });

    app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    });

    //Dette er koden til product.html
    //Denne kode virker ikke endnu, der skal noget andet backend herind
    function saveProduct() {
        const name = document.getElementById("product-name").value;
        const category = document.getElementById("product-category").value;
        const ingredients = document.getElementById("product-ingredients").value;
        const description = document.getElementById("product-description").value;
        const price = document.getElementById("product-price").value;

        if (name && category && ingredients && description && price) {
            alert("Varen er gemt!");
            document.getElementById("add-product-form").reset();
        } else {
            alert("Udfyld venligst alle felterne.");
        }
    }
});
