console.log("UPLOAD JS CARGADO");
const imageInput = document.getElementById('image');
const previewImage = document.getElementById('preview');
const imageBase64 = document.getElementById('imageBase64');


imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) {
        previewImage.src = "";
        imageBase64.value = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        const base64 = event.target.result;

        console.log("BASE64 GENERADO");
        console.log(base64.substring(0,50));

        previewImage.src = base64;
        imageBase64.value = base64;

        console.log("input oculto")
        console.log(imageBase64.value.length)


    };
    reader.readAsDataURL(file)

});