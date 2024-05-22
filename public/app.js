document.getElementById('urlForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const url = document.getElementById('url').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const note = document.getElementById('note').value;

    const response = await fetch('/urls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url, tags, note })
    });

    if (response.ok) {
        loadUrls();
    } else {
        alert('Failed to save URL');
    }
});

async function loadUrls() {
    const response = await fetch('/urls');
    const urls = await response.json();
    const urlList = document.getElementById('urlList');
    urlList.innerHTML = '';
    urls.forEach(urlItem => {
        const li = document.createElement('li');
        li.textContent = `${urlItem.url} - Tags: ${urlItem.tags.join(', ')} - Note: ${urlItem.note}`;
        urlList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', loadUrls);
