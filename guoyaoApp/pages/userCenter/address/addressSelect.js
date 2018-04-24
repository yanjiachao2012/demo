loader.define(function(require, exports, module) {


    $("#addressSelect").on("click", '.select-item', function() {
        var _this = $(this);
        _this.addClass('default-item').siblings('.default-item').removeClass('default-item');
    })
})