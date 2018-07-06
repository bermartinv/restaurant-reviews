// set var cache
let cacheVersion = "review-cache-v1";

//array with all files to cache
let cacheFiles = [
    "./",
    "./index.html",
    "./restaurant.html",
    "./css/styles.css",
    "./data/restaurants.json",
    "./img/1.jpg",
    "./img/2.jpg",
    "./img/3.jpg",
    "./img/4.jpg",
    "./img/5.jpg",
    "./img/6.jpg",
    "./img/7.jpg",
    "./img/8.jpg",
    "./img/9.jpg",
    "./img/10.jpg",
    "./js/dbhelper.js",
    "./js/main.js",
    "./js/restaurant_info.js"
];

//Install service worker
self.addEventListener('install', function(event){
    console.log("Our Service Worker is installed");
        event.waitUntil(
            //open cache
            caches.open(cacheVersion).then(function(cache){
                console.log("Our files are cached in service worker");
                    return cache.addAll(cacheFiles);//add all files
            })
        )
})

// Activate service worker
self.addEventListener('activate', function(event){
    console.log('Activate service worker cache');
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
			cacheNames.filter(function(cacheName) {
				return cacheName.startsWith('review-')&&cacheName != cacheVersion;
			}).map(function(cacheName) {
				return cache.delete(cacheName);
		})
	)
	}).catch(function(error) {
        console.log('Old cache not deleted');
        return
    })
);
});


// FETCH service worker
self.addEventListener('fetch', function(event) {
    console.log('FETCH service worker');
	event.respondWith(
        caches.match(event.request)
        .then(function(response) {
			return response || fetch(event.request);
		})
	);
});
