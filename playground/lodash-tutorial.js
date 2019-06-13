const _ = require("lodash");

// Lodash co rat nhieu ham
//_.isEmty check xem object/array co phan tu nao hay kg
const obj = {}
Object.keys(obj).length;
console.log("Check binh thuong", Object.keys(obj).length);

console.log("TCL: Object.key(obj).length", _.isEmpty(obj));

//_.get
//Can lay obj2.content.attributes.id
let obj2 = {};
const id = obj2.content && obj2.content.attributes && obj2.content.attributes.id;
console.log(id);
console.log("Lay id voi lodash: ", _.get(obj2, "content.attributes.id", "123"));

// _.set
_.set(obj2, "content.attributes.id", "2");
console.log("sau khi set: ", id);



