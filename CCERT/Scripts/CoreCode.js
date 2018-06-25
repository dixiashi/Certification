function SendEmailBySharePoint(e) {
    var sendEmailObj = new emailModel();
    console.log(JSON.stringify(sendEmailObj));

    var UserList = "Jimmy, Emily, Yulong, Betty";
    var emailbody = $("#mailBody").text();
    emailbody = $("#mailTemplate").html();

    sendEmail(sendEmailObj, emailbody);
}
var emailModel = function () {
    // Email Either email groupname or email address
    var from = $("#mailFrom").val(),
        to = $("#mailTo").val(),
        cc = $("#mailCc").val(),
        subject = $("#mailSubject").val();

    this.options = this.options || {};
    this.options['fromEmail'] = this.options['fromEmail'] || {};
    this.options['toEmail'] = this.options['toEmail'] || {};
    this.options['ccEmail'] = this.options['ccEmail'] || {};
    this.options['subject'] = this.options['subject'] || {};
    this.options['fromEmail'] = from;
    this.options['toEmail'] = to;
    this.options['ccEmail'] = cc;
    this.options['subject'] = subject;
}
function sendEmail(emailObj, body) {
    var that = emailObj;
    //Get the relative url of the site
    var ServiceUrl = ((_spPageContextInfo.webServerRelativeUrl === '/') ? '/' : _spPageContextInfo.webServerRelativeUrl);

    var siteurl = ServiceUrl;

    var urlTemplate = siteurl + "/_api/SP.Utilities.Utility.SendEmail";

    $.ajax({
        contentType: 'application/json',
        url: urlTemplate,
        type: "POST",
        data: JSON.stringify({
            'properties': {
                '__metadata': {
                    'type': 'SP.Utilities.EmailProperties'
                },
                'From': that.options.fromEmail,
                'To': {
                    'results': [that.options.toEmail]
                },
                'CC': {
                    'results': [that.options.ccEmail]
                },
                'Body': body,
                'Subject': that.options.subject,
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
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            alert('Sending Email succeed!', 1);
        },
        error: function (err) {
            // alert('Error in sending Email: ' + JSON.stringify(err));
            alert('Error in sending Email', 1);
        }
    });
}