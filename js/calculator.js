(function($){
  var Calculator = {};
  // Init calculator system
  Calculator.init = function() {
    if (!$('.field-name-field-product-package-price, .field-name-field-product-price-byr').length) {
		$(".calculator-block").hide();
		return false;
	}
	
	$(".calculator-block").show();    
    $('form[name="calculator"] input[type="text"]').keyup(Calculator.keyUpCallback).keypress(Calculator.keyPressCallback);
    $('form[name="calculator"] input[name="packing_type"]').change(Calculator.checkTypePacking);
	
    if (!$('.field-name-field-product-area').length) {
      $('div.calculator .count-packs, div.calculator .recommend-count-packs').hide();
    }
    return true;
  }

  // Valid calculate
  Calculator.validate = function() {
    var ret = false;
    if ($('form[name="calculator"] input[name="product_width"]').val() && $('input[name="product_length"]', Calculator.form).val()) {
      ret = true;
    }
    else if ($('form[name="calculator"] input[name="square"]').val()) {
      ret = true;
    }
    return ret;
  }

  // Key Up Callback
  Calculator.keyUpCallback = function() {
    if (!Calculator.validate()) { return true; }
    var square, square_plus, price, count_pack, recommend_count_pack, square_pack;
    // If square callback
    if ($(this).attr('name') == 'square') {
      var square = parseFloat($(this).val().replace(/[,]+/g, '.'));
    }
    else {
      var product_width = parseFloat($('form[name="calculator"] input[name="product_width"]').val().replace(/[,]+/g, '.')),
          product_length = parseFloat($('form[name="calculator"] input[name="product_length"]').val().replace(/[,]+/g, '.'));
      if (product_width && product_length) {
        square = product_width * product_length;
      }
    }
    square_plus = square;
    if ($('input[name="packing_type"]:checked').length) {
      var t = parseFloat($($('input[name="packing_type"]:checked').parents('span.content').get(0)).find('span.v').text());
      if (t) {
        square_plus += parseFloat(square / 100 * t);
      }
    }
    if ($('.field-name-field-product-area .field-item').length) {
      square_pack = parseFloat($('.field-name-field-product-area .field-item').text().replace(/[,]+/g, '.'));
      count_pack = (square_plus / square_pack).toFixed(1);
      recommend_count_pack = Math.ceil(count_pack);
    }
    if (!square) { return true; }
    if ($(this).attr('id') != 'calc-square') {
      $('#calc-square').val(square.toFixed(3).replace('.', ','));
    }
    if (recommend_count_pack) {
      price = parseFloat($('.field-name-field-product-package-price').text().replace(/[^0-9,]+/g, "").replace(/[,]+/g, '.')) * recommend_count_pack;
    }
    else {
      price = parseFloat($('.field-name-field-product-price-byr').text().replace(/[^0-9,]+/g, "").replace(/[,]+/g, '.')) * square_plus;
    }
//    price = Calculator.numberFormat(price, undefined, undefined, ' ');
    price = price.toFixed(2).replace('.', ',') + ' руб.';
    square = square.toFixed(3).replace('.', ',') + ' м<sup>2</sup>';
    square_plus = square_plus.toFixed(3).replace('.', ',') + ' м<sup>2</sup>';
    if (square && price) {
      $('div.result tr.square td.value').html(square);
      $('div.result tr.square-plus td.value').html(square_plus);
      $('div.result tr.price td.value').html(price);
      if (count_pack && recommend_count_pack) {
        $('div.result tr.count-packs td.value').html(count_pack.toString().replace(".", ",") + ' уп.');
        $('div.result tr.recommend-count-packs td.value').html(recommend_count_pack.toString().replace(".", ",") + ' уп.');
      }
    }
    return true;
  }
  // Callback for check type packing
  Calculator.checkTypePacking = function() {
    var t = parseFloat($($('input[name="packing_type"]:checked').parents('span.content').get(0)).find('span.v').text());
    $('.calculator .square-plus .sq-p').text(t);
    Calculator.keyUpCallback.call($('#calc-square').get(0));
  }
  // Init calculator system
  $(document).ready(function(){
    Calculator.init();
  });
})(jQuery);