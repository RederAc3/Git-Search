class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            users: []
        };
    }

    onChangeHandle(event) {
        this.setState({ searchText: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();

        const { searchText } = this.state;
        const url = `https://api.github.com/search/users?q=${searchText}`;

        fetch(url)
            .then(response => response.json())
            .then(responseJson => this.setState({ users: responseJson.items }));   
        }

    render() {
        return (
            <div>
                <form onSubmit={event => this.onSubmit(event)}>
                    <label htmlFor="searchText">User Name</label>
                    <input
                        type="text"
                        id="searchText"
                        onChange={event => this.onChangeHandle(event)}
                        value={this.state.searchText} />
                        <input className="button-submit" type="submit" value="Search"/>
                </form>

                <UsersList users={this.state.users} />
            </div>
        );
    }
}

class UsersList extends React.Component {
    get users() {
        return this.props.users.map(user => <User key={user.id} user={user} />);
    }

    render() {
        return (
            <div className={'users'}>
                {this.users}
            </div>
        );
    }
}

class User extends React.Component {
    render() {
        return (
            <a href={this.props.user.html_url} target="_blank">
                <img src={this.props.user.avatar_url} style={{ maxWidth: '100px' }} />
                <p>{this.props.user.login}</p>
                </a>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);