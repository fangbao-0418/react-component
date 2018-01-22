'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exportToExcel;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableToExcel = function () {
  var uri = 'data:application/vnd.ms-excel;base64,';
  var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset=\'UTF-8\'><style>table td, table th {border-color: #ccc;}</style></head><body><table border="1" style="border-color: #ccc; border-collapse: collapse;">{table}</table></body></html>';
  var base64 = function base64(s) {
    return window.btoa(unescape(encodeURIComponent(s)));
  };
  var format = function format(s, c) {
    return s.replace(/{(\w+)}/g, function (m, p) {
      return c[p];
    });
  };
  return function (table, name) {
    if (!table.nodeType) {
      table = document.getElementById(table);
    }
    var ctx = {
      worksheet: name || 'Worksheet',
      table: table.innerHTML
    };
    var href = uri + base64(format(template, ctx));
    var el = document.createElement('a');
    el.href = href;
    el.download = name + '.xls';
    el.setAttribute('style', 'display: none');
    document.documentElement.append(el);
    el.click();
    document.documentElement.removeChild(el);
  };
}();
function exportToExcel(tableid) {
  tableToExcel(tableid);
}
_jquery2.default.exportToExcel = _jquery2.default.fn.exportToExcel = function (name) {
  console.log(this, 'arg');
  console.log((0, _jquery2.default)(this));
  var copy = (0, _jquery2.default)(this).clone().get(0);
  tableToExcel(copy, name);
};