function getsaletotalprice(tag = '', amount = '') {   
    // Employee discount check
    employee = 0
    check = $('input[name="employeecode"]').val();
    if (check == 1) {
        employee = 1;
    }
    var totalprice = 0;
    $('.salePosTbl').find('.sale_price').each(function(i, j) {
        totalprice += parseFloat($(this).val())
    })
    var totalVat = (7.5 * totalprice) / 100;
    let cashAmount = (totalprice + totalVat)
    if ($('.shippingamount').val() == 0) {
        cost = $('.shipping').val()
        let shippingCost = cost ? parseFloat((totalprice * parseInt($('.shipping').val())) / 100) : 0
        cashAmount = cashAmount + shippingCost
        $('.cost_amount').val(parseFloat(shippingCost).toFixed(2))
    } 
    else if ($('.shipping').val() == 0) {
        let shippingCost = parseInt($('.shippingamount').val())
        cashAmount = cashAmount + shippingCost
        $('.cost_amount').val(parseFloat(shippingCost).toFixed(2))
    }
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
    else if (tag == 'discount') {
        salespromo = amount;
        $('.salesdiscount').val(amount);
    }
    else {
        $('.salesdiscount').val(0);
    }
    cashAmount = parseFloat(cashAmount - salespromo);
    // if (tag == 1) {
    // 	cashAmount = cashAmount - parseFloat(amount);
    // }
    $('.sale_total_price').val(totalprice ? totalprice.toFixed(2) : 0)
    $('.vat_amount').val(totalVat ? totalVat.toFixed(2) : 0)
    $('.grand_total').val(cashAmount ? (cashAmount).toFixed(2) : 0)
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

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    // $('.gnrtSalesOrder').on('click', function (e) {
    // 	e.preventDefault();
    // 	window.location.href = 'salesOrder';
    // });

    // $('.viewSalesOrder').on('click', function (e) {
    // 	e.preventDefault();
    // 	window.location.href = 'salesOrderList';
    // });

    $('.created_at').datepicker({
        format: 'YYYY-MM-DD',
        autoHide: true,
    });
    currentDate = yyyy + '-' + mm + '-' + dd;
    $('.created_at_default').datepicker('setDate', new Date());

    $('.delivery_date').datepicker({
        format: 'YYYY-MM-DD',
        autoHide: true,
    });
    $('.custom_datepicker').datepicker({
        format: 'DD-MM-YYYY',
        autoHide: true,
    });

    $('.custom_datepicker').datepicker('setDate', $(this).val());

    $('.date_filter').datepicker({
        format: 'DD-MM-YYYY',
        autoHide: true,
    });

    $('.date_filter').datepicker('setDate');

    $('.fg_order_item_tbl').on('click', '.add_item', function(e) {
        var cloneTr = $('.add_item_table tr').clone();
        cloneTr.find('.bootstrap-select').replaceWith(function() {
            return $('select', this);
        });
        cloneTr.find('select').selectpicker();
        $('.fg_order_item_tbl tbody').append(cloneTr);
    });

    // $(document).scannerDetection({
    // 	timeBeforeScanTest: 200, // wait for the next character for upto 200ms
    // 	startChar: [120], // Prefix character for the cabled scanner (OPL6845R)
    // 	endChar: [13], // be sure the scan is complete if key 13 (enter) is detected
    // 	avgTimeByChar: 40, // it's not a barcode if a character takes longer than 40ms
    // 	onComplete: function (barcode, qty) {
    // 		if (barcode.length > 0 && $('.salePosDiv').length) {
    // 			$.post('/sale/getBarcodeWiseItem', {
    // 				barcode_no: barcode
    // 			}, function (data) {
    // 				if (typeof data['getItemDtl'][0] != 'undefined') {
    // 					var barcode_no = data['getItemDtl'][0].barcode_no
    // 					var duplicate = 0,
    // 						row_no = 0;
    // 					$('.salePosTbl tbody td .barcode_no').each(function (i, j) {
    // 						if ($(this).val() == barcode_no) {
    // 							duplicate = 1;
    // 							row_no = i
    // 						}
    // 					})
    // 					if (duplicate == 0) {
    // 						var clonetable = $('.voucherclonetable tbody tr').clone();
    // 						clonetable.find('.sale_item').val(data['getItemDtl'][0].item_name)
    // 						clonetable.find('.uom_id').val(data['getItemDtl'][0].uom_id)
    // 						clonetable.find('.inv_fg_stock_master_id').val(data['getItemDtl'][0].inv_fg_stock_master_id)
    // 						clonetable.find('.inv_fg_stock_detail_id').val(data['getItemDtl'][0].inv_fg_stock_detail_id)
    // 						clonetable.find('.sale_rate').val(parseFloat(data['getItemDtl'][0].price).toFixed(2))
    // 						clonetable.find('.remain_quantity').val(parseFloat(data['getItemDtl'][0].remain_qty).toFixed(2))
    // 						clonetable.find('.stock_tbl_qty_chalan').val(data['getItemDtl'][0].stock_qty)
    // 						clonetable.find('.stock_tbl_qty').val(data['getItemDtl'][0].stock_qty)
    // 						clonetable.find('.barcode_no').val(data['getItemDtl'][0].barcode_no)
    // 						//                             if(data['getItemDtl'][0].chalan_remain_qty > 0){
    // 						clonetable.find('.sale_quantity').val(1.00)
    // 						var price = 0;
    // 						price = parseFloat(1) * parseFloat(data['getItemDtl'][0].price)
    // 						clonetable.find('.sale_price').val(price ? price.toFixed(2) : 0)
    // 						$('.salePosTbl tbody').append(clonetable);
    // 						//                             }
    // 					} else {
    // 						var price = 0;
    // 						var prev_qty = $('.salePosTbl tbody td .sale_quantity').eq(row_no).val()
    // 						now_qty = parseFloat(prev_qty) + 1
    // 						if (parseFloat(now_qty) > parseFloat(data['getItemDtl'][0].remain_qty)) {
    // 							$.notify("Quantity Exceed!!");
    // 						} else {
    // 							price = (now_qty) * parseFloat(data['getItemDtl'][0].price)
    // 							$('.salePosTbl tbody td .sale_quantity').eq(row_no).val(now_qty.toFixed(2))
    // 							$('.salePosTbl tbody td .sale_price').eq(row_no).val(price ? price.toFixed(2) : 0)
    // 						}
    // 					}
    // 					getsaletotalprice();
    // 				} else {
    // 					$.notify("Stock of this challan already finished. Kindly select item from another challan.");
    // 				}
    // 			}, 'json');
    // 		} else {
    // 			//                $.notify("Do not.");
    // 		}
    // 	} // main callback function
    // });

    // Scanner Input
    $('input[name="sales_item_name"]').on('keypress', function(event) {
        if (event.which == 13 && $('.salePosDiv').length) {
            event.preventDefault();
            let barcode = $(this).val().split(' ')[0];
            if (barcode == '') {
                $.notify("Field Is Empty");
                return false;
            }
            $('input[name="sales_item_name"]').val('');
            $.post('/sale/getBarcodeWiseItem', {
                barcode_no: barcode,
                csrfmiddlewaretoken: '{{ csrf_token }}'
            }, function(data) {
                if (typeof data['getItemDtl'][0] != 'undefined') {
                    var barcode_no = data['getItemDtl'][0].barcode_no
                    var duplicate = 0,
                        row_no = 0;
                    $('.salePosTbl tbody td .barcode_no').each(function(i, j) {
                        if ($(this).val() == barcode_no) {
                            duplicate = 1;
                            row_no = i
                        }
                    })
                    if (duplicate == 0) {
                        var clonetable = $('.voucherclonetable tbody tr').clone();
                        clonetable.find('#sales_img').append(`<a href="` + /media/ + data['getItemDtl'][0].image +`" target="_blank"> <img src=" ` + /media/ + data['getItemDtl'][0].image +`" style="position: absolute; width: 5%; height: auto%;"> </a>`)
                        clonetable.find('.sale_item').val(data['getItemDtl'][0].item_name)
                        clonetable.find('.uom_id').val(data['getItemDtl'][0].uom_id)
                        clonetable.find('.inv_fg_stock_master_id').val(data['getItemDtl'][0].inv_fg_stock_master_id)
                        clonetable.find('.inv_fg_stock_detail_id').val(data['getItemDtl'][0].inv_fg_stock_detail_id)
                        if (data['getItemDtl'][0].discount_price_status == 1) {
                            clonetable.find('.sales_price').val(parseFloat(data['getItemDtl'][0].discount_price).toFixed(2))
                            clonetable.find('.discountPrice').val(parseFloat(data['getItemDtl'][0].discount_price).toFixed(2))
                            clonetable.find('.discountparcentage').val(data['getItemDtl'][0].discount_parcentage)
                        } else {
                            clonetable.find('.sales_price').val(parseFloat(data['getItemDtl'][0].price).toFixed(2))
                            clonetable.find('.discountPrice').val(0)
                            clonetable.find('.discountparcentage').val('')
                        }
                        clonetable.find('.sale_rate').val(parseFloat(data['getItemDtl'][0].price).toFixed(2))
                        clonetable.find('.remain_quantity').val(parseFloat(data['getItemDtl'][0].remain_qty).toFixed(2))
                        clonetable.find('.stock_tbl_qty_chalan').val(data['getItemDtl'][0].stock_qty)
                        clonetable.find('.stock_tbl_qty').val(data['getItemDtl'][0].stock_qty)
                        clonetable.find('.barcode_no').val(data['getItemDtl'][0].barcode_no)
                            //if(data['getItemDtl'][0].chalan_remain_qty > 0){
                        clonetable.find('.sale_quantity').val(1.00)
                        var price = 0;
                        if (data['getItemDtl'][0].discount_price_status == 1) {
                            price = parseFloat(1) * parseFloat(data['getItemDtl'][0].discount_price)
                        } else {
                            price = parseFloat(1) * parseFloat(data['getItemDtl'][0].price)
                        }
                        clonetable.find('.sale_price').val(price ? price.toFixed(2) : 0)
                        $('.salePosTbl tbody').append(clonetable);
                        //                             }
                    } else {
                        var price = 0;
                        var prev_qty = $('.salePosTbl tbody td .sale_quantity').eq(row_no).val()
                        now_qty = parseFloat(prev_qty) + 1
                        if (parseFloat(now_qty) > parseFloat(data['getItemDtl'][0].remain_qty)) {
                            $.notify("Quantity Exceed!!");
                        } else {
                            if (data['getItemDtl'][0].discount_price_status == 1) {
                                price = (now_qty) * parseFloat(data['getItemDtl'][0].discount_price)
                                clonetable.find('.discountPrice').val(parseFloat(data['getItemDtl'][0].discount_price).toFixed(2))
                                clonetable.find('.discountparcentage').val(data['getItemDtl'][0].discount_parcentage)
                            } else {
                                price = (now_qty) * parseFloat(data['getItemDtl'][0].price)
                                clonetable.find('.discountPrice').val(0)
                                clonetable.find('.discountparcentage').val('')
                            }
                            $('.salePosTbl tbody td .sale_quantity').eq(row_no).val(now_qty.toFixed(2))
                            $('.salePosTbl tbody td .sale_price').eq(row_no).val(price ? price.toFixed(2) : 0)
                        }
                    }
                    getsaletotalprice();
                } else {
                    $.notify("Stock of this  Product Is Empty");
                }
            }, 'json');
        }
    });

    //voucher table
    $('.salePosTbl tbody').on('input', '.sale_quantity', function(data) {
        var stock_tbl_qty = $(this).parents('td').find('.stock_tbl_qty_chalan').val()
        if (parseFloat($(this).val()) > parseFloat(stock_tbl_qty)) {
            $.notify("Stock remain : " + parseFloat(stock_tbl_qty).toFixed(2) + '. Stock Quantity exceed!!!')
            $(this).val('');
            getsaletotalprice()
        }
    });

    $('.salePosTbl').on('input', '.sale_quantity', function() {
        var price = 0;
        price = parseFloat($(this).parents('tr').find('.sale_quantity').val()) * parseFloat($(this).parents('tr').find('.sales_price').val())
        $(this).parents('tr').find('.sale_price').val(price ? price.toFixed(2) : 0)
        getsaletotalprice()
    });

    $(".salePosTbl").on('click', '.removebtn', function(event) {
        $(this).parents('tr').remove();
        //getsaletotalprice()
        if ($('input[name="code"]').val() != undefined) {
            $('#couponclick').click()
        }
        getsaletotalprice();
        // if ($('input[name="gift_card_code"]').val() != undefined) {
        // 	$("#cardclick").click();
        // } else {
        // 	getsaletotalprice();
        // }
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
        $.post('/sale/invoice', { sale_id: sale_id }, function(data) {
            var w = window.open('about:blank');
            w.document.open();
            w.document.write(data);
            w.print();
            w.document.close();
            location.reload();
        }, 'html');
    }

    $('.confirmbtn').on('click', function(event) {
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
                if (parseFloat($('.salespointinput').val()) > parseFloat($('.grand_total').val()) || parseFloat($('.salespointinput').val()) > parseFloat($('.totalPoint').val())){
                    $.notify('Point Is Exceed');
                    return false;
                }
                // Check Payment Status
                let paymentMode = $('.payment_mode').find('option:selected').val();
                let cardAmount = $('.amount').val();
                let emiDuration = $('.emitime').val();
                let tr_reference = $('.etrinput').val();
                //let partialPaymentCard = $('.bank_name').find('option:selected').val();
                // if (!$('.cardDetails').hasClass('hide')) {
                // 	let bankOption = $('#multiplecard').val();
                // 		$.each(bankOption, function (i, card) {
                // 			if (card == 1 && !$('.etrinput').val()) {
                // 				$.notify('Tr Reference is Empty');
                // 				return false;
                // 			}

                // 			else if (card == 2 && !$('.dtrinput').val()) {
                // 				$.notify('Tr Reference is Empty');
                // 				return false;
                // 			}
                // 		})


                // }

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

    // Update payment Print
    $('#data-table-basic').on("click", '.updatePrint', function(event) {
        saleid = $(this).data('id');
        invoiceGenrate(saleid);
    })

});



$(".mobile_no").on('keypress', (function(event) {
    if (event.which == 13) {
        event.preventDefault()
        phoneNo = $('#phone').val();
        if (phoneNo == '') {
            $.notify('Mobile number is Empty')
        } else {
            $.post('/sale/customerInformation', { customerPhone: phoneNo, csrfmiddlewaretoken: '{{ csrf_token }}' }, function(data) {
                $('.email').val(data[0].email)
                $('.customer_name').val(data[0].name)
                if (data[0].sift_address == null) {
                    $('.address').val(data[0].address)    
                } else {
                    $('.address').val(data[0].sift_address)
                }
                $('.zip').val(data[0].zip_code)
                $('.slpoint').val(data[0].remaining_point)
                $('.billing_customer_name').val(data[0].name);
                $('.billing_email').val(data[0].email);
                $('.billing_country').val(data[0].country);
                $('.billing_state').val(data[0].state);
                $('.billing_city').val(data[0].city);
                $('.billing_zip').val(data[0].zip_code);
                $('.billing_delivery_location').val(data[0].sift_address)
                $('#countrylist option').each(function() {
                    if ($(this).val() == data[0].country) {
                    $('#countrylist').val($(this).val()).change()
                     }
                    })
                    var soption = ('<option value="'+ data[0].state +'">'+ data[0].state +'</option>');
                    $('#statelist').append(soption)
                    $('#statelist option').each(function() {
                    if ($(this).val() == data[0].state) {
                    $('#statelist').val($(this).val()).change()
                    }
                    })
                    var cityoption = ('<option value="'+ data[0].city +'">'+ data[0].city +'</option>');
                    $('#citylist').append(cityoption)
                    $('#citylist option').each(function() {
                    if ($(this).val() == data[0].city) {
                    $('#citylist').val($(this).val()).change()
                    $('.salescity').click()
                    }
                    })
            })
        }
    }
}))






$('.deleteItem').click(function() {
    var itemId = $(this).parents('tr').find('.itemId').val();
    var salesOrderId = $(this).parents('tr').find('.salesOrderId').val();
    var result = confirm("Are you sure you want to delete this item?");
    //console.log(swal)

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

// **** Sales point Payment System ****

$('.customerEnfo').on('change', '.payment_mode', function(event) {
    event.stopPropagation();
    $('.amount').addClass('hide');
    $('.poscardDetails').addClass('hide');
    $('.bikasPhone').addClass('hide');
    $('.salesgiftcard').addClass('hide');
    $('.pospoint').addClass('hide');

    // Payment Type Wise div open close
    let paymentType = $('#multipleSelect').val()
    if (paymentType == null) {
        console.log('List is Empty');
    } else if (paymentType.length > 3) {
        alert('Can not use more than 3 payment type');
        return false
    }
    $.each(paymentType, function(i, value) {
        if (value == 1) {
            $('.amount').removeClass('hide');
            if ($('.cinput').val()) {
                console.log("input is not empty");
            } else {
                $('#camount').append('<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="amount" class="form-control input-sm cinput" placeholder="Cash amount" autocomplete="off"></div>')
                if ($('input[name="code"]').val() != undefined) {
                    $('#couponclick').click()
                }
                // if ($('input[name="gift_card_code"]').val() != undefined) {
                // 	$("#cardclick").click();
                // }
                else {
                    getsaletotalprice();

                }
            }
        } else if (value == 2) {
            $('.poscardDetails').removeClass('hide');

        } else if (value == 3) {
            $('.bikasPhone').removeClass('hide');
            if ($('.bkashinput').val() && $('.bkashrefinput').val()) {
                console.log('Amount and reference is already exist');
            } else {
                $('#bkshamount').append('<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="amount" class="form-control input-sm bkashinput" placeholder="Bkash amount" autocomplete="off"></div>')
                $('#bTrRef').append('<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="transaction_reference" class="form-control input-sm bkashrefinput" placeholder="Transaction Reference" autocomplete="off"></div>')
                    //getsaletotalprice();
                if ($('input[name="code"]').val() != undefined) {
                    $('#couponclick').click()
                }
                // if ($('input[name="gift_card_code"]').val() != undefined) {
                // 	$("#cardclick").click();
                // }
                else {
                    getsaletotalprice();

                }

            }
        } else if (value == 4) {
            $('.salesgiftcard').removeClass('hide');
            if ($('.giftcardinput').val()) {
                console.log('Amount and  is already exist');
            } else {
                $('#salesgiftcardamount').append('<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="amount" class="form-control input-sm giftcardinput" placeholder="" autocomplete="off"></div>')
                salesgiftamount = parseFloat($('input[name="sales_gift_card_amount"]').val()).toFixed(2)
                $('.giftcardinput').val(salesgiftamount > 0 ? salesgiftamount : '');

            }
        } else if (value == 5) {
            $('.pospoint').removeClass('hide');
            if ($('.pospointinput').val()) {
                console.log('Amount and  is already exist');
            } else {
                phoneNo = $('#phone').val();
                $.post('/sale/customerInformation', { customerPhone: phoneNo, csrfmiddlewaretoken: '{{ csrf_token }}' }, function(data) {
                    if (data[0].total_point >= 1000) {
                        $('#giftpoint').append('<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="amount" class="form-control input-sm salespointinput" placeholder="" autocomplete="off"></div>')
                        $('#giftpoint').append('<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="hidden" name="point" class="form-control input-sm totalPoint" placeholder="" autocomplete="off"></div>')
                        $('.salespointinput').val(parseFloat(data[0].remaining_point).toFixed(2));
                        $('.totalPoint').val(parseFloat(data[0].remaining_point).toFixed(2));
                        $('.salespointinput').on('keyup', function(event) {
                            totalPrice = parseFloat($('.grand_total').val())
                            if (parseFloat($('.salespointinput').val()) > totalPrice || parseFloat($('.salespointinput').val()) > parseFloat(data[0].remaining_point)) {
                                $.notify('Point is exceed')
                                return false
                            }
                        })
                    } else {
                        $.notify('Total point :')
                        $.notify(data[0].total_point)
                    }
                })

            }
        }
    })
    if ($('.amount').hasClass('hide')) {
        $('.cashamount').remove()
        $('.cinput').parent('div').remove();
    }
    if ($('.poscardDetails').hasClass('hide')) {
        $('#multiplecard').selectpicker("deselectAll", true).selectpicker("refresh");
    }
    if ($('.bikasPhone').hasClass('hide')) {
        $('.bkashinput').parent('div').remove();
        $('.bkashrefinput').parent('div').remove();
    }
    if ($('.salesgiftcard').hasClass('hide')) {
        $('.giftcardinput').parent('div').remove();
    }
    if ($('.pospoint').hasClass('hide')) {
        $('.pospintinput').parent('div').remove();
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
            }
            // if ($('input[name="gift_card_code"]').val() != undefined) {
            // 	$("#cardclick").click();
            // }
            else {
                getsaletotalprice();

            }
        })
        if ($('.bank').hasClass('hide')) {
            $('.input').parent('div').remove();
            $('.trinput').parent('div').remove();
        }
    })
})

/// **** End Sales point Payment *** ///


//// **** Payment Update *****
$('.paymentUpdate').on('click', function(event) {
    $.ajax({
        url: 'UserPaymentUpdateDetails',
        type: 'POST',
        data: {
            id: $(this).data('id')
        },
        dataType: 'json',
        success: function(json) {
            $('.invoice_no').html(json[0]['invoice_no']);
            $('.invoicemaskingno').html(json[0]['invoice_masking_no']);
            $('.invoice_date').html(json[0]['invoice_date']);
            $('.name').html(json[0]['name']);
            $('.mobile_no').html(json[0]['mobile_no']);
            $('.delivery_address').html(json[0]['delivery_address']);
            totalprice = json[0]['total_price']
            vatAmount = json[0]['vat_amount']
            dueAmount = json[0]['remain']
            grndtotal = parseFloat(totalprice) + parseFloat(vatAmount);
            paidAmount = json[0]['paid']
            if (dueAmount < 0) {
                dueAmount = 0.00;
            }
            $('input[name="tamount"]').val(parseFloat(grndtotal).toFixed(2));
            $('input[name="amount"]').val(parseFloat(dueAmount).toFixed(2));
            $('input[name="dueamount"]').val(parseFloat(dueAmount).toFixed(2));
            $('input[name="paidamount"]').val(parseFloat(paidAmount).toFixed(2));
            $('input[name="id"]').val(json[0]['id']);
            $('input[name="invoice_no"]').val(json[0]['invoice_no']);

        }
    })
})


$('.payment').on('change', '.payment_mode', function() {
    event.stopPropagation();
    $('.amount').addClass('hide');
    $('.cardDetails').addClass('hide');
    $('.bikasPhone').addClass('hide');
    $('.salespaymentgiftcard').addClass('hide');
    let paymentType = $('#multipleSelect').val();
    event.stopImmediatePropagation()
        //Append payment type input
    $.each(paymentType, function(i, value) {
            if (value == 1) {
                $('.amount').removeClass('hide');
                if ($('.cinput').val()) {
                    console.log("input is not empty");
                } else {
                    $('#camount').append('<div col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding-bottom:10px"><input type="text" name="amount" class="form-control input-sm cinput" placeholder="Cash amount" autocomplete="off"></div>')
                    $('input[name="amount"]').val(parseFloat(0).toFixed(2));
                }
            }
            if (value == 2) {
                $('.cardDetails').removeClass('hide');

            } else if (value == 3) {
                $('.bikasPhone').removeClass('hide');
                if ($('.bkshamountinput').val()) {
                    console.log('Amount and reference is already exist');
                } else {
                    $('#bkshamount').append('<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="amount" class="form-control input-sm bkshamountinput" placeholder="Bkash amount" autocomplete="off"></div>')
                    $('#bTrRef').append('<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="transaction_reference" class="form-control input-sm bkashrefinput" placeholder="Transaction Reference" autocomplete="off"></div>')
                    $('input[name="amount"]').val(parseFloat(0).toFixed(2));

                }
            } else if (value == 4) {
                $('.salespaymentgiftcard').removeClass('hide');
                if ($('.codeinput').val()) {
                    console.log('Amount   is already exist');
                } else {
                    $('#giftcardcode').append('<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="code" class="form-control input-sm codeinput" placeholder="" autocomplete="off"></div>')
                    $('input[name="code"]').val(0);
                    $('#giftcardamount').append('<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="amount" class="form-control input-sm giftcardinput" placeholder="" autocomplete="off"></div>')

                }

            }

        })
        // end of payment type input  append

    if ($('.amount').hasClass('hide')) {
        $('.cashamount').remove()
        $('.cinput').parent('div').remove();
    }
    if ($('.cardDetails').hasClass('hide')) {
        $('#multiplecard').selectpicker("deselectAll", true).selectpicker("refresh");
    }
    if ($('.bikasPhone').hasClass('hide')) {
        $('.bkashinput').parent('div').remove();
        $('.bkashrefinput').parent('div').remove();
    }
    if ($('.salespaymentgiftcard').hasClass('hide')) {
        $('.giftcardinput').parent('div').remove();
        $('.codeinput').parent('div').remove();
    }


    // div open or  close  by selecting  card 
    $('.cardName').on('change', function(event) {
        $('.updatebank').addClass('hide');
        $('.updateinput').parent('div').remove();
        $('.updatetrinput').parent('div').remove();
        let bankOption = $('#multiplecard').val();
        event.stopImmediatePropagation();
        if (bankOption != '') {
            $('.updatebank').removeClass('hide');
            $('#updateamount').append('<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="amount" class="form-control input-sm updateinput" autocomplete="off"></div>')
            $('#updateref').append('<div col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-bottom:10px"><input type="text" name="transaction_reference" class="form-control input-sm updatetrinput" placeholder="Transaction number" autocomplete="off"></div>')
                //$('.updateinput').val(parseFloat(dueAmount).toFixed(2));
        }
    })

})


$('.userPayment').on('click', function(event) {
    $.post('/sale/userpaymentUpdate', $('.payment_update').serialize(), function(data) {
        //$.notify(data[0]['msg']);
    }, 'json')
});

// Hide div with cancel button click
$('.upercancel').on('click', function() {
    $('.amount').addClass('hide');
    $('.cardDetails').addClass('hide');
    $('.bikasPhone').addClass('hide');
    $('.salespaymentgiftcard').addClass('hide');
    $('.updatebank').addClass('hide');
    $('#multipleSelect').selectpicker("deselectAll", true).selectpicker("refresh");
    $('#multiplecard').selectpicker("deselectAll", true).selectpicker("refresh");
});
$('.lowercancel').on('click', function() {
        $('.amount').addClass('hide');
        $('.cardDetails').addClass('hide');
        $('.bikasPhone').addClass('hide');
        $('.salespaymentgiftcard').addClass('hide');
        $('.updatebank').addClass('hide');
        $('#multipleSelect').selectpicker("deselectAll", true).selectpicker("refresh");
        $('#multiplecard').selectpicker("deselectAll", true).selectpicker("refresh");

    })
    // end of cancel button

/// **** End of Payment Update *** ///

// pay slip print

$('#data-table-basic').on("click", '.paySlipPrint', function(event) {
    saleid = $(this).data('id');
    paySlipGenrate(saleid);
})

function paySlipGenrate(salesid) {
    $.post('/sale/payslipprint', { 'sales_id': salesid, 'print_from': 'paySlip', csrfmiddlewaretoken: '{{ csrf_token }}' }, function(data) {
        let print = window.open('about:blank');
        print.document.open();
        print.document.write(data);
        print.print();
        print.document.close();

    }, 'html');
}

// Paid and Return To customer

$('.paidNotes').on('keyup', function(event) {
    payblaeAmount = $('.cinput').val();
    paidAmount = $(this).val();
    returnAmount = paidAmount - payblaeAmount;
    $('input[name="return_amount"]').val(returnAmount);
})


// Gift Card

$('.salesgiftcard').on('click', function(event) {
    $('.salesgift').removeClass('hide');
    if (event.target.checked == true) {
        $('#giftCard').append('<div  style="padding-bottom:10px"><input type="text" name="gift_card_code" id="" class="form-control input-sm" placeholder="Gift  Card code" autocomplete="off"></div>')
    } else {
        $('#giftCard').empty();
        $('.salesgift').addClass('hide');
        $('.giftcardinput').val('');
        $('input[name="sales_gift_card_amount"]').val(0)
        getsaletotalprice();
    }
})

$(".salesgiftbtn").on("click", function(event) {
    giftCode = $('input[name="gift_card_code"]').val();
    $.ajax({
        url: "GiftCardCheck",
        type: "POST",
        data: {
            code: giftCode,
            csrfmiddlewaretoken: '{{ csrf_token }}'
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
                //getsaletotalprice(1, data[0].amount);
                $('input[name="giftcode"]').val(data[0].id)
                giftpayment = $('#multipleSelect').val();
                if (giftpayment == null) {
                    $('input[name="sales_gift_card_amount"]').val(parseFloat(data[0].amount).toFixed(2));
                } else {
                    if (giftpayment.includes("4")) {
                        $('.giftcardinput').val(parseFloat(data[0].amount - data[0].used_amount));
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

// Discount Coupon

$('.discountcoupon').on('click', function(event) {
    $('.coupon').removeClass('hide');
    if (event.target.checked == true) {
        $('#discountCoupon').append('<div  style="padding-bottom:10px"><input type="text" name="discount_code" id="coupon_code" class="form-control input-sm" placeholder="Coupon code" autocomplete="off"></div>')
    } else {
        $('#discountCoupon').empty();
        $('.coupon').addClass('hide');
        $('.salesdiscount').val(0);
        getsaletotalprice();
    }
})

//Discount Data

$(".couponbtn").on("click", function(event) {
    couponCode = $('input[name="discount_code"]').val();
    $.ajax({
        url: "Coupondiscount",
        type: "POST",
        data: {
            discount_code: couponCode
        },
        dataType: "json",
        success: function(json) {
            if (($.datepicker.formatDate("yy-mm-dd", new Date()) > json[0].end_date) || json[0].status == 1 || json[0].coupon_used_limit == json[0].number_of_use) {
                $.notify("It is not valid coupon", { position: "right" });
                $('input[name="code"]').val('')
                return false;
            } else {
                if (json[0].discount.includes("%")) {
                    amount = parseInt(json[0].discount);
                    totalamount = parseFloat($(".sale_total_price").val());
                    grandtotal = parseFloat(parseFloat(amount * totalamount) / 100).toFixed(2);
                    getsaletotalprice('discount', grandtotal);
                } else {
                    amount = parseInt(json[0].discount);
                    getsaletotalprice( 'discount', amount);
                }
            }
        }
    });
});

$('.internalemployeeforsales').on('click', function(event) {
    if (event.target.checked == true) {
        $('input[name="employeecode"]').val(1)
        getsaletotalprice();
    } else {
        $('input[name="employeecode"]').val(0)
        getsaletotalprice();
    }
})

$(".sale_item").on('keyup', function(event) {

    var This = $(this)
    let itemCode = $(this).val();

    $.post('/sale/getFgItem', {
        itemcode: itemCode,
        search: 'sales',
        csrfmiddlewaretoken: '{{ csrf_token }}'
    }, function(data) {
        newdata = []
        $.each(data, function(i, item) {
            var showed_name
            var suggestion
            if (item.product_web_name != null) {
                showed_name = item.product_web_name
            } else {
                showed_name = item.item_description
            }
            if (item.product_new_code != null) {
                suggestion = item.id + " " + item.product_new_code + " " + showed_name;
                newdata.push(suggestion);
            } else {
                suggestion = item.id + " " + item.finished_goods_no + " " + showed_name;
                newdata.push(suggestion);
            }
        })
        This.autocomplete({
            source: newdata
        })

    });
});

// New Customer Add URL 
$('.updateInfo').on('click', function(event){
    event.preventDefault()
    $.post('/sale/AddCustomerInfo', $('.customerData').serialize(), function(data) {
        $('input[name="mobile_no"]').val(data[0]['phone'])
        $('input[name="customer_name"]').val(data[0]['name'])
        $('input[name="email"]').val(data[0]['email'])
        $('input[name="city"]').val(data[0]['city'])
        $('input[name="state"]').val(data[0]['state'])
        $('input[name="zip_code"]').val(data[0]['zip'] != '' ? data[0]['zip'] : 0)
        $('input[name="country"]').val(data[0]['country'])
        $('.address').val(data[0]['address'])
        $("#countrylist option").each(function () {
          if ($(this).val() == data[0].country) {
            $("#countrylist").val($(this).val()).change();
          }
        });
        var soption =
          '<option value="' +
          data[0].state +
          '">' +
          data[0].state +
          "</option>";
        $("#statelist").append(soption);
        $("#statelist option").each(function () {
          if ($(this).val() == data[0].state) {
            $("#statelist").val($(this).val()).change();
          }
        });
        var cityoption =
          '<option value="' + data[0].city + '">' + data[0].city + "</option>";
        $("#citylist").append(cityoption);
        $("#citylist option").each(function () {
          if ($(this).val() == data[0].city) {
            $("#citylist").val($(this).val()).change();
            $(".salescity").click();
          }
        });
    } )

})

//Customer Entry Form
$('.newCustomerinfo').on('click', function(event) {
    $('input[name="customer_name"]').val(' ')
    $('input[name="customer_phone"]').val(' ')
    $('input[name="customer_email"]').val(' ')
    $('input[name="customer_address"]').val(' ')
    $('input[name="customer_city"]').val(' ')
    $('input[name="customer_state"]').val(' ')
    $('input[name="customer_zip"]').val(' ')
    $('input[name="customer_country"]').val(' ')
})

/// State list
$('.salescountry').on('click', function(event) {
    if ($('#countrylist').val() != 'Select Country') {
        $.ajax({
            url: "shippinglog", // the endpoint
            type: "POST", // http method
            data: {
                country: $('#countrylist').val(),
                from : 'country',
            }, // data sent with the post request
            dataType: 'json',
            // handle a successful response
            success: function(json) {

                $('#statelist').empty()
                $('#statelist').append('<option>'+ 'Select State' +'</option>')
                for (i=0; i<json[0]['state'].length; i++) {
                    data = json[0]['state'][i].state_name
                    var option = ('<option value="'+ data +'">'+ data +'</option>');
                    $('#statelist').append(option)
                }
            },
        });


    }
})

/// City list
$('.salesstatename').on('click', function(event) {
    if ($('#statelist').val() != 'Select State') {
        $.ajax({
            url: "shippinglog", // the endpoint
            type: "POST", // http method
            data: {
                country: $('#statelist').val(),
                from : 'state'
            }, // data sent with the post request
            dataType: 'json',
            // handle a successful response
            success: function(json) {
                $('#citylist').empty()
                $('#citylist').append('<option>'+ 'Select City' +'</option>')
                for (i=0; i<json[0]['city'].length; i++) {
                    data = json[0]['city'][i].city_name
                    var option = ('<option value="'+ data +'">'+ data +'</option>');
                    $('#citylist').append(option)
                }
            },
        });


    }
})

$('.salescity').on('click', function(event) {
    if ($('#citylist').val() != 'Select City') {
        $.ajax({
            url: "shippinglog", // the endpoint
            type: "POST", // http method
            data: {
                country: $('#citylist').val(),
                from : 'city'
            }, // data sent with the post request
            dataType: 'json',
            // handle a successful response
            success: function(json) {
                if(json[0]['shipping_amount'] == 0) {
                    $('.shipping').val( json[0]['shipping_percent'])
                    $('.shippingamount').val(0)
                } else {
                    $('.shippingamount').val( json[0]['shipping_amount'])
                    $('.shipping').val(0)
                }
                getsaletotalprice()
            },
        });


    }
})

$('.checkstate').on('click', function(event) {
    if(event.target.checked == true){
        $('.salescountry').click()
    }
})
