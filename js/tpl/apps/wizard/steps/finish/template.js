define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push(' <div> <div> <label for="address1"> Address Line (1) : </label> <input type="text" name="address1" id="address1"/> </div><div> <label for="address2"> Address Line (2) :</label> <input type="text" name="address2" id="address2"/> </div><div> <label for="city"> City : </label> <input type="text" name="city" id="city"/> </div><div> <label for="state"> State :</label> <input type="text" name="state" id="state"/> </div><div> <label for="zip"> Zip : </label> <input type="text" name="zip" id="zip"/> </div></div>');
}
return buf.join("");
};
});