$('.fg_item_Tbl').on('keypress', '.fg_item', function (event) {
	let This = $(this);

	$.get('/sale/getFgItem', function (data) {
		This.autocomplete({
			source: function (req, response) {
				let re = $.ui.autocomplete.escapeRegex(req.term);
				let matcher = new RegExp("^" + re, "i");
				response($.grep(data, function (item) {
					return matcher.test(item.value);
				}))
			},
			select: function (event, ui) {

			}
		})

	}, 'json');
	// if(event.which == 13) {
	// 	event.preventDefault();
	// 	let barcode = $(this).val();
	// 	if (barcode == '') {
	// 		$.notify("Field IS Empty");
	// 		return false;
	// 	}
	// 	$('input[name="fg_item_name"]').val('');

	// }
});


$('.deleteItem').click(function () {
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
			success: function (json) {
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
// $('#storetostore').val(0)
// $('.storetostore').on('click', function() {
// 	if (event.target.checked == true){
// 		$('#storetostore').val(1)
// 	}else {
// 		$('#storetostore').val(0)
// 	}
// })


$('.fg_item_stock').on('keyup', function (event) {
	event.stopPropagation();
	// if ($('#storetostore').val() == 1){
	// 	stostransfer = true
	// } else {
	// 	stostransfer = false
	// }
	shopId = $('#shopid').val()
	let This = $(this);
	let itemCode = $(this).val();

	$.post('/warehouse/getFgItem', {
		itemcode: itemCode,
		shop_id: shopId,
		csrfmiddlewaretoken: '{{ csrf_token }}'
	}, function (data) {
		newdata = []
		$.each(data, function (i, item) {
			var showed_name;
			var suggestion;
			if (item.web_name != null) {
				showed_name = item.web_name;
			} else {
				showed_name = item.item_name;
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

$('input[name="fg_item_name"]').on('keypress', function (event) {
	if (event.which == 13) {
		event.preventDefault();
		let barcode = $(this).val();
		if (barcode == '') {
			$.notify("Field Is Empty");
			return false;
		}
		shopId = $('#shopid').val()
		scanOrderNo = $('input[name="scan_order_input"]').val();
		$('input[name="scan_order_input"]').val('')
		// if ($('#storetostore').val() == 0) {
		// 	shopId = 5;
		// }
		$('input[name="fg_item_name"]').val('');
		$.post('/warehouse/getBarcodeWiseItemstock', {
			barcode_no: barcode.split(' ')[0],
			// barcode_no: barcode,
			shop_id: shopId,
			csrfmiddlewaretoken: '{{ csrf_token }}'
		}, function (data) {
			if (typeof data['getItemDtl'][0] != 'undefined') {
				var barcode_no = data['getItemDtl'][0].barcode_no
				var duplicate = 0,
					row_no = 0;
				orderduplicate = 0;
				$('.fg_item_Tbl tbody td .barcode_no').each(function (i, j) {
					if ($(this).val() == barcode_no) {
						duplicate = 1;
						row_no = i
					}
				})
				if (duplicate == 0) {
					var clonetable = $('.voucherclonetable tbody tr').clone();
					if (data['getItemDtl'][0].product_web_name == undefined) {
						clonetable.find('.sale_item').val(data['getItemDtl'][0].item_name)
					} else {
						clonetable.find('.sale_item').val(data['getItemDtl'][0].product_web_name)
					}
					if (data['getItemDtl'][0].product_new_code == undefined) {
						clonetable.find('.item_code').val(data['getItemDtl'][0].finished_goods_no)
					} else {
						clonetable.find('.item_code').val(data['getItemDtl'][0].product_new_code)
					}
					clonetable.find('.inv_fg_stock_detail_id').val(data['getItemDtl'][0].inv_fg_stock_detail_id)
					clonetable.find('.shop_id').val(data['getItemDtl'][0].shop_id)
					clonetable.find('.remain_quantity').val(parseFloat(data['getItemDtl'][0].remain_qty).toFixed(2))
					clonetable.find('.barcode_no').val(data['getItemDtl'][0].barcode_no);
					clonetable.find('.sale_quantity').val(1);
					clonetable.find('.orderNo').val(scanOrderNo)
					$('.fg_item_Tbl tbody').append(clonetable);

				} else {
					var ordercnt = 0;
					var breakpoint = 0;
					$('.fg_item_Tbl tbody td .orderNo').each(function (i, j) {	
						if ($(this).val() == scanOrderNo) {
							scanbarcode = $('.fg_item_Tbl tbody td .barcode_no').eq(i).val()
							if (barcode_no == scanbarcode) {
								trqty = $('.fg_item_Tbl tbody td .sale_quantity').eq(i).val()
						        newqty = parseInt(trqty) + 1
								$('.fg_item_Tbl tbody td .sale_quantity').eq(i).val(newqty);
								ordercnt = 0;
								breakpoint = 1;

							} else {
							 ordercnt = 1;
							}
						} else {
							ordercnt = 1;
						}
						if (breakpoint == 1) {
							return false;
						}
					})

					if (ordercnt == 1) {
						var clonetable = $('.voucherclonetable tbody tr').clone();
						if (data['getItemDtl'][0].product_web_name == undefined) {
							clonetable.find('.sale_item').val(data['getItemDtl'][0].item_name)
						} else {
							clonetable.find('.sale_item').val(data['getItemDtl'][0].product_web_name)
						}
						if (data['getItemDtl'][0].product_new_code == undefined) {
							clonetable.find('.item_code').val(data['getItemDtl'][0].finished_goods_no)
						} else {
							clonetable.find('.item_code').val(data['getItemDtl'][0].product_new_code)
						}
						clonetable.find('.inv_fg_stock_detail_id').val(data['getItemDtl'][0].inv_fg_stock_detail_id)
						clonetable.find('.shop_id').val(data['getItemDtl'][0].shop_id)
						clonetable.find('.remain_quantity').val(parseFloat(data['getItemDtl'][0].remain_qty).toFixed(2))
						clonetable.find('.barcode_no').val(data['getItemDtl'][0].barcode_no);
						clonetable.find('.sale_quantity').val(1);
						clonetable.find('.orderNo').val(scanOrderNo)
						$('.fg_item_Tbl tbody').append(clonetable);

					}

				}

			} else {
				$.notify("Stock of this  Product Is Empty");
			}
		}, 'json');
	}

})

$('.scan_order').on('keypress', function(event) {
	if (event.which == 13){
		event.preventDefault()
	}
})
$(".fg_item_Tbl").on('click', '.productremovebtn', function (event) {
	$(this).parents('tr').remove();
});

//Traansfer order fg update and print
$('.chalanconfirmbtn').on('click', function (event) {
	event.stopImmediatePropagation();
	event.preventDefault();
	var br = true
	$('.fg_item_Tbl tbody td .item_code').each(function (i) {
		data = $('.fg_item_Tbl tbody td .item_code').eq(i).val()
		data1 = $('.fg_item_Tbl tbody td .orderNo').eq(i).val()
		remainqty = $('.fg_item_Tbl tbody td .remain_quantity').eq(i).val()
		sendqty = $('.fg_item_Tbl tbody td .sale_quantity').eq(i).val()
		var cnt = 0
		if (!br) {
			return false
		}
		$('.fg_item_Tbl tbody td .item_code').each(function (j) {
			value = $(this).val();
			if (value == data) {
				orderdata = $('.fg_item_Tbl tbody td .orderNo').eq(j).val()
				if (orderdata == data1) {
					cnt += 1
				}
			}
			if (cnt > 1) {
				$.notify(' Multiple times : Same item having  same order no')
				br = false

			}
		})
		if (parseInt(sendqty) > parseInt(remainqty)) {
			$.notify('Product Stock is not Satisfied')
			br = false
		}
	})

	if (!br) {
		return false
	} else {
		$.post('/warehouse/stockTransferRequest', $('.sale_order_form').serialize(), function (data) {
			if (data[0].status == 'Success') {
				$.post('/warehouse/StockTransferChalanPrint', {
					transfer_id: data[0].stock_transfer_id
				}, function (data) {
					let chalanprint = window.open('about:blank');
					chalanprint.document.open();
					chalanprint.document.write(data);
					chalanprint.print();
					chalanprint.document.close();
					location.reload();
				}, 'html')

			} else {
				$.notify(data[0].message);
			}
		}, 'json')
	}
})