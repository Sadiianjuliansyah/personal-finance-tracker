"use strict";


const pageTitles = {
    dashboard: "Dashboard",
    transactions: "Transaksi",
    assets: "Aset",
    allocations: "Alokasi",
    targets: "Target",
    reports: "Laporan & Statistik",
    settings: "Backup & Settings"
};


const pages = document.querySelectorAll(".page");

const desktopNavItems =
    document.querySelectorAll(".nav-item");

const mobileNavItems =
    document.querySelectorAll(".mobile-nav-item");

const pageTitle =
    document.getElementById("page-title");

const currentDate =
    document.getElementById("current-date");


function openPage(pageName) {

    pages.forEach((page) => {
        page.classList.remove("active");
    });


    const selectedPage =
        document.getElementById(pageName);


    if (!selectedPage) {
        return;
    }


    selectedPage.classList.add("active");


    desktopNavItems.forEach((item) => {

        item.classList.toggle(
            "active",
            item.dataset.page === pageName
        );

    });


    mobileNavItems.forEach((item) => {

        item.classList.toggle(
            "active",
            item.dataset.page === pageName
        );

    });


    pageTitle.textContent =
        pageTitles[pageName] || "Personal Finance Tracker";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function setupNavigation() {

    const navigationItems = [
        ...desktopNavItems,
        ...mobileNavItems
    ];


    navigationItems.forEach((item) => {

        item.addEventListener("click", () => {

            const pageName =
                item.dataset.page;

            openPage(pageName);

        });

    });

}


function updateDate() {

    const now = new Date();


    currentDate.textContent =
        new Intl.DateTimeFormat(
            "id-ID",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        ).format(now);

}

async function registerServiceWorker() {

    if (!("serviceWorker" in navigator)) {

        console.warn(
            "Service Worker tidak didukung browser ini."
        );

        return;

    }


    try {

        const registration =
            await navigator.serviceWorker.register(
                "./service-worker.js"
            );


        console.log(
            "Service Worker berhasil didaftarkan:",
            registration.scope
        );

    } catch (error) {

        console.error(
            "Service Worker gagal didaftarkan:",
            error
        );

    }

}

async function initApp() {

    try {

        await FinanceDB.openDatabase();

        setupNavigation();

        updateDate();

        registerServiceWorker();

        console.log(
            "Personal Finance Tracker berhasil dijalankan."
        );

        console.log(
            "IndexedDB berhasil dibuka."
        );

    } catch (error) {

        console.error(
            "Gagal membuka IndexedDB:",
            error
        );

    }

}


initApp();