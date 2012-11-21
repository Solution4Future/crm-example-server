load('application');

before(loadClient, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New client';
    this.client = new Client;
    send();
});

action(function create() {
    Client.create(req.body, function (err, client) {
        if (err) {
            flash('error', 'Client can not be created');
            send('new', {
                client: client,
                title: 'New client'
            });
        } else {
            flash('info', 'Client created');
            send(client);
        }
    });
});

action(function index() {
    this.title = 'Clients index';
    Client.all(function (err, clients) {
        send({
            clients: clients
        });
    });
});

action(function show() {
    this.title = 'Client show';
    send(this.client);
});

action(function edit() {
    this.title = 'Client edit';
    send();
});

action(function update() {
    this.client.updateAttributes(req.body, function (err) {
        if (!err) {
            flash('info', 'Client updated');
            send(this.client);
        } else {
            flash('error', 'Client can not be updated');
            this.title = 'Edit client details';
            send('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.client.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy client');
        } else {
            flash('info', 'Client successfully removed');
        }
        send("'DELETED'");
    });
});

function loadClient() {
    Client.find(params.id, function (err, client) {
        if (err || !client) {
            send(404);
        } else {
            this.client = client;
            next();
        }
    }.bind(this));
}
