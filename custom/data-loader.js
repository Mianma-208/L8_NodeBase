const https = require('https');

module.exports = {
    loadUsers: function() {
        return new Promise((resolve) => {
            const result = { data: null, isLoading: true, error: null };
            
            https.get('https://jsonplaceholder.typicode.com/users', (response) => {
                let data = '';
                
                response.on('data', chunk => data += chunk);
                
                response.on('end', () => {
                    result.isLoading = false;
                    try {
                        result.data = JSON.parse(data);
                    } catch (e) {
                        result.error = e.message;
                    }
                    resolve(result);
                });
                
            }).on('error', (error) => {
                result.isLoading = false;
                result.error = error.message;
                resolve(result);
            });
        });
    }
};