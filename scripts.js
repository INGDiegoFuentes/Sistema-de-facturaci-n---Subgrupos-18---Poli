document.addEventListener('DOMContentLoaded', () => {
    displayClients();
    displayProducts();
    displayInvoiceHistory();
});

document.getElementById('invoiceForm').addEventListener('submit', saveInvoice);
document.getElementById('quantity').addEventListener('input', calculateTotal);
document.getElementById('price').addEventListener('input', calculateTotal);
document.getElementById('cancelButton').addEventListener('click', cancelInvoice);

document.getElementById('clientForm').addEventListener('submit', addClient);
document.getElementById('editButton').addEventListener('click', editClient);
document.getElementById('deleteButton').addEventListener('click', deleteClient);

document.getElementById('productForm').addEventListener('submit', saveProduct);
document.getElementById('cancelProductButton').addEventListener('click', cancelProduct);

document.getElementById('reportForm').addEventListener('submit', generateReport);
document.getElementById('exportButton').addEventListener('click', exportReport);

let selectedClientIndex = -1;
let clients = [
    { clientName: 'Cliente A', contactInfo: 'contacto@clientea.com', address: 'Dirección A' },
    { clientName: 'Cliente B', contactInfo: 'contacto@clienteb.com', address: 'Dirección B' },
];

let products = [
    { productName: 'Producto 1', category: 'Categoría 1', price: 10, stock: 100 },
    { productName: 'Producto 2', category: 'Categoría 2', price: 20, stock: 200 },
];

function saveInvoice(e) {
    e.preventDefault();

    const clientName = document.getElementById('clientName').value;
    const product = document.getElementById('product').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const total = document.getElementById('total').value;

    const invoice = {
        clientName,
        product,
        quantity,
        price,
        total
    };

    console.log('Factura Guardada:', invoice);
    alert('Factura Guardada!');
    
    document.getElementById('invoiceForm').reset();
}

function calculateTotal() {
    const quantity = parseFloat(document.getElementById('quantity').value) || 0;
    const price = parseFloat(document.getElementById('price').value) || 0;
    const total = quantity * price;
    document.getElementById('total').value = total.toFixed(2);
}

function cancelInvoice() {
    document.getElementById('invoiceForm').reset();
}

function addClient(e) {
    e.preventDefault();

    const clientName = document.getElementById('clientName').value;
    const contactInfo = document.getElementById('contactInfo').value;
    const address = document.getElementById('address').value;

    const client = {
        clientName,
        contactInfo,
        address
    };

    if (selectedClientIndex === -1) {
        clients.push(client);
    } else {
        clients[selectedClientIndex] = client;
        selectedClientIndex = -1;
    }

    document.getElementById('clientForm').reset();
    displayClients();
}

function displayClients() {
    const clientList = document.getElementById('clientList');
    clientList.innerHTML = '';
    clients.forEach(client => {
        const li = document.createElement('li');
        li.textContent = `Nombre: ${client.clientName}, Contacto: ${client.contactInfo}, Dirección: ${client.address}`;
        clientList.appendChild(li);
    });
}

function editClient() {
    const clientListItems = document.querySelectorAll('#clientList li');
    clientListItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            document.getElementById('clientName').value = clients[index].clientName;
            document.getElementById('contactInfo').value = clients[index].contactInfo;
            document.getElementById('address').value = clients[index].address;
            selectedClientIndex = index;
        });
    });
}

function deleteClient() {
    const clientListItems = document.querySelectorAll('#clientList li');
    clientListItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            clients.splice(index, 1);
            displayClients();
        });
    });
}

function saveProduct(e) {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;

    const product = {
        productName,
        category,
        price,
        stock
    };

    products.push(product);

    document.getElementById('productForm').reset();
    displayProducts();
}

function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `Nombre: ${product.productName}, Categoría: ${product.category}, Precio: ${product.price}, Stock: ${product.stock}`;
        productList.appendChild(li);
    });
}

function cancelProduct() {
    document.getElementById('productForm').reset();
}

function generateReport(e) {
    e.preventDefault();
    
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // Simulación de datos de reporte
    const reportData = [
        { date: '2024-06-01', client: 'Cliente A', product: 'Producto 1', quantity: 10, total: 100 },
        { date: '2024-06-05', client: 'Cliente B', product: 'Producto 2', quantity: 5, total: 50 },
        { date: '2024-06-10', client: 'Cliente C', product: 'Producto 3', quantity: 7, total: 70 },
        { date: '2024-06-15', client: 'Cliente D', product: 'Producto 4', quantity: 3, total: 30 },
        { date: '2024-06-20', client: 'Cliente E', product: 'Producto 5', quantity: 2, total: 20 },
        { date: '2024-06-25', client: 'Cliente F', product: 'Producto 6', quantity: 8, total: 80 },
        { date: '2024-06-30', client: 'Cliente G', product: 'Producto 7', quantity: 4, total: 40 }
    ];

    const filteredData = reportData.filter(item => item.date >= startDate && item.date <= endDate);
    displayReport(filteredData);
}

function displayReport(data) {
    // Generar Gráfico
    const ctx = document.getElementById('reportChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item.date),
            datasets: [{
                label: 'Ventas Totales',
                data: data.map(item => item.total),
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Generar Tabla
    const reportTableBody = document.querySelector('#reportTable tbody');
    reportTableBody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.client}</td>
            <td>${item.product}</td>
            <td>${item.quantity}</td>
            <td>${item.total}</td>
        `;
        reportTableBody.appendChild(row);
    });
}

function exportReport() {
    alert('Exportar reporte en formato CSV no está implementado.');
}

function displayInvoiceHistory() {
    const invoiceData = [
        { number: '001', client: 'Cliente A', date: '2024-06-01', amount: 100 },
        { number: '002', client: 'Cliente B', date: '2024-06-05', amount: 150 },
        { number: '003', client: 'Cliente C', date: '2024-06-10', amount: 200 },
        { number: '004', client: 'Cliente D', date: '2024-06-15', amount: 250 },
        { number: '005', client: 'Cliente E', date: '2024-06-20', amount: 300 },
        { number: '006', client: 'Cliente F', date: '2024-06-25', amount: 350 },
        { number: '007', client: 'Cliente G', date: '2024-06-30', amount: 400 }
    ];

    const tableBody = document.querySelector('#invoiceHistoryTable tbody');
    tableBody.innerHTML = '';
    invoiceData.forEach(invoice => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${invoice.number}</td>
            <td>${invoice.client}</td>
            <td>${invoice.date}</td>
            <td>$${invoice.amount}</td>
            <td>
                <button onclick="viewInvoice('${invoice.number}')">Ver</button>
                <button onclick="deleteInvoice('${invoice.number}')">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function viewInvoice(invoiceNumber) {
    alert(`Visualizando factura ${invoiceNumber}`);
}

function deleteInvoice(invoiceNumber) {
    const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar la factura ${invoiceNumber}?`);
    if (confirmDelete) {
        alert(`Factura ${invoiceNumber} eliminada`);
        // Lógica para eliminar la factura de la lista
    }
}
