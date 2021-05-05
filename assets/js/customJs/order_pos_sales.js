function salesOrdergetsaletotalprice(item = '') {
    // Employee discount check
    employee = 0
    check = $('input[name="employeecode"]').val();
    if (check == 1) {
        employee = 1;
    }
    var totalprice = 0;
    $('.ordersalePosTbl').find('.sale_price').each(function(i, j) {
        totalprice += parseFloat($(this).val())
    })
    if (item == '1') {
        var totalVat = (5 * totalprice) / 100;
    } else {
        var totalVat = (7.5 * totalprice) / 100;
    }
    var shippingCost = parseFloat($('.shipping_cost').val())
    let cashAmount = (totalprice + totalVat + shippingCost)
    let salespromo = 0
    if (employee == 1) {
        salespromo = parseFloat((totalprice * 20) / 100);
        $('.salesdiscount').val(salespromo);

    }
    // else if (totalprice >= 25000 && totalprice < 50000) {
    // 	salespromo = parseFloat((totalprice * 10) / 100);
    // 	$('.salesdiscount').val(salespromo);
    // } else if (totalprice >= 50000) {
    // 	salespromo = parseFloat((totalprice * 20) / 100);
    // 	$('.salesdiscount').val(salespromo);
    // }
    else {
        salespromo = $('.salesdiscount').val();
    }
    cashAmount = parseFloat(cashAmount - salespromo);
    $('.sale_total_price').val(totalprice ? totalprice.toFixed(2) : 0)
    $('.vat_amount').val(totalVat ? totalVat.toFixed(2) : 0)
    $('.grand_total').val(cashAmount ? (cashAmount).toFixed(2) : 0);
    dueamount = parseFloat($('.grand_total').val()) - parseFloat($('.paid_total').val());
    $('.due_total').val(parseFloat(dueamount).toFixed(2));
    // Default cash amount
    //&& totalprice < 25000
    // if (item != ''  && employee ==0) {
    // 	grandtotalwithdiscount = (cashAmount - item).toFixed(2)
    // 	$('.salesdiscount').val(item)
    // 	$('.grand_total').val(grandtotalwithdiscount);
    // 	$('.cinput').val(grandtotalwithdiscount);
    //     $('.bkashinput').val(grandtotalwithdiscount);
    //     $('.input').val(grandtotalwithdiscount);
    // } else {
    // 	//$('.salesdiscount').val(0);
    // 	$('.cinput').val(cashAmount);
    //     $('.bkashinput').val(cashAmount);
    // 	$('.input').val(cashAmount);
    // }

    // $('.cinput').keyup(function() {
    // 	let amount = $(this).val();
    // 	let restAmount = (totalprice + totalVat) - amount;
    // 	$('.bkashinput').val(restAmount);
    // 	$('.input').val(restAmount);
    // })
}

$(function() {

    // Scanner Input
    $('.orderNo').on('click', function(event) {
        event.preventDefault();
        let order_no = $('#ordervalue').val();
        if (order_no == '') {
            $.notify("Field Is Empty");
            return false;
        }
        $.post('/sale/SalesOrderWiseSearch', {
            order_no: order_no
        }, function(data) {
            if (data[0]['status'] == 'error') {
                alert(data[0]['message']);
            } else if (data[0]['status'] == 'Error') {
                alert(data[0]['message']);
            } else {
                $.each(data, function(index, value) {
                    var clonetable = $('.ordervoucherclonetable tbody tr').clone();
                    if (value.clearence ==1) {
                        clonetable.find('.item_name').val(value.item_name + '(clearence)');
                    } else {
                        clonetable.find('.item_name').val(value.item_name);
                    }
                    clonetable.find('.sale_rate').val(parseFloat(value.item_unit_price).toFixed(2));
                    clonetable.find('.order_quantity').val(parseFloat(value.item_qty).toFixed(0));
                    clonetable.find('.sale_price').val(parseFloat(value.product_price).toFixed(2));
                    clonetable.find('.inv_fg_stock_detail_id').val(value.stock_details_id);
                    clonetable.find('.inv_fg_stock_master_id').val(value.stock_master_id);
                    clonetable.find('.clearence').val(value.clearence);
                    clonetable.find('.uom_id').val(value.uom);
                    if (value.discount_amount > 0) {
                        $('.salesdiscount').val(parseFloat(value.discount_amount).toFixed(2))
                    } else {
                        $('.salesdiscount').val(0)
                    }
                    if (value.order_discount_price > 0) {
                        clonetable.find('.salesrate').val(parseFloat(value.order_discount_price).toFixed(2))
                        clonetable.find('.productDprice').val(parseFloat(value.order_discount_price).toFixed(2))
                        clonetable.find('.productDparcentage').val(value.product_discount_parcentage)
                    } else {
                        clonetable.find('.salesrate').val(parseFloat(value.item_unit_price).toFixed(2))
                        clonetable.find('.productDprice').val(0)
                        clonetable.find('.productDparcentage').val('')
                    }
                    $('.ordersalePosTbl tbody').append(clonetable);
                })
                if (data[0].paid == null) {
                    $('.paid_total').val(0.00)
                } else {
                    $('.paid_total').val(parseFloat(data[0].paid).toFixed(2))
                }
                $('.shipping_cost').val(parseFloat(data[0].shipping_cost).toFixed(2))
                if ($.datepicker.formatDate("yy-mm-dd", new Date(data[0].date)) < $.datepicker.formatDate("yy-mm-dd", new Date('2020, 07, 01'))) {
                    salesOrdergetsaletotalprice(1);
                } else {
                    salesOrdergetsaletotalprice();
                }
                $('#phone').val(data[0].mobile_no);
                $('#email').val(data[0].email);
                $('.customer_name').val(data[0].name);
                $('.address').val(data[0].address);
                $('.city').val(data[0].city)
                $('.state').val(data[0].state)
                $('.zip').val(data[0].zip_code)
                $('.country').val(data[0].country)
                $('.splpoint').val(data[0].remaining_point)
                $('.sales_orderid').val(data[0].sales_order_id);
                $('.salesOrderPaid').val(parseFloat(data[0].paid).toFixed(2));

            }

        }, 'json');

    });

    //voucher table
    // $('.ordersalePosTbl tbody').on('input', '.sale_quantity', function (data) {
    // 	var stock_tbl_qty = $(this).parents('td').find('.stock_tbl_qty_chalan').val()
    // 	if (parseFloat($(this).val()) > parseFloat(stock_tbl_qty)) {
    // 		$.notify("Stock remain : " + parseFloat(stock_tbl_qty).toFixed(2) + '. Stock Quantity exceed!!!')
    // 		$(this).val('');
    // 		salesOrdergetsaletotalprice()
    // 	}
    // });

    // $('.ordersalePosTbl').on('input', '.sale_quantity', function () {
    // 	var price = 0;
    // 	price = parseFloat($(this).parents('tr').find('.sale_quantity').val()) * parseFloat($(this).parents('tr').find('.sale_rate').val())
    // 	$(this).parents('tr').find('.sale_price').val(price ? price.toFixed(2) : 0)
    // 	salesOrdergetsaletotalprice()
    // });

    $(".ordersalePosTbl").on('click', '.itemremovebtn', function(event) {
        $(this).parents('tr').remove();
        //getsaletotalprice()
        if ($('input[name="code"]').val() != undefined) {
            $('#couponclick').click()
        }
        salesOrdergetsaletotalprice();
    });

    function saveinvoice() {
        $.post('/sale/savePosSale', $('.sale_pos_form').serialize(), function(data) {
            if (data[0].status == 'success') {
                invoiceGenrate(data[0].message)
            } else {
                $.notify(data[0].message);
            }
        }, 'json')
    }


    function invoiceGenrate(sale_id) {
        $.post('/sale/invoice', {
            sale_id: sale_id
        }, function(data) {
            var w = window.open('about:blank');
            w.document.open();
            w.document.write(data);
            w.print();
            w.document.close();
            location.reload();
        }, 'html');
    }

    // function PrintElem(elem) {
    // 	Popup($(elem).html());
    // }

    $('.orderposconfirmbtn').on('click', function(event) {
        event.preventDefault();
        swal({
            title: "Are you sure?",
            type: "warning",
            confirmButtonText: "Submit",
            showCancelButton: true,
        }).then(function(result) {
            if (result) {
                event.preventDefault();
                event.stopPropagation();
                // Email Validation For Customer
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                var email = $('#email').val();
                var validation = emailReg.test(email);
                if (!validation) {
                    $.notify("Email Is Not Valid!!");
                    return false;
                }

                // Phone Number Validation For Customer
                let customerPhoneNo = $('#phone').val();
                let phoneNoCheck = new RegExp(/^[0-9-+]+$/);
                let phoneNoValidation = phoneNoCheck.test(customerPhoneNo);
                if (!phoneNoValidation) {
                    $.notify("Phone Number Is Not Valid");
                    return false;
                }

                //Check name Field
                let customerName = $('.customer_name').val();
                if (customerName == '') {
                    $.notify("Customer Name is Empty");
                    return false;
                }
                if (parseFloat($('.pospointinput').val()) > parseFloat($('.grand_total').val()) || parseFloat($('.pospointinput').val()) > parseFloat($('.totalPoint').val())){
                    $.notify('Point Is Exceed');
                    return false
                }

                var sbmtfrm = 0
                $(":text").each(function() {
                    if ($(this).val() == "") {
                        sbmtfrm = 0
                    }
                });
                if (sbmtfrm == 0) {
                    saveinvoice();
                } else {
                    $.notify("Empty Fields!!");
                    return false;
                }
            }

        }).catch(swal.noop);
    })

});




$('.deleteItem').click(function() {
    var itemId = $(this).parents('tr').find('.itemId').val();
    var salesOrderId = $(this).parents('tr').find('.salesOrderId').val();
    var result = confirm("Are you sure you want to delete this item?");
    if (result) {
        $.ajax({
            url: "{% url 'salesOrderItemDelete' %}", // the endpoint
            type: "POST", // http method
            data: {
                itemId: itemId,
                salesOrderId: salesOrderId
            }, // data sent with the post request
            dataType: 'json',
            // handle a successful response
            success: function(json) {
                // console.log(json)
                $.notify(json[0]['message'], json[0]['status']);
                if (json[0]['status'] == 'success') {
                    location.reload();
                }
            },
            // handle a non-successful response
        });
    }
});

// **** Sales Order point Payment System ****

$('.customerEnfo').on('change', '.orderpayment_mode', function(event) {
    event.stopPropagation();
    $('.amount').addClass('hide');
    $('.orderposcardDetails').addClass('hide');
    $('.bikasPhone').addClass('hide');
    $('.giftcard').addClass('hide');
    $('.pospoint').addClass('hide')

    // Payment Type Wise div open close
    let paymentType = $('#ordermultipleSelect').val()
    if (paymentType == null) {
        console.log('List is Empty');
    } else if (paymentType.length > 3) {
        alert("Can not use more than 3 payment type");
        return false;
    }
    $.each(paymentType, function(i, value) {
        if (value == 1) {
            $(".amount").removeClass("hide");
            if ($(".cinput").val()) {
                console.log("input is not empty");
            } else {
                $("#camount").append(
                    '<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="amount" class="form-control input-sm cinput" placeholder="Cash amount" autocomplete="off"></div>'
                );
                if ($('input[name="code"]').val() != undefined) {
                    $("#couponclick").click();
                } else {
                    salesOrdergetsaletotalprice();
                }
            }
        } else if (value == 2) {
            $(".orderposcardDetails").removeClass("hide");
        } else if (value == 3) {
            $(".bikasPhone").removeClass("hide");
            if ($(".bkashinput").val() && $(".bkashrefinput").val()) {
                console.log("Amount and reference is already exist");
            } else {
                $("#bkshamount").append(
                    '<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="amount" class="form-control input-sm bkashinput" placeholder="Bkash amount" autocomplete="off"></div>'
                );
                $("#bTrRef").append(
                    '<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="transaction_reference" class="form-control input-sm bkashrefinput" placeholder="Transaction Reference" autocomplete="off"></div>'
                );
                //getsaletotalprice();
                if ($('input[name="code"]').val() != undefined) {
                    $("#couponclick").click();
                } else {
                    salesOrdergetsaletotalprice();
                }
            }
        } else if (value == 4) {
            $(".giftcard").removeClass("hide");
            if ($(".giftcardinput").val()) {
                console.log("Amount   is already exist");
            } else {
                $("#giftcardamount").append(
                    '<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="amount" class="form-control input-sm giftcardinput" placeholder="" autocomplete="off"></div>'
                );
                giftcardamount = parseFloat(
                    $('input[name="gift_card_amount"]').val()
                ).toFixed(2);
                $(".giftcardinput").val(giftcardamount > 0 ? giftcardamount : "");
            }
        } else if (value == 5) {
            $(".pospoint").removeClass("hide");
            if ($(".pospointinput").val()) {
                console.log("Amount and  is already exist");
            } else {
                phoneNo = $("#phone").val();
                $.post(
                    "/sale/customerInformation", { customerPhone: phoneNo },
                    function(data) {
                        if (data[0].total_point >= 1000) {
                            $("#giftpoint").append(
                                '<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="amount" class="form-control input-sm pospointinput" placeholder="" autocomplete="off"></div>'
                            );
                            $("#giftpoint").append(
                                '<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="hidden" name="point" class="form-control input-sm totalPoint" placeholder="" autocomplete="off"></div>'
                            );
                            $(".pospointinput").val(parseFloat(data[0].remaining_point).toFixed(2));
                            $(".totalPoint").val(parseFloat(data[0].remaining_point).toFixed(2));
                            $('.pospointinput').on('keyup', function(event) {
                                totalPrice = $('.grand_total').val()
                                if (parseFloat($('.pospointinput').val()) > parseFloat(totalPrice) || parseFloat($('.pospointinput').val()) > parseFloat(data[0].remaining_point)) {
                                    $.notify('Point is exceed')
                                    return false
                                }
                            })
                        } else {
                            $.notify("Total point :");
                            $.notify(data[0].total_point);
                        }
                    }
                );
            }
        }
    })
    if ($('.amount').hasClass('hide')) {
        $('.cashamount').remove()
        $('.cinput').parent('div').remove();
    }
    if ($('.orderposcardDetails').hasClass('hide')) {
        $('#multiplecard').selectpicker("deselectAll", true).selectpicker("refresh");
    }
    if ($('.bikasPhone').hasClass('hide')) {
        $('.bkashinput').parent('div').remove();
        $('.bkashrefinput').parent('div').remove();
    }
    if ($('.giftcard').hasClass('hide')) {
        $('.giftcardinput').parent('div').remove();
    }
    if ($('.pospoint').hasClass('hide')) {
        $('.pospointinput').parent('div').remove();
    }

    // div open or  close  by selecting  card 
    $('.cardName').on('change', function(event) {
        $('.bank').addClass('hide');
        $('.input').parent('div').remove();
        $('.trinput').parent('div').remove();
        let bankOption = $('#multiplecard').val();
        event.stopImmediatePropagation()
        $.each(bankOption, function(i, data) {
            $('.bank').removeClass('hide');
            $('#cashamount').append('<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="amount" class="form-control input-sm input" placeholder="Dutch Bangla Bank" autocomplete="off"></div>')
            $('#ref').append('<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="transaction_reference" class="form-control input-sm trinput" placeholder="Transaction number" autocomplete="off"></div>')
                //getsaletotalprice()
            if ($('input[name="code"]').val() != undefined) {
                $('#couponclick').click()
            } else {
                salesOrdergetsaletotalprice();

            }
        })
        if ($('.bank').hasClass('hide')) {
            $('.input').parent('div').remove();
            $('.trinput').parent('div').remove();
        }
    })
})

/// **** End Sales point Payment *** ///


// Employee Status

// $('.internalemployeeforsalesorder').on('click', function(event) {
// 	if(event.target.checked == true) {
// 		$('input[name="employeecode"]').val(1)
// 		salesOrdergetsaletotalprice();
// 	} else {
// 		$('input[name="employeecode"]').val(0)
// 		salesOrdergetsaletotalprice();
// 	}
// })


// Gift Card

$('.posgiftcard').on('click', function(event) {
    $('.salesposgift').removeClass('hide');
    if (event.target.checked == true) {
        $('#posgiftcard').append('<div  style="padding-bottom:10px"><input type="text" name="gift_card_code" class="form-control input-sm posgiftcardinput" placeholder="Gift  Card code" autocomplete="off"></div>')
    } else {
        $('#posgiftcard').empty();
        $('.salesposgift').addClass('hide');
        $('.posgiftcardinput').val('');
        $('.giftcardinput').val('');
        $('input[name="gift_card_amount"]').val(0);
    }
})

$(".posgiftcardbtn").on("click", function(event) {
    giftCode = $('input[name="gift_card_code"]').val();
    $.ajax({
        url: "GiftCardCheck",
        type: "POST",
        data: {
            code: giftCode
        },
        dataType: "json",
        success: function(data) {
            date = $.datepicker.formatDate("yy-mm-dd", new Date(data[0].expire_date))
            if (($.datepicker.formatDate("yy-mm-dd", new Date()) > date) || data[0].status == 4) {
                $.notify("It is not valid Gift Card", {
                    position: "right"
                });
                $('input[name="gift_card_code"]').val('')
                return false;
            } else {
                $('input[name="giftcode"]').val(data[0].id)
                giftpayment = $('#ordermultipleSelect').val();
                if (giftpayment == null) {
                    $('input[name="gift_card_amount"]').val(data[0].amount);
                } else {
                    if (giftpayment.includes("4")) {
                        $('.giftcardinput').val(parseFloat(data[0].amount - data[0].used_amount).toFixed(2));
                        $('.giftcardinput').on('keyup', function() {
                            amount = $(this).val();
                            TotalAmount = parseFloat(amount) + parseFloat(data[0].used_amount);
                            if (TotalAmount > data[0].amount) {
                                $.notify('Amount is Exceed');
                                return false;
                            }
                        })
                    }
                }
            }

        }
    });
});