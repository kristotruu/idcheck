import React, {Component} from 'react';
import DatePicker from 'react-date-picker';
import {Form, Button, Row, Col} from "react-bootstrap";
import Moment from 'moment'
import {generate, random} from "./Generator";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {MdContentCopy} from 'react-icons/md';

const countryConfigurations = [
    {
        id: 1,
        name: 'Estonia',
        showGender: true
    },
    {
        id: 2,
        name: 'Latvia',
        showGender: false
    },
    {
        id: 3,
        name: 'Lithuania',
        showGender: true
    }, {
        id: 4,
        name: "Finland",
        showGender: true
    }
];


class IdGeneratorComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: Moment().subtract("24", "year").toDate(),
            gender: 1,
            codes: [],
            country: 1
        }
    }

    componentDidMount() {
        this.randomize();
    }

    randomize = () => {
        let generatedCodes = [];
        for(let i = 0; i <= 10; i++) {
            generatedCodes = [...generatedCodes, random(this.state.country)];
        }
        this.setState({codes: generatedCodes});
    }

    onChange = (field, value) => {
        this.setState({[field]: value}, () => {
            this.setState({codes: [generate(this.state.country, this.state.date, this.state.gender)]})
        });
    }

    render() {
        const countryConfiguration = countryConfigurations.filter(countryConf => countryConf.id === this.state.country)[0]

        return (
            <div className="country-generator">
                <Row className="row d-flex align-items-center">
                    <Col className="title"> Identification number generator</Col>
                    <Col className="d-flex justify-content-end"><Button variant="outline-primary" size="sm" onClick={this.randomize}>Random</Button></Col>
                </Row>
                <Row>
                    <Col>
                        <div className="attribute-name">Country</div>
                        {countryConfigurations.map(countryConf =>
                            <Form.Check
                                checked={this.state.country === countryConf.id}
                                onChange={(e) => this.onChange("country", countryConf.id)}
                                name="country"
                                type="radio"
                                label={countryConf.name}
                                id={`country-${countryConf.id}`}
                            />
                        )}
                    </Col>
                    <Col>
                        <div className="attribute-name">Birthday</div>
                        <DatePicker
                            format={"y-MM-dd"}
                            onChange={(e) => this.onChange("date", e ? Moment(e).toDate() : null)}
                            value={this.state.date}
                        />
                    </Col>
                    {countryConfiguration.showGender && <Col>
                        <div className="attribute-name">Gender</div>
                        <Form.Check
                            checked={this.state.gender === 1}
                            onChange={(e) => this.onChange("gender", 1)}
                            name="gender"
                            type="radio"
                            label="male"
                            id="est-gender-man"
                        />
                        <Form.Check
                            checked={this.state.gender === 2}
                            onChange={(e) => this.onChange("gender", 2)}
                            name="gender"
                            type="radio"
                            label="female"
                            id="est-gender-woman"
                        />
                    </Col>
                    }
                </Row>
                <Row>
                    <Col>
                        <div className="result-list">
                            {this.state.codes.map(code =>

                                <Row key={code} className="generated">
                                    <Col md={10}>{code}</Col>
                                    <Col md={2} className="d-flex justify-content-end align-items-center"><CopyToClipboard text={code}><MdContentCopy/></CopyToClipboard></Col>
                                </Row>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default IdGeneratorComponent;