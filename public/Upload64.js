
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
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            
            const maxWidth = 800;
            const scale = Math.min(maxWidth / img.width, 1);

            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            
            const compressedBase64 = canvas.toDataURL("image/jpeg", 0.5);


            previewImage.src = compressedBase64;
            imageBase64.value = compressedBase64;

        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);






























});