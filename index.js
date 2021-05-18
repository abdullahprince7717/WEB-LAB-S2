$(function () {

    getrequest();
    // $(".getall-btn").click(getrequest());

    $("#recipes").on("click", ".btn-danger", handledelete);
    $("#btn").click(addproduct);
    $("#recipes").on("click", ".btn-warning", handle);

    $("#save").click(function () {
        var name = $("#Name").val();
        var price = $("#Price").val();
        var color = $("#Color1").val();
        var department = $("#Department").val();
        var description = $("#Description").val();
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/products",
            method: "POST",
            data: {
                name,
                price,
                color,
                department,
                description
            },
            success: function (result) {
                console.log(result);
                getrequest();
                $("#addmodel").modal("hide");
            },
        });
    });


    $("#Updated").click(function () {
        var id = $("#updateId").val();
        var name = $("#UpdateName").val();
        var price = $("#UpdatePrice").val();
        var color = $("#Updatecolor").val();
        var department = $("#UpdateDepartment1").val();
        var description = $("#UpdateDescription").val();
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/products/" + id,
            data: {
                name,
                price,
                color,
                department,
                description
            },
            method: "PUT",
            success: function () {

                getrequest();
                $("#updatemodal").modal("hide");
            }
        });
    });
});

function getrequest() {
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products",
        method: "GET",
        success: function (result) {
            var req = $("#recipes");
            console.log(result);

            req.empty();
            for (var i = 0; i < result.length; i++) {
                var response = result[i];
                req.append(`
              <div class="product" data-id="${response._id}">
               <u><h2>Name:</h2></u><p>${response.name}</p>
               <u><h2>Price:</h2></u><p>${response.price}<p>
               <u><h2>Color:</h2></u><p>${response.color}<p>
               <u><h2>Department:</h2></u><p>${response.department}</p>
               <u><h2>Description:</h2></u><p><button class="btn btn-danger btn-sm float-right"> Delete</button> <button class="btn btn-warning btn-sm float-right"> Edit</button>
                ${response.description}</p>
              </div>`);

            }
        },


    });
}


function handle() {
    var btn = $(this);
    var parent = btn.closest(".product");
    let id = parent.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/products/" + id, function (result) {

        $("#updateId").val(result._id);
        $("#UpdateName").val(result.name);
        $("#UpdatePrice").val(result.price);
        $("#Updatecolor").val(result.color);
        $("#UpdateDepartment1").val(result.department);
        $("#UpdateDescription").val(result.description);
        $("#updatemodal").modal("show");
    });
}

function addproduct() {
    $("#addmodel").modal("show");

}

function handledelete() {
    var btn = $(this);
    var parent = btn.closest(".product");
    let id = parent.attr("data-id");
    console.log(id);

    $.ajax({

        url: "https://usman-recipes.herokuapp.com/api/products/" + id,
        method: "DELETE",
        success: function () {
            getrequest();
        },

    });



}