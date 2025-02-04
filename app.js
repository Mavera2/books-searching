const apiKey = "AIzaSyCHVMUY--j9Ut32tXLbbuNwylqXpGZxcl8";

document.getElementById("searchButton").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.trim();
    if (query) {
        fetchBooks(query);
    }
});

document.getElementById("searchInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = e.target.value.trim();
        if (query) {
            fetchBooks(query);
        }
    }
});


function fetchBooks(query) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&printType=books&key=${apiKey}`, requestOptions)
        .then((response) => response.json()) 
        .then((result) => displayResults(result.items)) 
        .catch((error) => console.error("Hata:", error));
}

function displayResults(books) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; 

    if (books && books.length > 0) {
        books.forEach((book) => {
            const bookInfo = book.volumeInfo;
            const bookElement = document.createElement("div");
            bookElement.classList.add("book");

            const title = bookInfo.title || "Başlık Yok";
            const authors = bookInfo.authors ? bookInfo.authors.join(", ") : "Yazar Bilgisi Yok";
            const description = bookInfo.description || "Açıklama Yok";
            const imageUrl = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "";

            bookElement.innerHTML = `
                <div class="book-image">
                    <img src="${imageUrl}" alt="${title}">
                </div>
                <div class="book-details">
                    <h3>${title}</h3>
                    <p><strong>Yazarlar:</strong> ${authors}</p>
                    <p><strong>Açıklama:</strong> ${description}</p>
                </div>
            `;

            resultsContainer.appendChild(bookElement);
        });
    } else {
        resultsContainer.innerHTML = "<p>Sonuç bulunamadı.</p>";
    }
}
