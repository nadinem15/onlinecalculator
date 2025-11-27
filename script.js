
        //  Jelaskan Kodingan ini apa: kode perintah pertama, "Jangan mulai menjalankan logika apapun sebelum semua elemen HTML selesai dimuat di browser." Gunanya untuk mencegah kode error karena mencoba mencari tombol yang belum ada.
        document.addEventListener('DOMContentLoaded', function() {
            
            //  Jelaskan Kodingan ini apa: kode tempat dimana JavaScript mencatat di mana letak Layar Kaca (display), Kotak Lampu Status (statusImage), dan semua Tombol (buttons). Jadi, kalau mau nulis di layar, dia tinggal panggil variabel display.
            const display = document.getElementById('display');
            const statusImage = document.getElementById('statusImage');
            const buttons = document.querySelectorAll('.btn-calc');

            //  Jelaskan Kodingan ini apa: kode untuk mencatat daftar variabel yang menyimpan alamat (URL) dari tiga jenis gambar status: Normal, Sukses, dan Error. Jadi, kalau butuh ganti status, tinggal panggil variabel ini.
            const imgNormal = 'https://placehold.co/400x100/374151/E5E7EB?text=Calculator';
            const imgSuccess = 'https://placehold.co/400x100/10B981/FFFFFF?text=Success';
            const imgError = 'https://placehold.co/400x100/DC2626/FFFFFF?text=Error!';

            /**
              Jelaskan Kodingan ini apa: kode ini berfungsi untuk mengganti gambar di Kotak Lampu Status. Kalau dipanggil dengan 'success', dia akan mengganti gambar ke Success.
             */
            function changeImage(state) {
                if (state === 'success') {
                    statusImage.src = imgSuccess;
                    statusImage.alt = "Perhitungan Sukses";
                } else if (state === 'error') {
                    statusImage.src = imgError;
                    statusImage.alt = "Error Perhitungan";
                } else {
                    //  Jelaskan Kodingan ini apa 
                    statusImage.src = imgNormal;
                    statusImage.alt = "Status Kalkulator";
                }
            }

            /**
              Jelaskan Kodingan ini apa: kode yang berfungsi untuk menghapus semua teks di Layar Kaca (display.value = '') dan mengembalikan Kotak Lampu Status ke Normal.
             */
            function clearDisplay() {
                display.value = '';
                changeImage('normal'); // Memanggil function untuk merubah gambar
            }

            /**
              Jelaskan Kodingan ini apa: kode yang berfungsi untuk memotong satu huruf/angka dari ujung kanan teks di layar.
             */
            function deleteLastChar() {
                display.value = display.value.slice(0, -1);
            }

            /**
              Jelaskan Kodingan ini apa: kode yang berfungsi untuk menambahkan angka atau operator yang kamu tekan ke Layar Kaca.
             */
            function appendToDisplay(value) {
                display.value += value;
            }

            /**
              Jelaskan Kodingan ini apa: kode yang paling penting karena berfungsi untuk melakukan perhitungan.
             */
            function calculateResult() {
                //  Jelaskan Kodingan ini apa: Ibaratnya, dia sebagai penjaga pintu. Kalau tekan = tapi layarnya kosong, dia akan menampilkan Error dan menunda penghapusan layarnya.
                if (display.value === '') {
                    changeImage('error');
                    display.value = 'Kosong!';
                    //  Jelaskan Kodingan ini apa: kode untuk menjalankan fungsi clearDisplay setelah menunggu 1,5 detik (1500 milidetik). Dipakai setelah Error/Kosong agar pesan tersebut sempat terlihat.
                    setTimeout(clearDisplay, 1500);
                    return;
                }

                try {
                    //  Jelaskan Kodingan ini apa: kode yang berfungsi untuk bisa membaca teks (misalnya, "1+2*3") dan langsung menghitung hasilnya.
                    let result = eval(display.value
                        .replace(/%/g, '/100') //  Jelaskan Kodingan ini apa: kode yang berfungsi mengganti setiap tanda % di layar dengan /100 sebelum dihitung (Contoh: 20% menjadi 20/100), karena fungsi eval() tidak mengerti tanda % dalam matematika standar.
                    ); 
                    
                    //  Jelaskan Kodingan ini apa: kode yang berfungsi untuk memastikan hasil perhitungannya benar-benar angka, bukan hal aneh seperti hasil pembagian dengan nol (Infinity). Kalau valid, hasilnya ditampilkan, dan statusnya menjadi Sukses.
                    if (isFinite(result)) {
                        display.value = result;
                        changeImage('success'); //  Jelaskan Kodingan ini apa: kode untuk memanggil fungsi pengganti status untuk menampilkan gambar Success.
                    } else {
                        throw new Error("Hasil tidak valid");
                    }

                } catch (error) {
                    console.error("Error kalkulasi:", error);
                    display.value = 'Error';
                    changeImage('error'); //  Jelaskan Kodingan ini apa: kode untuk memanggil fungsi pengganti status untuk menampilkan gambar Error jika perhitungan gagal.
                    setTimeout(clearDisplay, 1500);
                }
            }


            //  Jelaskan Kodingan ini apa: kode yang merupakan loop yang secara otomatis memasang event listener (sensor sentuh) pada semua tombol. Jadi, setiap tombol tahu harus berbuat apa saat diklik.
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const value = button.getAttribute('data-value');

                    //  Jelaskan Kodingan ini apa: kode yang berfungsi ketika tombol diklik, kode ini seperti membuat keputusan berdasarkan tombol mana yang ditekan: kalau C, panggil fungsi Clear; kalau =, panggil fungsi Hitung.
                    switch(value) {
                        case 'C':
                            //  Jelaskan Kodingan ini apa: kode perintah untuk menjalankan Fungsi Bersihkan Layar ketika tombol C diklik.
                            clearDisplay();
                            break;
                        case 'DEL':
                            //  Jelaskan Kodingan ini apa: kode perintah untuk menjalankan Fungsi Hapus Satu Angka ketika tombol DEL diklik.
                            deleteLastChar();
                            break;
                        case '=':
                            //  Jelaskan Kodingan ini apa: kode perintah untuk menjalankan Fungsi Hitung Hasil ketika tombol = diklik.
                            calculateResult();
                            break;
                        default:
                            //  Jelaskan Kodingan ini apa: kode yang menciptakan fitur "Auto-Reset" pada kalkulator. Begitu selesai menghitung dan mendapatkan hasil (status Success), menekan angka berikutnya akan secara otomatis menghapus hasil sebelumnya dan memulai input baru.
                            if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                                clearDisplay();
                            }
                            appendToDisplay(value);
                            break;
                    }
                });
            });

            //  Jelaskan Kodingan ini apa: kode sensor yang mirip dengan tombol, tapi dia menangkap tombol yang ditekan di keyboard (misalnya, angka 7, Enter, atau Backspace) dan mengubahnya menjadi input ke kalkulator.
            document.addEventListener('keydown', (e) => {
                const key = e.key;

                if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
                    if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                        clearDisplay();
                    }
                    appendToDisplay(key);
                    e.preventDefault();
                } else if (key === 'Enter' || key === '=') {
                    calculateResult();
                    e.preventDefault();
                } else if (key === 'Backspace') {
                    deleteLastChar();
                    e.preventDefault();
                } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                    clearDisplay();
                    e.preventDefault();
                }
            });

        });
