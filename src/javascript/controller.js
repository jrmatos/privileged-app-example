class UnicornApp{

    constructor(appId, ControllerServiceName, servicesImported = [], servicesExported = []) {
        this.appId = appId;
        this.ControllerServiceName = ControllerServiceName;

        // These are native symphony's services
        // ex: ui, links, share, entity etc
        this.servicesImported = servicesImported;

        // These are services created by the app
        this.servicesExported = servicesExported;
    }

    async makeConnection() {
        try{
            // wait for the connection between the app and symphony client
            this.symphonyConnectionObject =  await SYMPHONY.remote.hello();
            this.onConnectionSuccess();
        }
        catch(e) {
            this.onConnectionError(e);
        }
    }

    async onConnectionSuccess() {
        alert('onConnectionSuccess')
        // register our controller
        await this.register();
            
        this.subscribeToServices()
            .addLeftNavItem();
    }

    onConnectionError(e) {
        console.error('Could not connect app to Symphony Client', e);
    }

    async register() {
        this.registrationObject = await SYMPHONY.application.register(this.appId, this.servicesImported, this.servicesExported);
        return this;
    }

    subscribeToServices() {
        this.navService = SYMPHONY.services.subscribe('applications-nav');
        return this;
    }

    addLeftNavItem() {
        this.navService.add('unicorn-nav', 'Unicorn App Item', this.ControllerServiceName);
        return this;
    }
   
}

class UnicornControllerService{
    constructor(appId, serviceName) {
        this.appId = appId;
        this.serviceName = serviceName;
        this.importedServices = {};
        this.MODULES_SERVICE = 'modules';

        this.register()
            .implementMethods(['select']);
    }

    register() { 
        this.serviceInstance = SYMPHONY.services.register(this.serviceName);
        return this;
    }

    implementMethods(methodNames) {
        for(const methodName of methodNames) {
            this.serviceInstance.implement(methodName, this[methodName].bind(this));
        }
        return this;
    }

    select() {
        this.getService(this.MODULES_SERVICE).show(this.appId, {title: "Unicorn App Title"}, this.serviceName, "https://localhost:4000/view.html", {
            "canFloat": true,
        });
    }

    getService(service) {
        if(!this.importedServices[service]) {
            this.importedServices[service] = SYMPHONY.services.subscribe(service);
        }
        
        return this.importedServices[service];
    }
   
}

const appId = 'unicorn-app';
const controllerServiceName = 'UnicornControllerService';

const unicornControllerService = new UnicornControllerService(appId, controllerServiceName);
const unicornApp = new UnicornApp(appId, controllerServiceName, ['applications-nav', 'modules'], [controllerServiceName]);

// create connection
unicornApp.makeConnection();