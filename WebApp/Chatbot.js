import React, {useEffect} from 'react'

function Chatbot() {

    useEffect(() => {
      (function(d, m){
        var kommunicateSettings = {"appId":"c0cbb117850e740ef70f61e58728ebda","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});
    });


  return (
    <div></div>
  )
}

export default Chatbot