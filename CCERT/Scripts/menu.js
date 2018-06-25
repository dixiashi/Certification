'use restrict';


; (function ($) {
    var menuTemplateString = '<span class="ui-menu" id="{0}"></span>';
    var groupTemplateString = ' <ul class="ui-menu-group"></ul>';
    var itemTemplateString = ' <li class="ui-menu-item" id="{0}"></li>';

    $.widget("cmat.menu", {
        options: {
            //this is the animation time 200 means will have an animation when show or hide, the animation is 200ms
            animation: 200,
            //the id of the menu
            Id: "",
            //the list of item group 
            Data: null,
            //when show the menu
            onShow: null,
            //when hide the menu
            onHide: null,
            //default item setting, for each item we should defind widget name and id 
            defaultItemSetting: { Id: null, Widget: null, Options: {} },
            //by default the list will be left align.
            listAlign: "left",
            //max width of list
            listWidth: null
        },
        _create: function () {
            var self = this;
            self.refresh();
            self.element.on("click", $.proxy(self._show, self));
            $("#" + this.options.Id).on("mouseleave", $.proxy(self._hide, self));
            $("#" + this.options.Id).find(".ui-menu-item > a").on("click", $.proxy(self._hide, self));
        },
        _init: function () {
            $("#" + this.options.Id)._hide();
        },
        _createMenu: function () {
            var self = this;
            var menuRoot = $($.format(menuTemplateString, self.options.Id)).appendTo(self.element.parent());
            $.each(self.options.Data, function (index, group) {
                var menuGroup = $(groupTemplateString);
                menuGroup.appendTo(menuRoot);
                $.each(group, function (index, item) {
                    var menuItem = $($.format(itemTemplateString, item.Id));
                    menuItem.appendTo(menuGroup);
                    menuItem.data("widget", item.Widget);
                    var itemOption = $.extend({}, self.options.defaultItemSetting.Options, item.Options);
                    menuItem.data("options", itemOption);
                });
            });
        },
        _initialMenuBywidgets: function () {
            var self = this;
            $("#" + this.options.Id).find("li.ui-menu-item").each(function (index, item) {
                if ($.isFunction($(this)[$(this).data("widget")])) {
                    $(this)[$(this).data("widget")]($(this).data("options"));
                }
            })
        },
        _hideOtherMenu: function () {
            $(".ui-menu").mouseleave();
        },
        _show: function () {
            var self = this;
            self._hideOtherMenu();
            var top = self.element.height();
            $("#" + self.options.Id).css("top", top);
            if (self.options.listWidth) {
                $("#" + self.options.Id).css("width", self.options.listWidth);
            }
            if (self.options.listAlign == "left") {
                $("#" + self.options.Id).css("left", 0);
            }
            else {
                $("#" + self.options.Id).css("right", 0);
            }

            $("#" + self.options.Id).show(self.options.animation);
            if (self.options.onShow) {
                self.options.onShow(self);
            }
            self.element.addClass("ui-menu-selected");
        },
        _hide: function () {
            var self = this;
            $("#" + self.options.Id).hide(self.options.animation);
            if (self.options.onHide) {
                self.options.onHide(self);
            }
            self.element.removeClass("ui-menu-selected");
        },
        refresh: function () {
            var self = this;
            var menuContainer = self.element.find(".ui-menu");
            menuContainer.children().empty();
            menuContainer.remove();
            self._createMenu();
            self._initialMenuBywidgets();
        }
    });

})(jQuery);

