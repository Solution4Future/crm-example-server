load('application');

before(loadClient);
before(loadAction, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New action';
    this.action = new Action;
    send();
});

action(function create() {
    this.client.action.create(req.body, function (err, action) {
        if (err) {
            flash('error', 'Action can not be created');
            send('new', {
                action: action,
                title: 'New action'
            });
        } else {
            flash('info', 'Action created');
            send();
        }
    });
});

action(function index() {
    this.title = 'Actions index';
    this.client.action(function (err, actions) {
        actions.forEach(function(item, index){
            actions[index]['clientId2'] = item['clientId'];
            actions[index]['clientId'] = {id: item['clientId']};
            });
        send({
            actions: actions
        });
    });
});

action(function show() {
    this.title = 'Action show';
    send(this.action);
});

action(function edit() {
    this.title = 'Action edit';
    send();
});

action(function update() {
    this.action.updateAttributes(body.Action, function (err) {
        if (!err) {
            flash('info', 'Action updated');
            send();
        } else {
            flash('error', 'Action can not be updated');
            this.title = 'Edit action details';
            send('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.action.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy action');
        } else {
            flash('info', 'Action successfully removed');
        }
        send();
    });
});

function loadClient () {
    Client.find(req.params.client_id, function (err, client) {
        if (err || !client) {
                send(404);
            } else {
                this.client = client;
                next();
            }
        }.bind(this));
}

function loadAction() {
    Action.find(params.id, function (err, action) {
        if (err || !action) {
            send(404);
        } else {
            this.action = action;
            next();
        }
    }.bind(this));
}
