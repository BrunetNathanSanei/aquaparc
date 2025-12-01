document.addEventListener("DOMContentLoaded", function () {
    function initializeEcommerce() {
        if (!window.tagmanagerLoaded) return;

        window.dataLayer = window.dataLayer || [];

        function pushToDataLayer(eventData) {
            window.dataLayer.push({ ecommerce: null });
            window.dataLayer.push({ ...eventData });
        }

        const buildEventData = (items, ecommerceCategory) => ({
            event: ecommerceCategory,
            ecommerce: {
                item_list_name: item_list_name,
                currency: ecommerceData?.currency || "GBP",
                items,
            },
        });

        const items = [];
        let item_list_name = undefined; // default fallback
        let ecommerceCategory = "view_item_list"; // default fallback

        // --- Function for <a> elements ---
        function processAnchor(link, index) {
            const card = link.closest(".card");
            const header = card?.querySelector("h1,h2,h3,h4,h5,h6");
            const headerText = header ? header.textContent.trim().toLowerCase() : "";

            let item_category = "others";
            switch (true) {
                case /ticket/i.test(headerText): item_category = "ticket"; break;
                case /pass/i.test(headerText): item_category = "pass"; break;
            }

            let item_category2 = "others";
            switch (true) {
                case /day/i.test(headerText): item_category2 = "day ticket"; break;
                case /flexi/i.test(headerText): item_category2 = "flexible ticket"; break;
            }

            return {
                index,
                item_name: headerText,
                item_category,
                item_category2,
                item_category3: undefined,
                price: undefined,
                item_id: undefined,
            };
        }

        // --- Function for <div> elements ---
        function processDiv(div, index) {
            const firstP = div.querySelector("p");
            const firstText = firstP ? firstP.textContent.trim().toLowerCase() : "";

            let item_category = "others";
            switch (true) {
                case /room/i.test(firstText): item_category = "rooms"; break;
            }

            let item_category2 = "others";
            switch (true) {
                case /themed/i.test(firstText): item_category2 = "themed room"; break;
                case /family/i.test(firstText): item_category2 = "family room"; break;
                case /interconnecting/i.test(firstText): item_category2 = "interconnecting room"; break;
                case /luxury/i.test(firstText): item_category2 = "luxury room"; break;
            }

            return {
                index,
                item_name: firstText,
                item_category,
                item_category2,
                item_category3: undefined,
                price: undefined,
                item_id: undefined,
            };
        }

        // --- Process all elements ---
        const allElements = document.querySelectorAll("[data-ecommerce-category]");
        let itemIndex = 1; // start from 1 only for valid elements

        allElements.forEach((el) => {
            if (el.closest(".cloned")) return; // skip cloned elements

            let item;
            if (el.tagName.toLowerCase() === "a") {
                item = processAnchor(el, itemIndex);

                // Track clicks with event = "select_item"
                el.addEventListener("click", () => {
                    pushToDataLayer(buildEventData([item], "select_item"));
                });

            } else if (el.tagName.toLowerCase() === "div") {
                item = processDiv(el, itemIndex);
            }

            // Get the category from element
            if (el.hasAttribute("data-ecommerce-category")) {
                ecommerceCategory = el.getAttribute("data-ecommerce-category");
            }

            if (item) {
                items.push(item);
                itemIndex++; // increment only after adding a valid item
            }
        });

        // Push all items at once (list view)
        if (items.length) {
            pushToDataLayer(buildEventData(items, ecommerceCategory));
        }
    }

    initializeEcommerce();
    window.addEventListener("cookieConsent", () => setTimeout(initializeEcommerce, 100));
});
