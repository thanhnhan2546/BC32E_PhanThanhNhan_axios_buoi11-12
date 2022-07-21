/*------------------Lấy danh sách Products từ server---------------*/
function getListProducts() {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetAll",
    method: "GET",
  });

  // Xữ lý thành công
  promise.then(function (result) {
    renderTable(result.data);
  });

  //Xử lý thất bại
  promise.catch(function (err) {
    console.log(err);
  });
}
window.onload = function () {
  getListProducts();
};

/*--------------------Create Product--------------- */
document.querySelector("#btnCreate").onclick = function () {
  // Tạo object product mới
  var product = new Product();

  // Lấy thông tin từ input và gán vào object
  product.id = document.querySelector("#id").value;
  product.name = document.querySelector("#name").value;
  product.price = document.querySelector("#price").value;
  product.img = document.querySelector("#img").value;
  product.description = document.querySelector("#description").value;
  product.type = document.querySelector("#type").value;

  // Kiểm tra lỗi
  var valid = true;

  valid &=
    checkEmpty(product.id, "#err_id", "*id", "none") &
    checkEmpty(product.name, "#err_name", "*name", "none") &
    checkNumber(product.price, "#err_price", "*price", "none") &
    checkEmpty(product.price, "#err_price", "*price", "block") &
    checkEmpty(product.img, "#err_img", "img", "none") &
    checkEmpty(product.description, "#err_des", "*description", "none");

  if (!valid) {
    return;
  }
  // Thực hiện api gửi thông tin product cần thêm lên server
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/CreateProduct",
    method: "POST",
    data: product,
  });

  // Xử lý thành công
  promise.then(function (result) {
    alert(result.data.content);

    // render lại table
    getListProducts();
  });

  // Xử lý thất bại
  promise.catch(function (err) {
    console.log(err);
  });
};

/*----------------------Edit Product--------------- */
function editProduct(id) {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetById/" + id,
    method: "GET",
  });
  // Xử lý thành công
  promise.then(function (result) {
    var product = result.data;

    // Gán kết quả trả về vào form info product
    document.querySelector("#id").value = product.id;
    document.querySelector("#name").value = product.name;
    document.querySelector("#price").value = product.price;
    document.querySelector("#img").value = product.img;
    document.querySelector("#description").value = product.description;
    document.querySelector("#type").value = product.type;

    // Khóa input id không cho thay đổi
    document.querySelector("#id").disabled = true;
  });

  // Xử lý thất bại
  promise.catch(function (err) {
    console.log(err);
  });
}

/*-----------------------Update Product-----------------*/
document.querySelector("#btnUpdate").onclick = function () {
  // Tạo object product
  var product = new Product();

  // Lấy thông tin từ input và gán vào object
  product.id = document.querySelector("#id").value;
  product.name = document.querySelector("#name").value;
  product.price = document.querySelector("#price").value;
  product.img = document.querySelector("#img").value;
  product.description = document.querySelector("#description").value;
  product.type = document.querySelector("#type").value;

  // Kiểm tra lỗi
  var valid = true;

  valid &=
    checkEmpty(product.id, "#err_id", "*id", "none") &
    checkEmpty(product.name, "#err_name", "*name", "none") &
    checkNumber(product.price, "#err_price", "*price", "none") &
    checkEmpty(product.price, "#err_price", "*price", "block") &
    checkEmpty(product.img, "#err_img", "img", "none") &
    checkEmpty(product.description, "#err_des", "*description", "none");

  if (!valid) {
    return;
  }

  // Gửi thông tin cập nhật lên server
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/UpdateProduct/" + product.id,
    method: "PUT",
    data: product,
  });

  // Xử lý thành công
  promise.then(function (result) {
    alert(result.data.content);

    // render lại table
    getListProducts();
  });

  // Xử lý thất bại
  promise.catch(function (err) {
    console.log(err);
  });
};

/*-------------------DELETE Product --------------- */
function delProduct(id) {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/DeleteProduct/" + id,
    method: "DELETE",
  });

  // Xử lý thành công
  promise.then(function (result) {
    alert(result.data.content);

    // render lại table
    getListProducts();
  });

  // Xử lý thất bại
  promise.catch(function (err) {
    console.log(err);
  });
}

/*----------------------Search By Name------------------ */
document.querySelector("#btnSearchByName").onclick = function () {
  var name = document.querySelector("#searchByName").value;

  var promise = axios({
    url: "http://svcy.myclass.vn/api/Product/SearchByName?name=" + name,
    method: "GET",
  });

  // Xử lý thành công
  promise.then(function (result) {
    // render lại table
    renderTable(result.data);
  });

  // Xử lý thất bại
  promise.catch(function (err) {
    console.log(err);
  });
};

/* ------------------Render Table Products-------------- */
function renderTable(arrProducts) {
  var html = "";
  for (var i = 0; i < arrProducts.length; i++) {
    var product = arrProducts[i];
    html += `
        <tr>
        <td>${product.id}</td>
        <td>
          <img
            src="${product.img}"
            alt=""
            width="100px"
          />
        </td>
        <td>${product.name}</td>
        <td>${Number(product.price).toLocaleString("vi")}</td>
        <td width="35%">
          ${product.description}
        </td>
        <td>${product.type}</td>
        <td>
          <button class="btn btn-danger" onclick = "delProduct(${product.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
          <button class="btn btn-primary" onclick = "editProduct(${
            product.id
          })">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
      </tr>
        `;
  }
  document.querySelector("#tblProducts").innerHTML = html;
}
