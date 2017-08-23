/*
Used to fix the viewport problems with in-app browsers like Facebook and Twitter.
Credit: Martin Thorsen Ranang at https://stackoverflow.com/questions/35421247/wrong-viewport-page-height-in-embedded-facebook-browser-in-ios-9-x


Make sure that the following is set in your css:

html, body, #outer-wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}


Make sure the following meta tag is in your html

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, target-densityDpi=device-dpi">
*/


function inAppBrowserResizeFix(){
    window.addEventListener('resize', function(){
        onResize();
    });

    function onResize(){
        document.querySelector('html').style.height = window.innerHeight + 'px';
    }

    onResize();
}

export default inAppBrowserResizeFix;
