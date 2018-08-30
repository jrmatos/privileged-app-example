alert("The scripts from the privileged unicorn app 2 have been loaded!");

function UnicornMainService2() {
    this.serviceName = 'UnicornMainService2';
}

UnicornMainService2.prototype = {
    implements: ['reinit', 'unload'],

    register: function () {
        SYMPHONY.services.make(this.serviceName, this, this.implements, true, true);
    },

    reinit: function () {
        alert('reinit!2');
    },

    unload: function () {
        alert('unload!2');
    }
}

var unicornMainService2 = new UnicornMainService2();
unicornMainService2.register();