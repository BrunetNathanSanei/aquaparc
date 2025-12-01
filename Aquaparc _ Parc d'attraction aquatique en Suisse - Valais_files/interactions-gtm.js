document.addEventListener('DOMContentLoaded', function () {
    function initializeTracking() {
        if (!window.tagmanagerLoaded) {
            return; // Exit if Tag Manager is not loaded
        }

        window.dataLayer = window.dataLayer || [];

        /**
         * Push data to GTM
         */
        function pushToDataLayer(eventData) {
            window.dataLayer.push({ 'event_data': null });
            window.dataLayer.push({ ...eventData });
        }

        /**
         * Build GTM event object
         */
        function buildEventData(eventName, eventArea, text, type, networkType, menu1, menu2, tabText) {
            let data = { event: eventName };
            data.event_data = {
                page_category: pageEventData.category,
                area: eventArea,
            };
            if (type === 'search') {
                data.event_data.search_term = text;
            } else if (text) {
                data.event_data.text = text;
            }

            if (networkType) {
                data.event_data.social_network_type = networkType;
            }

            // Menu-specific fields
            if (menu1) {
                data.event_data.menu_1 = menu1;
            }
            if (menu2) {
                data.event_data.menu_2 = menu2;
            }
            if (tabText) {
                data.event_data.form_search_category = tabText;
            }
            return data;
        }
        function getNetworkType(buttonText) {
            const lowerText = buttonText.toLowerCase();
            const networkMap = {
                Facebook: 'facebook',
                YouTube: 'youtube',
                Twitter: 'x',
                Instagram: 'instagram',
                Music: 'tiktok',
                Tiktok: 'tiktok',
                Linkedin: 'linkedin',
                Tripadvisor: 'tripadvisor',

            };
            for (const key in networkMap) {
                if (lowerText.includes(key.toLowerCase())) {
                    return networkMap[key];
                }
            }
            return undefined; // nothing matched
        }

        //  Track form submissions (search)
        const searchForm = document.querySelector('form[data-gtm-event]');
        const searchInput = document.getElementById('tx-indexedsearch-searchbox-sword');

        if (searchForm && searchInput) {
            searchForm.addEventListener('submit', function () {
                const event_area = searchForm.closest('[data-gtm-area]')?.getAttribute('data-gtm-area') || '';
                const gtmEventName = searchForm.getAttribute('data-gtm-event');
                const searchTerm = searchInput.value.trim().toLowerCase();;

                if (gtmEventName && searchTerm) {
                    pushToDataLayer(buildEventData(gtmEventName, event_area, searchTerm, 'search'));
                }
            });
        }

        //  Track normal links with data-gtm-event
        document.querySelectorAll('a[data-gtm-event]').forEach(function (link) {
            link.addEventListener('click', function () {
                let tabText = '';
                const tabPane = link.closest('.tab-pane');
                if (tabPane) {
                    const tabId = tabPane.id; // e.g., "firsttab"
                    const tabElement = document.querySelector(`[data-bs-target="#${tabId}"]`);
                    if (tabElement) {
                        tabText = tabElement.textContent.trim().toLowerCase();
                    }
                }
                let buttonText = '';
                const h5 = link.querySelector('h5');
                if (h5) {
                    buttonText = h5.textContent.trim().toLowerCase();
                }
                else {
                    buttonText = link.textContent.trim().toLowerCase();
                }
                if (link.getAttribute('data-gtm-event') === 'form_search_click') {
                    switch (true) {
                        case /tarifs/i.test(buttonText):
                            tabText = "rate";
                            break;

                        case /(calendrier d'ouverture|horaires|öffnungszeit|hours)/i.test(buttonText):
                            tabText = "schedule";
                            break;

                        case /attractions/i.test(buttonText):
                            tabText = "attractions";
                            break;

                        case /(billets|tickets)/i.test(buttonText):
                            tabText = "tickets";
                            break;

                        case /(plan|map|parkplan)/i.test(buttonText):
                            tabText = "map";
                            break;
                    }
                }
                const gtmEventName = link.getAttribute('data-gtm-event') || '';
                const event_area = link.closest('[data-gtm-area]')?.getAttribute('data-gtm-area') || '';
                pushToDataLayer(buildEventData(gtmEventName, event_area, buttonText, 'click', '', '', '', tabText));
            });
        });

        //  Track buttons with data-gtm-event
        document.querySelectorAll('button[data-gtm-event]').forEach(function (link) {
            link.addEventListener('click', function () {
                let tabText = '';
                const tabPane = link.closest('.tab-pane');
                if (tabPane) {
                    const tabId = tabPane.id; // e.g., "firsttab"
                    const tabElement = document.querySelector(`[data-bs-target="#${tabId}"]`);
                    if (tabElement) {
                        tabText = tabElement.textContent.trim().toLowerCase();
                    }
                }
                const gtmEventName = link.getAttribute('data-gtm-event') || '';
                const event_area = link.closest('[data-gtm-area]')?.getAttribute('data-gtm-area') || '';
                const buttonText = link.textContent.trim().toLowerCase();
                pushToDataLayer(buildEventData(gtmEventName, event_area, buttonText, 'click', '', '', '', tabText));
            });
        });

        //  Track social links
        document.querySelectorAll('.social-gtm[data-gtm-event] a').forEach(function (link) {
            link.addEventListener('click', function () {
                const gtmEventName = link.closest('[data-gtm-event]').getAttribute('data-gtm-event');
                const buttonText = link.textContent.trim().replace(/\s+/g, '');
                const event_area = link.closest('[data-gtm-area]')?.getAttribute('data-gtm-area') || '';
                const event_networkType = getNetworkType(buttonText);

                if (gtmEventName && buttonText) {
                    pushToDataLayer(buildEventData(gtmEventName, event_area, '', 'click', event_networkType));
                }
            });
        });

        //  Track menu clicks (level1 / level2)
        document.querySelectorAll('[data-gtm-header]').forEach(function (menuLink) {
            if (menuLink.classList.contains("non-linked-menu-item")) {
                // no need to attach the event listner
            } else {
                menuLink.addEventListener('click', function () {
                    const level = menuLink.getAttribute('data-gtm-header');
                    const menuText = menuLink.textContent.trim();

                    const gtmEventElement = menuLink.closest('[data-gtm-event]');
                    const gtmEventName = gtmEventElement ? gtmEventElement.getAttribute('data-gtm-event') : '';

                    let menu1 = '';
                    let menu2 = '';

                    if (level === 'level1') {
                        menu1 = menuText.toLowerCase();

                    } else if (level === 'level2') {
                        const parentLevel1 = menuLink.closest('ul')?.closest('li')?.querySelector('[data-gtm-header="level1"]');
                        menu1 = parentLevel1 ? parentLevel1.textContent.trim().toLowerCase() : '';
                        menu2 = menuText.toLowerCase();
                    }
                    const event_area = menuLink.closest('[data-gtm-area]')?.getAttribute('data-gtm-area') || '';
                    pushToDataLayer(buildEventData(gtmEventName, event_area, '', 'click', '', menu1, menu2));
                });
            }
        });

        //  Push search result data after page load

        const resultItems = document.querySelectorAll('.tx-indexedsearch-res[data-gtm-event]');
        if (resultItems.length > 0) {
            const gtmEventName = resultItems[0].getAttribute('data-gtm-event') || '';
            const event_area = resultItems[0].closest('[data-gtm-area]')?.getAttribute('data-gtm-area') || '';
            const searchTerm = pageEventData.search_term.toLowerCase();;
            pushToDataLayer(
                buildEventData(gtmEventName, event_area, searchTerm, 'search')
            );
        }

        const gtmFormWrapper = document.getElementById('newsletter_gtm') || document.querySelector('.newsletter_gtm');

        if (gtmFormWrapper?.hasAttribute('data-gtm-event')) {
            const gtmEventName = gtmFormWrapper.getAttribute('data-gtm-event');

            gtmFormWrapper.addEventListener('submit', function (e) {
                // stop if form has any error field
                if (gtmFormWrapper.querySelector('._has_error')) return;

                // checkbox check only for #newsletter_gtm
                if (gtmFormWrapper.id === 'newsletter_gtm') {
                    const checkbox = gtmFormWrapper.querySelector('input[type="checkbox"]');
                    if (!checkbox || !checkbox.checked) return; // <-- only continue if checked
                }

                //  button that triggered the submit
                const button = e.submitter;
                if (!button) return;

                const buttonText = button.textContent.trim().toLowerCase();
                const event_area = gtmFormWrapper.closest('[data-gtm-area]')?.getAttribute('data-gtm-area') || '';

                pushToDataLayer(buildEventData(gtmEventName, event_area, buttonText, 'form'));
            });
        }


        document.querySelectorAll('form').forEach(function (form) {
            // Only process forms that have a hidden field with "hidden-gtm" in the name
            const hiddenField = form.querySelector('input[type="hidden"][name*="hidden-gtm"]');

            if (!hiddenField) return;
            form.addEventListener('submit', function (e) {

                const gtmEventName = hiddenField.value; // from hidden field
                const event_area = form.closest('[data-gtm-area]')?.getAttribute('data-gtm-area') || '';
                const button = e.submitter;
                if (!button) return;
                const buttonText = button.textContent.trim().toLowerCase();
                pushToDataLayer(buildEventData(gtmEventName, event_area, buttonText, 'submit', '', '', ''));
            });
        });

    }
    // Initialize tracking immediately if Tag Manager is already loaded
    initializeTracking();

    // Also listen for the cookieConsent event in case it fires after DOMContentLoaded
    window.addEventListener("cookieConsent", function (event) {
        // Small delay to ensure tagmanagerLoaded is set
        setTimeout(initializeTracking, 100);
    });

    window.addEventListener("CookiebotOnAccept", function (e) {
        // Small delay to ensure tagmanagerLoaded is set
        setTimeout(initializeTracking, 100);
    });
});
