const receipt = document.getElementById('receipt-container');

const printButton = document.getElementById('print-it');
const saveButton = document.getElementById('save-it');

printButton.onclick = () => {
    window.print();
};

saveButton.onclick = () => {
    html2pdf(receipt, { filename: 'Pia Receipt' });
};
