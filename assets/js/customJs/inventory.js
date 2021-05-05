$(function() {
    $('.fgRqTbl').on('click', '.sloDtlBtn', function() {
        if ($('.viewSloDetailsDiv').hasClass('hide')) {
            $('.viewSloDetailsDiv').removeClass('hide');
        } else {
            $('.viewSloDetailsDiv').addClass('hide');
        }

    })


    $(".fg_stock_add_div").on('focus', '.fg_item_name', function(event) {
        var This = $(this)
        $.get('/inventory/getFgItemList', function(data) {
            This.autocomplete({
                source: function(req, response) {
                    var re = $.ui.autocomplete.escapeRegex(req.term);
                    var matcher = new RegExp("^" + re, "i");
                    response($.grep(data, function(item) {
                        return matcher.test(item.value);
                    }));
                },
                select: function(event, ui) {
                    $(".fg_stock_add_div").find('.inv_item_config_id').val(ui.item.id);
                    $(".fg_stock_add_div").find('.base_uom_id').val(ui.item.uom);
                    $(".fg_stock_add_div").find('.fg_category_id').val(ui.item.category_id);
                    $(".fg_stock_add_div").find('.selectpicker').selectpicker('refresh');
                }
            });
        }, 'json');
    });

    $('.fg_stock_add_div').on('click', '.addStockTmp', function(e) {
        e.preventDefault();
        $.post('/inventory/saveFgStock', $('.addStockForm').serialize(), function(data) {
            $('.addStockForm').trigger("reset");
            $.notify(data[0]['message'], data[0]['status']);
            location.reload();
        }, 'json');
    });

    $('.fg_stock_add_div').on('change', '.sl_wood_boa', function() {
        // $('.wood_board').empty();
        if ($(this).val() == 2) {
            var cloneDiv = $('.wooddiv').clone().removeClass('hide')
            cloneDiv.find('.bootstrap-select').replaceWith(function() {
                return $('select', this);
            });
            cloneDiv.find('select').selectpicker();
            $('.wood_board').empty();
            $('.wood_board').append(cloneDiv)
        }
        if ($(this).val() == 12) {
            var cloneDiv = $('.board').clone().removeClass('hide')
            cloneDiv.find('.bootstrap-select').replaceWith(function() {
                return $('select', this);
            });
            cloneDiv.find('select').selectpicker();
            $('.wood_board').empty();
            $('.wood_board').append(cloneDiv)
        }
    });

    $('.fg_stock_add_div').on('change', '.sl_fab_rex', function() {
        // $('.fabric_rexin').empty();
        if ($(this).val() == 11) {
            var cloneDiv = $('.fabricdiv').clone().removeClass('hide')
            cloneDiv.find('.bootstrap-select').replaceWith(function() {
                return $('select', this);
            });
            cloneDiv.find('select').selectpicker();
            $('.fabric_rexin').empty();
            $('.fabric_rexin').append(cloneDiv)
        }
        if ($(this).val() == 10) {
            var cloneDiv = $('.rexin').clone().removeClass('hide')
            cloneDiv.find('.bootstrap-select').replaceWith(function() {
                return $('select', this);
            });
            cloneDiv.find('select').selectpicker();
            $('.fabric_rexin').empty();
            $('.fabric_rexin').append(cloneDiv)
        }
        if ($(this).val() == 16) {
            var cloneDiv = $('.Art').clone().removeClass('hide')
            cloneDiv.find('.bootstrap-select').replaceWith(function() {
                return $('select', this);
            });
            cloneDiv.find('select').selectpicker();
            $('.fabric_rexin').empty();
            $('.fabric_rexin').append(cloneDiv)
        }
    });

    $('.viewFinshGoodRequition').click(function(event) {
        $.ajax({
            url: 'salesOrderRequesView', // the endpoint
            type: 'POST', // http method
            data: {
                id: $(this).data('id')
            }, // data sent with the post request
            dataType: 'json',
            // handle a successful response
            success: function(json) {
                orderQty = json[0]['sales_order_qty']
                remainQty = json[0]['remain_qty']
                issueQty = json[0]['issue_qty']
                $('.item_name').html(json[0]['item_name']);
                $('.order').html(parseFloat(orderQty).toFixed(2));
                $('.stock').html(parseFloat(remainQty).toFixed(2));
                $('.issue').html(parseFloat(issueQty).toFixed(2));
                $('.remain').html(parseFloat(remainQty).toFixed(2));
                $('input[name="issue"]').val(parseFloat(issueQty).toFixed(2));
                $('input[name="remain"]').val(parseFloat(remainQty).toFixed(2));
                $('input[name="id"]').val(json[0]['issue_tracking_no']);
                $('span.orderNo').text(json[0]['sales_order_id'])

            },
        });
    })


    $('#data-table-basic').on("click", ".stockQty", function(event) {
        $('input[name="qty"]').val(parseFloat($(this).data('qty')).toFixed(2));
        $('input[name="masterid"]').val($(this).data('id'));
        $('input[name="detailid"]').val($(this).attr('detailsId'));
    })

    // Added Price Per Product
    $('#data-table-basic').on("click", ".addPrice", function(event) {
        $('input[name="masterid"]').val($(this).data('id'));
    })
});

$(".rmStockUpdate").on("click", function() {
    var meterial_id = $(this).data("id");
    $("#material_id").val(meterial_id);
    $(".material_name").html($("#material_td_" + meterial_id.toString()).html());
    $(".new_code").html($("#new_code_td_" + meterial_id.toString()).html());
    $(".old_code").html($("#old_code_td_" + meterial_id.toString()).html());
    $(".category").html($("#category_td_" + meterial_id.toString()).html());
    $(".rmStockQTY").val($("#quantity_td_" + meterial_id.toString()).html());
    console.log($("#quantity_td_" + meterial_id.toString()).html(), 'dddd', meterial_id)
});

$(".rmView").on("click", function() {
    var meterial_id = $(this).data("id");
    $("#material_name").html($("#material_td_" + meterial_id.toString()).html());
    $("#new_code").html($("#new_code_td_" + meterial_id.toString()).html());
    $("#old_code").html($("#old_code_td_" + meterial_id.toString()).html());
    $("#ebs_code").html($("#ebs_code_td_" + meterial_id.toString()).html());
    $("#vendor_code").html($("#vendor_code_td_" + meterial_id.toString()).html());
    $("#rm_category").html($("#category_td_" + meterial_id.toString()).html());
    $("#rm_sub_category").html($("#sub_category_td_" + meterial_id.toString()).html());
    $("#rm_type").html($("#rm_type_td_" + meterial_id.toString()).html());
    $("#brand").html($("#rm_brand_td_" + meterial_id.toString()).html());
    $("#size").html($("#rm_size_td_" + meterial_id.toString()).html());
    $("#rm_uom").html($("#rm_uom_td_" + meterial_id.toString()).html());
    $("#color").html($("#rm_color_td_" + meterial_id.toString()).html());
    $("#origin").html($("#rm_origin_td_" + meterial_id.toString()).html());
    $("#quantity").html($("#quantity_td_" + meterial_id.toString()).html());
    $("#color_label").html($("#rm_color_label_td_" + meterial_id.toString()).html());
    $("#color_hex_code").html($("#rm_color_hex_code_td_" + meterial_id.toString()).html());
    $("#color_hex_code").css({ 'background': '' + $("#rm_color_hex_code_td_" + meterial_id.toString()).html() + '' });
});

$("#btnSubmit").on("click", function() {
    var meterial_id = $("#material_id").val();
    console.log('hello', $("#quantity_td_").val());
    $.post(
        "/inventory/rmStockAdd", {
            meterial_id: meterial_id,
            quantity: $("#rm_qty").val(),
            current_qty: $("#quantity_td_" + meterial_id.toString()).html(),
            total_stock: $("#total_qty_td_" + meterial_id.toString()).html(),
        },
        function(data) {
            if ((data["status"]) == "success") {
                $.notify(data["msg"], "Stock Add");
                $("#quantity_td_" + meterial_id.toString()).html(parseFloat(data["quantity"]));
                var total_qty = parseFloat($("#total_qty_td_" + meterial_id.toString()));
                $("#total_qty_td_" + meterial_id.toString()).html(parseFloat(data["total_stock"]));
                $('#addStock').modal('hide');
            } else $.notify("Something went wrong!", "Warning");
        }
    );
});

$("#rm_qty").keypress(function(event) {
    if (event.keyCode === 13) {
        var meterial_id = $("#material_id").val();
        
        $.post(
            "/inventory/rmStockAdd", {
                meterial_id: meterial_id,
                quantity: $("#rm_qty").val(),
                current_qty: $("#quantity_td_" + meterial_id.toString()).html(),
                total_stock: $("#total_qty_td_" + meterial_id.toString()).html(),
            },
            function(data) {
                if ((data["status"]) == "success") {
                    $.notify(data["msg"], "Stock Add");
                    $("#quantity_td_" + meterial_id.toString()).html(parseFloat(data["quantity"]));
                    var total_qty = parseFloat($("#total_qty_td_" + meterial_id.toString()));
                    $("#total_qty_td_" + meterial_id.toString()).html(parseFloat(data["total_stock"]));
                    $('#addStock').modal('hide');
                } else $.notify("Something went wrong!", "Warning");
            }
        );
    }
});