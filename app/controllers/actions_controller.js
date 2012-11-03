load('application');

before(loadClient);
before(loadAction, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New action';
    this.action = new Action;
    render();
});

action(function create() {
    Action.create(req.body.Action, function (err, action) {
        if (err) {
            flash('error', 'Action can not be created');
            render('new', {
                action: action,
                title: 'New action'
            });
        } else {
            flash('info', 'Action created');
            redirect(path_to.actions());
        }
    });
});

action(function index() {
    this.title = 'Actions index';
    Action.all(function (err, actions) {
        send({
            actions: actions
        });
    });
});

action(function show() {
    this.title = 'Action show';
    render();
});

action(function edit() {
    this.title = 'Action edit';
    render();
});

action(function update() {
    this.action.updateAttributes(body.Action, function (err) {
        if (!err) {
            flash('info', 'Action updated');
            redirect(path_to.action(this.action));
        } else {
            flash('error', 'Action can not be updated');
            this.title = 'Edit action details';
            render('edit');
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
        send("'" + path_to.actions() + "'");
    });
});

function loadClient () {
    Client.findById(req.params.client_id, function (err, client) {
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
