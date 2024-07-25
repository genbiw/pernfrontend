
(function (I, n, f, o, b, i, p) {
    I[b] = I[b] || function () { (I[b].q = I[b].q || []).push(arguments) };
    I[b].t = 1 * new Date(); i = n.createElement(f); i.async = 1; i.src = o;
    p = n.getElementsByTagName(f)[0]; p.parentNode.insertBefore(i, p)
})(window, document, 'script', 'https://livechat.infobip.com/widget.js', 'liveChat');

export function initializeLCSDK() {
    const script = document.createElement('script');
    script.src = 'https://livechat.infobip.com/widget.js';
    script.async = true;
    
    script.onload = () => {
        if (typeof window.liveChat !== 'undefined') {
            window.liveChat('init', 'e1bc950a-c62f-4b7e-b393-4d3a36d67c22');
        } else {
            console.error('LiveChat script loaded but liveChat is not defined');
        }
    };
    
    script.onerror = () => {
        console.error('Failed to load LiveChat script');
    };
    
    document.head.appendChild(script);
}