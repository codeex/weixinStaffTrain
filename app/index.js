/**
 * Created by Caleb123 on 2016/3/18.
 */
require('./css/main.css');
require('./css/main.scss')
var sub = require('./sub');
var app = document.createElement('div');
app.innerHTML = '<h1>Hello World!</h1>';
app.appendChild(sub());
document.body.appendChild(app);