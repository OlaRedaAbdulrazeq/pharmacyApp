adminApp.service("imgbbService", function ($http) {

    const API_KEY = "5ad33a87a90a20fd70c097f588164909";
    const UPLOAD_URL = "https://api.imgbb.com/1/upload?key="+API_KEY;

    this.uploadToImgbb  = function (file) {
        let formData = new FormData();
        formData.append("image", file);

        return $http.post(UPLOAD_URL, formData, {
            headers: { "Content-Type": undefined },
        });
    };
});