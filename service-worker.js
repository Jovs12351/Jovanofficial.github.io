self.addEventListener('sync', function(event) {
    if (event.tag.startsWith('{')) {
        event.waitUntil(scheduleNotification(JSON.parse(event.tag)));
    }
});

function scheduleNotification(task) {
    const now = new Date().getTime();
    const taskTime = new Date(task.dateTime).getTime();
    
    if (taskTime > now) {
        const timeUntilNotification = taskTime - now;
        
        return new Promise((resolve) => {
            setTimeout(() => {
                self.registration.showNotification("Task Due", {
                    body: `${task.title} (${task.category})`,
                    icon: "https://example.com/icon.png" // Replace with your icon URL
                });
                resolve();
            }, timeUntilNotification);
        });
    }
}

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
