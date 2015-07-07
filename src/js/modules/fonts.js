let fonts = [
    'Andale Mono',
    'Arial Black',
    'Arial Narrow',
    'Arial Rounded MT Bold',
    'Arial',
    'Avant Garde',
    'Baskerville',
    'Big Caslon',
    'Bodoni MT',
    'Book Antiqua',
    'Brush Script MT',
    'Calibri',
    'Calisto MT',
    'Cambria',
    'Candara',
    'Century Gothic',
    'Consolas',
    'Copperplate',
    'Courier New',
    'Didot',
    'Franklin Gothic Medium',
    'Futura',
    'Garamond',
    'Geneva',
    'Georgia',
    'Gill Sans',
    'Goudy Old Style',
    'Helvetica',
    'Hoefler Text',
    'Impact',
    'Lucida Bright',
    'Lucida Console',
    'Lucida Grande',
    'Lucida Sans Typewriter',
    'Monaco',
    'Optima',
    'Palatino',
    'Papyrus',
    'Perpetua',
    'Rockwell Extra Bold',
    'Rockwell',
    'Segoe UI',
    'Tahoma',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana'
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
