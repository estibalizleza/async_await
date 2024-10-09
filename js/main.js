const aukeratutakoa = document.getElementById("authorSelect");
const authorImageContainer = document.getElementById("authorImageContainer");

aukeratutakoa.addEventListener('change', async () => {
    const idazlea = aukeratutakoa.value.trim();
    console.log(idazlea);
    authorImageContainer.innerHTML = '';
    
    const irudiak = await lortuIrudia(idazlea);
    irudiak.forEach(irudia => authorImageContainer.appendChild(irudia));
});

async function lortuIrudia(idazlea) {
    const egileaResponse = await fetch(`https://openlibrary.org/search/authors.json?q=${idazlea}`);
    const egilea = await egileaResponse.json();
    let idEgile = egilea.docs[0].key;

    const pResponse = await fetch(`https://openlibrary.org/authors/${idEgile}.json`);
    const p = await pResponse.json();
    let irudiak = p.photos;
    
    const irudiLista = [];
    if (irudiak && irudiak.length) {
        irudiak.forEach(irudi => {
            const img = document.createElement('img');
            img.src = `https://covers.openlibrary.org/b/id/${irudi}-L.jpg`;
            irudiLista.push(img);
        });
    }
    return irudiLista;
}
