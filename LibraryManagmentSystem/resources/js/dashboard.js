document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    if (token) {
        axios.get('/dashboard', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                console.log('Authorized');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            
            if (error.response.status === 401) {
                console.log('Unauthorized');
                window.location.href = '/login';
            }
        });
    } else {
        console.log('Token not found');
        window.location.href = '/login';
    }
});