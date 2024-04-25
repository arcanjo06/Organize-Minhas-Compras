
window.onload = function() {
    let galleryContainer= document.querySelector('.gallery-container');
    let storageKey = 'galleryImages'; // Chave para o localStorage


    
    
    document.querySelector('.new_image').addEventListener('click', function() {
        document.getElementById('file').click();
    });

    document.getElementById('file').addEventListener('change', function() {
        document.querySelector('.new_image').innerText = 'Foto Selecionada';
    });

    document.getElementById('submitBtn').addEventListener('click', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const link = document.getElementById('link').value;
        const tipo = document.getElementById('tipo').value;
        const fileInput = document.getElementById('file');
        const file = fileInput.files[0];
        let reader=new FileReader();

        if (name.trim() === '' || link.trim() === '' || !file) {
            alert('Por favor, preencha todos os campos e selecione uma imagem.');
            return;
        }

        reader.onload = function(e) {
            let item = {
                name: name,
                link: link,
                imageData: e.target.result,
                type: tipo

                
            };
            addItemToLocalStorage(item); // Adiciona o item ao localStorage
            createGalleryItem(item); // Cria o item na galeria
        };

        reader.readAsDataURL(file);

        document.querySelector('.new_image').innerText='Escolha uma Foto';
        document.getElementById('name').value='';
        document.getElementById('link').value='';
    })

    function delItem(event, item) {
        event.preventDefault();
        galleryContainer.removeChild(item);
        removeItemFromLocalStorage(item); // Remove o item do localStorage
    }
    
    // Função para remover um item do localStorage
    function removeItemFromLocalStorage(item) {
        let items = JSON.parse(localStorage.getItem(storageKey)) || [];
        // Encontrar o índice do item a ser removido
        let index = items.findIndex(function(element) {
            return element.name === item.childNodes[2].innerText; // Assumindo que o terceiro nó é o nome do item
        });
        if (index !== -1) {
            items.splice(index, 1); // Remover o item do array
            localStorage.setItem(storageKey, JSON.stringify(items)); // Atualizar o localStorage
        }
    }
   
    // Função para criar um item na galeria
    function createGalleryItem(item) {
        let newImageContainer = document.createElement('a');
        newImageContainer.setAttribute('href', item.link);
        newImageContainer.setAttribute('target', '_blank');
        newImageContainer.classList.add('gallery-itens');
        newImageContainer.setAttribute('data-type', item.type);

        let newImage = document.createElement('img');
        newImage.setAttribute('src', item.imageData);
        newImage.setAttribute('alt', 'Preview');

        let newName = document.createElement('p');
        newName.innerHTML = item.name;

        let newType = document.createElement('p');
        newType.setAttribute('id', 'tipo_definido');
        newType.classList.add('item-type');
        newType.innerHTML = item.type;

        let delButton = document.createElement('button');
        delButton.setAttribute('id','delete')
        delButton.innerHTML = 'x';
        delButton.onclick = function() {
            delItem(event, newImageContainer);
        };

        newImageContainer.appendChild(newImage);
        newImageContainer.appendChild(delButton);
        newImageContainer.appendChild(newName);
        newImageContainer.appendChild(newType);

        galleryContainer.appendChild(newImageContainer);

        
    }

     // Função para adicionar um item ao localStorage
     function addItemToLocalStorage(item) {
        let items = JSON.parse(localStorage.getItem(storageKey)) || [];
        items.push(item);
        localStorage.setItem(storageKey, JSON.stringify(items));
    }
    
    function loadItemsFromLocalStorage() {
        let items = JSON.parse(localStorage.getItem(storageKey)) || [];
        items.forEach(function(item) {
            if (item.name && item.link && item.imageData && item.type) {
                createGalleryItem(item);
            }
        });
    }
    document.querySelectorAll('.filter-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            filterImagesByType(type);
        });
    });
    
    function filterImagesByType(type) {
        console.log("Filtrando imagens por tipo: " + type);
        const allItems = document.querySelectorAll('.gallery-itens');
        allItems.forEach(function(item) {
            const itemType = item.getAttribute('data-type');
            console.log("Tipo do item: " + itemType);
            if (type === 'all' || itemType === type) {
                console.log("Mostrando item: " + item.name);
                item.classList.remove('hidden');
            } else {
                console.log("Escondendo item: " + item.name);
                item.classList.add('hidden');
            }
    })};   

    document.querySelectorAll('.filter-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            // Remove a classe 'active' de todos os botões
            document.querySelectorAll('.filter-btn').forEach(function(btn) {
                btn.classList.remove('active');
            });
            // Adiciona a classe 'active' apenas ao botão clicado
            this.classList.add('active');
        });
    });

    document.getElementById('searchInput').addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        const items = document.querySelectorAll('.gallery-itens');
        
        items.forEach(function(item) {
            const itemName = item.textContent.toLowerCase();
            if (itemName.includes(searchText)) {
                item.style.display = 'block'; // Mostra o item se o texto estiver contido no nome
            } else {
                item.style.display = 'none'; // Esconde o item se o texto não estiver contido no nome
            }
        });
    });
    loadItemsFromLocalStorage();
};