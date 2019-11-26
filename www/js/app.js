

class App extends React.Component {
    render() {
        return (
            React.createElement("div", { className: "App" },
            React.createElement("header", { className: "App-header" },
                React.createElement("h1", { className: "App-title" }, "Welcome to React2")),
            React.createElement("p", { className: "App-intro" },
                "To get started, edit ",
                React.createElement("code", null, "src/App.tsx"),
                " and save to reload.")));
     
    }
}
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));

