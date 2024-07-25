// infobipWebPush.js

const infobipWebPushModule = (function (I, n, f, o, b, i, p) {
    I[b] = I[b] || function () { (I[b].q = I[b].q || []).push(arguments) };
    I[b].t = 1 * new Date(); i = n.createElement(f); i.async = 1; i.src = o;
    p = n.getElementsByTagName(f)[0]; p.parentNode.insertBefore(i, p);
  
    return {
      infobipWebPush: I[b], // Возвращаем функцию напрямую, чтобы можно было вызывать infobipWebPushModule.infobipWebPush('init', options)
      init: function (options) {
        this.infobipWebPush('init', options);
      },
      // Другие функции, если необходимо
    };
  })(window, document, 'script', 'https://webpush.infobip.com/bundle-latest.js', 'infobipWebPush');
  
  export default infobipWebPushModule;
  