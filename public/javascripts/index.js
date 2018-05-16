/* MDC */
const textField = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field'));
const forgetButtonRipple = new mdc.ripple.MDCRipple(document.querySelector('#forget'));
const aboutButtonRipple = new mdc.ripple.MDCRipple(document.querySelector('#about')); 
const submitButtonRipple = new mdc.ripple.MDCRipple(document.querySelector('#submitForm'));
const floatingLabel = new mdc.floatingLabel.MDCFloatingLabel(document.querySelector('#floatLabel'));
/* EVENTS */

(() => {
    let addressInput = document.getElementById("address");
    let address = Cookies.get("address");
    addressInput.focus();
    if (address) { //load cookies and automatically get address
        addressInput.value = address;
        /*document.querySelector("#submitForm").click(e => {
            e.preventDefault();                            // TODO: fix reload bug
        });*/
    }
})();

$("#form").submit(event => {
    $("#inputError").hide(); //hide error
    $("#logo").attr("class", "logo rotate-right") //start spinning animtaion
    let getUrl = window.location;
    let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
    let address = document.getElementById("address").value; //get grlc address
    Cookies.set("address", address, {
        expires: DayDiff(new Date()) //expire in 2020, cookiepocalypse
        //reference: https://stackoverflow.com/questions/532635/
    });
    $.post(`/getbalance?address=${address}`, resp => { // to avoid cors errors we're getting the balance server-side
        resp = JSON.parse(resp);
        if (resp.error) {
            $("#balance").html(resp.error); //show error, most probably unknown address
        } else if (resp.inputError) {
            $("#inputError").show(); //show error 
            $("#inputError").html(resp.inputError); //show error 
        } else {
            $("#submitForm").html("Update");
            $("#balance").html(`${resp} GRLC`);
        }
        $("#logo").attr("class", "logo"); // stop spinning logo
    });
    event.preventDefault();
});

function forgetCookies() {
    Cookies.remove("address"); //simply remove the cookie if client wants to
    location.reload();   //reload page to clear all fields
}

/* FUNCTIONS */

function DayDiff(CurrentDate) {
    var TYear = CurrentDate.getFullYear();
    var TDay = new Date("January, 01, 2020");
    TDay.getFullYear(TYear);
    var DayCount = (TDay - CurrentDate) / (1000 * 60 * 60 * 24);
    DayCount = Math.round(DayCount);
    return (DayCount);
}