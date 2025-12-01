window.analyticsLoaded = false;
window.tagmanagerLoaded = false;
window.hjLoaded = false;
window.facebookLoaded = false;

// create dataLayer
window.dataLayer = window.dataLayer || [];

// Define dataLayer and the gtag function.
function gtag() { dataLayer.push(arguments); }

window.addEventListener('cookieConsent', function (event) {
    (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({
            'gtm.start':
                new Date().getTime(), event: 'gtm.js'
        }); var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-N52JQD');
    if (event.detail.hasOption('_gtm')) {
        if (false === window.tagmanagerLoaded) {
            window.tagmanagerLoaded = true;
            if(typeof window.pageEventData !== 'undefined' && window.pageEventData) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({'page_data':null});
                window.dataLayer.push({
                    'event': 'page_view',
                    'page_data': {...window.pageEventData}
                });
            }
        }
    } else {
        // do not load tag manager
    }

    // if (event.detail.hasOption('_hj')) {
    //     if (false === window.analyticsLoaded) {
    //         window.hjLoaded = true;
    //     }
    // } else {
    //     // do not load analytics
    // }

    if (event.detail.hasOption('_fb')) {
        if (false === window.analyticsLoaded) {
            window.facebookLoaded = true;
        }
    } else {
        // do not load facebook
    }
})