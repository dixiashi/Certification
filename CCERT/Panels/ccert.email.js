'use restrict';
; (function (ccert, $) {
    ccert.email = {
        options: {
            // Email Either email groupname or email address
            "mailFrom": null,
            "mailTo": null,
            "mailCc": null,
            "mailSubject": null,
            "mailBody": null,
            success: null,
            error: null,
        },
        sendEmail: function (options) {
            options = $.extend({}, this.options, options);

            //Check data
            if (!$.ccert.common.checkEmail(options.mailFrom)) {
                return;
            }

            //Check the SharePoint object
            if (!_spPageContextInfo) {
                alert('Please make sure that you have add this script into share point online site!');
                return;
            }

            //Get the relative url of the site
            var serviceUrl = ((_spPageContextInfo.webServerRelativeUrl === '/') ? '/' : _spPageContextInfo.webServerRelativeUrl);
            var sendEmailAPI = serviceUrl + "/_api/SP.Utilities.Utility.SendEmail";

            $.ajax({
                contentType: 'application/json',
                url: sendEmailAPI,
                type: "POST",
                data: JSON.stringify({
                    'properties': {
                        '__metadata': {
                            'type': 'SP.Utilities.EmailProperties'
                        },
                        'From': options.mailFrom,
                        'To': {
                            'results': [options.mailTo]
                        },
                        'CC': {
                            'results': [options.mailCc]
                        },
                        'Body': options.mailBody,
                        'Subject': options.mailSubject,
                        "AdditionalHeaders":
                        {
                            "__metadata":
                            { "type": "Collection(SP.KeyValue)" },
                            "results":
                            [
                                {
                                    "__metadata": {
                                        "type": 'SP.KeyValue'
                                    },
                                    "Key": "content-type",
                                    "Value": 'text/html',
                                    "ValueType": "Edm.String"
                                }
                            ]
                        }
                    }
                }),
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
                success: function (data) {
                    if (options.success) {
                        options.success(data);
                    }
                    console.log(options);
                    console.log('Sending Email succeed!');
                },
                error: function (err) {
                    if (options.error) {
                        options.error(err);
                    }
                    console.log(options);
                    console.log('Error in sending Email: ' + JSON.stringify(err));
                    alert('Error in sending Email', 1);
                }
            });
        }
    };
})($.ccert = $.extend({}, this.ccert, $.ccert) || {}, jQuery);