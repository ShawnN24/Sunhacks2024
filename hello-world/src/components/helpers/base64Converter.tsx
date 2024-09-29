const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export async function base64Converter(file: File) {
    try {
        const result = await toBase64(file);
        return result
    } catch(error) {
        console.error(error);
        return;
    }
}