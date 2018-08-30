alert("The scripts from the privileged unicorn app have been loaded!");

function UnicornMainService() {
    this.serviceName = 'UnicornMainService';
}

UnicornMainService.prototype = {
    implements: ['reinit', 'unload'],

    register: function () {
        SYMPHONY.services.make(this.serviceName, this, this.implements, true, true);
    },

    reinit: function () {
        alert('reinit!');
    },

    unload: function () {
        alert('unload!');
    }
}

var unicornMainService = new UnicornMainService();
unicornMainService.register();