function generateVCF(fileNumber) {
    const numbersInput = document.getElementById('numbersInput').value;
    const baseFilename = document.getElementById('filename').value;
    const filename = `${baseFilename}${fileNumber}.vcf`;

    let numbers = numbersInput
        .replace(/[\s\n]+/g, '')
        .split(',')
        .map(num => num.trim());

    let correctedNumbers = [];
    let invalidNumbers = [];

    numbers.forEach(number => {
        let cleanedNumber = number.replace(/[^0-9]/g, '');

        // Assuming valid number has 10 to 15 digits
        if (cleanedNumber.length >= 10 && cleanedNumber.length <= 15) {
            correctedNumbers.push(`+${cleanedNumber}`);
        } else {
            invalidNumbers.push(number);
        }
    });

    if (invalidNumbers.length > 0) {
        alert(`Invalid numbers not included:\n${invalidNumbers.join(', ')}`);
    }

    let vcfContent = '';
    correctedNumbers.forEach((number, index) => {
        vcfContent += `BEGIN:VCARD\nVERSION:3.0\nFN:Neext (${baseFilename} ${fileNumber}) ${index + 1}\nTEL;TYPE=CELL:${number}\nEND:VCARD\n`;
    });

    if (vcfContent) {
        const blob = new Blob([vcfContent], { type: 'text/vcard' });
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = filename;
        downloadLink.style.display = 'block';
    } else {
        alert('No valid number found.');
    }
}