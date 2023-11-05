function updateSetingsZone(text) {
    var restaurant1Values = getClickedInputsForRestaurant(text);

    var updates = {};
    updates["/" + text] = restaurant1Values[0];
    firebase.database().ref().update(updates);
}

function settingsPage(path) {
    var database = firebase.database();
    var dataRef = database.ref(path);
    dataRef.once('value', function (snapshot) {
        var value = snapshot.val();

        const elements = document.getElementsByName(path);
        for (const element of elements) {
            if (element.value === 'Yes' && value == 'Yes') {
                handleRadioClick(element);
                element.checked = true;
            }
            if (value == 'No' && element.value == 'No') {
                handleRadioClick(element);
                element.checked = true;
            }
        }

    });

}

function settingPage() {
    settingsPage('PFRW');
    settingsPage('Pljeskovac');
    settingsPage('HoodFood');
    settingsPage('Vega');
    settingsPage('PinkPanter');
    settingsPage('PlaviBik');
    
    settingsPage('MaliNapulj');
    settingsPage('Sunce');
    settingsPage('Andrea');
    settingsPage('EraFood');
    settingsPage('JKVill');
    settingsPage('Urban');
}

function updateSetings() {
    updateSetingsZone('PFRW');
    updateSetingsZone('Pljeskovac');
    updateSetingsZone('HoodFood');
    updateSetingsZone('Vega');
    updateSetingsZone('PinkPanter');
    updateSetingsZone('PlaviBik');

    updateSetingsZone('MaliNapulj');
    updateSetingsZone('Sunce');
    updateSetingsZone('Andrea');
    updateSetingsZone('EraFood');
    updateSetingsZone('JKVill');
    updateSetingsZone('Urban');
}

function handleRadioClick(clickedRadio) {
    var radios = document.getElementsByName(clickedRadio.name);


    for (var i = 0; i < radios.length; i++) {
        radios[i].classList.remove("clicked");
    }


    clickedRadio.classList.add("clicked");
}

var radios = document.querySelectorAll('input[type=radio]');
radios.forEach(function (radio) {
    radio.addEventListener("click", function () {
        handleRadioClick(radio);
    });
});

function getClickedInputsForRestaurant(restaurantName) {
    var clickedInputs = document.querySelectorAll('input[name="' + restaurantName + '"].clicked');
    var values = [];

    clickedInputs.forEach(function (input) {
        values.push(input.value);
    });

    return values;
}