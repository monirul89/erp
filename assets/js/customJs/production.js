$(function(){
	$('.proFgRqTbl').on('click', '.proSloDtlBtn', function(){
		if($('.viewFgDetailsDiv').hasClass('hide')){
			$('.viewFgDetailsDiv').removeClass('hide');
		} else {
			$('.viewFgDetailsDiv').addClass('hide');
		}
	})

	$('.viewFgDetailsDiv').on('click', '.bomGnrt',function(){
		window.location.href = 'generateBom'
	});
});


$(".fg_order_item_tbl_rawGoods").on('focus', '.fg_item_name', function (event) {
	var This = $(this)
	$.get('/production/getRawGoods', function (data) {
		//console.log(data)
		This.autocomplete({
			source: function (req, response) {
				var re = $.ui.autocomplete.escapeRegex(req.term);
				var matcher = new RegExp("^" + re, "i");
				response($.grep(data, function (item) {
					return matcher.test(item.value);
				}));
			},
			select: function (event, ui) {
				This.parents('tr').find('.inv_item_config_id').val(ui.item.id);
				This.parents('tr').find('.base_uom_id').val(ui.item.uom);
				This.parents('tr').find('.selectpicker').selectpicker('refresh');
			}
		});
	}, 'json');
});


// $(".fg_order_item_tbl_rawGoods").on('focus', '.loading', function (event) {
// 	var hello = this.value('.loading');
// 	console.log(hello);
// });