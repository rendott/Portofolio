let idPenggunaSaatIni = null; // Deklarasikan variabel ini secara global

// Fungsi untuk mengganti konten dashboard dengan konten lain berdasarkan tombol yang diklik
function muatKonten(halaman) {
  const konten = document.getElementById('content');

  if (halaman === 'dashboard') {
    konten.innerHTML = `
      <h1>Statistik Dasbor</h1>
      <div class="cards">
        <div class="card">
          <h3>Total Pengguna</h3>
          <p>1,245</p>
        </div>
        <div class="card">
          <h3>Pendaftaran Baru</h3>
          <p>320</p>
        </div>
        <div class="card">
          <h3>Pendapatan</h3>
          <p>Rp1.000.000.000</p>
        </div>
        <div class="card">
          <h3>Sesi Aktif</h3>
          <p>850</p>
        </div>
      </div>
      <div class="stats">
        <canvas id="myChart" width="400" height="200"></canvas>
      </div>
    `;
    muatChart(); // Memuat ulang chart setelah mengganti konten

  } else if (halaman === 'users') {
    konten.innerHTML = `
      <h1>Manajemen Pengguna</h1>
      <p>Di sini Anda dapat mengelola semua pengguna yang terdaftar.</p>
      <ul id="daftarPengguna">
        <li id="pengguna-1">John Doe <button onclick="editPengguna(1)">Edit</button></li>
        <li id="pengguna-2">Jane Smith <button onclick="editPengguna(2)">Edit</button></li>
        <li id="pengguna-3">Bob Johnson <button onclick="editPengguna(3)">Edit</button></li>
        <!-- Tambahkan lebih banyak pengguna sesuai kebutuhan -->
      </ul>
      <h2>Tambah atau Edit Pengguna</h2>
      <form id="formPengguna">
        <label for="namaPengguna">Nama:</label>
        <input type="text" id="namaPengguna" required>
        
        <label for="emailPengguna">Email:</label>
        <input type="email" id="emailPengguna" required>
        
        <label for="peranPengguna">Peran:</label>
        <select id="peranPengguna">
          <option value="admin">Admin</option>
          <option value="user">Pengguna</option>
          <!-- Tambahkan lebih banyak peran sesuai kebutuhan -->
        </select>
        
        <label for="statusPengguna">Status:</label>
        <select id="statusPengguna">
          <option value="active">Aktif</option>
          <option value="inactive">Tidak Aktif</option>
          <!-- Tambahkan lebih banyak status sesuai kebutuhan -->
        </select>
        
        <button type="submit">Kirim</button>
      </form>
    `;

    // Tambahkan event listener untuk pengiriman form
    document.getElementById('formPengguna').addEventListener('submit', function(event) {
      event.preventDefault(); // Mencegah perilaku pengiriman form default

      // Ambil nilai form
      const namaPengguna = document.getElementById('namaPengguna').value;
      const emailPengguna = document.getElementById('emailPengguna').value;
      const peranPengguna = document.getElementById('peranPengguna').value;
      const statusPengguna = document.getElementById('statusPengguna').value;

      if (idPenggunaSaatIni) {
        // Update pengguna yang ada
        const itemPengguna = document.getElementById(`pengguna-${idPenggunaSaatIni}`);
        itemPengguna.innerHTML = `${namaPengguna} <button onclick="editPengguna(${idPenggunaSaatIni})">Edit</button>`;
      } else {
        // Tambahkan pengguna baru
        const daftarPengguna = document.getElementById('daftarPengguna');
        const idPenggunaBaru = daftarPengguna.children.length + 1; // Tambahkan ID berdasarkan jumlah pengguna saat ini
        const itemPenggunaBaru = document.createElement('li');
        itemPenggunaBaru.id = `pengguna-${idPenggunaBaru}`;
        itemPenggunaBaru.innerHTML = `${namaPengguna} <button onclick="editPengguna(${idPenggunaBaru})">Edit</button>`;
        daftarPengguna.appendChild(itemPenggunaBaru);
      }

      alert('Data pengguna berhasil dikirim!');

      // Reset form dan ID pengguna saat ini
      document.getElementById('formPengguna').reset();
      idPenggunaSaatIni = null; // Reset idPenggunaSaatIni setelah pengiriman
    });

    // Definisikan fungsi editPengguna
    window.editPengguna = function(idPengguna) {
      // Ambil data pengguna berdasarkan idPengguna dan isi form dengan data tersebut
      if (idPengguna === 1) {
        document.getElementById('namaPengguna').value = 'John Doe';
        document.getElementById('emailPengguna').value = 'john.doe@example.com';
        document.getElementById('peranPengguna').value = 'admin';
        document.getElementById('statusPengguna').value = 'active';
      } else if (idPengguna === 2) {
        document.getElementById('namaPengguna').value = 'Jane Smith';
        document.getElementById('emailPengguna').value = 'jane.smith@example.com';
        document.getElementById('peranPengguna').value = 'user';
        document.getElementById('statusPengguna').value = 'inactive';
      } else if (idPengguna === 3) {
        document.getElementById('namaPengguna').value = 'Bob Johnson';
        document.getElementById('emailPengguna').value = 'bob.johnson@example.com';
        document.getElementById('peranPengguna').value = 'admin';
        document.getElementById('statusPengguna').value = 'active';
      }

      // Set ID pengguna saat ini untuk di-update
      idPenggunaSaatIni = idPengguna;
    };

  } else if (halaman === 'settings') {
    konten.innerHTML = `
      <h1>Pengaturan</h1>
      <p>Di sini Anda dapat mengelola pengaturan sistem.</p>
      <form>
        <label for="namaSitus">Nama Situs:</label>
        <input type="text" id="namaSitus" value="Dasbor Admin"><br><br>
        <label for="emailAdmin">Email Admin:</label>
        <input type="email" id="emailAdmin" value="admin@example.com"><br><br>
        <button type="submit">Simpan Pengaturan</button>
      </form>
    `;
  } else if (halaman === 'reports') {
    konten.innerHTML = `
      <h1>Laporan</h1>
      <p>Di sini Anda dapat melihat laporan sistem.</p>
      <ul>
        <li>Laporan Harian</li>
        <li>Laporan Bulanan</li>
        <li>Laporan Tahunan</li>
      </ul>
    `;
  } else if (halaman === 'financial') {
    konten.innerHTML = `
      <h1>Ringkasan Keuangan</h1>
      <p>Di sini Anda dapat mengelola catatan keuangan dan melihat laporan keuangan.</p>
      <table>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Deskripsi</th>
            <th>Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-10-26</td>
            <td>Penjualan Barang</td>
            <td>Rp500.000.000</td>
          </tr>
          <tr>
            <td>2024-10-26</td>
            <td>Biaya Subscription</td>
            <td>Rp500.000.000</td>
          </tr>
        </tbody>
      </table>
    `;
  } else if (halaman === 'analytics') {
    konten.innerHTML = `
      <h1>Analitik</h1>
      <p>Di sini Anda dapat melihat analitik lalu lintas situs dan pengguna.</p>
      <canvas id="analyticsChart" width="400" height="200"></canvas>
    `;
    muatChartAnalytics(); // Memuat grafik analitik
  }
}

// Fungsi untuk memuat chart pada halaman Dasbor
function muatChart() {
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli'],
      datasets: [{
        label: 'Pengguna Terdaftar',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)'
        ],
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
}

// Fungsi untuk memuat chart analitik
function muatChartAnalytics() {
  const ctx = document.getElementById('analyticsChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
      datasets: [{
        label: 'Kunjungan Situs',
        data: [150, 230, 180, 290, 400, 320, 450],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1
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
}

// Event listeners untuk tombol sidebar
document.getElementById('dashboardBtn').addEventListener('click', () => muatKonten('dashboard'));
document.getElementById('usersBtn').addEventListener('click', () => muatKonten('users'));
document.getElementById('settingsBtn').addEventListener('click', () => muatKonten('settings'));
document.getElementById('reportsBtn').addEventListener('click', () => muatKonten('reports'));
document.getElementById('financialBtn').addEventListener('click', () => muatKonten('financial'));
document.getElementById('analyticsBtn').addEventListener('click', () => muatKonten('analytics'));

// Muat dasbor sebagai konten awal
muatKonten('dashboard');
