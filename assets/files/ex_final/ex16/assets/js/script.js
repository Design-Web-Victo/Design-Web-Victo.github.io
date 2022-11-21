let keys = document.querySelectorAll('.note');

function boutonJoue() {
    joueSon(this.getAttribute("data-key"));
}

function toucheJoue(e) {
    joueSon(e.keyCode);
    console.log(e);
}

function joueSon(keyCode){
    let sound = document.querySelector("audio[data-key='" + keyCode + "']");
    let key = document.querySelector(`div[data-key="${keyCode}"]`)
    
    if(sound === null) {
        return;
    }

    sound.currentTime = 0;
    sound.play();

    key.classList.add('selection');
}

function finTransition(e) {
    if (e.propertyName !== "transform") return;
        this.classList.remove('selection')
}

window.addEventListener('keydown', toucheJoue);
keys.forEach( key => key.addEventListener('transitionend', finTransition))

keys.forEach(function(key){
    key.addEventListener('click',boutonJoue)
})
