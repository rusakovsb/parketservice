(function ($) {
  Drupal.behaviors.themeScripts = {
    attach: function (context, settings) {

      $("input, select").styler(); 

    }
  };
})(jQuery);