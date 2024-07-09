document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');
    const loading = document.getElementById('loading');
    
    message.textContent = '';
    loading.classList.remove('hidden');
    
    setTimeout(() => {
        if (username === "user" && password === "user123") {
            message.textContent = "Login successful!";
            message.style.color = "green";
            setTimeout(() => {
                window.location.href = "../sources.html";
            }, 1000);
        } else {
            message.textContent = "Invalid username or password.";
            loading.classList.add('hidden');
        }
    }, 2000); 
});


function logout() {
  
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');


    alert("Anda telah logout.");

  
    window.location.href = "index.html";
}



window.onload = function() {
    document.getElementById('cal').style.display ="hidden";
    document.getElementById('ls').style.display = "hidden";
    document.getElementById('nl').style.display = "hidden";
}

function toggleVisibility(id) {
    var content = document.getElementById(id);
    if (content.style.display === "none") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}

unction tombol(){
    let aritmatika = document.getElementById('aritmatika').value
    let angka1 = document.getElementById('angka1').value;
    let angka2 = document.getElementById('angka2').value;
    let hasil;

    if (aritmatika=='+') {
        hasil=parseFloat(angka2)+parseFloat(angka1);
    }
    else if (aritmatika=='-') {
        hasil=parseFloat(angka2)-parseFloat(angka1);
    }
    else if (aritmatika=='*') {
        hasil=parseFloat(angka2)*parseFloat(angka1);
    }
    else if (aritmatika=='/') {
        hasil=parseFloat(angka2) / parseFloat(angka1);
    }
    else if (aritmatika=='%') {
        hasil=parseFloat(angka2)%parseFloat(angka1);
    }
    else{
        hasil='';
    }
    document.getElementById('total').value=hasil.toFixed(1);
}

function resetk(){
    document.getElementById('angka1').value="";
    document.getElementById('aritmatika').value="+";
    document.getElementById('angka2').value="";
    document.getElementById('total').value="";

}
function resetl(){
    document.getElementById('luasOption').value="lingkaran";
    document.getElementById('luasResult').value=" ";
    document.getElementById(showLuasInputs().innerHTML=" ").value=" ";

}

function showLuasInputs() {
    const option = document.getElementById('luasOption').value;
    let inputsHtml = '';
    switch (option) {
        case 'lingkaran':
            inputsHtml = '<div class="form-control mb-2"><label for="radius">Masukkan jari-jari:</label><br><input type="number" id="radius" step="any"></div>';
            break;
        case 'persegi':
            inputsHtml = '<div class="form-control mb-2"><label for="sisi">Masukkan sisi:</label><br><input type="number" id="sisi" step="any"></div>';
            break;
        case 'persegiPanjang':
            inputsHtml = '<div class="form-control mb-2"><label for="panjang">Masukkan panjang:</label><br><input type="number" id="panjang" step="any"><br><label for="lebar">Masukkan lebar:</label><br><input type="number" id="lebar" step="any"></div>';
            break;
        case 'jajargenjang':
            inputsHtml = '<div class="form-control mb-2"><label for="alas">Masukkan alas:</label><br><input type="number" id="alas" step="any"><br><label for="tinggi">Masukkan tinggi:</label><br><input type="number" id="tinggi" step="any"></div>';
            break;
        default:
            inputsHtml = '';
    }
    document.getElementById('luasInputs').innerHTML = inputsHtml;
}

function calculateLuas() {
    const option = document.getElementById('luasOption').value;
    let result;
    switch (option) {
        case 'lingkaran':
            const radius = parseFloat(document.getElementById('radius').value);
            result = 3.14 * radius * radius;
            break;
        case 'persegi':
            const sisi = parseFloat(document.getElementById('sisi').value);
            result = sisi * sisi;
            break;
        case 'persegiPanjang':
            const panjang = parseFloat(document.getElementById('panjang').value);
            const lebar = parseFloat(document.getElementById('lebar').value);
            result = panjang * lebar;
            break;
        case 'jajargenjang':
            const alas = parseFloat(document.getElementById('alas').value);
            const tinggi = parseFloat(document.getElementById('tinggi').value);
            result = alas * tinggi;
            break;
        default:
            result = 'Pilihan tidak valid';
    }
    document.getElementById('luasResult').value = `${result.toFixed(1)} cm²`;
}

function readDoubleInRange(input, min, max) {
    const value = parseFloat(input.value);
    if (isNaN(value) || value < min || value > max) {
        input.setCustomValidity(`Nilai harus antara ${min} dan ${max}`);
        input.reportValidity();
        return null;
    } else {
        input.setCustomValidity('');
        return value;
    }
}

function calculateNilai() {
    const nama = document.getElementById('nama').value;
    const nim = document.getElementById('nim').value;
    const kelas = document.getElementById('kelas').value;
    const sks = parseInt(document.getElementById('sks').value);
    const kehadiran = readDoubleInRange(document.getElementById('kehadiran'), 0, sks === 3 ? 21 : 14);
    const tugas = readDoubleInRange(document.getElementById('tugas'), 0, 100);
    const uts = readDoubleInRange(document.getElementById('uts'), 0, 100);
    const uas = readDoubleInRange(document.getElementById('uas'), 0, 100);

    if (kehadiran === null || tugas === null || uts === null || uas === null) {
        return;
    }

    const max_kehadiran = sks === 3 ? 21 : 14;
    const phadir = (kehadiran / max_kehadiran) * 10;
    const ptugas = (tugas / 100) * 20;
    const puts = (uts / 100) * 30;
    const puas = (uas / 100) * 40;

    let hasil;
    let grade;

    if (phadir < 8) {
        hasil = 0;
        grade = 'D - Absen anda Kurang dari batas minimum';
    } else {
        hasil = phadir + ptugas + puts + puas;
        grade = hasil >= 80 ? 'A' :
                hasil >= 70 ? 'B' :
                hasil >= 60 ? 'C' :
                hasil >= 50 ? 'D' : 'E';
    }

    document.getElementById('nilaiResult').innerHTML = `
    <table>
    
        <tr>
            <th>Nama</th>
            <th>NIM</th>
            <th>Kelas</th>
            <th>MatKul</th>
            <th>Presentase</th>
            <th>Grade</th>
        </tr>
        <tr>
            <td>${nama}</td>
            <td>${nim}</td>
            <td>${kelas}</td>
            <td>Algoritma 1</td>
            <td>${hasil.toFixed(1)} %</td>
            <td>${grade}</td>
        </tr>


        
        
    <table>


    `;
}
