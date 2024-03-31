document.body.onload = function() {
    var colors = [
        {background: 'blue', text: 'black'},
        {background: 'pink', text: 'black'}
    ];
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor.background;
    document.body.style.color = randomColor.text;
};