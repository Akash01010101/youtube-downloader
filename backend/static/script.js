document.getElementById('download').addEventListener('click', () => {
    const url = document.getElementById('url').value;
    const messageDiv = document.getElementById('message');
    messageDiv.innerText = '';  

    fetch('/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.error);
            });
        }
        return response.blob();
    })
    .then(blob => {
        
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = downloadUrl;
        a.download = 'video.mp4';  
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);  
        messageDiv.innerText = 'Download started!';
    })
    .catch(error => {
        messageDiv.innerText = `Error: ${error.message}`;
    });
});
