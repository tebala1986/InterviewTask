define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div><div><label for="firstname"> First Name </label><input type="text" name="firstname" id="firstname" /></div><div><label for="lastname"> Last Name </label><input type="text" name="lastname" id="lastname" /></div></div>');
}
return buf.join("");
};
});