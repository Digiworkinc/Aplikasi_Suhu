  
        // Inisialisasi ikon Lucide
        lucide.createIcons();

        // Referensi elemen DOM
        const form = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const searchIcon = document.getElementById('search-icon');
        const loadingIcon = document.getElementById('loading-icon');
        
        const errorContainer = document.getElementById('error-container');
        const errorText = document.getElementById('error-text');
        
        const loadingSkeleton = document.getElementById('loading-skeleton');
        const weatherContainer = document.getElementById('weather-container');
        const mainBg = document.getElementById('main-bg');

        // Fungsi bantuan untuk mendapatkan info cuaca
        const getWeatherInfo = (code, isDay) => {
            let text = 'Tidak diketahui';
            let iconName = 'cloud';
            let iconColor = 'text-gray-400';

            if (code === 0) {
                text = 'Cerah';
                iconName = isDay ? 'sun' : 'moon';
                iconColor = isDay ? 'text-yellow-400' : 'text-blue-200';
            } else if ([1, 2, 3].includes(code)) {
                text = 'Berawan';
                iconName = 'cloud';
                iconColor = 'text-gray-300';
            } else if ([45, 48].includes(code)) {
                text = 'Berkabut';
                iconName = 'cloud-fog';
                iconColor = 'text-gray-400';
            } else if ([51, 53, 55, 56, 57].includes(code)) {
                text = 'Gerimis';
                iconName = 'cloud-drizzle';
                iconColor = 'text-blue-300';
            } else if ([61, 63, 65, 66, 67].includes(code)) {
                text = 'Hujan';
                iconName = 'cloud-rain';
                iconColor = 'text-blue-500';
            } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
                text = 'Salju';
                iconName = 'cloud-snow';
                iconColor = 'text-blue-100';
            } else if ([80, 81, 82].includes(code)) {
                text = 'Hujan Lebat';
                iconName = 'cloud-rain';
                iconColor = 'text-blue-600';
            } else if ([95, 96, 99].includes(code)) {
                text = 'Badai Petir';
                iconName = 'cloud-lightning';
                iconColor = 'text-yellow-500';
            }

            return { 
                text, 
                html: `<i data-lucide="${iconName}" class="w-20 h-20 ${iconColor}"></i>` 
            };
        };

        // Mengatur status tampilan UI
        const setLoadingState = (isLoading) => {
            searchBtn.disabled = isLoading;
            if (isLoading) {
                searchIcon.classList.add('hidden');
                loadingIcon.classList.remove('hidden');
                weatherContainer.classList.add('hidden');
                errorContainer.classList.add('hidden');
                loadingSkeleton.classList.remove('hidden');
                loadingSkeleton.classList.add('flex');
            } else {
                searchIcon.classList.remove('hidden');
                loadingIcon.classList.add('hidden');
                loadingSkeleton.classList.add('hidden');
                loadingSkeleton.classList.remove('flex');
            }
        };

        const showError = (message) => {
            errorText.textContent = message;
            errorContainer.classList.remove('hidden');
            weatherContainer.classList.add('hidden');
        };

        // Fungsi utama untuk mengambil data API
        const fetchWeather = async (city) => {
            if (!city.trim()) return;
            
            setLoadingState(true);
            
            try {
                // 1. Dapatkan koordinat dari nama kota
                const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=id&format=json`);
                const geoData = await geoRes.json();
                
                if (!geoData.results || geoData.results.length === 0) {
                    throw new Error("Kota tidak ditemukan. Silakan coba nama kota lain.");
                }
                
                const location = geoData.results[0];
                
                // 2. Dapatkan data cuaca menggunakan koordinat
                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=auto`);
                const weatherJson = await weatherRes.json();
                
                if (weatherJson.error) {
                    throw new Error("Gagal mengambil data cuaca.");
                }

                const current = weatherJson.current;
                renderWeather({
                    city: location.name,
                    country: location.country || '',
                    temp: current.temperature_2m,
                    feelsLike: current.apparent_temperature,
                    humidity: current.relative_humidity_2m,
                    windSpeed: current.wind_speed_10m,
                    weatherCode: current.weather_code,
                    isDay: current.is_day === 1
                });
                
            } catch (err) {
                showError(err.message);
            } finally {
                setLoadingState(false);
            }
        };

        // Render data ke dalam DOM
        const renderWeather = (data) => {
            // Ubah Latar Belakang (Siang / Malam)
            if (data.isDay) {
                mainBg.classList.replace('from-slate-800', 'from-blue-400');
                mainBg.classList.replace('to-indigo-900', 'to-blue-200');
            } else {
                mainBg.classList.replace('from-blue-400', 'from-slate-800');
                mainBg.classList.replace('to-blue-200', 'to-indigo-900');
            }

            // Dapatkan Info Cuaca (Teks & Ikon)
            const info = getWeatherInfo(data.weatherCode, data.isDay);

            // Terapkan ke elemen HTML
            document.getElementById('city-name').textContent = data.city;
            document.getElementById('country-name').textContent = data.country;
            document.getElementById('temperature').textContent = Math.round(data.temp);
            document.getElementById('weather-desc').textContent = info.text;
            document.getElementById('humidity').textContent = data.humidity;
            document.getElementById('wind-speed').textContent = data.windSpeed;
            document.getElementById('feels-like').textContent = Math.round(data.feelsLike);
            
            // Set Ikon Cuaca
            const iconContainer = document.getElementById('weather-icon-container');
            iconContainer.innerHTML = info.html;
            
            // Re-inisialisasi ikon lucide yang baru ditambahkan secara dinamis
            lucide.createIcons();

            // Tampilkan container cuaca
            weatherContainer.classList.remove('hidden');
            weatherContainer.classList.add('flex');
        };

        // Event listener saat form pencarian disubmit
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            fetchWeather(searchInput.value);
        });

        // Ambil data default saat halaman pertama kali dimuat
        window.addEventListener('DOMContentLoaded', () => {
            fetchWeather('Jakarta');
        });
    
