/**
 * Hàm nhận vào 2 tham số trả về true hoặc false
 * @param {*} value Giá trị đầu vào
 * @param {*} selector Nơi in ra lỗi
 * @param {*} name là text hiển thị ra tên trường lỗi
 * @returns
 */
function checkEmpty(value, selector, name, display) {
  // trim : loại bỏ khoảng trống đầu và cuối của chuỗi (dấu cách cách cách)
  if (value.trim() != "") {
    document.querySelector(selector).style.display = display;
    return true;
  }
  document.querySelector(selector).innerHTML = name + " cannot be blank";
  return false;
}

function checkNumber(value, selector, name) {
  var numbers = /^[0-9]+$/;
  if (numbers.test(value)) {
    document.querySelector(selector).innerHTML = "";
    return true;
  }
  document.querySelector(selector).innerHTML = name + " must all a number";
  return false;
}
