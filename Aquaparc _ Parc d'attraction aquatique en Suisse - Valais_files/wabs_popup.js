$('document').ready(function(){
    checkPopupVisibilities();
});

$('.alert-box .btn-link').click(function () {
    $(this).closest(".alert-closable").toggleClass("minimized");
});


function closeWabsPopup(uid) {
    if(getCookie('wabs_popup')) {
        // load value from cookie
        let cookie_object = JSON.parse(getCookie('wabs_popup'));
        // check if id is in cookie_object, if not -> append it to array
        let uid_array = cookie_object.closed;
        // append uid to cookie
        if (!cookie_object.closed.includes(uid)) {
            uid_array.push(uid);
            document.cookie = 'wabs_popup={"closed":'+JSON.stringify(uid_array)+'}; SameSite=None; Secure';
        }
    }
    else {
        // cookie was_popup is not available yet
        let uid_array = [];
        uid_array.push(uid);
        document.cookie = 'wabs_popup={"closed":'+JSON.stringify(uid_array)+'}; SameSite=None; Secure';
    }
    //hide the popup
    // $('#'+uid).find('.tx-wabsolute-popup:first').hide();
    $('#'+uid).next('.alert-closable').addClass("hidden");
}


function checkPopupVisibilities() {
    if(getCookie('wabs_popup')) {
        // load value from cookie
        let cookie_object = JSON.parse(getCookie('wabs_popup'));
        // loop through every item in DOM with class "tx-wabsolute-popup"
        $( ".tx-wabsolute-popup" ).each(function( index ) {
            // hide all wabs_popups by default
            $(this).children().addClass("hidden");
            // get the parent id
            let parent_id = $(this).closest('div .frame').attr('id');
            // get the according "data-sessiondriven" value
            let sessiondriven = $(this).attr("data-sessiondriven");
            // check if parent_id is in cookie_object
            if(cookie_object.closed.includes(parent_id)) {
                //check if wabs_popup is sessiondriven -> always open
                if(sessiondriven==0) {
                    $(this).children().removeClass("hidden");
                }
                else {
                    // keep wabs_popup closed
                }
            }
            else {
                // popup has not been closed yet => show it
                $(this).children().removeClass("hidden");
            }
            });
     }
     else {
        // no cookie -> no popup has been closed -> show all popups
        $( ".tx-wabsolute-popup" ).each(function( index ) {
            $(this).children().removeClass("hidden");
        });
     }

}



// ##############################

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
