'use restrict';
// Some ideas
// 1. add the id/name attribute to do the toggle operation.
// 2. update the compoenet data section, such as: add the page attribute......
// 3. add some export prototype, such as: current elements, URL, all data.
// 4. add some reloading/refresh method to re-render commponet dynmamicly.
// 5. must compiled by other tool, otherwise it will can't work in IE browser
// 6. investigage: how to run the vue method in the vue component.
// 7. In Recursion, how to invoke vue method correctly.

; (function (ccert, $) {
    ccert.component = {
        menu: Vue.component('ccert-menu', {
            props: ['menu', 'root'],
            //data: function () {
            //    return {
            //        name: "",
            //        items: [],
            //    };
            //},
            template: `
                <div>
                    <h6 class="sidebar-heading d-flex align-items-center px-3" >                                              
                        <a class="chevrons" href="#" v-if="menu.items && menu.items.length != 0" v-on:click="toggle">       
                            <span data-feather="chevrons-up"></span>
                            <span data-feather="chevrons-down" style="display:none;"></span>
                        </a>
                        <span :data-feather="menu.icon" v-else></span>
                        <a class="d-flex align-items-start px-1 nav-link" href="#" v-on:click="loadPage(root, $event)" page="Dashboard.html">
                            {{menu.name}}
                        </a>
                    </h6>
                    <ul :for="menu.name" class="nav flex-column px-4">
                        <li class="nav-item" v-for="(item, index) in menu.items" :key="menu.name+index">
                            <a class="nav-link text-nowrap" href="#" v-if="!item.items" v-on:click="loadPage(root, $event)" page="Dashboard.html"><span :data-feather="item.icon"></span>{{item.name}}</a>
                            <ccert-menu v-else v-bind:menu="item" v-bind:root="root" :key="item.name"></ccert-menu >
                        </li>
                    </ul>
                </div>
            `,
            methods: {
                toggle: (event) => {
                    //展开/合并项目
                    //polyline->svg->a->h6->div
                    var that = $(event.target);
                    if (that.is("polyline")) {
                        that = that.parent();
                    }
                    var h6 = $(that).parent().parent();
                    var menu = h6.parent();
                    var name = h6.find("a:last").text().trim();
                    if ($(that).hasClass("feather-chevrons-up")) {
                        menu.find("ul[for='" + name + "']").hide();
                        h6.find("svg.feather-chevrons-up").hide();
                        h6.find("svg.feather-chevrons-down").show();
                    } else {
                        menu.find("ul[for='" + name + "']").show();
                        h6.find("svg.feather-chevrons-up").show();
                        h6.find("svg.feather-chevrons-down").hide();
                    }
                },

                loadPage: (root, event) => {
                    //点击link时，加载相应的页面到右边
                    $(root.el).find("a.active").removeClass("active");

                    var url = $(event.target).attr("page") + "?time=" + (new Date()).getMilliseconds();
                    $("main").load(url, "", function (response) {
                        $("main h1").text($(event.target).text());
                    });
                    $(event.target).addClass("active");
                },
            },
        }),
    };
})($.ccert = $.extend({}, this.ccert, $.ccert) || {}, jQuery);
