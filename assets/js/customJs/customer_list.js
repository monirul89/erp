
$('.editcustomer').on('click', function(event) {
    $.post('/sale/customerInfodata', {id : $(this).data('id')}, function(data) {
        $('input[name="phone"]').val(data[0]['phone'])
        $('input[name="name"]').val(data[0]['name'])
        $('input[name="email"]').val(data[0]['email'])
        $('input[name="city"]').val(data[0]['city'])
        $('input[name="state"]').val(data[0]['state'])
        $('input[name="zip"]').val(data[0]['zip'] != '' ? data[0]['zip'] : 0)
        $('input[name="country"]').val(data[0]['country'])
        $('.address').val(data[0]['address'])
        $('input[name="id"]').val(data[0]['id']);

    })
})

$('.infocancel').on('click', function(event) {
    $('input[name="name"]').val('')
    $('input[name="phone"]').val('')
    $('input[name="email"]').val('')
    $('input[name="city"]').val('')
    $('input[name="state"]').val('')
    $('input[name="zip"]').val('')
    $('input[name="country"]').val('')
    $('input[name="address"]').val('')
})