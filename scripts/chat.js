//inits socket.io
(() => {
    let socket = io();
    $("form").submit(function(e) {
        e.preventsDefault();//prevents page loading
        socket.emit("chat message", $("#m").val());
        $("#m").val("");
        return true;
    });
})();

(function() {})