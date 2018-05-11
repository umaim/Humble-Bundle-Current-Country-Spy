// ==UserScript==
// @name         Humble Bundle Current Country Spy
// @description  Show current Humble Bundle country in navbar.
// @author       Cloud
// @namespace    https://github.com/Cloud-Swift/Humble-Bundle-Current-Country-Spy
// @supportURL   https://github.com/Cloud-Swift/Humble-Bundle-Current-Country-Spy/issues
// @version      1.0.0
// @downloadURL  
// @icon         https://humblebundle-a.akamaihd.net/static/hashed/46cf2ed85a0641bfdc052121786440c70da77d75.png
// @include      https://www.humblebundle.com/*
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';
    require(['lib/require-domReady'], function (domReady) {
        domReady(function () {
            const showCountry = () => {
                try {
                    //const country = window.models.request.country_code;
                    const country = document.head.innerText.match(/country_code: "\w{2}"/g).toString().slice(15, 17) || '';

                    let node = document.getElementsByClassName('tabs tabs-navbar-item js-tabs-navbar-item js-maintain-scrollbar-on-dropdown');

                    if (node.item(0)) {
                        node.item(0).innerHTML += `<span class="navbar-item">${country}</span>`;
                    }
                } catch (e) {
                    setTimeout(() => {
                        showCountry();
                    }, 500);
                }
            };

            setTimeout(() => {
                showCountry();
            }, 1);
        });
    });
})();