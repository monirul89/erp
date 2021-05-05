function check_uncheck_fg_checkbox(isChecked) {
  if (isChecked) {
    $("#item-task .items :checkbox").each(function() {
      this.checked = true;
    });
  } else {
    $("#item-task .items :checkbox").each(function() {
      this.checked = false;
    });
  }
}
$("#btn_Toggle").click(function() {
  $(".fg_stock_add_div").hide();
  $(".fg_stock_list_div").removeClass("col-lg-9");
  $(".fg_stock_list_div").addClass("col-lg-12");
  $("#btn_Show_Toggle").css({ display: "block" });
});
$("#btn_Show_Toggle").click(function() {
  $(".fg_stock_add_div").removeClass('hide');
  $(".fg_stock_add_div").show();
  $(".fg_stock_list_div").removeClass("col-lg-12");
  $(".fg_stock_list_div").addClass("col-lg-9");
  $("#btn_Show_Toggle").css({ display: "none" });
});
$("#btn_Stock_Out").click(function() {
  var confirm_msg = confirm(
    "Do you want to set out of stock of selected items?"
  );
  if (confirm_msg == true) {
    var item_list = new Array();
    $("#item-task .items :checkbox:checked").each(function(i) {
      item_list[i] = {
        item_id: this.id
      };
    });
    $.ajax({
      url: "fgStockTemp",
      async: false,
      data: {
        option: "Out of Stock",
        item_list: JSON.stringify({ items: item_list })
      },
      success: function(data) {
        alert(data);
        location.reload();
      },
      error: function(data) {
        alert("Data update failed");
      }
    });
  }
});

$("#btn_Available").click(function() {
  var confirm_msg = confirm("Do you want to set available selected items?");
  if (confirm_msg == true) {
    var item_list = new Array();
    $("#item-task .items :checkbox:checked").each(function(i) {
      item_list[i] = {
        item_id: this.id
      };
    });
    $.ajax({
      url: "fgStockTemp",
      async: false,
      data: {
        option: "Available",
        item_list: JSON.stringify({ items: item_list })
      },
      success: function(data) {
        alert(data);
        location.reload();
      },
      error: function(data) {
        alert("Data update failed");
      }
    });
  }
});

$("#btn_Discontinue").click(function() {
  var confirm_msg = confirm("Do you want to discontinue selected items?");
  if (confirm_msg == true) {
    var item_list = new Array();
    $("#item-task .items :checkbox:checked").each(function(i) {
      item_list[i] = {
        item_id: this.id
      };
    });
    $.ajax({
      url: "fgStockTemp",
      async: false,
      data: {
        option: "Discontinue",
        item_list: JSON.stringify({ items: item_list })
      },
      success: function(data) {
        alert(data);
        location.reload();
      },
      error: function(data) {
        alert("Data update failed");
      }
    });
  }
});

$('.fg_size_id').on('change', function(event) {
  var size = $(this).children("option:selected").text();
  size = size.split("X");
  length = size[0].split("-");
  if (length[0] == "DIA") {
    dia = size[1].split("-");
    $('input[name="dia"]').val(length[1]);
    $('input[name="height"]').val(parseInt(dia[1]));
    $('input[name="length"]').val("");
    $('input[name="width"]').val("");
    $('input[name="dia_tag"]').val(1);
  } else {
    width = size[1].split("-");
    height = size[2].split("-");
    $('input[name="length"]').val(length[1]);
    $('input[name="width"]').val(width[1]);
    $('input[name="height"]').val(parseInt(height[1]));
    $('input[name="dia"]').val("");
    $('input[name="dia_tag"]').val(0);
  }
})

$(".addPriceAjax").click(function() {
  $("#AppendFormView").empty();
  var result = $(this).data("code");
  var id = $(this).data('id');
  $.post(
    "/inventory/productdetails",
    {
      product_barcode: result,
      return_type: 'price',
      id: id,
    },
    function(data) {
      $('.productPrice').empty()
      $('.productPrice').val(parseFloat(data[0].price).toFixed(2));
      
    }
  );
  var inputFild = '<input type="hidden" name="code" value=' + result + ">";
  $("#AppendFormView").append(inputFild);
});


$(".addDiscountPrice").click(function() {
  $("#discountPrice").empty();
  var result = $(this).data("code");
  var id = $(this).data('id');
  $.post(
    "/inventory/productdetails",
    {
      product_barcode: result,
      return_type: 'discount',
      id: id,
    },
    function(data) {
      $('.productPrice').empty()
      $('.parcentage').empty();
      $('.productPrice').val(parseFloat(data[0].discount_price).toFixed(2));
      $('.parcentage').val(data[0].discount);
      
    }
  );
  var inputFild = '<input type="hidden" name="code" value=' + result + ">";
  $("#discountPrice").append(inputFild);
});
// Product Barcode Details
$(".productDetails").on("click", function() {
  productBarcode = $(this).data("code");
  product_id = $(this).data('id');
  $.post(
    "/inventory/productdetails",
    {
      product_barcode: productBarcode,
      return_type: 'details',
      id: product_id
    },
    function(data) {
      $(".productcolor").empty();
      $(".productsize").empty();
      $(".product_rm_2").empty();
      $(".product_rm_1").empty();
      $(".category").empty();
      $(".productline").empty();
      $('.secondarycolor').empty();
      $.each(data, function(i, value) {
        $(".productcolor").html(value.product_color);
        $(".productsize").html(value.product_size);
        $(".product_rm_2").html(value.product_rm_2);
        $(".product_rm_1").html(value.product_rm_1);
        $(".category").html(value.product_category);
        $(".productline").html(value.product_line);
        $(".secondarycolor").html(value.sc_color);
      });
    }
  );
});

// Product Qty Edit
$(".qtyupdate").on("click", function(event) {
  detailssid = $(this).data("id");
  masterid = $(this).data("masterid");
  $('input[name="detailid"]').val(detailssid);
  $('input[name="masterid"]').val(masterid);
});
$(".upcancel").on("click", function(event) {
  $('input[name="qty"]').val("");
});
$(".botomcancel").on("click", function(event) {
  $('input[name="qty"]').val("");
});

// Product Name Edit
$(".nameupdate").on("click", function(event) {
  detailssid = $(this).data("id");
  masterid = $(this).data("masterid");
  productCode = $(this).data("productcode");
  $('input[name="detailid"]').val(detailssid);
  $('input[name="masterid"]').val(masterid);
  $('input[name="productcode"]').val(productCode);
});
$(".upercancel").on("click", function(event) {
  $('input[name="productname"]').val("");
});
$(".belowcancel").on("click", function(event) {
  $('input[name="productname"]').val("");
});

// Upload Image
$(".imageupload").on("click", function(event) {
  detailssid = $(this).data("id");
  $('input[name="detailid"]').val(detailssid);
});
$(".imageformcancel").on("click", function(event) {
  $('input[name="image"]').val("");
});


// Product Edit
$(".productEdit").on("click", function(event) {
  event.preventDefault();
  $(".productname").html($(this).data("name"));
  $(".productcode").html($(this).data("code"));
  $('input[name="prcode"]').val($(this).data("code"));
  $.post(
    "/inventory/productEdit",
    {
      pr_code: $(this).data("code")
    },
    function(data) {
      $(".productname").html(data[0].product_name)
      $(".productline").html(data[0].product_line);
      $(".productcategory").html(data[0].product_category);
      $(".productwoodboard").html(data[0].product_rm_1);
      $(".productsize").html(data[0].product_size);
      $(".productcolor").html(data[0].product_color);
      $(".newcode").html(data[0].product_new_code);
      //$('.productfabricrexin').html(data[0].product_rm_2)
      $('input[name="length"]').val(data[0].product_length);
      $('input[name="width"]').val(data[0].product_width);
      $('input[name="height"]').val(data[0].product_height);
      $('input[name="dia"]').val(data[0].product_dia);

      if (data[0].product_rm_2 == undefined) {
        $(".productfabricrexin").html(" ");
      } else {
        $(".productfabricrexin").html(data[0].product_rm_2);
      }

      if (data[0].product_wood_board_code == undefined) {
        $("#wood").removeClass("hide");
        $("#Prwood").val("0").change();
      } else {
        // Select WOOD OR BOARD
        if (data[0].wood_board_status == "wood") {
          $("#board").addClass("hide");
          $("#wood").removeClass("hide");
          $('#Prwb').val("0").change()

          $("#Prwood option").each(function () {
            if ($(this).val() == data[0].product_wood_board_code) {
              $("#Prwood ").val($(this).val()).change();
            }
          });
        } else {
          $("#wood").addClass("hide");
          $("#board").removeClass("hide");
          $('#Prwb').val("1").change()
          $("#Prboard option").each(function () {
            if ($(this).val() == data[0].product_wood_board_code) {
              $("#Prboard ").val($(this).val()).change();
            }
          });
        }
      }
      // Fabric Rexin
      if (data[0].product_fabric_rexin == undefined) {
        $("#prfabric").removeClass("hide");
        $("#fabric").val("0").change()
      } else {
        if (data[0].fab_rex_status == "fabric") {
          $("#prexin").addClass("hide");
          $("#prfabric").removeClass("hide");
          $('#Prfbr').val("0").change()
          $("#fabric option").each(function () {
            if ($(this).val() == data[0].product_fabric_rexin) {
              $("#fabric").val($(this).val()).change();
            }
          });
        } else {
          $("#prfabric").addClass("hide");
          $("#prexin").removeClass("hide");
          $('#Prfbr').val("1").change()
          $("#rexin option").each(function () {
            if ($(this).val() == data[0].product_fabric_rexin) {
              $("#rexin ").val($(this).val()).change();
            }
          });
        }
      }

      // Select Wood Or Board

      $(".prwobod").on("change", function(event) {
          event.preventDefault();
        if ($("#Prwb").val() == 0) {
          $("#board").addClass("hide");
          $("#wood").removeClass("hide");
          $('#Prwood').selectpicker("deselectAll", true).selectpicker("refresh");
          $("#Prwood").val("0").change()
        } if ($("#Prwb").val() == 1){
          $("#wood").addClass("hide");
          $("#board").removeClass("hide");
          $('#Prboard').selectpicker("deselectAll", true).selectpicker("refresh");
          $("#Prboard").val("0").change();
        }
      });

      //Select Fabric or Rexin
      $(".fbrxin").on("change", function(event) {
        if ($("#Prfbr").val() == 0) {
          $("#prexin").addClass("hide");
          $("#prfabric").removeClass("hide");
          $('#fabric').selectpicker("deselectAll", true).selectpicker("refresh");
          $("#fabric").val("0").change()
        } else {
          $("#prfabric").addClass("hide");
          $("#prexin").removeClass("hide");
          $('#rexin').selectpicker("deselectAll", true).selectpicker("refresh");
          $("#rexin").val("0").change()
        }
      });

      // Product item name
      $('input[name="pr_item"]').val(data[0].product_name_id);
      $('#Prline option').each(function() {
        if ($(this).val() == data[0].product_line_item) {
          $('#Prline').val($(this).val()).change()
        }
      })

      $('#Prcategory option').each(function() {
        if ($(this).val() ==  parseInt(data[0].product_category_id)) {
          $('#Prcategory').val($(this).val()).change()
        }
      })


      $('#Prcolor option').each(function() {
        if ($(this).val() ==  parseInt(data[0].product_color_id)) {
          $('#Prcolor').val($(this).val()).change()
        }
      })

      if (data[0].sc_color_id == undefined) {
        $('#Prsccolor').val("0").change()
        $(".sccolor").html(' ');
      } else {
        $(".sccolor").html(data[0].sc_color);
        $('#Prsccolor option').each(function() {
          if ($(this).val() ==  parseInt(data[0].sc_color_id)) {
            $('#Prsccolor').val($(this).val()).change()
          }
        })
      }

      // Product Size
      if (data[0].product_size_id == undefined) {
        
        $('#Prsize').val("0").change()
      } else {
        $('#Prsize option').each(function() {
          if ($(this).val() ==  parseInt(data[0].product_size_id)) {
            $('#Prsize').val($(this).val()).change()
          }
        })
      }

      $('#Prsize').on('change', function(event) {
        var size = $(this).children("option:selected").text();
        size = size.split('X');
        length = size[0].split('-')
        if (length[0] == 'Dia') {
          dia = size[1].split('-')
          $('input[name="dia"]').val(length[1]);
          $('input[name="height"]').val(parseInt(dia[1]));
          $('input[name="length"]').val('');
          $('input[name="width"]').val('');
          $('input[name="dia_tag"]').val(1);
        } else {
          width = size[1].split('-')
          height = size[2].split('-')
          $('input[name="length"]').val(length[1]);
          $('input[name="width"]').val(width[1]);
          $('input[name="height"]').val(parseInt(height[1]));
          $('input[name="dia"]').val('');
          $('input[name="dia_tag"]').val(0);
        }
      })

      if (data[0].product_series == null) {

        $('#prSeries').val("0").change()
      } else {
        $('#prSeries option').each(function() {
          if ($(this).val() ==  parseInt(data[0].product_series)) {
            $('#prSeries').val($(this).val()).change()
          }
        })
      }

     if (data[0].product_size_name == null) {
      $('#prNewsize').val("0").change()
     } else {

      $('#prNewsize option').each(function() {
        if ($(this).val() ==  parseInt(data[0].product_size_name)) {
          $('#prNewsize').val($(this).val()).change()
        }
      })
     }
    }
  );
});

$(".editcancel").click(function() {
  $("#Prname").empty();
  $('#wood').addClass('hide');
  $('#board').addClass('hide');
  $('#prfabric').addClass('hide');
  $('#prexin').addClass('hide');
  $('#Prwb option:first').prop('selected',true);
  $('#Prfbr option:first').prop('selected',true);
  $('input[name="length"]').val('');
  $('input[name="width"]').val('');
  $('input[name="height"]').val('');
  $("#rexin option:selected").prop("selected", false)
  $("#fabric option:selected").prop("selected", false)
  $("#Prboard option:selected").prop("selected", false)
  $("#Prwood option:selected").prop("selected", false)
  $("#Prline option:selected").prop("selected", false)
  $("#Prcategory option:selected").prop("selected", false)
  $("#Prsize option:selected").prop("selected", false)
  $("#Prcolor option:selected").prop("selected", false)
  $("#Prsccolor option:selected").prop("selected", false)
  $("#prSeries option:selected").prop("selected", false)
  $("#prNewsize option:selected").prop("selected", false)
});

//Product Search

$(".search").on("keyup", function(event) {
  let This = $(this);
  if ($(this).val() == "") {
    window.location.replace("fgStockTemp");
  }
  $.post(
    "/inventory/FgProductSearch",
    { search_string: $(this).val() },
    function(data) {
      newdata = [];
      $.each(data, function(i, item) {
        newdata.push(item.product_name);
      });
      This.autocomplete({
        source: newdata
      });
    }
  );
});
// Product Edit Form Validation

$(".edit").on("click", function (event) {
  if ($("#prSeries").val() == 0) {
    $.notify("Series is empty");
    return false;
  }
  if ($("#prNewsize").val() == 0) {
    $.notify("Size name is empty");
    return false;
  }
});

// Product Merge 

$('.productcodeSearch').on('keypress',  function(event) {
  event.stopPropagation();
  let This = $(this);
  let itemCode = $(this).val();
  $.post('/inventory/MergeProductSearch', {itemcode:itemCode }, function(data) {
    newdata = []
    $.each(data, function(i, item) {
      if (item.product_new_code !=null) {
        newdata.push(item.product_new_code);
        newdata.push(item.finished_goods_no);
      } else {
        newdata.push(item.finished_goods_no);
      }
    })
    This.autocomplete({
      source: newdata
    })
  
  });
  var productTag = $(this).data('id')
  
  if (event.which == 13) {
      event.preventDefault();
      let barcode = $(this).val();
      $('.productcodeSearch').val('');
      $.post('/inventory/MergeProductSearch', {
        itemcode: barcode,
        details:"product details"
      }, function (data) {
        if (productTag == "productCode1") {
          $('input[name="product_id_1"]').val(data[0]["id"]);
          $('input[name="serise_name_1"]').val(data[0]["series"]);
          $('input[name="product_category_1"]').val(data[0]["category"]);
          $('input[name="product_size_1"]').val(data[0]["size_name"]);
          $('input[name="product_color_1"]').val(data[0]["color"]);
          $('input[name="fabric_1"]').val(data[0]["fab_rex"]);
          var productImage = /media/ + data[0]["image"];
          $("#product_image_1").html('<img src="' + productImage + '">');
        } else {
          $('input[name="product_id_2"]').val(data[0]["id"]);
          $('input[name="serise_name_2"]').val(data[0]["series"]);
          $('input[name="product_category_2"]').val(data[0]["category"]);
          $('input[name="product_size_2"]').val(data[0]["size_name"]);
          $('input[name="product_color_2"]').val(data[0]["color"]);
          $('input[name="fabric_2"]').val(data[0]["fab_rex"]);
          var productImage = /media/ + data[0]["image"];
          $("#image_2").html('<img  src="' + productImage + '">');
        }
         
      }, 'json');
    }
  });

  $('.submit').on('click', function(event) {
    swal({
      title: "Are you sure?",
			type: "warning",
			confirmButtonText: "Submit",
			showCancelButton: true,
    }).then(function(result) {
      if (result) {
        $.post('/inventory/ProductMergeRequest', $('.merge_product').serialize(), function(data) {
          $.notify(data, "success")
          //location.reload()
          setTimeout(function(){
            location.reload(true);
          }, 1000); 
        }, 'json')
      }
    }).catch(swal.noop)

  })

  // Product Add Form 
$('#scColor').change(function(event) {
  if ($('#fg_color_id').find(":selected").text() == 'Select Color') {
    $("option:selected").prop("selected", false)
    alert('Primary color is empty')
  }
})