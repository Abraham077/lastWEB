let events = [
    {
        id: 1,
        title: "Astana International Jazz Festival",
        date: "2025-03-15",
        location: "Astana Opera House",
        category: "concert",
        description: "Experience world-class jazz musicians from around the globe.",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Nauryz Festival",
        date: "2025-03-21",
        location: "Central Park",
        category: "festival",
        description: "Celebration of the traditional New Year with folk performances and food.",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Winter Sports Championship",
        date: "2025-02-10",
        location: "Astana Arena",
        category: "sports",
        description: "Ice hockey, figure skating, and winter sports competitions.",
        image: "https://images.unsplash.com/photo-1548909027-1a6379b8a8d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Kazakhstan Cultural Week",
        date: "2025-04-05",
        location: "National Museum",
        category: "cultural",
        description: "Exhibitions and performances showcasing Kazakh culture and heritage.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        title: "Rock Festival",
        date: "2025-05-20",
        location: "Astana Park",
        category: "concert",
        description: "Top rock bands from Kazakhstan and Central Asia.",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        title: "International Film Festival",
        date: "2025-06-12",
        location: "Cinema Center",
        category: "cultural",
        description: "Screening of international and local films with discussions.",
        image: "https://images.unsplash.com/photo-1535755141659-94a9a202f0e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
];

function displayEvents(eventsToDisplay) {
    const container = document.getElementById('eventsContainer');
    if (!container) return;
    
    container.innerHTML = '';

    for (let i = 0; i < eventsToDisplay.length; i++) {
        const event = eventsToDisplay[i];
        
        let badgeClass = 'bg-secondary';
        if (event.category === 'concert') badgeClass = 'bg-primary';
        else if (event.category === 'festival') badgeClass = 'bg-success';
        else if (event.category === 'sports') badgeClass = 'bg-danger';
        else if (event.category === 'cultural') badgeClass = 'bg-warning';
        
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card event-card">
                <img src="${event.image}" alt="${event.title}">
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <span class="badge ${badgeClass} mb-2">${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
                    <p class="card-text"><strong>Date:</strong> ${event.date}</p>
                    <p class="card-text"><strong>Location:</strong> ${event.location}</p>
                    <p class="card-text">${event.description}</p>
                    <button class="btn btn-outline-primary btn-sm" onclick="toggleEventDetails(${event.id})">More Details</button>
                    <div id="details-${event.id}" class="mt-2" style="display:none;">
                        <p class="text-muted">Additional information about this event...</p>
                        <button class="btn btn-sm btn-secondary" onclick="hideEventDetails(${event.id})">Hide Details</button>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    }
}

function toggleEventDetails(id) {
    const detailsElement = document.getElementById(`details-${id}`);
    if (detailsElement) {
        if (detailsElement.style.display === 'none') {
            detailsElement.style.display = 'block';
        } else {
            detailsElement.style.display = 'none';
        }
    }
}

function hideEventDetails(id) {
    const detailsElement = document.getElementById(`details-${id}`);
    if (detailsElement) {
        detailsElement.style.display = 'none';
    }
}

function filterEvents() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    
    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm) || 
                             event.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === '' || event.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    displayEvents(filteredEvents);
}

function addNewEvent(eventData) {
    const maxId = Math.max(...events.map(e => e.id), 0);
    eventData.id = maxId + 1;
    
    eventData.image = "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
    
    events.push(eventData);
    
    saveEventsToStorage();
    
    displayEvents(events);
    
    return eventData;
}

function removeEvent(id) {
    events = events.filter(event => event.id !== id);
    saveEventsToStorage();
    displayEvents(events);
}

function editEvent(id, updatedData) {
    const index = events.findIndex(event => event.id === id);
    if (index !== -1) {
        events[index] = { ...events[index], ...updatedData };
        saveEventsToStorage();
        displayEvents(events);
    }
}

function saveEventsToStorage() {
    localStorage.setItem('astanaEvents', JSON.stringify(events));
}

function loadEventsFromStorage() {
    const savedEvents = localStorage.getItem('astanaEvents');
    if (savedEvents) {
        const parsedEvents = JSON.parse(savedEvents);
        events = parsedEvents;
        return parsedEvents;
    }
    return events;
}

function getEventsByCategory(category) {
    if (category === '') {
        return events;
    }
    return events.filter(event => event.category === category);
}

function getFutureEvents() {
    const today = new Date();
    return events.filter(event => new Date(event.date) >= today);
}

function getPastEvents() {
    const today = new Date();
    return events.filter(event => new Date(event.date) < today);
}

function initializeEventsPage() {
    loadEventsFromStorage();
    
    displayEvents(events);
    
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('eventTitle').value;
            const date = document.getElementById('eventDate').value;
            const location = document.getElementById('eventLocation').value;
            const category = document.getElementById('eventCategory').value;
            const description = document.getElementById('eventDescription').value;
            
            if (!title || !date || !location || !category || !description) {
                alert('Please fill in all required fields');
                return;
            }
            
            const newEvent = {
                title: title,
                date: date,
                location: location,
                category: category,
                description: description
            };
            
            addNewEvent(newEvent);
            
            eventForm.reset();
            
            showNotification('Event added successfully!', 'success');
        });
    }
    
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', filterEvents);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterEvents);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('eventsContainer')) {
        initializeEventsPage();
    }
});