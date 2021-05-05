var counter = 0;
$('.extra-fields').on('click', function () {
    var recordclone = $('.meta_div_clone').find('.form-group').clone();
    //use this for 
    recordclone.find('.bootstrap-select').replaceWith(function () {
        return $('select', this);
    });
    recordclone.find('select').selectpicker();
    $('.meta_div_form').append(recordclone);
});

$(document).on('click', '.remove_field', function (e) {
    $(this).parents('.form-group').remove();
    e.preventDefault();
    counter--;
});


$('.itemRequestConfirmView').click(function () {
    /// console.log($(this).data('id')) // sanity check
    $.ajax({
        url: 'getItemRequestedInfoByID', // the endpoint
        type: 'POST', // http method
        data: {
            id: $(this).data('id')
        }, // data sent with the post request
        dataType: 'json',
        // handle a successful response
        success: function (json) {
            // console.log(json)
            // console.log(json[0].itemName)
            $('.itemName').html(json[0]['itemName']);
            $('.itemMasterId').val(json[0]['itemMasterId']);
            $('.itemSpecCode').html(json[0]['itemSpecCode']);
            $('.itemType').html(json[0]['itemType']);
            $('.itemUom').html(json[0]['itemUom']);
            $('.categoryName').html(json[0]['categoryName']);
            $('.itemMetaDesc').html(json[0]['itemMetaDesc']);
            $('.isFixedasset').html(json[0]['isFixedasset']);
        },
        // handle a non-successful response
    });
});

$('.acceptItemView').click(function () {
    /// console.log($(this).data('id')) // sanity check
    $.ajax({
        url: 'getItemAcceptedInfoByID', // the endpoint
        type: 'POST', // http method
        data: {
            id: $(this).data('id')
        }, // data sent with the post request
        dataType: 'json',
        // handle a successful response
        success: function (json) {
            console.log(json)
            // console.log(json[0].itemName)
            $('.itemName').html(json[0]['itemName']);
            $('.itemCode').html(json[0]['itemCode']);
            $('.itemSpecCode').html(json[0]['itemSpecCode']);
            $('.itemType').html(json[0]['itemType']);
            $('.itemUom').html(json[0]['itemUom']);
            $('.categoryName').html(json[0]['categoryName']);
            $('.itemMetaDesc').html(json[0]['itemMetaDesc']);
            $('.isFixedasset').html(json[0]['isFixedasset']);
        },
        // handle a non-successful response
    });
});


$('.itemRequestEditView').click(function () {
    //console.log($(this).data('id'))
    $.ajax({
        url: 'dashboardgetItemEditInfoByID',
        type: 'POST',
        data: {
            id: $(this).data('id')
        },
        dataType: 'json',
        success: function (json) {
            console.log(json)
        },
    });
});




//// testing datatable



/*

$(document).ready(function () {
    var dt_table = $('.datatable').dataTable({
        language: dt_language, // global variable defined in html
        order: [
            [0, "desc"]
        ],
        lengthMenu: [
            [10, 50, 100, 200],
            [10, 50, 100, 200]
        ],
        columnDefs: [{
            orderable: true,
            searchable: true,
            className: "center",
            defaultContent: "-",
            targets: "_all"
        }],
        searching: true,
        processing: true,
        serverSide: true,
        stateSave: true,
        ajax: USERS_LIST_JSON_URL,
        type: "POST"
    });
});

*/