/**
 * Created by Caleb123 on 2016/3/18.
 */
function generateText(){
    var element = document.createElement('h2');
    element.innerHTML = 'Hello h2 world!';
    return element;
}
module.exports = generateText;