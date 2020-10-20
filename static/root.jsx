const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Prompt = ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const {Button, Alert, Col, Row, Form, FormControl, Container, Modal} = ReactBootstrap;
function App() {

    return (
        <Router>
            <Switch>
                <Route path="/">
					<Homepage />
				</Route>
            </Switch>
        </Router>
    )
}
function Homepage () {
    // ip address input
    const[ip, setIP] = React.useState("");
    const[lat, setLat] = React.useState("");
    const[long, setLong] = React.useState("");
    const [show, setShow] = React.useState(false);
    // show modal
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    // gets the ip input
    const getInput = (evt) => {
        evt.preventDefault();
        setShow(true);
        
        const ipInfo = {"ip": ip}
        fetch('/api/latlong', {
            method: 'POST',
            body: JSON.stringify(ipInfo),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
            const latInfo = data['latitude'];
            const longInfo = data['longitude']            
            setLat(latInfo);
            setLong(longInfo);
            setIP('');
        })
      
        
    }
    return (
        <Container fluid="md">
            <Form>
                <Form.Label>IP Address</Form.Label>
                <Form.Control type="text"
                                id = "ip-input"
                                onChange = {e =>setIP(e.target.value)}
                                value = {ip}></Form.Control>
            </Form>
            <Button type="submit" onClick={getInput}>Submit</Button>
            
            <Modal show ={show} animation={false}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Location Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Latitude: {lat}</p>
                    <p>Longitude: {long}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Close
                </Button>
            
                </Modal.Footer>
            </Modal>

        </Container>
        
    )
}
ReactDOM.render(<App />, document.getElementById('root'))