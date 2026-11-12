// ==UserScript==
// @name         Humble Bundle Current Country Spy
// @description  Show current Humble Bundle country in navbar.
// @author       Cloud
// @namespace    https://github.com/umaim/Humble-Bundle-Current-Country-Spy
// @supportURL   https://github.com/umaim/Humble-Bundle-Current-Country-Spy/issues
// @version      1.2.1
// @updateURL    https://github.com/umaim/Humble-Bundle-Current-Country-Spy/raw/master/HBCCS.user.js
// @downloadURL  https://github.com/umaim/Humble-Bundle-Current-Country-Spy/raw/master/HBCCS.user.js
// @icon         https://humblebundle-a.akamaihd.net/static/hashed/46cf2ed85a0641bfdc052121786440c70da77d75.png
// @include      https://www.humblebundle.com/*
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    const showCountry = () => {
        let country = 'Unknown';
        unsafeWindow._hbdl.forEach(e => {if (e.event == 'context_ready') { country = e.page.country; }});

        const putOnce = (node, kind, create, insert) => {
            if (!node) return;
            const existing = node.querySelector('[data-hbccs="' + kind + '"]');
            if (existing) {
                let label = existing.querySelector('a');
                if (label && label.textContent !== country) label.textContent = country;
                return;
            }
            let elem = create();
            elem.setAttribute('data-hbccs', kind);
            insert(node, elem);
        };

        const createHorizontal = () => {
            let elem = document.createElement('li');
            elem.innerHTML = '<a class="hover:text-link focus-visible:ring-ring/[.50] ring-offset-background transition-colors focus-visible:ring-3 rounded-md focus-visible:ring-offset-0 focus-visible:outline-hidden text-sm leading-tight font-normal disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden text-accent inline-flex gap-1 items-center w-max group justify-center px-4 py-2" data-radix-collection-item="" href="#">' + country + '</a>';
            return elem;
        };

        const createVertical = () => {
            let elem = document.createElement('li');
            elem.setAttribute('class', 'w-full');
            elem.innerHTML = '<a class="hover:text-link focus-visible:ring-ring/[.50] ring-offset-background transition-colors focus-visible:ring-3 rounded-md focus-visible:ring-offset-0 focus-visible:outline-hidden text-sm leading-tight font-normal disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden text-accent inline-flex gap-1 items-center group justify-between py-6 px-4 w-full" data-radix-collection-item="" href="#">' + country + '</a>';
            return elem;
        };

        const insertHorizontal = (node, elem) => node.insertBefore(elem, node.querySelector('li.items-center'));
        const insertVertical = (node, elem) => node.appendChild(elem);

        let observer = new MutationObserver(function (mutationList) {
            for (let mutation of mutationList) {
                putOnce(
                    mutation.target.querySelector('ul[data-orientation=horizontal][dir=ltr]'),
                    'horizontal',
                    createHorizontal,
                    insertHorizontal
                );

                putOnce(
                    mutation.target.querySelector('ul[data-orientation=vertical][dir=ltr]'),
                    'vertical',
                    createVertical,
                    insertVertical
                );
            }
        });
        observer.observe(document.body, {childList: true, subtree: true});
    };

    setTimeout(() => {
        showCountry();
    }, 100);
})();
