function SendEmailBySmtpJS(e) {
    //var sendEmailObj = new emailModel();
    console.log("Send email by Smtpjs start!");
    if ($('#attachments').prop('files').length != 0) {
        var file = $('#attachments').prop('files')[0];
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function () {
            var fileJsonObject = {
                "filetype": file.type,
                "filename": file.name
            };
            //var dataUri = "data: " + JSON.stringify(fileJsonObject) + "; base64, " + btoa(reader.result);
            var dataUri = "data: " + file.type + "; base64, " + btoa(reader.result);
            console.log(dataUri);
            Email.sendWithAttachment("qiannianyu123@hotmail.com",
                "qiannianyu123@gmail.com",
                $("#mailSubject").val(),
                $("#mailTemplate").html(),
                {
                    token: "088063c1-a5fc-4217-8702-73753546457c",
                    callback: function done(message) {
                        alert("sent");
                        console.log("Send email by Smtpjs end!");
                    },
                },
                "",
                "",
                dataUri,
                ""
            );

        };
        reader.onerror = function () {
            console.log('there are some problems');
        };
    } else {
        Email.send("qiannianyu123@hotmail.com",
            //"qiannianyu123@gmail.com",
            "v-qiha@microsoft.com",
            "How to send email via SmtpJS",
            $("#mailTemplate").html(),
            {
                token: "088063c1-a5fc-4217-8702-73753546457c",
                callback: function done(message) {
                    alert("sent");
                    console.log("Send email by Smtpjs end!");
                },
            });

    }

}