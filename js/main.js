new Vue({
    el: '#app',
    data: {
        messages: []
    },
    mounted() {
        this.fetchMessages(); 
    },
    methods: {
        fetchMessages() {
            axios.get('https://api.twilio.com/2010-04-01/Accounts/AC4e0b652de5eedbf5b3fc0f9795f0d1ef/Messages.json?From=+14804051834&To=+14806944214', {
                headers : {"Authorization":"Basic QUM0ZTBiNjUyZGU1ZWVkYmY1YjNmYzBmOTc5NWYwZDFlZjo3OWJlYzhhMGU0NTRjYTJmYzBjMjRjYzg3ODYwNzU4OQ=="}
            })
            .then(response => {
               
                this.messages = response.data.messages.map(message => {
                    message.formattedDate = this.formatDate(message.date_sent);
                    return message;
                });
            })
            .catch(error => {
                console.error('Hubo un error!', error);
            });
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const options = {

            };
            let formattedDate = date.toLocaleDateString('en-US', options).replace(',', '');
            let formattedTime = date.toLocaleTimeString('en-US', options);
            
            return formattedDate + ', ' + formattedTime;        }
    }
});
