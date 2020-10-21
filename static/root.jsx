const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;

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
    // IP address input
    const[ip, setIP] = React.useState("");
    // Latitude and Longitude values
    const[lat, setLat] = React.useState("");
    const[long, setLong] = React.useState("");
    
    // Show modal. Starts as false.
    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    
    // gets the IP input and sends to server to get lat/long info
    const getInput = (evt) => {
        evt.preventDefault();
        
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
            const longInfo = data['longitude'];
            
            // handling invalid IP address
            if (data['latitude'] === 'error') {
                alert('Invalid input');
                setIP('');
            }            
    
            else {
                // handling valid IP address
                setLat(latInfo);
                setLong(longInfo);
                setIP('');
                handleShow();
            }
        })
    }
    return (
        <Container fluid="md">
            <Form id ="ip-form">
                <Form.Label>IP Address</Form.Label>
                <Form.Control type="text"
                                id = "ip"
                                name="ip"
                                onChange = {e =>setIP(e.target.value)}
                                value = {ip}></Form.Control>
                <Button type="submit" id="submit-but" onClick={getInput}>Submit</Button>
            </Form>
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