'use restrict';
// Some ideas
// 1. make the table columns as a component
// 2. make the td as a component for kinds of html elements.
// 3. 
// 4. 
// 5. 
// 6. 
// 7.                               

; (function (ccert, $) {
    ccert.component = {
        grid: Vue.component('ccert-grid', {
            props: ['columns', 'items'],
            //data: function () {
            //    return {
            //        name: "",
            //        items: [],
            //    };
            //},
            template: `
                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th v-for="(col, index) in columns">{{col.text}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in items" :key="index">
                                <td v-for="col in columns">{{ item[col.name].text }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `,
            methods: {
                toggle: (event) => {


                },

                loadPage: (root, event) => {

                },
            },
        }),
    };
})($.ccert = $.extend({}, this.ccert, $.ccert) || {}, jQuery);
