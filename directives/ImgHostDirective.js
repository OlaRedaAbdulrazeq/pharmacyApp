adminApp.directive("fileReader", function(imgbbService,$timeout) {
    return {
        scope: {
            ngModel: "="
        },
        link: function(scope, element) {

            element.on("change", function(e) {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = function() {
                    const base64 = reader.result.split(",")[1];

                    imgbbService.uploadToImgbb(base64)
                    .then(function(res) {
                        $timeout(() => {      
                                scope.ngModel = res.data.data.url;
                            });
                    }).catch(function(e){
                        console.error(e)
                    })
                    
                };

                reader.readAsDataURL(file);
            });

        }
    };
});