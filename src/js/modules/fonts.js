let fonts = [
    'Arial',
    'Arial Black',
    'Arial Narrow',
    'Arial Rounded MT Bold',
    'Avant Garde',
    'Calibri',
    'Candara',
    'Century Gothic',
    'Franklin Gothic Medium',
    'Futura',
    'Geneva',
    'Gill Sans',
    'Helvetica',
    'Impact',
    'Lucida Grande',
    'Optima',
    'Segoe UI',
    'Tahoma',
    'Trebuchet MS',
    'Verdana',
    'Big Caslon',
    'Bodoni MT',
    'Book Antiqua',
    'Calisto MT',
    'Cambria',
    'Didot',
    'Garamond',
    'Georgia',
    'Goudy Old Style',
    'Hoefler Text',
    'Lucida Bright',
    'Palatino',
    'Perpetua',
    'Rockwell',
    'Rockwell Extra Bold',
    'Baskerville',
    'Times New Roman',
    'Consolas',
    'Courier New',
    'Lucida Console',
    'Lucida Sans Typewriter',
    'Monaco',
    'Andale Mono',
    'Copperplate',
    'Papyrus',
    'Brush Script MT'
];


function Detector() {
    // a font will be compared against all the three default fonts.
    // and if it doesn't match all 3 then that font is not available.
    let baseFonts = ['monospace', 'sans-serif', 'serif'];

    //we use m or w because these two characters take up the maximum width.
    // And we use a LLi so that the same matching fonts can get separated
    let testString = "mmmmmmmmmmlli";

    //we test using 72px font size, we may use any size. I guess larger the better.
    let testSize = '72px';

    let h = document.getElementsByTagName("body")[0];

    // create a SPAN in the document to get the width of the text we use to test
    let s = document.createElement("span");
    s.style.fontSize = testSize;
    s.innerHTML = testString;
    let defaultWidth = {};
    let defaultHeight = {};
    for (let index in baseFonts) {
        //get the default width for the three base fonts
        s.style.fontFamily = baseFonts[index];
        h.appendChild(s);
        //width for the default font
        defaultWidth[baseFonts[index]] = s.offsetWidth;
        //height for the defualt font
        defaultHeight[baseFonts[index]] = s.offsetHeight;
        h.removeChild(s);
    }

    var detect = (font) => {
        let detected = false;
        for (let index in baseFonts) {
            // name of the font along with the base font for fallback.
            s.style.fontFamily = font + ',' + baseFonts[index];
            h.appendChild(s);
            let matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
            h.removeChild(s);
            detected = detected || matched;
        }
        return detected;
    }

    this.detect = detect;
};

let d = new Detector();
let supportedFonts = [];
fonts.forEach((font) => {
    if (d.detect(font)) {
        supportedFonts.push(font);
    }
});

export default supportedFonts;
