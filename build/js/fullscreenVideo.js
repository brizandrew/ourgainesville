module.exports = {
    init: function(container){
        this.handleHeightWidth(container);

        const self = this;
        window.addEventListener('resize', function(){
            self.handleHeightWidth(container);
        });
    },

    handleHeightWidth: function(container){
        const videos = Array.from(document.querySelectorAll('video.fullscreen'));
        for (let video of videos) {
            let aspectRatio = video.getAttribute('data-aspectratio');
            aspectRatio = aspectRatio === null ? '16:9' : aspectRatio;

            const indexOfColon = aspectRatio.indexOf(':');
            const aspectWidth = parseFloat(aspectRatio.substring(0,indexOfColon));
            const aspectHeight = parseFloat(aspectRatio.substring(indexOfColon + 1));
            const arCoefficient =  aspectHeight / aspectWidth;

            if (container.clientHeight / container.clientWidth > arCoefficient ){
                video.style.width = 'auto';
                video.style.height = '100%';
            }
            else{
                video.style.width = '100%';
                video.style.height = 'auto';
            }
        }
    }
};
