function updateSetings(){
    var restaurant1Values = getClickedInputsForRestaurant('restaurant1');
    console.log('Values for restaurant1:', restaurant1Values);
}

function handleRadioClick(clickedRadio) {
    var radios = document.getElementsByName(clickedRadio.name);


    for (var i = 0; i < radios.length; i++) {
        radios[i].classList.remove("clicked");
    }


    clickedRadio.classList.add("clicked");
}

var radios = document.querySelectorAll('input[type=radio]');
radios.forEach(function(radio) {
    radio.addEventListener("click", function() {
        handleRadioClick(radio);
    });
});

function getClickedInputsForRestaurant(restaurantName) {
    var clickedInputs = document.querySelectorAll('input[name="' + restaurantName + '"].clicked');
    var values = [];

    clickedInputs.forEach(function(input) {
        values.push(input.value);
    });

    return values;
}