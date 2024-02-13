//IIFE (Immediately Invoked Function Expression - The reason for wrapping the entire script inside a self-invoking function (commonly referred to as an Immediately Invoked Function Expression or IIFE) is to create a private scope for the variables and functions defined within it. This practice is often used to prevent polluting the global namespace and to encapsulate code.)

import { $authHostInfobip } from "./index";

(function (e, t, n, o) {
    e.PeopleEventsObject = o;
    e[o] = e[o] || {
        init: function (t) {
            e[o].apiKey = t;
        },
        setPerson: function (t, n) {
            e[o].person = t;
            e[o].personTtl = n;
        },
        forgetPerson: function () {
            e[o].toForgetPerson = true;
        },
        track: function () {
            (e[o].q = e[o].q || []).push(arguments);
        },
        updatePerson: function (t) {
            e[o].personToUpdate = { person: t };
        },
        appendToList: function (t, n) {
            e[o].attributeToAppend = { attributeName: t, attribute: n };
        }
    };
    var r = t.createElement("script");
    var s = t.getElementsByTagName("script")[0];
    r.async = 1;
    r.src = n;
    s.parentNode.insertBefore(r, s);
})

(window, document, 'https://s3.eu-central-1.amazonaws.com/portal-cdn-production/people-events-sdk/pe.latest-2.js', 'pe');

export function initializePeopleSDK(apiKey) {
    window.pe.init(apiKey);
}

export async function createPerson (contactInfo) {
    const requestData = {
        contactInformation: {
            email: [
                {
                    address: contactInfo
                }
            ]
        }
        // Add other properties as needed
    };

    const { data } = await $authHostInfobip.post("people/2/persons", requestData);
    return data;
}