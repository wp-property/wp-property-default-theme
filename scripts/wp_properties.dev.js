jQuery(document).ready(function() {
    "function" == typeof jQuery.fn.fancybox && jQuery("a.fancybox_image").live("click", function() {
        return jQuery(this).hasClass("activated") || (jQuery(this).fancybox({
            transitionIn: "elastic",
            transitionOut: "elastic",
            speedIn: 600,
            speedOut: 200,
            overlayShow: !1
        }), jQuery(this).addClass("activated"), jQuery(this).trigger("click")), !1;
    }), jQuery("a.fancybox_image img").click(function(e) {
        return "function" == typeof jQuery.fn.fancybox ? null : void e.preventDefault();
    }), jQuery(document).bind("wpp_pagination_change", function(e, data) {
        var overview_id = data.overview_id, position = jQuery("#wpp_shortcode_" + overview_id).offset();
        "undefined" != typeof jQuery.scrollTo && jQuery.scrollTo(position.top - 40 + "px", 1500);
    }), jQuery(".ui-tabs").bind("tabsshow", function(event, ui) {
        var panel = ui.panel;
        jQuery(document).trigger("wpp::ui-tabs::tabsshow", panel);
    }), jQuery(".ui-tabs").bind("tabsselect", function(event, ui) {
        var panel = ui.panel;
        jQuery(document).trigger("wpp::ui-tabs::tabsselect", panel);
    });
});