﻿var datatable;

$(function(){
    loadDataTable();
});

function loadDataTable() {
    datatable = $("#tblData").DataTable({
        "ajax": {
            "url": "/Admin/Service/GetAll",
            "type": "GET",
            "datatype":"json"
        },
        "columns": [
            { "data": "name", "width": "30%" },
            { "data": "category.name", "width": "20%" },
            { "data": "price", "width": "15%" },
            { "data": "frequency.timesPerYear", "width": "15%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                                <a href="/Admin/Service/Upsert/${data}" class="btn btn-success text-white">
                                    <i class="far fa-edit"></i> Edit
                                </a>
                                <a onclick=onDelete("/Admin/Service/Delete/${data}") href="#" class="btn btn-danger text-white">
                                    <i class="far fa-trash-alt"></i> Delete
                                </a>
                            </div>`;
                },
                "width":"30%"
            }
        ],
        "language": {
            "emptyTable":"No records found"
        },
        "width":"100%"
    });
}
function onDelete(url) {
    swal.fire({
        title: "Are you sure you want to delete?",
        text: "You will not be able to restore the content.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it"
    }).then(function(result) {
        if (result.value) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        Swal.fire(
                            'Deleted',
                            data.message,
                            'success'
                        );
                        datatable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}