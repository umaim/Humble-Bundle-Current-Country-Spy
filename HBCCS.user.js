// ==UserScript==
// @name         Humble Bundle Current Country Spy
// @description  Show current Humble Bundle country in navbar.
// @author       Cloud
// @namespace    https://github.com/xPixv/Humble-Bundle-Current-Country-Spy
// @supportURL   https://github.com/xPixv/Humble-Bundle-Current-Country-Spy/issues
// @version      1.1.6
// @downloadURL  https://github.com/xPixv/Humble-Bundle-Current-Country-Spy/raw/master/HBCCS.user.js
// @icon         https://humblebundle-a.akamaihd.net/static/hashed/46cf2ed85a0641bfdc052121786440c70da77d75.png
// @include      https://www.humblebundle.com/*
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    const showCountry = () => {
        try {
            const country = unsafeWindow.models.request.country_code;

            let node = document.getElementsByClassName('tabs tabs-navbar-item');

            if (node.item(0)) {
                let elem = document.createElement('a');
                elem.setAttribute('class', 'navbar-item not-dropdown button-title');
                elem.href = "#";
                elem.innerHTML = '<span class="navbar-icon-text-wrapper"><i class="navbar-item-icon hb hb-star-o mobile"></i><span class="navbar-item-text">'+country+'</span></span>';
                node.item(0).append(elem);
            }
        } catch (e) {
            setTimeout(() => {
                showCountry();
            }, 500);
        }
    };

    setTimeout(() => {
        showCountry();
    }, 100);
})();
